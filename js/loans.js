/* =====================================================
   1. SMART FORM ENGINE (3-step) + APPLICATION TRACKER
   Types: membership, bursary, building, funeral, loan,
          access (Access Bank), grievance
   ===================================================== */
const BPF = {
    current: null,
    step: 0,
    type: null,
    data: {}
};

function getApplications() {
    return LocalStore.get('bopeu_applications') || [];
}

function saveApplications(list) {
    LocalStore.set('bopeu_applications', list);
}

function openForm(type) {
    BPF.type = type;
    BPF.step = 0;
    BPF.data = {};
    renderFormStep(type);
    openModal('form-modal');
}

function renderFormStep(type) {
    const title = document.getElementById('formTitle');
    const head = document.getElementById('formHeader');
    const body = document.getElementById('formBody');
    const backBtn = document.getElementById('formBack');
    const nextBtn = document.getElementById('formNext');

    const meta = formMeta(type);
    title.textContent = meta.title;

    head.innerHTML =
        '<div class="stepper-head">' +
        [0, 1, 2].map(i => '<span class="step-dot ' + (i < BPF.step ? 'done' : i === BPF.step ? 'current' : '') + '"></span>').join('') +
        '</div>' +
        '<div class="stepper-title">' + meta.steps[BPF.step] + '</div>' +
        '<div class="stepper-sub">' + meta.subs[BPF.step] + '</div>';

    backBtn.style.visibility = BPF.step === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = BPF.step == 2 ? meta.submitLabel || 'Submit Application' : 'Continue';

    body.innerHTML = formStepHtml(type, BPF.step);
    bindFormStep(type, BPF.step);
}

function formMeta(type) {
    const map = {
        membership: { title: 'New Membership Registration', steps: ['Personal KYC', 'Employment', 'Union Forms'], subs: ['Your identity information.', 'Sector, employer and job title.', 'Declarations & office routing.'], submitLabel: 'Submit Registration' },
        bursary: { title: 'Educational Bursary Scheme', steps: ['Eligibility & Institution', 'Financial Details', 'Uploads & Submit'], subs: ['6-month membership check + course details.', 'Amount, repayment plan and estimated monthly payment.', 'Required documents and submission office.'], submitLabel: 'Submit Bursary Application' },
        building: { title: 'Building Materials Scheme', steps: ['Project & Materials', 'Financial Calculator', 'Uploads & Submit'], subs: ['Archein Hardware partnership.', '4% monthly interest on a reduced balance.', 'Required documents and delivery details.'], submitLabel: 'Submit Building Application' },
        funeral: { title: 'BOPEU Funeral Cover', steps: ['Basic Salary & Member', 'Family on Cover', 'Beneficiary & Submit'], subs: ['1% subscription auto-calculated.', 'Add spouse, children and extended family.', 'Nominate your beneficiary.'], submitLabel: 'Submit Funeral Cover' },
        loan: { title: 'BOPEU Direct / Babereki Loans', steps: ['Loan Type & Amount', 'Repayment Plan', 'Documents & Submit'], subs: ['Quick, Emergency or Ordinary loan.', 'Term, and estimated monthly repayment.', 'Checklist and disbursement details.'], submitLabel: 'Submit Loan Application' },
        access: { title: 'Access Bank Partnership', steps: ['Loan Type', 'Amount & Term', 'Application Route'], subs: ['Personal, Vehicle or Mortgage.', 'Choose amount and term.', 'WhatsApp payslip or contact details.'], submitLabel: 'Proceed via WhatsApp' },
        grievance: { title: 'Contact / Grievance', steps: ['Service Interest', 'Issue Details', 'Submit'], subs: ['Which BOPEU service do you need?', 'Describe the issue and urgency.', 'Choose your office and submit.'], submitLabel: 'Submit Request' }
    };
    return map[type] || map.bursary;
}

/* ---------------- Step HTML ---------------- */
function formStepHtml(type, step) {
    switch (type) {
        case 'bursary': return bursaryStep(step);
        case 'building': return buildingStep(step);
        case 'funeral': return funeralStep(step);
        case 'loan': return loanStep(step);
        case 'access': return accessStep(step);
        case 'grievance': return grievanceStep(step);
        case 'membership': return membershipStep(step);
        default: return '<p class="stepper-sub">Select a form to begin.</p>';
    }
}

