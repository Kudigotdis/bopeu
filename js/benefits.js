/* =====================================================
   1. BENEFIT SERVICES (9) - render + detail modals
   ===================================================== */
window.BOPEU_SERVICES = [
    {
        id: "bursary", title: "Educational Bursaries",
        desc: "Interest-free financial assistance for academic advancement and skills development.",
        chips: ["0% Interest", "24 Months", "P 30,000 Max"],
        what: "The BOPEU Educational Bursary supports members who are furthering their studies through short or long-term courses. It is designed to remove financial pressure so members can focus on academic advancement and skills development.",
        covers: [
            "Tuition and registration fees for approved courses",
            "Accommodation directly linked to study",
            "Books, learning materials and academic research costs"
        ],
        who: "Registered, active BOPEU members who have subscribed consistently for at least 6 months and can repay within 24 months. The course and costs must be approved by BOPEU.",
        access: "Request the application form from info@bopeu.org.bw, complete it and submit it with the required documents to BOPEU for assessment.",
        docs: "Certified Omang, latest payslip, official admission letter, and a valid quotation or invoice for the study costs.",
        note: "Approval is subject to the current bursary policy, available funds and affordability. Interest-free means the approved amount is still repayable."
    },
    {
        id: "lifestyle", title: "Lifestyle Discounts",
        desc: "Exclusive member-only savings on shopping, travel and accommodation.",
        chips: ["Retail & Hotels", "Partner Network", "Present Card"],
        what: "BOPEU's lifestyle programme gives members access to negotiated discounts at selected retailers and hotels. The partner network covers shopping, travel and accommodation offers, with new partners added as agreements are confirmed.",
        covers: [
            "Member-only shopping discounts at participating retailers",
            "Special rates on selected hotel and accommodation bookings",
            "Travel and lifestyle offers negotiated for BOPEU members"
        ],
        who: "All active BOPEU members holding a valid digital or physical membership card.",
        access: "Check the Partner Benefits Network on this page, then present your valid BOPEU membership card at the participating outlet before paying. Confirm the offer with the partner when booking or at the till.",
        docs: "No documents are required. Your valid BOPEU membership card is enough.",
        note: "Offers vary by partner and may have date, branch or booking restrictions. Always confirm the current discount before committing."
    },
    {
        id: "utilities", title: "Utilities (Airtime & Building)",
        desc: "Flexible airtime and subsidised building material schemes to stay connected and build.",
        chips: ["Airtime Scheme", "Archein Hardware", "No Deposit"],
        what: "BOPEU's utilities programme helps members stay connected and improve their homes through flexible airtime and building-material schemes. The Archein Hardware partnership provides subsidised building materials with no deposit and nationwide delivery.",
        covers: [
            "Flexible airtime payment arrangements through the BOPEU scheme",
            "Subsidised building materials through Archein Hardware",
            "Material credit up to P 200,000, repaid over up to 36 months"
        ],
        who: "Active BOPEU members in good standing. Building-material credit is subject to affordability and approval.",
        access: "Contact BOPEU for the current airtime application route. For building materials, request an Archein Hardware quotation and submit the BOPEU application with your supporting documents.",
        docs: "Certified Omang, latest payslip, confirmation of employment and the Archein Hardware quotation for building materials.",
        note: "Building-material credit carries 4% monthly interest on the reducing balance and is subject to approval. Confirm current rates and delivery terms before ordering."
    },
    {
        id: "finance", title: "Finance (Babereki SACCOS)",
        desc: "Cooperative savings and credit solutions tailored to your financial growth.",
        chips: ["Savings", "Credit", "Growth"],
        what: "Babereki SACCOS gives BOPEU members access to cooperative savings and credit facilities designed around the financial needs of public employees.",
        covers: [
            "Cooperative savings facilities",
            "Credit solutions for eligible members",
            "Financial growth and member support through the SACCOS"
        ],
        who: "Active BOPEU members in good standing who meet Babereki SACCOS membership and affordability requirements.",
        access: "Speak to BOPEU or Babereki SACCOS for the current membership and loan process, complete the application and submit it with the required supporting documents.",
        docs: "Completed loan or membership form, bank statement, latest payslip, certified Omang and confirmation of employment.",
        note: "Savings and credit facilities are subject to Babereki SACCOS rules, affordability checks and approval. Confirm current rates, fees and repayment terms before applying."
    },
    {
        id: "insurance", title: "BOPEU Funeral Cover",
        desc: "Peace of mind and dignified support, underwritten by Bona Life.",
        chips: ["P 65,000 Core", "1% of Salary", "No Medical Tests"],
        what: "The BOPEU Group Funeral Scheme, underwritten by Bona Life, provides dignified funeral cover for members and their families. Core cover protects the member, spouse and children under 21, with optional parent, extended-family and adult-child covers. A 12-month premium-waiver option is included.",
        covers: [
            "Core funeral cover for the member, spouse and children under 21",
            "Optional cover for parents, extended family and adult children",
            "12-month premium waiver and no medical tests"
        ],
        who: "All active BOPEU members enrolling through payroll stop-order. Immediate family includes a spouse and children under 21; extended-family covers are optional.",
        access: "Enrol through BOPEU via payroll stop-order. Use the funeral cover calculator on this page to estimate your subscription and add dependants to your cover.",
        docs: "Basic salary (normally taken from your payslip), dependants' dates of birth and beneficiary details.",
        note: "Subscription is 1% of basic salary, currently capped at P 50.00–P 120.00. Cover levels, waiting periods and premium-waiver rules are subject to the current Bona Life/BOPEU scheme terms."
    },
    {
        id: "assistance", title: "Financial Assistance",
        desc: "Emergency loans and financial advisory services for your economic stability.",
        chips: ["Quick Loans", "48hr Turnaround", "Advisory"],
        what: "BOPEU's financial assistance service provides emergency loans and financial advisory support to help members stabilise during unexpected financial pressure.",
        covers: [
            "Emergency loan support for eligible members",
            "Financial advisory guidance",
            "A quick assessment process, with a target turnaround of about 48 hours"
        ],
        who: "Active BOPEU members with at least 6 months of consistent subscription and the ability to repay.",
        access: "Request the loan application from BOPEU, complete it and submit it with your supporting documents for assessment.",
        docs: "Loan form, latest payslip, certified Omang and confirmation of employment.",
        note: "Emergency assistance is subject to eligibility, affordability, available funds and approval. The 48-hour turnaround is a target, not a guarantee."
    },
    {
        id: "legal", title: "Legal Representation",
        desc: "We stand up for members at the workplace, sectoral and national levels.",
        chips: ["Up to Apex Court", "Constitution-Guided", "Member Support"],
        what: "BOPEU provides legal representation and support on labour matters, guided by the union's constitution. Assistance can cover workplace issues through to sectoral and national-level disputes, including representation up to the Apex Court where justified.",
        covers: [
            "Advice and representation on labour matters",
            "Support at workplace, sectoral and national levels",
            "Representation up to the Apex Court where the matter warrants it"
        ],
        who: "BOPEU members in good standing who are facing a labour or employment-related issue covered by the union's legal-support policy.",
        access: "Raise a grievance through the Help section or contact your shop steward/BOPEU office. BOPEU will assess the matter and advise on the next steps.",
        docs: "A written summary of the issue, relevant dates and correspondence, and any supporting workplace documents.",
        note: "Legal support is guided by the BOPEU constitution and the merits of the matter. Not every dispute qualifies for full representation."
    },
    {
        id: "dispute", title: "Dispute Resolution",
        desc: "Representation and support in workplace dispute resolution.",
        chips: ["Workplace Disputes", "Grievances", "Fair Process"],
        what: "BOPEU represents and supports members in resolving workplace disputes, protecting their rights, dignity and conditions of service throughout the process.",
        covers: [
            "Representation in workplace disputes",
            "Support with grievances and unfair-treatment claims",
            "Guidance on fair process and next steps"
        ],
        who: "All BOPEU members facing workplace conflict, unfair treatment or a dispute over conditions of service.",
        access: "Raise the dispute with your shop steward or BOPEU office, or submit a grievance through the Help section. Provide the facts and supporting documents so BOPEU can assess the matter.",
        docs: "A clear description of the dispute, relevant dates, correspondence and any supporting documents.",
        note: "Members should follow the applicable internal grievance procedure first where possible. BOPEU support depends on the facts and the union's dispute-resolution policy."
    },
    {
        id: "organizing", title: "Organizing & Collective Bargaining",
        desc: "Recruit, organise and mobilise — negotiate better wages and conditions.",
        chips: ["Collective Power", "Wage Negotiation", "Social Justice"],
        what: "BOPEU recruits, organises and mobilises public employees to build collective power and negotiate better salaries, benefits and fair conditions of service.",
        covers: [
            "Recruitment and organising support for public employees",
            "Collective bargaining on wages, benefits and conditions",
            "Member mobilisation around social-justice issues"
        ],
        who: "All current and prospective public-sector employees who support BOPEU's aims.",
        access: "Contact your nearest BOPEU office or shop steward to join, organise colleagues or get involved in collective bargaining.",
        docs: "No formal documents are needed to start. Bring your employment details and any workplace issues you want BOPEU to address.",
        note: "Collective bargaining outcomes depend on negotiations and agreements with the employer. Membership strength directly affects the union's ability to negotiate."
    }
];

