/* =====================================================
   1. FUNERAL CLAIM FLOW (Managed Funeral Experience)
   ===================================================== */
const BOPEU_CLAIM_ITEMS = [
    'Death Certificate',
    'Claimant (Next of Kin) ID / Omang',
    'Claimant Bank Details',
    'Relationship Proof (Marriage / Birth Certificate)',
    'Contact details for follow-up'
];

function renderClaimInitiation() {
    const container = document.getElementById('claimInitiation');
    if (!container) return;

    const profile = loadOnboarding();
    const funeral = profile && profile.funeral;
    const depCount = (funeral && funeral.dependants && funeral.dependants.length) || 0;

    let html =
        '<div class="card"><div class="card-header">Start a Funeral Claim</div>' +
        '<div class="form-group"><label class="form-label">Deceased Relationship to Member</label><select id="claimRelation">' +
        '<option value="Member">Member (main insured)</option>' +
        '<option value="Spouse">Spouse</option>' +
        '<option value="Child">Child (under 21)</option>' +
        '<option value="Other">Other covered family</option></select></div>' +
        '<div class="form-group"><label class="form-label">Full Name of Deceased</label><input type="text" id="claimDeceasedName" placeholder="e.g. Tshepo Molefe"></div>' +
        '<div class="form-group"><label class="form-label">Date of Death</label><input type="date" id="claimDateOfDeath"></div>' +
        '<button type="button" class="btn btn-primary" onclick="startClaim()">Begin Claim Checklist</button></div>';

    html +=
        '<div class="stat-box" style="margin-top:10px;">' +
        '<div class="stat-label">Member funeral cover status</div>' +
        '<div class="stat-value">' + (funeral ? 'Active' : 'Not enrolled') + ' &bull; Core P 60,000</div>' +
        '<small class="stat-label">' + depCount + ' dependant(s) on cover</small>' +
        '</div>';

    html += renderRecentClaimsHtml();
    container.innerHTML = html;
}

function renderRecentClaimsHtml() {
    const claims = getClaims();
    if (!claims.length) return '';
    let html = '<div class="card" style="margin-top:10px;"><div class="card-header">Your Claims</div>';
    claims.forEach(c => {
        const statusMap = { initiated: 'Initiated', ready: 'Ready to Submit', processing: 'At Metropolitan', paid: 'Paid Out' };
        const cls = c.status === 'paid' ? 'green' : 'blue';
        html +=
            '<div class="member-card">' +
            '<div class="member-avatar">' + initialsOf(c.deceased) + '</div>' +
            '<div class="member-info">' +
            '<div class="member-name">' + esc(c.deceased) + ' <span class="tag ' + cls + '">' + (statusMap[c.status] || c.status) + '</span></div>' +
            '<div class="member-details">' + esc(c.relation) + ' &bull; ' + new Date(c.date).toLocaleDateString() + (c.payout ? ' &bull; Paid ' + esc(c.payout) : '') + '</div>' +
            '<div class="member-tags">' +
            '<button class="btn btn-secondary btn-small" style="width:auto;" onclick="openClaimDetail(\'' + c.id + '\')">Details</button>' +
            (c.status === 'initiated' || c.status === 'ready' ? '<button class="btn btn-secondary btn-small" style="width:auto;" onclick="resumeClaim(\'' + c.id + '\')">Continue</button>' : '') +
            '</div></div></div>';
    });
    html += '</div>';
    return html;
}

function getClaims() {
    return LocalStore.get('bopeu_claims') || [];
}

function saveClaims(list) {
    LocalStore.set('bopeu_claims', list);
}

function startClaim() {
    const relation = (document.getElementById('claimRelation') || {}).value;
    const deceased = (document.getElementById('claimDeceasedName') || {}).value.trim();
    const date = (document.getElementById('claimDateOfDeath') || {}).value;
    if (!deceased) { toast('Please enter the deceased\'s full name.'); return; }

    const benefit = relation === 'Member' || relation === 'Spouse' ? 'P 60,000' : 'P 15,000 - 60,000*';
    const claim = {
        id: 'CLM-' + Date.now(),
        deceased: deceased,
        relation: relation,
        date: new Date().toISOString(),
        dateOfDeath: date,
        benefit: benefit,
        status: 'initiated',
        documents: BOPEU_CLAIM_ITEMS.map(d => ({ label: d, done: false })),
        notes: ''
    };
    const list = getClaims();
    list.unshift(claim);
    saveClaims(list);
    renderClaimInitiation();
    renderClaimSteps(claim);
    renderClaimChecklist(claim);
    openModal('claim-progress-modal');
}

function resumeClaim(id) {
    const claim = getClaims().find(c => c.id === id);
    if (!claim) return;
    renderClaimSteps(claim);
    renderClaimChecklist(claim);
    openModal('claim-progress-modal');
}

