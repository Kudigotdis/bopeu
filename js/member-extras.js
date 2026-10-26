/* ============================================================
   member-extras.js — new member-facing pages
   Register, profile, security, consents, my-benefits,
   offer-detail, feedback, case-detail, my-documents
   ============================================================ */

/* ---------- REGISTER WIZARD ---------- */
var REG_STATE = { step:0, data:{ personal:{}, contact:{}, consent:{} } };
var REG_STEPS = ['Identity','Contact & Employment','Consent'];

function regRender() {
  var prog = document.getElementById('regProgress');
  var body = document.getElementById('regBody');
  if (!prog || !body) return;

  prog.innerHTML = '<div style="display:flex;gap:8px;align-items:center;">' +
    REG_STEPS.map(function (s, i) {
      return '<div style="flex:1;height:6px;border-radius:3px;background:' + (i <= REG_STATE.step ? '#D32F2F' : '#E2E8F0') + ';"></div>';
    }).join('') +
    '</div><div style="font-size:12px;color:#718096;margin-top:6px;font-weight:600;">Step ' + (REG_STATE.step + 1) + ' of 3 — ' + REG_STEPS[REG_STATE.step] + '</div>';

  if (REG_STATE.step === 0) {
    body.innerHTML =
      '<div class="form-group"><label class="form-label">First name</label><input id="rFirst" type="text" value="' + (REG_STATE.data.personal.first||'') + '"></div>' +
      '<div class="form-group"><label class="form-label">Surname</label><input id="rSurname" type="text" value="' + (REG_STATE.data.personal.surname||'') + '"></div>' +
      '<div class="form-group"><label class="form-label">Omang / Passport</label><input id="rOmang" type="text" value="' + (REG_STATE.data.personal.omang||'') + '"></div>' +
      '<div class="form-group"><label class="form-label">Date of birth</label><input id="rDob" type="date" value="' + (REG_STATE.data.personal.dob||'') + '"></div>';
  } else if (REG_STATE.step === 1) {
    body.innerHTML =
      '<div class="form-group"><label class="form-label">Mobile (+267)</label><input id="rPhone" type="tel" value="' + (REG_STATE.data.contact.phone||'') + '"></div>' +
      '<div class="form-group"><label class="form-label">Email</label><input id="rEmail" type="email" value="' + (REG_STATE.data.contact.email||'') + '"></div>' +
      '<div class="form-group"><label class="form-label">Sector</label><select id="rSector"><option value="">Select…</option>' +
        BOPEU_EMPLOYMENT_DATA.sectors.map(function (s) { return '<option value="' + s.id + '">' + s.label + '</option>'; }).join('') + '</select></div>' +
      '<div class="form-group"><label class="form-label">Employer</label><input id="rEmployer" type="text" value="' + (REG_STATE.data.contact.employer||'') + '"></div>' +
      '<div class="form-group"><label class="form-label">Job title</label><input id="rJob" type="text" value="' + (REG_STATE.data.contact.job||'') + '"></div>';
  } else {
    body.innerHTML =
      '<div class="checklist-item"><input type="checkbox" id="rConsent1"><label for="rConsent1">I confirm the information is accurate.</label></div>' +
      '<div class="checklist-item"><input type="checkbox" id="rConsent2"><label for="rConsent2">I accept the Privacy Notice and Terms.</label></div>' +
      '<div class="checklist-item"><input type="checkbox" id="rConsent3"><label for="rConsent3">I consent to funeral cover auto-enrolment.</label></div>' +
      '<div class="checklist-item"><input type="checkbox" id="rConsent4"><label for="rConsent4">I consent to receiving union announcements.</label></div>';
  }

  var back = document.getElementById('regBack');
  var next = document.getElementById('regNext');
  if (back) back.style.visibility = REG_STATE.step === 0 ? 'hidden' : 'visible';
  if (next) next.textContent = REG_STATE.step === 2 ? 'Create Account' : 'Continue';
}