function renderBenefits() {
    const container = document.getElementById('benefitsList');
    if (!container) return;
    let html = '';
    BOPEU_SERVICES.forEach(s => {
        const id = escAttr(s.id);
        html +=
            '<div class="service-tile" role="button" tabindex="0" aria-haspopup="dialog" onclick="openServiceModal(\'' + id + '\', this)" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openServiceModal(\'' + id + '\', this);}">' +
            '<div class="st-body">' +
            '<div class="service-title">' + esc(s.title) + '</div>' +
            '<div class="service-desc">' + esc(s.desc) + '</div>' +
            '</div>' +
            '</div>';
    });
    container.innerHTML = html;
}

function toggleBenefitAccordion(head) {
    const card = head.closest && head.closest('.acc');
    if (!card) return;
    const willOpen = !card.classList.contains('open');
    const openCards = document.querySelectorAll('.card.acc.open');
    for (let i = 0; i < openCards.length; i++) {
        if (openCards[i] !== card) {
            openCards[i].classList.remove('open');
            const otherHead = openCards[i].querySelector('.acc-head');
            if (otherHead) otherHead.setAttribute('aria-expanded', 'false');
        }
    }
    card.classList.toggle('open', willOpen);
    head.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
}

function toggleHelpAccordion(head) {
    const card = head.closest && head.closest('.acc');
    if (!card) return;
    const willOpen = !card.classList.contains('open');
    const openCards = document.querySelectorAll('#tab-help .acc.open');
    for (let i = 0; i < openCards.length; i++) {
        if (openCards[i] !== card) openCards[i].classList.remove('open');
    }
    card.classList.toggle('open', willOpen);
}