function renderClaimSteps(claim) {
    const container = document.getElementById('claimSteps');
    if (!container) return;
    const done = claim.documents.filter(d => d.done).length;
    const total = claim.documents.length;
    const pct = Math.round((done / total) * 100);
    container.innerHTML =
        '<div class="claim-header">' +
        '<div class="member-avatar" style="width:44px;height:44px;font-size:20px;">' + initialsOf(claim.deceased) + '</div>' +
        '<div><div class="member-name">' + esc(claim.deceased) + '</div>' +
        '<div class="member-details">' + esc(claim.relation) + ' &bull; ' + esc(claim.benefit) + '</div></div></div>' +
        '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="progress-label">' + done + ' of ' + total + ' documents ready (' + pct + '%)</div>' +
        '<div class="offline-ready ' + (pct === 100 ? 'ready' : '') + '">' +
        (pct === 100 ? '✓ Your claim is ready to submit to Metropolitan Life.' : 'Complete all documents above to enable submission.') +
        '</div>';
}

function renderClaimChecklist(claim) {
    const container = document.getElementById('claimChecklist');
    if (!container) return;
    let html = '';
    claim.documents.forEach((d, i) => {
        html +=
            '<div class="checklist-item">' +
            '<input type="checkbox" ' + (d.done ? 'checked' : '') + ' onchange="toggleClaimDoc(\'' + claim.id + '\',' + i + ')" id="cd-' + i + '">' +
            '<label for="cd-' + i + '">' + esc(d.label) + '</label>' +
            '<button type="button" class="btn btn-secondary btn-small" style="width:auto;margin-left:auto;" onclick="attachClaimFile(\'' + claim.id + '\',' + i + ')">Attach</button>' +
            '</div>';
    });
    html += '<div class="claim-actions">' +
        '<button class="btn btn-primary" ' + (claim.documents.every(d => d.done) ? '' : 'disabled') + ' onclick="completeClaim(\'' + claim.id + '\')">Submit to Metropolitan</button>' +
        '<button class="btn btn-secondary" onclick="closeModal(\'claim-progress-modal\'); renderClaimInitiation();">Save &amp; Close</button></div>';
    container.innerHTML = html;
}

function toggleClaimDoc(claimId, i) {
    const list = getClaims();
    const c = list.find(x => x.id === claimId);
    if (!c) return;
    c.documents[i].done = !c.documents[i].done;
    saveClaims(list);
    renderClaimSteps(c);
    renderClaimChecklist(c);
}

function attachClaimFile(claimId, i) {
    const list = getClaims();
    const c = list.find(x => x.id === claimId);
    if (!c) return;
    c.documents[i].done = true;
    c.documents[i].attachedAt = new Date().toISOString();
    saveClaims(list);
    renderClaimSteps(c);
    renderClaimChecklist(c);
    syncClaimToVault(c, i);
    toast('Document captured for ' + c.documents[i].label);
}

function syncClaimToVault(claim, i) {
    const doc = document.createElement('input');
    doc.type = 'file';
    doc.accept = 'image/*,.pdf';
    doc.onchange = function () {
        const file = doc.files ? doc.files[0] : null;
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (ev) {
            const vault = getVault();
            vault.push({
                id: 'vault-' + Date.now(),
                claimId: claim.id,
                label: claim.documents[i].label,
                name: file.name,
                data: ev.target.result,
                addedAt: new Date().toISOString()
            });
            saveVault(vault);
            renderVault();
        };
        reader.readAsDataURL(file);
    };
    doc.click();
}

function completeClaim(claimId) {
    const list = getClaims();
    const c = list.find(x => x.id === claimId);
    if (!c) return;
    c.status = 'processing';
    c.submittedAt = new Date().toISOString();
    saveClaims(list);
    closeModal('claim-progress-modal');
    renderClaimInitiation();
    whatsappShare('Funeral claim for ' + c.deceased + ' is being submitted to Metropolitan Life (BOPEU cover).');
    toast(c.deceased + '\'s claim is now at Metropolitan Life.');
}

function openClaimDetail(id) {
    const claim = getClaims().find(c => c.id === id);
    if (!claim) return;
    const body = document.getElementById('benefitModalBody');
    document.getElementById('benefitModalTitle').textContent = 'Claim Details';
    const statusMap = { initiated: 'Initiated', ready: 'Ready to Submit', processing: 'At Metropolitan', paid: 'Paid Out' };
    body.innerHTML =
        '<h3 style="font-size:18px;color:var(--text-dark);margin-bottom:2px;">' + esc(claim.deceased) + '</h3>' +
        '<p style="font-size:16px;color:var(--text-muted);margin-bottom:10px;">' + esc(claim.relation) + ' &bull; ' + esc(claim.benefit) + '</p>' +
        '<div class="tag ' + (claim.status === 'paid' ? 'green' : 'blue') + '">' + (statusMap[claim.status] || claim.status) + '</div>' +
        '<div class="form-group" style="margin-top:10px;"><label class="form-label">Claim Reference</label><input value="' + esc(claim.id) + '" readonly></div>' +
        '<div class="form-group"><label class="form-label">Date of Death</label><input value="' + esc(claim.dateOfDeath || 'N/A') + '" readonly></div>' +
        '<div class="form-group"><label class="form-label">Claimant Notes</label><textarea id="claimNotes" placeholder="Add notes / follow-up info...">' + esc(claim.notes || '') + '</textarea></div>' +
        '<button class="btn btn-primary" onclick="saveClaimNotes(\'' + claim.id + '\')">Save Notes</button>' +
        '<button class="btn btn-secondary" style="margin-top:6px;" onclick="callMetropolitan()">Call Metropolitan Life</button>';
    openModal('benefit-modal');
}

