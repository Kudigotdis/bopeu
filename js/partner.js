/* ============================================================
   partner.js — all 9 partner-portal pages
   ============================================================ */

function partnerRequireAuth() {
  var session = window.BOPEUAuth ? window.BOPEUAuth.session() : null;
  if (!session || session.portal !== 'partner' || !LocalStore.get('bopeu_partner_logged_in')) {
    location.href = 'partner-login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search);
    return false;
  }
  return true;
}

function partnerCurrentUser() {
  var session = window.BOPEUAuth ? window.BOPEUAuth.session() : null;
  if (session && session.portal === 'partner') {
    return {
      id: session.recordId,
      name: session.displayName,
      organization: session.organization,
      role: session.roleLabel,
      email: session.email
    };
  }
  return LocalStore.get('bopeu_partner_user') || { id: '', name: 'Partner user', organization: '', role: '' };
}

/* ---------- DASHBOARD ---------- */
function partnerRenderDashboard() {
  var kpi = document.getElementById('pKpi');
  var act = document.getElementById('pActivity');
  if (kpi) kpi.innerHTML =
    '<div class="kpi"><div class="lbl">Active offers</div><div class="val">2</div></div>' +
    '<div class="kpi"><div class="lbl">Impressions (30d)</div><div class="val">1,842</div></div>' +
    '<div class="kpi"><div class="lbl">Clicks (30d)</div><div class="val">137</div></div>' +
    '<div class="kpi"><div class="lbl">Redemptions (30d)</div><div class="val">42</div></div>';
  if (act) act.innerHTML = '<div class="empty">No activity yet. As members interact with your offers, aggregate stats appear here.</div>';
}

/* ---------- PROFILE ---------- */
function partnerSaveProfile() {
  var p = {
    name: (document.getElementById('ppName')||{}).value || '',
    sector: (document.getElementById('ppSector')||{}).value || '',
    contact: (document.getElementById('ppContact')||{}).value || '',
    email: (document.getElementById('ppEmail')||{}).value || '',
    phone: (document.getElementById('ppPhone')||{}).value || '',
    web: (document.getElementById('ppWeb')||{}).value || '',
    about: (document.getElementById('ppAbout')||{}).value || ''
  };
  LocalStore.set('bopeu_partner_profile', p);
  alert('Profile saved.');
}

/* ---------- OFFERS ---------- */
function partnerRenderOffers() {
  var box = document.getElementById('offerList');
  if (!box) return;
  var offers = LocalStore.get('bopeu_partner_offers') || [];
  box.innerHTML = offers.length ? offers.map(function (o) {
    var cls = o.status === 'approved' ? 'badge-green' : (o.status === 'pending' ? 'badge-blue' : 'badge-grey');
    return '<a class="row" href="partner-offer-edit.html?id=' + o.id + '">' +
      '<div class="row-icon">🎁</div>' +
      '<div class="row-body"><div class="row-title">' + o.title + '</div><div class="row-desc">' + o.discount + '</div></div>' +
      '<span class="badge ' + cls + '">' + o.status + '</span></a>';
  }).join('') : '<div class="empty">No offers yet.</div>';
}

function partnerSaveOffer() {
  var id = new URLSearchParams(location.search).get('id') || ('O-' + Date.now());
  var o = {
    id: id,
    title: (document.getElementById('oTitle')||{}).value || '',
    discount: (document.getElementById('oDiscount')||{}).value || '',
    detail: (document.getElementById('oDetail')||{}).value || '',
    how: (document.getElementById('oHow')||{}).value || '',
    start: (document.getElementById('oStart')||{}).value || '',
    end: (document.getElementById('oEnd')||{}).value || '',
    status: 'pending',
    submittedAt: new Date().toISOString()
  };
  if (!o.title || !o.discount) { alert('Title and summary required.'); return; }
  var list = (LocalStore.get('bopeu_partner_offers') || []).filter(function (x) { return x.id !== id; });
  list.unshift(o);
  LocalStore.set('bopeu_partner_offers', list);
  alert('Submitted for approval.');
  location.href = 'partner-offers.html';
}

function partnerLoadOfferEdit() {
  var id = new URLSearchParams(location.search).get('id');
  if (!id) return;
  var offers = LocalStore.get('bopeu_partner_offers') || [];
  var o = offers.find(function (x) { return x.id === id; }) || {};
  ['oTitle:title','oDiscount:discount','oDetail:detail','oHow:how','oStart:start','oEnd:end'].forEach(function (pair) {
    var p = pair.split(':');
    var el = document.getElementById(p[0]);
    if (el && o[p[1]] !== undefined) el.value = o[p[1]];
  });
}