function checkSixMonths() {
    const months = memberMonths();
    const pass = months >= 6;
    return '<div class="eligibility-box ' + (pass ? 'pass' : 'fail') + '">' +
        (pass ? '✓ Eligible — you have ' + months + ' months of active membership (min. 6 required).' : '✗ Not yet — you have ' + months + ' months of membership. 6 months required for this scheme.') +
        '</div>';
}

function officeSelectHtml(selectedId) {
    let html = '<div class="form-group"><label class="form-label">Submit to Nearest Office</label><select id="fOffice">';
    BOPEU_OFFICES.forEach(o => {
        const sel = (selectedId && selectedId === o.id) ? ' selected' : '';
        html += '<option value="' + o.id + '"' + sel + '>' + esc(o.name) + ' — ' + esc(o.phone) + '</option>';
    });
    html += '</select></div>';
    return html;
}

/* Bursary */
function bursaryStep(step) {
    if (step === 0) {
        return checkSixMonths() +
            '<div class="form-group"><label class="form-label">Institution Name</label><input type="text" id="fInstitution" placeholder="e.g. University of Botswana"></div>' +
            '<div class="form-group"><label class="form-label">Course Name</label><input type="text" id="fCourse" placeholder="e.g. BSc Nursing"></div>' +
            '<div class="form-group"><label class="form-label">Course Duration</label><select id="fDuration"><option>Short (under 1 year)</option><option>Long (1 year or more)</option></select></div>' +
            '<div class="form-group"><label class="form-label">What do you need?</label><div class="doc-check-group">' +
            ['Tuition', 'Accommodation', 'Educational Books & Materials', 'Academic Research Costs']
                .map(x => '<div class="checklist-item"><input type="checkbox" class="fNeed" value="' + x + '"><label>' + x + '</label></div>').join('') +
            '</div></div>';
    }
    if (step === 1) {
        const amount = parseFloat(BPF.data.bursaryAmount) || 30000;
        const months = parseFloat(BPF.data.bursaryMonths) || 24;
        const monthly = (amount / Math.max(1, months)).toFixed(2);
        return '<div class="form-group"><label class="form-label">Amount Requested (max P 30,000)</label><input type="number" id="fAmount" min="0" max="30000" value="' + amount + '"></div>' +
            '<div class="form-group"><label class="form-label">Repayment Period</label><div class="slider-label"><span>Months</span><span id="fMonthsLbl">' + months + '</span></div>' +
            '<input type="range" id="fMonths" min="1" max="24" value="' + months + '"></div>' +
            '<div class="stat-box"><div class="stat-label">Estimated Monthly Payment (0% interest)</div><div class="stat-value">P ' + monthly + '</div></div>' +
            '<div class="checklist-item"><input type="checkbox" id="fRepayDeclare"><label for="fRepayDeclare">I declare that I am able to repay within 24 months.</label></div>';
    }
    if (step === 2) {
        return uploadDocs(['Certified Omang', 'Most recent Payslip', 'Official Admission Letter', 'Quotation / Invoice from Institution']) + officeSelectHtml() +
            '<div class="checklist-item"><input type="checkbox" id="fDeclare"><label for="fDeclare">I confirm all provided information is true and correct.</label></div>';
    }
    return '';
}

function uploadDocs(items) {
    let html = '<div class="form-group"><label class="form-label">Required Documents</label><div class="doc-check-group">';
    items.forEach(i => {
        html += '<div class="checklist-item"><input type="checkbox" class="doc-check"><label>' + esc(i) + '</label></div>';
    });
    html += '</div></div>';
    html += '<div class="form-group"><label class="form-label">Attach a document</label><div class="filter-row"><input type="file" accept="image/*,.pdf"><span class="upload-hint">Camera / gallery / PDF accepted</span></div></div>';
    return html;
}