function regCollect() {
  if (REG_STATE.step === 0) REG_STATE.data.personal = {
    first:(document.getElementById('rFirst')||{}).value || '',
    surname:(document.getElementById('rSurname')||{}).value || '',
    omang:(document.getElementById('rOmang')||{}).value || '',
    dob:(document.getElementById('rDob')||{}).value || ''
  };
  if (REG_STATE.step === 1) REG_STATE.data.contact = {
    phone:(document.getElementById('rPhone')||{}).value || '',
    email:(document.getElementById('rEmail')||{}).value || '',
    sectorId:(document.getElementById('rSector')||{}).value || '',
    employer:(document.getElementById('rEmployer')||{}).value || '',
    job:(document.getElementById('rJob')||{}).value || ''
  };
  if (REG_STATE.step === 2) REG_STATE.data.consent = {
    accurate: !!(document.getElementById('rConsent1')||{}).checked,
    legal:    !!(document.getElementById('rConsent2')||{}).checked,
    funeral:  !!(document.getElementById('rConsent3')||{}).checked,
    marketing:!!(document.getElementById('rConsent4')||{}).checked
  };
}

function regBack() { regCollect(); if (REG_STATE.step === 0) return; REG_STATE.step--; regRender(); }
function regNext() {
  regCollect();
  if (REG_STATE.step === 2) { regFinish(); return; }
  REG_STATE.step++; regRender();
}

function regFinish() {
  var p = REG_STATE.data.personal;
  if (!p.first || !p.surname || !p.omang) { alert('Name and Omang required.'); REG_STATE.step = 0; regRender(); return; }
  var profile = {
    personal: { firstName:p.first, surname:p.surname, omang:p.omang, dob:p.dob, phone:REG_STATE.data.contact.phone, email:REG_STATE.data.contact.email },
    employment: { sectorId:REG_STATE.data.contact.sectorId, employerLabel:REG_STATE.data.contact.employer, jobTitle:REG_STATE.data.contact.job },
    location: { district:'', town:'', area:'', workStation:'' },
    memberNo: BOPEU_STATS.memberNoPrefix + String(1000 + Math.floor(Math.random() * 9000)),
    joined: new Date().toISOString().slice(0, 10),
    status: 'pending_verification',
    consents: REG_STATE.data.consent
  };
  LocalStore.set('bopeu_profile', profile);
  LocalStore.set('bopeu_logged_in', true);
  alert('Account created! Member no ' + profile.memberNo + '.');
  location.href = 'index.html';
}

/* ---------- PROFILE PAGE (My Details replacement) ---------- */
function memberRenderProfile() {
  if (typeof renderProfileSummary === 'function') renderProfileSummary();
  var det = document.getElementById('profDetails');
  if (!det) return;
  var p = loadOnboarding();
  if (!p) { det.innerHTML = '<div class="empty">Complete registration.</div>'; return; }
  det.innerHTML =
    '<div class="checklist-item"><span class="chk-num">☎</span><span><strong>Phone:</strong> ' + (p.personal.phone || '—') + '</span></div>' +
    '<div class="checklist-item"><span class="chk-num">✉</span><span><strong>Email:</strong> ' + (p.personal.email || '—') + '</span></div>' +
    '<div class="checklist-item"><span class="chk-num">🏢</span><span><strong>Employer:</strong> ' + ((p.employment && p.employment.employerLabel) || '—') + '</span></div>' +
    '<div class="checklist-item"><span class="chk-num">💼</span><span><strong>Job:</strong> ' + ((p.employment && p.employment.jobTitle) || '—') + '</span></div>' +
    '<div class="checklist-item"><span class="chk-num">📍</span><span><strong>Station:</strong> ' + ((p.location && p.location.workStation) || '—') + '</span></div>';

  var deps = (p.funeral && p.funeral.dependants) || [];
  var depsBox = document.getElementById('profDeps');
  if (depsBox) depsBox.innerHTML = deps.length ? deps.map(function (d) {
    return '<div class="checklist-item"><span class="chk-num">' + d.relation.charAt(0) + '</span><span><strong>' + d.name + '</strong> — ' + d.relation + ' · ' + d.cover + '</span></div>';
  }).join('') : '<div class="empty">No dependents added.</div>';

  var prefs = LocalStore.get('bopeu_prefs') || {};
  ['email','sms','wa'].forEach(function (k) {
    var el = document.getElementById('pref' + k.charAt(0).toUpperCase() + k.slice(1));
    if (el) el.checked = !!prefs[k];
  });
}

function memberSavePref(k) {
  var p = LocalStore.get('bopeu_prefs') || {};
  var el = document.getElementById('pref' + k.charAt(0).toUpperCase() + k.slice(1));
  p[k] = el ? el.checked : false;
  LocalStore.set('bopeu_prefs', p);
}