let serviceModalTrigger = null;

function serviceBulletList(items) {
    if (!Array.isArray(items) || !items.length) return '';
    return '<ul class="service-modal-list">' +
        items.map(item => '<li>' + esc(item) + '</li>').join('') +
        '</ul>';
}

function serviceSection(title, content) {
    if (!content) return '';
    return '<section class="service-modal-section">' +
        '<h3>' + esc(title) + '</h3>' +
        content +
        '</section>';
}

function openServiceModal(serviceId, trigger) {
    const svc = BOPEU_SERVICES.find(s => s.id === serviceId);
    const modal = document.getElementById('service-modal');
    const body = document.getElementById('serviceModalBody');
    if (!svc || !modal || !body) return;

    serviceModalTrigger = trigger || document.activeElement;

    body.innerHTML =
        '<div class="service-modal-hero">' +
        '<div class="service-modal-eyebrow">BOPEU Member Service</div>' +
        '<h2 class="service-modal-title" id="serviceModalTitle">' + esc(svc.title) + '</h2>' +
        '<p class="service-modal-desc">' + esc(svc.desc) + '</p>' +
        '<div class="stat-chips service-modal-chips">' +
        svc.chips.map(c => '<span class="stat-chip">' + esc(c) + '</span>').join('') +
        '</div>' +
        '</div>' +
        serviceSection('What it covers', '<p>' + esc(svc.what) + '</p>' + serviceBulletList(svc.covers)) +
        serviceSection('Who qualifies', '<p>' + esc(svc.who) + '</p>') +
        serviceSection('How to access it', '<p>' + esc(svc.access) + '</p>') +
        serviceSection('What to prepare', '<p>' + esc(svc.docs) + '</p>') +
        (svc.note ? '<div class="service-modal-note"><strong>Good to know</strong> ' + esc(svc.note) + '</div>' : '') +
        '<p class="service-modal-disclaimer">Service terms, eligibility and rates may change. Confirm current details with your nearest BOPEU office before applying.</p>' +
        '<button type="button" class="service-modal-done" onclick="closeServiceModal()">Close</button>';

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('service-modal-open');
    body.scrollTop = 0;

    const closeBtn = modal.querySelector('.service-modal-close');
    if (closeBtn) {
        setTimeout(function () { closeBtn.focus(); }, 30);
    }
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    if (!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('service-modal-open');
    if (serviceModalTrigger && typeof serviceModalTrigger.focus === 'function') {
        try {
            serviceModalTrigger.focus({ preventScroll: true });
        } catch (e) {
            serviceModalTrigger.focus();
        }
    }
    serviceModalTrigger = null;
}

function initServiceModal() {
    const modal = document.getElementById('service-modal');
    if (!modal) return;
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeServiceModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeServiceModal();
    });
}