/* Building */
function buildingStep(step) {
    if (step === 0) {
        return '<div class="alert alert-info">BOPEU &amp; Archein Hardware: subsidised building materials, no deposit, nationwide delivery.</div>' +
            '<div class="form-group"><label class="form-label">Project Location (Village / Town for delivery)</label><input type="text" id="fProjectLocation" placeholder="e.g. Phakalane"></div>' +
            '<div class="form-group"><label class="form-label">Materials List</label><textarea id="fMaterials" placeholder="e.g. 200 bags of cement, 5000 bricks, roof sheets..."></textarea></div>';
    }
    if (step === 1) {
        const amount = parseFloat(BPF.data.buildAmount) || 145000;
        const months = parseInt(BPF.data.buildMonths, 10) || 36;
        const monthly = pmt(0.04, months, amount);
        const freeDel = amount > 100000;
        return '<div class="form-group"><label class="form-label">Credit Amount Requested</label><div class="slider-label"><span>P ' + amount.toLocaleString() + '</span></div>' +
            '<input type="range" id="fBuildAmount" min="10000" max="200000" step="5000" value="' + amount + '"></div>' +
            '<div class="form-group"><label class="form-label">Repayment Period</label><select id="fBuildMonths">' +
            [12, 24, 36].map(m => '<option value="' + m + '"' + (months === m ? ' selected' : '') + '>' + m + ' months</option>').join('') +
            '</select></div>' +
            (freeDel ? '<div class="alert alert-success">✓ FREE nationwide delivery (value above P 100,000)</div>' : '<div class="alert alert-warning">Delivery added for values under P 100,000</div>') +
            '<div class="stat-box"><div class="stat-label">Estimated Monthly Payment (4% on reduced balance)</div><div class="stat-value">P ' + monthly.toFixed(2) + '</div></div>' +
            '<p style="font-size:10px;color:var(--text-muted);">P 145,000 over 36 months = P 7,668.60 as illustrated on the BOPEU website.</p>';
    }
    if (step === 2) {
        return uploadDocs(['Certified Omang', 'Most recent Payslip', 'Confirmation of Employment Letter']) + officeSelectHtml() +
            '<div class="alert alert-info">Contact 316 2335 or WhatsApp 74906982 for assistance.</div>' +
            '<div class="checklist-item"><input type="checkbox" id="fDeclare"><label for="fDeclare">I confirm all provided information is true and correct.</label></div>';
    }
    return '';
}

/* Funeral */
function funeralStep(step) {
    if (step === 0) {
        return '<div class="alert alert-info">Underwritten by Metropolitan Life. Minimal red tape — easy to claim, quick settlement, no medical tests.</div>' +
            '<div class="form-group"><label class="form-label">Basic Salary (Pula)</label><input type="number" id="fBasicSalary" placeholder="e.g. 4500" value="' + ((BPF.data.basicSalary) || '') + '"></div>' +
            '<div class="stat-box"><div class="stat-label">Your monthly subscription (1% capped P39.90 - P100)</div><div class="stat-value" id="fSubLbl">P 39.90</div></div>' +
            '<div class="card-sub">Core benefit: P 60,000 — compulsory cover for member, spouse and children under 21. Includes 12-month premium waiver.</div>';
    }
    if (step === 1) {
        const list = (BPF.data.funeralFamily || []).map(f => f).join(',');
        let html = '<div class="form-group"><label class="form-label">Add Covered Family</label><div class="filter-row"><select id="fFamRelation"><option value="Spouse">Spouse</option><option value="Child">Child (under 21)</option><option value="Parent / Extended">Parent / Extended</option></select></div>' +
            '<div class="filter-row"><input type="text" id="fFamName" placeholder="Full name"></div>' +
            '<div class="filter-row"><input type="date" id="fFamDob"></div>' +
            '<button type="button" class="btn btn-secondary btn-small" onclick="addFamilyToForm()">Add to Cover</button></div>';
        html += '<div class="card-sub">Covered so far: ' + (list || 'none') + '</div>';
        html += '<div class="card"><div class="card-header">Benefit Structure</div><table class="benefit-table">' +
            '<tr><th>Age Group</th><th>Benefit</th></tr>' +
            '<tr><td>Main Member / Spouse / Parent</td><td>P 60,000</td></tr>' +
            '<tr><td>16 - 21 Years</td><td>P 60,000</td></tr>' +
            '<tr><td>7 - 15 Years</td><td>P 30,000</td></tr>' +
            '<tr><td>0 - 6 Years</td><td>P 15,000</td></tr></table></div>';
        return html;
    }
    if (step === 2) {
        return '<div class="form-group"><label class="form-label">Claim Beneficiary Name</label><input type="text" id="fBenName"></div>' +
            '<div class="form-group"><label class="form-label">Relationship to Member</label><select id="fBenRel"><option>Spouse</option><option>Child</option><option>Parent</option><option>Other</option></select></div>' +
            uploadDocs(['Death Certificate (for claims)', 'Claimant ID', 'Bank Details']) + officeSelectHtml() +
            '<div class="checklist-item"><input type="checkbox" id="fDeclare"><label for="fDeclare">I consent to 1% payroll deduction for funeral cover.</label></div>';
    }
    return '';
}