/* ---------- SECURITY ---------- */
function memberUpdatePwd() {
  if (!window.BOPEUAuth || typeof window.BOPEUAuth.session !== 'function') {
    alert('Sign-in service not available.');
    return;
  }
  var s = window.BOPEUAuth.session();
  if (!s) { location.href = 'login.html?next=security.html'; return; }
  var cur = (document.getElementById('curPwd') || {}).value || '';
  var np = (document.getElementById('newPwd') || {}).value || '';
  var cp = (document.getElementById('cnfPwd') || {}).value || '';
  var profiles = window.BOPEUAuth.profiles ? window.BOPEUAuth.profiles() : [];
  var profile = profiles.find(function (p) { return p.id === s.profileId; });
  if (!profile) { alert('Profile not found.'); return; }
  if (window.BOPEUAuth.passwordFor(profile) !== cur) { alert('Current password is incorrect.'); return; }
  if (np.length < 4) { alert('New password must be at least 4 characters.'); return; }
  if (np !== cp) { alert('New passwords do not match.'); return; }
  if (!window.BOPEUAuth.setPassword(s.profileId, np)) { alert('Password could not be saved. Please try again.'); return; }
  alert('Password updated.');
}

function memberSaveRecovery() {
  LocalStore.set('bopeu_recovery', {
    email: (document.getElementById('recEmail')||{}).value || '',
    phone: (document.getElementById('recPhone')||{}).value || ''
  });
  alert('Recovery options saved.');
}

/* ---------- CONSENTS ---------- */
function memberSaveConsent(k) {
  var c = LocalStore.get('bopeu_consents') || {};
  var el = document.getElementById('c' + k.charAt(0).toUpperCase() + k.slice(1));
  c[k] = el ? el.checked : false;
  LocalStore.set('bopeu_consents', c);
}

function memberRequestData(kind) {
  var list = LocalStore.get('bopeu_dsr') || [];
  list.unshift({ id:'DSR-' + Date.now(), kind:kind, status:'submitted', at:new Date().toISOString() });
  LocalStore.set('bopeu_dsr', list);
  memberRenderDsr();
  alert('Request submitted.');
}

function memberRenderDsr() {
  var box = document.getElementById('dsrList');
  if (!box) return;
  var list = LocalStore.get('bopeu_dsr') || [];
  box.innerHTML = list.length ? list.map(function (r) {
    return '<div class="checklist-item"><span class="chk-num">' + r.kind.charAt(0).toUpperCase() + '</span>' +
      '<span><strong>' + r.kind + '</strong> · Ref ' + r.id + '<br><span class="text-small text-muted">' +
      new Date(r.at).toLocaleString() + ' · ' + r.status + '</span></span></div>';
  }).join('') : '<div class="empty">No requests.</div>';
}

/* ---------- MY BENEFITS ---------- */
function memberFilterBenefits(cat, btn) {
  document.querySelectorAll('#benefitFilter .chip').forEach(function (b) { b.classList.toggle('active', b === btn); });
  memberRenderBenefitsList(cat);
}

function memberRenderBenefitsList(cat) {
  var box = document.getElementById('benefitList');
  if (!box) return;
  var list = (BOPEU_BENEFIT_PARTNERS || []).filter(function (p) { return cat === 'All' || p.sector === cat; });
  box.innerHTML = list.map(function (p) {
    var status = p.status === 'verified'
      ? '<span class="status verified">Confirmed</span>'
      : '<span class="status coming">Apply</span>';
    var logo = p.logo ? '<img src="' + p.logo + '" alt="" onerror="this.style.display=\'none\'">' : '<span>' + p.icon + '</span>';
    return '<a class="row" href="offer-detail.html?id=' + p.id + '">' +
      '<div class="row-icon logo">' + logo + '</div>' +
      '<div class="row-body"><div class="row-title">' + p.name + '</div><div class="row-desc">' + p.discount + '</div></div>' +
      status + '</a>';
  }).join('') || '<div class="empty">No partners in this category.</div>';
}