/* =====================================================
   2. METROPOLITAN FUNERAL COVER + DEPENDANTS
   ===================================================== */
function getDependants() {
    const profile = loadOnboarding();
    if (profile && profile.funeral && Array.isArray(profile.funeral.dependants)) return profile.funeral.dependants;
    const saved = LocalStore.get('bopeu_funeral_dependants');
    return saved && Array.isArray(saved) ? saved : [];
}

function saveDependants(list) {
    LocalStore.set('bopeu_funeral_dependants', list);
    const profile = loadOnboarding();
    if (profile) {
        profile.funeral = profile.funeral || {};
        profile.funeral.dependants = list;
        LocalStore.set('bopeu_profile', profile);
    }
}

function dependantBenefit(relation, dob) {
    if (relation.indexOf('Child') === 0) {
        const bracket = childBracketFor(relation, dob);
        return bracket ? bracket.cover : 'P 15,000';
    }
    return 'P 60,000';
}

function renderFuneral() {
    const coverBox = document.getElementById('funeralCore');
    const subBox = document.getElementById('funeralSubscription');
    const dependants = document.getElementById('funeralDependants');
    if (!coverBox && !subBox && !dependants) return;

    let salary = 0;
    const profile = loadOnboarding();
    const salaryEl = document.getElementById('funSalary');
    if (salaryEl) {
        salary = parseFloat(salaryEl.value) || 0;
    } else if (profile && profile.funeral) {
        salary = profile.funeral.basicSalary || 0;
    }

    const sub = funeralSubscription(salary);
    if (subBox) {
        subBox.innerHTML = 'P ' + sub.toFixed(2) + '<div class="stat-label">1% of basic salary (min P 39.90 &middot; max P 100.00)' + (salary > 0 ? ' &middot; on P ' + salary.toLocaleString() : '') + '</div>';
    }
    if (coverBox) {
        coverBox.innerHTML = 'P 60,000<div class="stat-label">Core cover - member, spouse & children under 21</div>';
    }

    if (dependants) renderDependants(dependants);
}

function renderFuneralTable() {
    const container = document.getElementById('funeralBenefitTable');
    if (!container) return;
    container.innerHTML =
        '<table class="benefit-table">' +
        '<tr><th>Age Group</th><th>Benefit</th></tr>' +
        '<tr><td>Main Member / Spouse / Parent</td><td>P 60,000</td></tr>' +
        '<tr><td>16 - 21 Years</td><td>P 60,000</td></tr>' +
        '<tr><td>7 - 15 Years</td><td>P 30,000</td></tr>' +
        '<tr><td>0 - 6 Years</td><td>P 15,000</td></tr>' +
        '</table>' +
        '<p style="font-size:13px;color:var(--text-muted);margin-top:6px;">Includes 12-month premium waiver. No medical tests. Minimal red tape.</p>';
}