function addFamilyToForm() {
    const name = document.getElementById('fFamName').value.trim();
    const relation = document.getElementById('fFamRelation').value;
    const dob = document.getElementById('fFamDob').value;
    if (!name) { toast('Please enter the family member\'s name.'); return; }
    BPF.data.funeralFamily = BPF.data.funeralFamily || [];
    if (relation === 'Child') {
        const br = childBracketFromDob(dob);
        if (!br) { toast('Children on the cover must be under 21 years.'); return; }
        BPF.data.funeralFamily.push(name + ' (' + br.key + ' - ' + br.cover + ')');
    } else {
        BPF.data.funeralFamily.push(name + ' (' + relation + ' - P 60,000)');
    }
    renderFormStep('funeral', BPF.step);
}

/* Loans */
function loanStep(step) {
    if (step === 0) {
        return checkSixMonths() +
            '<div class="card"><div class="card-header">BOPEU Direct / Babereki SACCOS In-House</div>' +
            '<table class="benefit-table"><tr><th>Loan</th><th>Amount</th><th>Term</th><th>Turnaround</th></tr>' +
            '<tr><td>Quick</td><td>P 500 - 5,000</td><td>up to 6 mo</td><td>48 hours</td></tr>' +
            '<tr><td>Emergency</td><td>P 2,001 - 20,000</td><td>up to 24 mo</td><td>48 hours</td></tr>' +
            '<tr><td>Ordinary</td><td>P 1,000 - 250,000</td><td>savings 1:2</td><td>7 days</td></tr></table></div>' +
            '<div class="form-group"><label class="form-label">Loan Type</label><select id="fLoanType" onchange="onLoanTypeChange()">' +
            '<option value="quick" ' + (BPF.data.loanType === 'quick' ? 'selected' : '') + '>Quick Loan (P500 - P5,000 / 6 months)</option>' +
            '<option value="emergency" ' + (BPF.data.loanType === 'emergency' ? 'selected' : '') + '>Emergency Loan (P2,001 - P20,000 / 24 months)</option>' +
            '<option value="ordinary" ' + (BPF.data.loanType === 'ordinary' ? 'selected' : '') + '>Ordinary Loan (P1,000 - P250,000)</option>' +
            '</select></div>' +
            '<div class="form-group"><label class="form-label">Amount</label><input type="number" id="fLoanAmount" min="500" placeholder="e.g. 5000" value="' + (BPF.data.loanAmount || '') + '"></div>' +
            '<div class="form-group"><label class="form-label">Savings Balance (Ordinary only - ratio 1:2)</label><input type="number" id="fSavings" placeholder="e.g. 20000"></div>';
    }
    if (step === 1) {
        const amount = parseFloat(BPF.data.loanAmount) || 5000;
        const months = parseInt(BPF.data.loanMonths, 10) || 6;
        const rate = BPF.data.loanType === 'quick' ? 0 : BPF.data.loanType === 'emergency' ? 0.06 : 0.08;
        const monthlyInst = rate > 0 ? pmt(rate / 12, months, amount) : amount / Math.max(1, months);
        return '<div class="form-group"><label class="form-label">Repayment Term</label><div class="slider-label"><span>Months</span><span id="fLoanMonthsLbl">' + months + '</span></div>' +
            '<input type="range" id="fLoanMonths" min="1" max="24" value="' + months + '"></div>' +
            '<div class="stat-box"><div class="stat-label">Estimated Monthly Repayment</div><div class="stat-value">P ' + monthlyInst.toFixed(2) + '</div></div>' +
            '<p style="font-size:10px;color:var(--text-muted);">Borrowing more than you can afford can lead to severe financial difficulties.</p>';
    }
    if (step === 2) {
        return '<div class="card"><div class="card-header">Required Documents Checklist</div>' +
            '<div class="doc-check-group">' +
            ['Completed Loan Form (e-sign)', '1 month recent bank statement', 'Recent salary payslip', 'Omang Identity Document', 'Confirmation of employment letter', 'Marriage certificate & spouse ID (if married)']
                .map(x => '<div class="checklist-item"><input type="checkbox" class="doc-check"><label>' + x + '</label></div>').join('') +
            '</div></div>' +
            '<div class="form-group"><label class="form-label">Disbursement Bank</label><select id="fBank"><option>First National Bank (FNB)</option><option>Stanbic Bank Botswana</option><option>ABSA Bank</option><option>Other</option></select></div>' +
            '<div class="form-group"><label class="form-label">Badge / Account No.</label><input type="text" id="fAccount"></div>' +
            officeSelectHtml() +
            '<div class="alert alert-info">Email: communications@babereki.co.bw | Contact: 267 392 2526 / 267 316 2335</div>' +
            '<div class="checklist-item"><input type="checkbox" id="fDeclare"><label for="fDeclare">I accept the loan terms and payroll stop-order.</label></div>';
    }
    return '';
}