/* ---------- OFFER DETAIL ---------- */
function memberRenderOfferDetail() {
  var id = new URLSearchParams(location.search).get('id');
  var main = document.getElementById('offerMain');
  if (!main) return;
  var p = (BOPEU_BENEFIT_PARTNERS || []).find(function (x) { return x.id === id; });
  if (!p) { main.innerHTML = '<div class="empty">Offer not found.</div>'; return; }
  var code = 'BOP-' + p.id.toUpperCase().slice(0,6) + '-2026';
  main.innerHTML =
    '<div class="card"><div class="card-head"><h2>' + p.name + '</h2><div class="card-sub">' + p.category + '</div></div>' +
    '<div class="card-body">' +
    '<div class="callout"><span class="callout-label">Offer</span><p>' + p.discount + '</p></div>' +
    '<h3 style="margin:16px 0 8px;">Details</h3><p>' + p.detail + '</p>' +
    '<h3 style="margin:16px 0 8px;">How to claim</h3><p>' + p.how + '</p>' +
    '</div></div>' +
    '<div class="card"><div class="card-header"><h2>Redemption</h2></div><div class="card-body">' +
    '<div class="checklist-item"><span class="chk-num">✓</span><span>Code: <strong style="font-family:monospace;font-size:16px;">' + code + '</strong></span></div>' +
    '<div class="btn-row mt-md">' +
    '<button class="btn btn-primary" onclick="memberExpressInterest(\'' + p.id + '\')">Express interest</button>' +
    '<button class="btn btn-secondary" onclick="memberOpenFeedback(\'' + p.id + '\')">Leave feedback</button>' +
    '</div></div></div>';
}

function memberExpressInterest(id) {
  LocalStore.set('bopeu_interest_' + id, { at:new Date().toISOString() });
  alert('Interest recorded.');
}

function memberOpenFeedback(id) {
  location.href = 'feedback.html?type=partner&id=' + encodeURIComponent(id);
}

/* ---------- FEEDBACK FORM ---------- */
var MEMBER_FB_STAR = 0;
function memberSetStar(v) {
  MEMBER_FB_STAR = v;
  document.querySelectorAll('#starRow span').forEach(function (s) {
    s.style.color = (+s.dataset.v <= v) ? '#F0A92B' : '#E2E8F0';
  });
}
function memberSubmitFeedback() {
  if (!MEMBER_FB_STAR) { alert('Please rate.'); return; }
  var list = LocalStore.get('bopeu_feedback') || [];
  list.unshift({
    id:'FB-' + Date.now(),
    type: (document.getElementById('fbType')||{}).value || 'service',
    subject: (document.getElementById('fbSubject')||{}).value || '',
    rating: MEMBER_FB_STAR,
    text: (document.getElementById('fbText')||{}).value || '',
    at: new Date().toISOString()
  });
  LocalStore.set('bopeu_feedback', list);
  alert('Thanks — recorded.');
  document.getElementById('fbText').value = '';
  document.getElementById('fbSubject').value = '';
  MEMBER_FB_STAR = 0; memberSetStar(0);
}

/* ---------- CASE DETAIL ---------- */
function memberRenderCaseDetail() {
  var id = new URLSearchParams(location.search).get('id');
  var main = document.getElementById('caseMain');
  if (!main) return;
  var app = (LocalStore.get('bopeu_applications') || []).find(function (a) { return a.id === id; });
  if (!app) { main.innerHTML = '<div class="empty">Case not found.</div>'; return; }
  var msgs = LocalStore.get('bopeu_case_' + id) || [
    { from:'you', text:'Submitted ' + app.label, at: app.submittedAt },
    { from:'system', text:'Reference ' + app.id + ' assigned.', at: app.submittedAt }
  ];
  main.innerHTML =
    '<div class="card"><div class="card-head"><h2>' + app.label + '</h2><div class="card-sub">Ref ' + app.id + ' · ' + app.officeName + '</div></div>' +
    '<div class="card-body"><div class="checklist-item"><span class="chk-num">📅</span><span>Submitted ' + new Date(app.submittedAt).toLocaleString() + '</span></div>' +
    '<div class="checklist-item"><span class="chk-num">📍</span><span>Status: <strong>' + app.status + '</strong></span></div></div></div>' +
    '<div class="card"><div class="card-header"><h2>Thread</h2></div><div class="card-body">' +
    msgs.map(function (m) {
      var bg = m.from === 'you' ? '#F7F9FC' : (m.from === 'staff' ? '#FFEBEE' : '#F2F5F9');
      return '<div style="background:' + bg + ';padding:10px 12px;border-radius:10px;margin-bottom:8px;font-size:14px;">' +
        '<div style="font-size:11px;font-weight:800;color:#718096;text-transform:uppercase;margin-bottom:4px;">' + m.from + ' · ' + new Date(m.at).toLocaleString() + '</div>' +
        m.text + '</div>';
    }).join('') + '</div></div>' +
    '<div class="card"><div class="card-header"><h2>Reply</h2></div><div class="card-body">' +
    '<textarea id="caseReply" rows="3" style="width:100%;padding:10px;border:1px solid #E2E8F0;border-radius:10px;font-family:inherit;font-size:14px;" placeholder="Type…"></textarea>' +
    '<div class="btn-row mt-md"><button class="btn btn-primary" onclick="memberSendCaseReply(\'' + id + '\')">Send</button></div>' +
    '</div></div>';
}