function renderDependants(container) {
    if (!container) return;
    const list = getDependants();
    if (!list.length) {
        container.innerHTML = '<div class="empty-state">No dependants added yet. Add your spouse, children (under 21) or extended family to the funeral cover.</div>';
        return;
    }
    let html = '';
    list.forEach(dep => {
        html +=
            '<div class="member-card dismissable">' +
            '<button type="button" class="card-x" onclick="removeFunDependant(\'' + dep.id + '\')" aria-label="Remove ' + esc(dep.name) + '">&times;</button>' +
            '<div class="member-avatar">' + initialsOf(dep.name) + '</div>' +
            '<div class="member-info">' +
            '<div class="member-name">' + esc(dep.name) + '</div>' +
            '<div class="member-details">' + esc(dep.relation) + (dep.childBracket ? ' (' + esc(dep.childBracket) + ')' : '') + ' &bull; ' + esc(dep.cover) + '</div>' +
            '</div></div>';
    });
    container.innerHTML = html;
}

function addFunDependant() {
    const name = document.getElementById('funDepName').value.trim();
    const relation = document.getElementById('funDepRelation').value;
    const dob = document.getElementById('funDepDob').value;

    if (!name) { toast('Please enter the dependant\'s full name.'); return; }

    let finalRelation = relation;
    let bracket = '';
    if (relation === 'Child') {
        bracket = childBracketFromDob(dob);
        if (!bracket) { toast('Children on the funeral cover must be under 21 years of age.'); return; }
        finalRelation = bracket.key;
    }

    const member = {
        id: 'fun' + Date.now().toString(36),
        name: name,
        relation: finalRelation,
        dob: dob,
        childBracket: finalRelation.indexOf('Child') === 0 ? finalRelation : '',
        cover: dependantBenefit(finalRelation, dob)
    };

    const maxChildren = BOPEU_FUNERAL.maxChildren;
    const list = getDependants();
    const childCount = list.filter(d => d.relation.indexOf('Child') === 0).length;
    if (finalRelation.indexOf('Child') === 0 && childCount >= maxChildren) {
        toast('Maximum of ' + maxChildren + ' children per funeral cover.');
        return;
    }

    list.push(member);
    saveDependants(list);
    document.getElementById('funDepName').value = '';
    if (document.getElementById('funDepDob')) document.getElementById('funDepDob').value = '';
    renderFuneral();
    renderProfileReview();
    toast(member.relation + ' added to funeral cover (' + member.cover + ').');
}

function removeFunDependant(id) {
    const list = getDependants().filter(d => d.id !== id);
    saveDependants(list);
    renderFuneral();
    renderProfileReview();
}

document.addEventListener('DOMContentLoaded', () => {
    initServiceModal();
    initPartnerModal();
    renderBenefits();
    renderFuneral();
    renderFuneralTable();
    if (typeof renderProfileSummary === 'function') renderProfileSummary();
    renderMemberCard();
    if (typeof BOPEU_PARTNER_DETAILS !== 'undefined') renderPartnerBenefitsSection();
    if (typeof renderCalculatorLaunchers === 'function') {
        try { renderCalculatorLaunchers(); } catch (e) {}
    }
});

/* =====================================================
   3. DIGITAL MEMBER CARD + PARTNER DISCOUNTS
   ===================================================== */
function renderProfileReview() {
    if (typeof renderProfileSummary === 'function') renderProfileSummary();
}

/* QR grid (9x9 seeded, same generator as Bopeu2 reference) */
function buildQrGrid(targetId, seed) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = '';
    const N = 9;
    let s = 0;
    for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) % 99991;
    for (let i = 0; i < N * N; i++) {
        const cell = document.createElement('i');
        s = (s * 1103515245 + 12345) % 2147483648;
        const on = (s % 100) > 48;
        if (!on) cell.className = 'off';
        el.appendChild(cell);
    }
}

function showQrFullscreen() {
    document.getElementById('qrFullseed').textContent = currentMemberNo();
    openModal('qr-modal');
}

function downloadMemberCard() {
    const p = loadOnboarding();
    const name = p ? (p.personal.firstName + ' ' + p.personal.surname) : 'BOPEU Member';
    toast(downloadCard ? 'Membership card PDF will be downloaded to your device.\n\n' + currentMemberNo() + ' \u00b7 ' + name : 'Download triggered.');
}