function onLoanTypeChange() {
    BPF.data.loanType = document.getElementById('fLoanType').value;
}

/* Access Bank */
function accessStep(step) {
    if (step === 0) {
        return '<div class="alert alert-info">Access Bank partnership — revised lending scheme effective 1 March 2026.</div>' +
            '<div class="card"><table class="benefit-table"><tr><th>Facility</th><th>Range</th><th>Term</th></tr>' +
            '<tr><td>Personal Loans</td><td>P10,000 - P700,000</td><td>up to 96 months</td></tr>' +
            '<tr><td>Vehicle Loans</td><td>P10,000 - P1,200,000</td><td>up to 72 months</td></tr>' +
            '<tr><td>Mortgage Loans</td><td>P100,000 - P3,000,000</td><td>up to 360 months</td></tr></table></div>' +
            '<div class="form-group"><label class="form-label">Loan Type</label><select id="fAccessType">' +
            '<option>Personal Loan</option><option>Vehicle Loan</option><option>Mortgage Loan</option></select></div>';
    }
    if (step === 1) {
        return '<div class="form-group"><label class="form-label">Amount</label><input type="number" id="fAccessAmount" placeholder="e.g. 200000"></div>' +
            '<div class="form-group"><label class="form-label">Term (months)</label><select id="fAccessTerm">' +
            [12, 24, 36, 48, 60, 72, 96, 120, 240, 360].map(m => '<option>' + m + '</option>').join('') + '</select></div>';
    }
    if (step === 2) {
        return '<div class="alert alert-info">Send the word <strong>"payslip"</strong> via WhatsApp to continue your Access Bank application.</div>' +
            '<div class="call-bar"><button class="btn btn-success" onclick="openAccessWhatsapp()">WhatsApp "payslip"</button></div>' +
            '<p style="font-size:10px;color:var(--text-muted);text-align:center;">+267 75 750 701 / +267 73 240 284</p>' +
            '<div class="form-group" style="margin-top:10px;"><label class="form-label">Or visit any Access Bank branch</label><input type="text" placeholder="Nearest branch name"></div>';
    }
    return '';
}

function openAccessWhatsapp() {
    const url = 'https://wa.me/' + BOPEU_CONTACTS.accessWhatsapp1 + '?text=' + encodeURIComponent('payslip');
    window.open(url, '_blank');
}

/* Grievance */
function grievanceStep(step) {
    if (step === 0) {
        return '<div class="form-group"><label class="form-label">Service Interest</label><select id="fServiceInterest">' +
            ['Insurance', 'SACCOS', 'Babereki Investments', 'BLIC', 'Legal Representation', 'Dispute Resolution', 'Collective Bargaining', 'Organizing Members']
                .map(x => '<option>' + x + '</option>').join('') + '</select></div>' +
            '<div class="form-group"><label class="form-label">Issue Type</label><select id="fIssueType">' +
            ['Workplace dispute', 'Disciplinary hearing', 'Show Cause Letter', 'Salary issue', 'Other']
                .map(x => '<option>' + x + '</option>').join('') + '</select></div>' +
            '<div class="filter-row"><select id="fUrgency"><option value="low">Urgency: Low</option><option value="medium">Urgency: Medium</option><option value="high">Urgency: High</option></select></div>';
    }
    if (step === 1) {
        return '<div class="form-group"><label class="form-label">Description</label><textarea id="fDescription" placeholder="Describe the issue in detail..."></textarea></div>' +
            uploadDocs(['Supporting documents (optional)']);
    }
    if (step === 2) {
        return officeSelectHtml() +
            '<div class="alert alert-info">Our operators are ready to assist. Office hours: Mon-Fri 08:00-17:00 CAT.</div>' +
            '<div class="checklist-item"><input type="checkbox" id="fDeclare"><label for="fDeclare">I confirm the information provided is accurate.</label></div>';
    }
    return '';
}