function memberSendCaseReply(id) {
  var txt = ((document.getElementById('caseReply')||{}).value || '').trim();
  if (!txt) { alert('Type a message.'); return; }
  var key = 'bopeu_case_' + id;
  var msgs = LocalStore.get(key) || [];
  msgs.push({ from:'you', text:txt, at:new Date().toISOString() });
  LocalStore.set(key, msgs);
  location.reload();
}

/* ---------- MY DOCUMENTS ---------- */
function memberRenderMyDocs() {
  memberRenderDocs();
  var pdfBox = document.getElementById('pdfList');
  if (pdfBox && window.BOPEU_PDF_FORMS) {
    pdfBox.innerHTML = BOPEU_PDF_FORMS.map(function (f) {
      return '<a class="row" href="' + f.file + '" download>' +
        '<div class="row-icon">📄</div>' +
        '<div class="row-body"><div class="row-title">' + f.name + '</div><div class="row-desc">' + f.disc + '</div></div></a>';
    }).join('');
  }
}

function memberRenderDocs() {
  var box = document.getElementById('docList');
  if (!box) return;
  var list = LocalStore.get('bopeu_member_docs') || [];
  box.innerHTML = list.length ? list.map(function (d) {
    return '<div class="checklist-item"><span class="chk-num">📎</span>' +
      '<span><strong>' + d.name + '</strong><br><span class="text-small text-muted">' + Math.round(d.size/1024) + ' KB · ' + new Date(d.at).toLocaleDateString() + '</span></span>' +
      '<button class="btn btn-secondary btn-small" style="margin-left:auto;" onclick="memberDeleteDoc(\'' + d.id + '\')">Delete</button></div>';
  }).join('') : '<div class="empty">No documents yet.</div>';
}

function memberUploadDoc(e) {
  var f = e.target.files && e.target.files[0];
  if (!f) return;
  var list = LocalStore.get('bopeu_member_docs') || [];
  list.unshift({ id:'DOC-' + Date.now(), name:f.name, size:f.size, at:new Date().toISOString() });
  LocalStore.set('bopeu_member_docs', list);
  memberRenderDocs();
  alert('Uploaded: ' + f.name);
  e.target.value = '';
}

function memberDeleteDoc(id) {
  if (!confirm('Delete?')) return;
  var list = (LocalStore.get('bopeu_member_docs') || []).filter(function (d) { return d.id !== id; });
  LocalStore.set('bopeu_member_docs', list);
  memberRenderDocs();
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('regBody')) regRender();
  if (document.getElementById('profDetails')) memberRenderProfile();
  if (document.getElementById('dsrList')) memberRenderDsr();
  if (document.getElementById('benefitList')) memberRenderBenefitsList('All');
  if (document.getElementById('offerMain')) memberRenderOfferDetail();
  if (document.getElementById('caseMain')) memberRenderCaseDetail();
  if (document.getElementById('docList')) memberRenderMyDocs();

  // Prefill consents
  if (document.getElementById('cCore')) {
    var c = LocalStore.get('bopeu_consents') || { core:true, funeral:true, partner:false, marketing:true, analytics:false };
    ['core','funeral','partner','marketing','analytics'].forEach(function (k) {
      var el = document.getElementById('c' + k.charAt(0).toUpperCase() + k.slice(1));
      if (el) el.checked = !!c[k];
    });
  }
});