function renderMemberCard() {
    const container = document.getElementById('memberCard');
    if (!container) return;
    const profile = loadOnboarding();
    const name = profile ? (profile.personal.firstName + ' ' + profile.personal.surname) : 'BOPEU Member';
    const memberNo = currentMemberNo();
    const surname = profile && profile.personal.surname ? profile.personal.surname : name.split(' ').pop();
    const sector = profile ? (profile.employment.sectorLabel || 'Public Employee') : 'Public Employee';
    const status = profile ? (profile.status || 'pending_verification') : 'active';
    const office = profile && profile.location && profile.location.workStation ? profile.location.workStation : 'Gaborone';
    const joined = profile && profile.joined ? profile.joined : '—';
    const initials = initialsOf(name);
    const expiry = (new Date().getFullYear() + 2) + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0');

    container.innerHTML =
        '<div class="digital-card">' +
        '<div class="dc-head">' +
        '<div class="dc-brand">BOPEU<small>BOTSWANA PUBLIC EMPLOYEES UNION</small></div>' +
        '<div style="font-size:13px;opacity:.8;">MEMBER</div>' +
        '</div>' +
        '<div class="dc-body">' +
        '<div class="dc-photo">' + esc(initials) + '</div>' +
        '<div class="dc-info">' +
        '<div class="dc-name">' + esc(name) + '</div>' +
        '<div class="dc-no">' + esc(memberNo) + '</div>' +
        '<div class="dc-meta">' + esc(sector) + '<br>Station: ' + esc(office) + ' \u00b7 Member since: ' + esc(joined) + ' \u00b7 Valid until: ' + esc(expiry) + '</div>' +
        '</div>' +
        '<div class="dc-qr" id="qrGrid" title="Tap to enlarge" onclick="showQrFullscreen()"></div>' +
        '</div>' +
        '<div style="position:relative;z-index:1;margin-top:10px;"><span class="tag ' + (status === 'active' ? 'green' : 'amber') + '" style="background:rgba(255,255,255,.2);color:#fff;">' + (status === 'active' ? 'ACTIVE MEMBER' : 'PENDING VERIFICATION') + '</span></div>' +
        '</div>';

    buildQrGrid('qrGrid', memberNo);

    container.innerHTML +=
        '<div class="btn-row">' +
        '<button class="btn btn-primary" onclick="showQrFullscreen()">Show QR Fullscreen</button>' +
        '<button class="btn btn-secondary" onclick="downloadMemberCard()">Download PDF</button>' +
        '</div>';

    container.innerHTML +=
        '<div class="qr-grid">Scan the QR code to verify your membership at BOPEU-affiliated partners and offices. Funeral cover (Bona Life): member &amp; spouse P65,000 core at 1% of basic salary (capped P50.00 \u2013 P120.00).</div>';
}

/* =====================================================
   3b. PARTNER BENEFIT NETWORK (Benefits tab)
   ===================================================== */

const PARTNER_FILTERS = ['All', 'Health', 'Finance', 'Insurance', 'Hardware', 'Travel', 'Telecom'];

function getPartnerDetails() {
    return Array.isArray(window.BOPEU_PARTNER_DETAILS) ? window.BOPEU_PARTNER_DETAILS : [];
}

/* Partner Benefits network — renders on the Benefits tab */
function renderPartnerBenefitsSection() {
    const container = document.getElementById('partnerBenefitSection');
    if (!container) return;
    const partners = getPartnerDetails();
    if (!partners.length) return;

    const filterHtml = PARTNER_FILTERS.map(function (category) {
        const active = category === 'All' ? ' active' : '';
        return '<button type="button" class="chip-btn' + active + '" data-cat="' + escAttr(category) + '" aria-pressed="' + (category === 'All' ? 'true' : 'false') + '" onclick="filterPartners(\'' + escAttr(category) + '\', this)">' + esc(category) + '</button>';
    }).join('');

    container.innerHTML =
        '<div class="partner-intro"><h3 id="partnerCount">' + partners.length + ' Member Benefit Partners</h3></div>' +
        '<div id="partnerList"></div>' +
        '<div class="partner-filter" role="group" aria-label="Filter partners by category">' + filterHtml + '</div>';

    renderPartnerList('All');
}

let activePartnerFilter = 'All';