/* Membership (opens onboarding wizard) */
function membershipStep(step) {
    return '<div class="onboarding-step"><h3>Member Registration</h3>' +
        '<p class="stepper-sub">Complete the 3-step registration wizard to create your BOPEU member profile.</p>' +
        '<div class="stat-chips"><span class="stat-chip">?<small>3 Steps</small></span><span class="stat-chip">✓<small>KYC + Employment + Forms</small></span></div>' +
        '</div>';
}

/* ---------------- Navigation & collection ---------------- */
function bindFormStep(type, step) {
    if (type === 'bursary' && step === 1) {
        const amount = document.getElementById('fAmount');
        const months = document.getElementById('fMonths');
        const lbl = document.getElementById('fMonthsLbl');
        if (amount) amount.addEventListener('input', onBursaryCalc);
        if (months) months.addEventListener('input', onBursaryCalc);
        if (months && lbl) lbl.textContent = months.value;
        onBursaryCalc();
    }
    if (type === 'building' && step === 1) {
        const amount = document.getElementById('fBuildAmount');
        const months = document.getElementById('fBuildMonths');
        if (amount) amount.addEventListener('input', onBuildCalc);
        if (months) months.addEventListener('change', onBuildCalc);
        onBuildCalc();
    }
    if (type === 'funeral' && step === 0) {
        const sal = document.getElementById('fBasicSalary');
        if (sal) sal.addEventListener('input', onFuneralCalc);
        onFuneralCalc();
    }
    if (type === 'loan' && step === 1) {
        const months = document.getElementById('fLoanMonths');
        const lbl = document.getElementById('fLoanMonthsLbl');
        if (months) months.addEventListener('input', onLoanCalc);
        if (months && lbl) lbl.textContent = months.value;
        onLoanCalc();
    }
}

function onBursaryCalc() {
    const a = parseFloat((document.getElementById('fAmount') || {}).value) || 0;
    const m = parseInt((document.getElementById('fMonths') || {}).value, 10) || 24;
    const lbl = document.getElementById('fMonthsLbl');
    if (lbl) lbl.textContent = m;
    if (a > 30000) toast('Bursary maximum is P 30,000.');
    const stat = document.querySelector('#formBody .stat-box .stat-value');
    if (stat) stat.textContent = 'P ' + (a / m).toFixed(2);
}

function onBuildCalc() {
    const a = parseFloat((document.getElementById('fBuildAmount') || {}).value) || 0;
    const m = parseInt((document.getElementById('fBuildMonths') || {}).value, 10) || 36;
    document.querySelectorAll('#formBody .slider-label span').forEach(s => { if (s.textContent.indexOf('P') === 0) s.textContent = 'P ' + a.toLocaleString(); });
    const stat = document.querySelector('#formBody .stat-box .stat-value');
    if (stat) stat.textContent = 'P ' + pmt(0.04, m, a).toFixed(2);
}

function onFuneralCalc() {
    const s = parseFloat((document.getElementById('fBasicSalary') || {}).value) || 0;
    const lbl = document.getElementById('fSubLbl');
    if (lbl) lbl.textContent = 'P ' + funeralSubscription(s).toFixed(2);
}

function onLoanCalc() {
    const a = parseFloat((document.getElementById('fLoanAmount') || {}).value) || 0;
    const m = parseInt((document.getElementById('fLoanMonths') || {}).value, 10) || 6;
    const lbl = document.getElementById('fLoanMonthsLbl');
    if (lbl) lbl.textContent = m;
    const type = BPF.data.loanType || 'quick';
    const rate = type === 'emergency' ? 0.06 : type === 'ordinary' ? 0.08 : 0;
    const inst = rate > 0 ? pmt(rate / 12, m, a) : a / Math.max(1, m);
    const stat = document.querySelector('#formBody .stat-box .stat-value');
    if (stat) stat.textContent = 'P ' + inst.toFixed(2);
}