/* ---------- ANALYTICS / FEEDBACK ---------- */
function partnerRenderAnalytics() {
  var kpi = document.getElementById('aKpi');
  if (kpi) kpi.innerHTML =
    '<div class="kpi"><div class="lbl">Impressions (30d)</div><div class="val">0</div></div>' +
    '<div class="kpi"><div class="lbl">Views (30d)</div><div class="val">0</div></div>' +
    '<div class="kpi"><div class="lbl">Clicks (30d)</div><div class="val">0</div></div>' +
    '<div class="kpi"><div class="lbl">Redemptions (30d)</div><div class="val">0</div></div>';
}

/* ---------- DOCUMENTS ---------- */
function partnerUploadDoc(e) {
  var f = e.target.files && e.target.files[0];
  if (!f) return;
  var list = LocalStore.get('bopeu_partner_docs') || [];
  list.unshift({ id:'PD-' + Date.now(), name:f.name, size:f.size, at:new Date().toISOString() });
  LocalStore.set('bopeu_partner_docs', list);
  partnerRenderDocs();
  alert('Uploaded: ' + f.name);
  e.target.value = '';
}

function partnerRenderDocs() {
  var box = document.getElementById('pDocList');
  if (!box) return;
  var list = LocalStore.get('bopeu_partner_docs') || [];
  box.innerHTML = list.length ? list.map(function (d) {
    return '<div class="checklist-item"><span class="chk-num">📄</span>' +
      '<span><strong>' + d.name + '</strong><br><span class="text-small text-muted">' + Math.round(d.size/1024) + ' KB · ' + new Date(d.at).toLocaleDateString() + '</span></span>' +
      '<button class="btn btn-secondary btn-small" style="margin-left:auto;" onclick="partnerDeleteDoc(\'' + d.id + '\')">Delete</button></div>';
  }).join('') : '<div class="empty">No documents uploaded.</div>';
}

function partnerDeleteDoc(id) {
  if (!confirm('Delete?')) return;
  var list = (LocalStore.get('bopeu_partner_docs') || []).filter(function (d) { return d.id !== id; });
  LocalStore.set('bopeu_partner_docs', list);
  partnerRenderDocs();
}

/* ---------- USERS ---------- */
function partnerRenderUsers() {
  var box = document.getElementById('userList');
  if (!box) return;
  var list = LocalStore.get('bopeu_partner_users') || [{ name:'Primary contact', email:'partner@example.com', role:'Owner', status:'active' }];
  box.innerHTML = list.map(function (u) {
    var cls = u.status === 'active' ? 'badge-green' : 'badge-blue';
    return '<tr><td><strong>' + u.name + '</strong></td><td>' + u.email + '</td><td>' + u.role + '</td>' +
      '<td><span class="badge ' + cls + '">' + u.status + '</span></td></tr>';
  }).join('');
}

function partnerInviteUser() {
  var email = prompt('Email for new partner user:');
  if (!email) return;
  var list = LocalStore.get('bopeu_partner_users') || [{ name:'Primary contact', email:'partner@example.com', role:'Owner', status:'active' }];
  list.push({ name:email.split('@')[0], email:email, role:'Member', status:'invited' });
  LocalStore.set('bopeu_partner_users', list);
  partnerRenderUsers();
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('pKpi')) partnerRenderDashboard();
  if (document.getElementById('offerList')) partnerRenderOffers();
  if (document.getElementById('oTitle')) partnerLoadOfferEdit();
  if (document.getElementById('aKpi')) partnerRenderAnalytics();
  if (document.getElementById('pDocList')) partnerRenderDocs();
  if (document.getElementById('userList')) partnerRenderUsers();
  // Prefill profile
  if (document.getElementById('ppName')) {
    var p = LocalStore.get('bopeu_partner_profile') || {};
    ['name','contact','email','phone','web','about'].forEach(function (k) {
      var el = document.getElementById('pp' + k.charAt(0).toUpperCase() + k.slice(1));
      if (el && p[k]) el.value = p[k];
    });
    if (p.sector) { var s = document.getElementById('ppSector'); if (s) s.value = p.sector; }
  }
});