function saveClaimNotes(id) {
    const list = getClaims();
    const c = list.find(x => x.id === id);
    if (!c) return;
    c.notes = (document.getElementById('claimNotes') || {}).value || '';
    saveClaims(list);
    closeModal('benefit-modal');
    toast('Notes saved for ' + c.deceased + '.');
    renderClaimInitiation();
}

function callMetropolitan() {
    toast('Metropolitan Life (Botswana): +267 390 2200');
    location.href = 'tel:+2673902200';
}

/* =====================================================
   2. OFFLINE DOCUMENT VAULT
   ===================================================== */
function getVault() {
    return LocalStore.get('bopeu_docs') || [];
}

function saveVault(list) {
    LocalStore.set('bopeu_docs', list);
}

function renderVault() {
    const container = document.getElementById('vaultList');
    if (!container) return;
    const docs = getVault();
    if (!docs.length) {
        container.innerHTML = '<div class="empty-state">Your document vault is empty. Documents attached to claims are stored here safely.</div>';
        return;
    }
    let html = '';
    docs.forEach(d => {
        html +=
            '<div class="member-card">' +
            '<div class="member-avatar">📎</div>' +
            '<div class="member-info">' +
            '<div class="member-name">' + esc(d.label) + '</div>' +
            '<div class="member-details">' + esc(d.name) + ' &bull; ' + new Date(d.addedAt).toLocaleDateString() + '</div>' +
            '<div class="member-tags">' +
            '<button class="btn btn-secondary btn-small" style="width:auto;" onclick="viewVaultDoc(\'' + d.id + '\')">View</button>' +
            '<button class="btn btn-secondary btn-small" style="width:auto;" onclick="deleteVaultDoc(\'' + d.id + '\')">Delete</button></div>' +
            '</div></div>';
    });
    container.innerHTML = html;
}

function viewVaultDoc(id) {
    const doc = getVault().find(d => d.id === id);
    if (!doc) return;
    const body = document.getElementById('benefitModalBody');
    document.getElementById('benefitModalTitle').textContent = 'Document Vault';
    body.innerHTML =
        '<h3 style="font-size:18px;color:var(--text-dark);margin-bottom:6px;">' + esc(doc.label) + '</h3>' +
        '<p style="font-size:16px;color:var(--text-muted);margin-bottom:10px;">' + esc(doc.name) + '</p>' +
        '<img src="' + doc.data + '" class="vault-preview" alt="' + esc(doc.label) + '"/>';
    openModal('benefit-modal');
}

function deleteVaultDoc(id) {
    const list = getVault().filter(d => d.id !== id);
    saveVault(list);
    renderVault();
    toast('Document removed from vault.');
}

function renderPdfLibrary() {
    const container = document.getElementById('pdfLibrary');
    if (!container || !window.BOPEU_PDF_FORMS || !BOPEU_PDF_FORMS.length) return;
    let html = '<div class="card" style="padding:0;border:0;box-shadow:none;background:transparent;">';
    BOPEU_PDF_FORMS.forEach(f => {
        html +=
            '<a class="form-launcher" href="' + f.file + '" download>' +
            '<span class="service-icon">📄</span>' +
            '<span style="flex:1;min-width:0;">' +
            '<div class="fl-title">' + esc(f.name) + '</div>' +
            '<div class="fl-desc">' + esc(f.disc) + ' &bull; PDF</div>' +
            '</span>' +
            '</a>';
    });
    html += '</div>';
    container.innerHTML = html;
}

/* =====================================================
   3. CLAIM CHECKLIST (static support page)
   ===================================================== */
function renderClaimChecklistSupport() {
    const container = document.getElementById('claimChecklistSupport');
    if (!container) return;
    container.innerHTML =
        '<div class="card"><div class="card-header">How Claims Work (Metropolitan)</div>' +
        '<div class="checklist-item"><span class="chk-num">1</span>Report death within 6 months of occurrence</div>' +
        '<div class="checklist-item"><span class="chk-num">2</span>Gather the required documents</div>' +
        '<div class="checklist-item"><span class="chk-num">3</span>Use the managed funeral experience</div>' +
        '<div class="checklist-item"><span class="chk-num">4</span>Funds are settled to your nominated bank</div>' +
        '<p style="font-size:13px;color:var(--text-muted);margin-top:8px;">Documents valid up to 12 months. Minimal red tape — easy to claim.</p></div>';
}

document.addEventListener('DOMContentLoaded', () => {
    renderClaimInitiation();
    renderVault();
    renderPdfLibrary();
    renderClaimChecklistSupport();
});