function collectFormStep(type, step) {
    if (type === 'bursary' && step === 0) {
        BPF.data.institution = (document.getElementById('fInstitution') || {}).value;
        BPF.data.course = (document.getElementById('fCourse') || {}).value;
        BPF.data.needs = Array.from(document.querySelectorAll('.fNeed:checked')).map(c => c.value);
    }
    if ((type === 'bursary' || type === 'building') && step === 1) {
        if (type === 'bursary') {
            BPF.data.bursaryAmount = (document.getElementById('fAmount') || {}).value;
            BPF.data.bursaryMonths = (document.getElementById('fMonths') || {}).value;
        } else {
            BPF.data.buildAmount = (document.getElementById('fBuildAmount') || {}).value;
            BPF.data.buildMonths = (document.getElementById('fBuildMonths') || {}).value;
            BPF.data.projectLocation = (document.getElementById('fProjectLocation') || {}).value;
            BPF.data.materials = (document.getElementById('fMaterials') || {}).value;
        }
    }
    if (type === 'funeral' && step === 0) BPF.data.basicSalary = (document.getElementById('fBasicSalary') || {}).value;
    if (type === 'loan' && step === 0) {
        BPF.data.loanType = (document.getElementById('fLoanType') || {}).value;
        BPF.data.loanAmount = (document.getElementById('fLoanAmount') || {}).value;
        BPF.data.savings = (document.getElementById('fSavings') || {}).value;
    }
    if (type === 'loan' && step === 1) BPF.data.loanMonths = (document.getElementById('fLoanMonths') || {}).value;
}

function validateFormStep(type, step) {
    if (type === 'bursary' && step === 1) {
        const amount = parseFloat(BPF.data.bursaryAmount) || 0;
        if (amount > 30000) { toast('Bursary maximum is P 30,000.'); return false; }
        const rp = (document.getElementById('fRepayDeclare') || {}).checked;
        if (!rp) { toast('Please confirm your ability to repay.'); return false; }
    }
    if (type === 'funeral' && step === 0) {
        const s = parseFloat(BPF.data.basicSalary) || 0;
        if (s <= 0) { toast('Please enter your basic salary.'); return false; }
    }
    if (type === 'grievance' && step === 1) {
        const d = (document.getElementById('fDescription') || {}).value;
        if (!d) { toast('Please describe the issue.'); return false; }
    }
    if (type === 'access' && step === 2) return true;
    return true;
}

function formBack() {
    if (BPF.step === 0) { closeModal('form-modal'); return; }
    collectFormStep(BPF.type, BPF.step);
    BPF.step -= 1;
    renderFormStep(BPF.type);
}

function formNext() {
    collectFormStep(BPF.type, BPF.step);
    if (!validateFormStep(BPF.type, BPF.step)) return;
    if (BPF.step === 2) {
        submitApplication(BPF.type);
        return;
    }
    BPF.step += 1;
    renderFormStep(BPF.type);
}

function submitApplication(type) {
    if (type === 'membership') {
        closeModal('form-modal');
        openOnboarding();
        return;
    }
    if (type === 'access') {
        closeModal('form-modal');
        openAccessWhatsapp();
        toast('Access Bank application started. Send "payslip" on WhatsApp to continue.');
        return;
    }
    const office = document.getElementById('fOffice');
    const officeId = office ? office.value : 'gaborone';
    const officeName = (BOPEU_OFFICES.find(o => o.id === officeId) || {}).name || 'Gaborone';

    let label = type;
    const labels = { bursary: 'Educational Bursary', building: 'Building Materials', funeral: 'BOPEU Funeral Cover', loan: 'BOPEU Direct Loan', grievance: 'Grievance / Support' };
    label = labels[type] || type;

    const app = {
        id: (label.slice(0, 3).toUpperCase()) + '-' + Date.now(),
        type: type,
        label: label,
        officeId: officeId,
        officeName: officeName,
        status: 'submitted',
        data: { ...BPF.data },
        submittedAt: new Date().toISOString(),
        timeline: [{ status: 'submitted', label: 'Submitted', date: new Date().toISOString() }]
    };

    const list = getApplications();
    list.unshift(app);
    saveApplications(list);

    closeModal('form-modal');
    renderApplications();
    toast('Application submitted!\nRef: ' + app.id + '\nStatus: Submitted to ' + officeName + ' office.');
    whatsappShare('New ' + label + ' application ' + app.id + ' submitted by BOPEU member.');
}