function filterPartners(category, btn) {
    activePartnerFilter = category;
    document.querySelectorAll('#partnerBenefitSection .chip-btn').forEach(function (b) {
        const isActive = btn && btn.classList ? (b === btn) : (b.getAttribute('data-cat') === category);
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    renderPartnerList(category);
    updatePartnerCount(category);
}

function updatePartnerCount(category) {
    const el = document.getElementById('partnerCount');
    if (!el) return;
    const partners = getPartnerDetails();
    if (category === 'All') {
        el.textContent = partners.length + ' Member Benefit Partners';
        return;
    }
    const n = partners.filter(function (p) { return p.filterGroup === category; }).length;
    el.textContent = n + ' ' + category + (n === 1 ? ' Partner' : ' Partners');
}

function partnerStatusDot(p) {
    const confirmed = p.status === 'verified';
    const label = p.statusLabel || (confirmed ? 'Confirmed' : 'Terms to confirm');
    const cls = confirmed ? 'verified' : 'coming';
    return '<span class="partner-status ' + cls + '" title="' + escAttr(label) + '" aria-label="' + escAttr(label) + '"></span>';
}

function renderPartnerList(filter) {
    const container = document.getElementById('partnerList');
    if (!container) return;
    const partners = getPartnerDetails();
    const list = filter === 'All' ? partners : partners.filter(function (p) { return p.filterGroup === filter; });
    if (!list.length) {
        container.innerHTML = '<div class="empty-state">No partners in this category yet.</div>';
        return;
    }
    let html = '';
    list.forEach(function (p) {
        const id = escAttr(p.id);
        const logo = p.logo
            ? '<img src="' + escAttr(p.logo) + '" alt="' + escAttr(p.name) + '" onerror="this.outerHTML=\'<div class=&quot;no-logo&quot;>' + escAttr(p.fallback || '?') + '</div>\';">'
            : '<div class="no-logo">' + esc(p.fallback || '?') + '</div>';
        html +=
            '<div class="partner-tile" role="button" tabindex="0" data-cat="' + escAttr(p.filterGroup) + '" aria-haspopup="dialog" aria-label="Open details for ' + escAttr(p.name) + '" onclick="openPartnerDetail(\'' + id + '\', this)" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openPartnerDetail(\'' + id + '\', this);}">' +
            '<div class="partner-logo-img">' + logo + '</div>' +
            '<div class="pt-info">' +
            '<div class="pt-name">' + esc(p.name) + '</div>' +
            '<div class="pt-desc">' + esc(p.shortLine || p.card.title) + '</div>' +
            '</div>' +
            partnerStatusDot(p) +
            '</div>';
    });
    container.innerHTML = html;
}

function partnerBulletList(items) {
    if (!Array.isArray(items) || !items.length) return '';
    return '<ul class="partner-modal-list">' +
        items.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join('') +
        '</ul>';
}

function partnerSection(title, content) {
    if (!content) return '';
    return '<section class="partner-modal-section">' +
        '<h3>' + esc(title) + '</h3>' +
        content +
        '</section>';
}

function partnerBenefitsList(items) {
    if (!Array.isArray(items) || !items.length) return '';
    return items.map(function (item) {
        return '<div class="partner-benefit-item">' +
            '<strong>' + esc(item.title) + '</strong>' +
            '<p>' + esc(item.description) + '</p>' +
            '</div>';
    }).join('');
}

function partnerContactSection(contact) {
    if (!contact) return '';
    const rows = [];

    (contact.addresses || []).forEach(function (item) {
        rows.push('<div class="partner-contact-item"><strong>' + esc(item.label || 'Address') + '</strong><p>' + esc(item.address) + '</p></div>');
    });

    (contact.phone_numbers || []).forEach(function (item) {
        const tel = String(item.number || '').replace(/[^\d+]/g, '');
        rows.push('<div class="partner-contact-item"><strong>' + esc(item.label || 'Phone') + '</strong>' +
            '<a href="tel:' + escAttr(tel) + '">' + esc(item.number) + '</a>' +
            (item.note ? '<p>' + esc(item.note) + '</p>' : '') +
            '</div>');
    });

    (contact.emails || []).forEach(function (item) {
        rows.push('<div class="partner-contact-item"><strong>' + esc(item.label || 'Email') + '</strong>' +
            '<a href="mailto:' + escAttr(item.address) + '">' + esc(item.address) + '</a></div>');
    });

    (contact.websites || []).forEach(function (item) {
        rows.push('<div class="partner-contact-item"><strong>' + esc(item.label || 'Website') + '</strong>' +
            '<a href="' + escAttr(item.url) + '" target="_blank" rel="noopener">' + esc(item.url) + '</a></div>');
    });

    if (Array.isArray(contact.service_areas) && contact.service_areas.length) {
        rows.push('<div class="partner-contact-item"><strong>Service area</strong><p>' + contact.service_areas.map(esc).join(', ') + '</p></div>');
    }

    if (!rows.length) return '';
    return partnerSection('Contact', '<div class="partner-contact-grid">' + rows.join('') + '</div>');
}

let partnerModalTrigger = null;

function openPartnerDetail(id, trigger) {
    const p = getPartnerDetails().find(function (x) { return x.id === id; });
    const modal = document.getElementById('partner-tile-modal');
    const body = document.getElementById('partnerTileModalBody');
    if (!p || !modal || !body) return;

    partnerModalTrigger = trigger || document.activeElement;

    const statusLabel = p.statusLabel || (p.status === 'verified' ? 'Confirmed' : 'Terms to confirm');
    const statusClass = p.status === 'verified' ? 'verified' : 'coming';
    const detail = p.detail || {};
    const logo = p.logo
        ? '<img src="' + escAttr(p.logo) + '" alt="' + escAttr(p.name) + '" onerror="this.outerHTML=\'<div class=&quot;no-logo&quot;>' + escAttr(p.fallback || '?') + '</div>\';">'
        : '<div class="no-logo">' + esc(p.fallback || '?') + '</div>';

    body.innerHTML =
        '<div class="partner-modal-hero">' +
        '<div class="partner-modal-logo">' + logo + '</div>' +
        '<div>' +
        '<div class="partner-modal-eyebrow">BOPEU Benefit Partner</div>' +
        '<h2 class="partner-modal-title" id="partnerTileModalTitle">' + esc(p.name) + '</h2>' +
        '<p class="partner-modal-category">' + esc(p.category) + '</p>' +
        '<span class="partner-modal-status ' + statusClass + '">' + esc(statusLabel) + '</span>' +
        '</div>' +
        '</div>' +
        (p.card && p.card.summary ? '<p class="partner-modal-summary">' + esc(p.card.summary) + '</p>' : '') +
        (p.card && p.card.benefit_highlight ? '<div class="partner-modal-highlight">' + esc(p.card.benefit_highlight) + '</div>' : '') +
        partnerSection('What this partner offers', detail.overview ? '<p>' + esc(detail.overview) + '</p>' : '') +
        partnerSection('Member benefits', partnerBenefitsList(detail.member_benefits)) +
        partnerSection('How to use it', partnerBulletList(detail.how_to_use)) +
        partnerSection('Who can apply', partnerBulletList(detail.eligibility)) +
        partnerSection('What to prepare', partnerBulletList(detail.documents_to_prepare)) +
        partnerSection('Important terms', partnerBulletList(detail.important_terms)) +
        partnerContactSection(p.contact) +
        (window.BOPEU_PARTNER_DISCLAIMER ? '<p class="partner-modal-disclaimer">' + esc(window.BOPEU_PARTNER_DISCLAIMER) + '</p>' : '') +
        '<button type="button" class="partner-modal-done" onclick="closePartnerDetail()">Close</button>';

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('partner-tile-modal-open');
    body.scrollTop = 0;

    const closeBtn = modal.querySelector('.partner-tile-modal-close');
    if (closeBtn) {
        setTimeout(function () { closeBtn.focus(); }, 30);
    }
}

function closePartnerDetail() {
    const modal = document.getElementById('partner-tile-modal');
    if (!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('partner-tile-modal-open');
    if (partnerModalTrigger && typeof partnerModalTrigger.focus === 'function') {
        try {
            partnerModalTrigger.focus({ preventScroll: true });
        } catch (e) {
            partnerModalTrigger.focus();
        }
    }
    partnerModalTrigger = null;
}

function initPartnerModal() {
    const modal = document.getElementById('partner-tile-modal');
    if (!modal) return;
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closePartnerDetail();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) closePartnerDetail();
    });
}