/* =====================================================
   2. PMT - 4% monthly on reduced balance (building)
   ===================================================== */
function pmt(rate, nper, pv) {
    if (!pv || pv <= 0) return 0;
    if (!rate) return pv / nper;
    const pow = Math.pow(1 + rate, nper);
    return (pv * rate * pow) / (pow - 1);
}

/* =====================================================
   3. APPLICATION TRACKER
   ===================================================== */
function renderApplications() {
    const container = document.getElementById('trackerList');
    if (!container) return;
    const apps = getApplications();
    if (!apps.length) {
        container.innerHTML = '<div class="empty-state">No applications yet. Submit a form from the list above to track it here.</div>';
        return;
    }
    let html = '';
    apps.forEach(app => {
        const statusMap = { submitted: 'Submitted', verified: 'Verified', office_review: 'At Office', approved: 'Approved', disbursed: 'Disbursed', rejected: 'Rejected' };
        const statusLabel = statusMap[app.status] || app.status;
        const statusClass = app.status === 'approved' || app.status === 'disbursed' ? 'green' : app.status === 'submitted' ? 'blue' : 'amber';
        html +=
            '<div class="member-card">' +
            '<div class="member-avatar">' + initialsOf(app.label) + '</div>' +
            '<div class="member-info">' +
            '<div class="member-name">' + esc(app.label) + ' <span class="tag ' + statusClass + '">' + statusLabel + '</span></div>' +
            '<div class="member-details">Ref ' + esc(app.id) + ' &bull; ' + esc(app.officeName) + ' &bull; ' + new Date(app.submittedAt).toLocaleDateString() + '</div>' +
            '<div class="member-tags"><button class="btn btn-secondary btn-small" onclick="openAppDetail(\'' + app.id + '\')" style="width:auto;">View Timeline</button>' +
            '<button class="btn btn-secondary btn-small" onclick="callOffice(\'' + app.officeId + '\')" style="width:auto;">Call Office</button></div>' +
            '</div></div>';
    });
    container.innerHTML = html;
}

function openAppDetail(id) {
    const app = getApplications().find(a => a.id === id);
    if (!app) return;
    const body = document.getElementById('benefitModalBody');
    const steps = [
        { key: 'submitted', label: 'Submitted' },
        { key: 'verified', label: 'Verified' },
        { key: 'office_review', label: 'At Office / Review' },
        { key: 'approved', label: 'Approved' },
        { key: 'disbursed', label: 'Disbursed' }
    ];
    const reached = ['submitted', 'verified', 'office_review', 'approved', 'disbursed'].indexOf(app.status);
    let html = '<h3 style="font-size:15px;color:var(--text-dark);margin-bottom:2px;">' + esc(app.label) + '</h3>' +
        '<p style="font-size:11px;color:var(--text-muted);margin-bottom:10px;">Ref ' + esc(app.id) + ' &bull; ' + esc(app.officeName) + '</p>';
    steps.forEach((s, i) => {
        const active = i <= reached && app.status !== 'rejected';
        const isBreak = app.status === 'rejected' && i === reached + 1;
        html += '<div class="tracker-step">' +
            '<div class="tracker-dot ' + ((active && !isBreak) ? 'active' : '') + '">' + (active && !isBreak ? '✓' : i + 1) + '</div>' +
            '<div class="ts-info"><div class="ts-label">' + s.label + '</div>' +
            '<div class="ts-date">' + (i === 0 ? new Date(app.submittedAt).toLocaleString() : (active ? 'In progress' : 'Pending')) + '</div></div></div>';
    });
    if (app.status === 'rejected') {
        html += '<div class="alert alert-warning">This application was not successful. Contact your office for details.</div>';
    }
    html += '<button class="btn btn-primary" style="margin-top:10px;" onclick="callOffice(\'' + app.officeId + '\')">Call Office</button>';
    document.getElementById('benefitModalTitle').textContent = 'Application Tracker';
    body.innerHTML = html;
    openModal('benefit-modal');
}

function callOffice(officeId) {
    const office = BOPEU_OFFICES.find(o => o.id === officeId);
    if (office) location.href = 'tel:+' + office.tel;
}

document.addEventListener('DOMContentLoaded', () => {
    renderApplications();
});