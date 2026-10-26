/* ============================================================
   admin.js — EXPANDED
   Keep the existing top-of-file stats + member list.
   Append everything below.
   ============================================================ */

/* ---------- SESSION GUARD (call on every admin page) ---------- */
function adminRequireAuth() {
  var session = window.BOPEUAuth ? window.BOPEUAuth.session() : null;
  if (!session || session.portal !== 'staff' || !LocalStore.get('bopeu_admin_logged_in')) {
    location.href = 'admin-login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search);
    return false;
  }
  return true;
}

function adminCurrentUser() {
  var session = window.BOPEUAuth ? window.BOPEUAuth.session() : null;
  if (session && session.portal === 'staff') {
    return {
      name: session.displayName,
      email: session.email,
      role: session.roleKey,
      roleLabel: session.roleLabel,
      staffId: session.recordId
    };
  }
  return LocalStore.get('bopeu_admin_user') || { name: 'staff@bopeu.org.bw', role: 'processing' };
}

function adminLogout() {
  if (window.BOPEUAuth) {
    window.BOPEUAuth.logout({ redirect: true });
    return;
  }
  LocalStore.remove('bopeu_admin_logged_in');
  LocalStore.remove('bopeu_admin_user');
  location.href = 'admin-login.html';
}

function adminAudit(action, entity) {
  var log = LocalStore.get('bopeu_audit_extra') || [];
  log.unshift({
    at: new Date().toISOString(),
    user: adminCurrentUser().name,
    action: action,
    entity: entity || null
  });
  LocalStore.set('bopeu_audit_extra', log.slice(0, 500));
}

/* ---------- SUBMISSIONS LIST ---------- */
var ADMIN_DEMO_SUBMISSIONS = [
  { id:'BUR-1730000001', type:'bursary',   label:'Educational Bursary', officeName:'Gaborone',   submittedAt:'2026-09-10T09:12:00Z', status:'office_review', applicant:'Kabelo Modise' },
  { id:'LOA-1730000002', type:'loan',      label:'BOPEU Direct Loan',   officeName:'Palapye',    submittedAt:'2026-09-12T14:30:00Z', status:'submitted',     applicant:'Kelebogile Moseki' },
  { id:'FUN-1730000003', type:'funeral',   label:'BOPEU Funeral Cover', officeName:'Gaborone',   submittedAt:'2026-09-13T11:05:00Z', status:'verified',      applicant:'Tumelo Rantao' },
  { id:'BUI-1730000004', type:'building',  label:'Building Materials',  officeName:'Maun',       submittedAt:'2026-09-14T08:00:00Z', status:'approved',      applicant:'Boitumelo Lesego' },
  { id:'GRI-1730000005', type:'grievance', label:'Grievance / Support', officeName:'Francistown',submittedAt:'2026-09-15T16:45:00Z', status:'submitted',     applicant:'Olorato Keaikitse' },
  { id:'BUR-1730000006', type:'bursary',   label:'Educational Bursary', officeName:'Gaborone',   submittedAt:'2026-09-16T10:20:00Z', status:'rejected',      applicant:'Moakofi Sethunya' }
];

function renderAdminStats() {
  var members = window.BOPEU_MOCK_MEMBERS || [];
  var pending = members.filter(function (m) {
    return m.status === 'pending_verification' || m.status === 'pending';
  }).length;
  var total = document.getElementById('adminTotal');
  var pendingEl = document.getElementById('adminPending');
  if (total) total.textContent = members.length;
  if (pendingEl) pendingEl.textContent = pending;
}

function adminAllSubmissions() {
  var live = LocalStore.get('bopeu_applications') || [];
  return ADMIN_DEMO_SUBMISSIONS.concat(live);
}

function renderAdminSubmissions() {
  var grid = document.getElementById('submissionsTable');
  if (!grid) return;
  var q = (document.getElementById('subSearch') || {}).value || '';
  var t = (document.getElementById('subType') || {}).value || '';
  var s = (document.getElementById('subStatus') || {}).value || '';
  q = q.toLowerCase();

  var rows = adminAllSubmissions().filter(function (r) {
    if (t && r.type !== t) return false;
    if (s && r.status !== s) return false;
    if (q) {
      var hay = (r.id + ' ' + (r.label || '') + ' ' + (r.officeName || '') + ' ' + (r.applicant || '')).toLowerCase();
      if (hay.indexOf(q) < 0) return false;
    }
    return true;
  });

  if (!rows.length) { grid.innerHTML = '<div class="empty">No submissions match.</div>'; return; }

  var cls = { submitted:'badge-blue', verified:'badge-blue', office_review:'badge-grey', approved:'badge-green', disbursed:'badge-green', rejected:'badge-red' };
  grid.innerHTML = '<table class="admin-table"><thead><tr>' +
    '<th>Reference</th><th>Type</th><th>Applicant</th><th>Office</th><th>Submitted</th><th>Status</th><th></th>' +
    '</tr></thead><tbody>' +
    rows.map(function (r) {
      return '<tr>' +
        '<td style="font-family:ui-monospace,monospace;font-size:12px;">' + r.id + '</td>' +
        '<td><strong>' + (r.label || r.type) + '</strong></td>' +
        '<td>' + (r.applicant || '—') + '</td>' +
        '<td>' + (r.officeName || '—') + '</td>' +
        '<td>' + new Date(r.submittedAt).toLocaleDateString() + '</td>' +
        '<td><span class="badge ' + (cls[r.status] || 'badge-grey') + '">' + (r.status || '').replace('_',' ') + '</span></td>' +
        '<td><a href="admin-submission-detail.html?id=' + encodeURIComponent(r.id) + '" style="font-weight:700;color:#D32F2F;text-decoration:none;">Open →</a></td>' +
        '</tr>';
    }).join('') + '</tbody></table>';
}

/* ---------- SUBMISSION DETAIL ---------- */
function renderAdminSubmissionDetail() {
  var id = new URLSearchParams(location.search).get('id');
  var live = (LocalStore.get('bopeu_applications') || []).find(function (a) { return a.id === id; });
  var d = live || ADMIN_DEMO_SUBMISSIONS.find(function (x) { return x.id === id; });
  var title = document.getElementById('detailTitle');
  var sub = document.getElementById('detailSub');
  var grid = document.getElementById('detailGrid');
  if (!d) {
    if (title) title.textContent = 'Not found';
    if (sub) sub.textContent = 'Reference ' + (id || '(missing)');
    if (grid) grid.innerHTML = '<div class="empty">No submission found.</div>';
    return;
  }
  if (title) title.textContent = d.label || d.type;
  if (sub) sub.textContent = 'Reference ' + id;
  if (grid) grid.innerHTML =
    '<div class="detail-item"><div class="lbl">Reference</div><div class="val" style="font-family:monospace;">' + id + '</div></div>' +
    '<div class="detail-item"><div class="lbl">Type</div><div class="val">' + (d.type || '') + '</div></div>' +
    '<div class="detail-item"><div class="lbl">Applicant</div><div class="val">' + (d.applicant || '—') + '</div></div>' +
    '<div class="detail-item"><div class="lbl">Office</div><div class="val">' + (d.officeName || '—') + '</div></div>' +
    '<div class="detail-item"><div class="lbl">Submitted</div><div class="val">' + new Date(d.submittedAt).toLocaleString() + '</div></div>' +
    '<div class="detail-item"><div class="lbl">Status</div><div class="val">' + (d.status || '') + '</div></div>';
  var audit1 = document.getElementById('audit1');
  if (audit1) audit1.textContent = new Date(d.submittedAt).toLocaleString();
}

function adminActionOnSubmission(kind) {
  var id = new URLSearchParams(location.search).get('id');
  adminAudit(kind + ' submission ' + id);
  alert('Action "' + kind + '" recorded (demo).');
}

function adminSaveSubmissionNotes() {
  var id = new URLSearchParams(location.search).get('id');
  var notes = (document.getElementById('detailNotes') || {}).value || '';
  LocalStore.set('bopeu_note_' + id, notes);
  adminAudit('Saved notes on ' + id);
  alert('Notes saved.');
}

/* ---------- MEMBER DETAIL ---------- */
function renderAdminMemberDetail() {
  var omang = new URLSearchParams(location.search).get('omang');
  var m = (window.BOPEU_MOCK_MEMBERS || []).find(function (x) { return x.omang === omang; });
  var nameEl = document.getElementById('memberName');
  var subEl = document.getElementById('memberSub');
  var grid = document.getElementById('memberGrid');
  var empGrid = document.getElementById('employmentGrid');
  if (!m) {
    if (nameEl) nameEl.textContent = 'Not found';
    if (subEl) subEl.textContent = 'Omang ' + (omang || '(missing)');
    if (grid) grid.innerHTML = '<div class="empty">No member found.</div>';
    return;
  }
  if (nameEl) nameEl.textContent = m.name;
  if (subEl) subEl.textContent = m.memberNo + ' · ' + m.sectorLabel;
  if (grid) grid.innerHTML =
    '<div class="detail-item"><div class="lbl">Name</div><div class="val">' + m.name + '</div></div>' +
    '<div class="detail-item"><div class="lbl">Omang</div><div class="val">' + m.omang + '</div></div>' +
    '<div class="detail-item"><div class="lbl">Member no.</div><div class="val">' + m.memberNo + '</div></div>' +
    '<div class="detail-item"><div class="lbl">District</div><div class="val">' + m.district + '</div></div>' +
    '<div class="detail-item"><div class="lbl">Office</div><div class="val">' + m.office + '</div></div>' +
    '<div class="detail-item"><div class="lbl">Joined</div><div class="val">' + m.joined + '</div></div>' +
    '<div class="detail-item"><div class="lbl">Status</div><div class="val">' + m.status + '</div></div>';
  if (empGrid) empGrid.innerHTML =
    '<div class="detail-item"><div class="lbl">Sector</div><div class="val">' + m.sectorLabel + '</div></div>' +
    '<div class="detail-item"><div class="lbl">Employer</div><div class="val">' + m.employer + '</div></div>' +
    '<div class="detail-item"><div class="lbl">Job</div><div class="val">' + m.jobTitle + '</div></div>' +
    '<div class="detail-item"><div class="lbl">Basic salary</div><div class="val">P ' + (m.basicSalary || 0).toLocaleString() + '</div></div>';
}

function adminMemberAction(kind) {
  adminAudit(kind + ' member');
  alert('Action "' + kind + '" recorded (demo).');
}

/* ---------- REPORTS ---------- */
function adminRunReport(kind) {
  var out = document.getElementById('reportOutput');
  if (!out) return;
  out.className = '';
  var members = LocalStore.get('bopeu_members') || BOPEU_MOCK_MEMBERS || [];
  var apps = LocalStore.get('bopeu_applications') || [];

  function renderTable(headers, rows, footer) {
    var h = '<table class="admin-table"><thead><tr>' + headers.map(function (x) { return '<th>' + x + '</th>'; }).join('') + '</tr></thead><tbody>';
    h += rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('');
    h += '</tbody></table>';
    if (footer) h += '<p style="margin-top:12px;color:#718096;font-size:13px;">' + footer + '</p>';
    h += '<div style="text-align:right;margin-top:12px;"><button class="btn btn-secondary btn-small" onclick="alert(\'CSV export (demo).\')">Export CSV</button></div>';
    return h;
  }

  if (kind === 'members_by_sector') {
    var by = {};
    members.forEach(function (m) { by[m.sectorLabel] = (by[m.sectorLabel] || 0) + 1; });
    out.innerHTML = renderTable(['Sector','Members'], Object.keys(by).map(function (k) { return [k, by[k]]; }), 'Total: ' + members.length);
  } else if (kind === 'submissions_by_status') {
    var by = {};
    apps.forEach(function (a) { by[a.status] = (by[a.status] || 0) + 1; });
    if (!Object.keys(by).length) { out.innerHTML = '<div class="empty">No submissions yet.</div>'; return; }
    out.innerHTML = renderTable(['Status','Count'], Object.keys(by).map(function (k) { return [k, by[k]]; }), 'Total: ' + apps.length);
  } else if (kind === 'submissions_by_type') {
    var by = {};
    apps.forEach(function (a) { by[a.type] = (by[a.type] || 0) + 1; });
    if (!Object.keys(by).length) { out.innerHTML = '<div class="empty">No submissions yet.</div>'; return; }
    out.innerHTML = renderTable(['Type','Count'], Object.keys(by).map(function (k) { return [k, by[k]]; }), 'Total: ' + apps.length);
  } else if (kind === 'grievances_open') {
    var open = apps.filter(function (a) { return a.type === 'grievance' && a.status !== 'approved' && a.status !== 'disbursed'; });
    if (!open.length) { out.innerHTML = '<div class="empty">No open grievances.</div>'; return; }
    out.innerHTML = renderTable(['Reference','Office','Status'], open.map(function (a) { return [a.id, a.officeName, a.status]; }), '');
  } else if (kind === 'claims_by_status') {
    var claims = LocalStore.get('bopeu_claims') || [];
    if (!claims.length) { out.innerHTML = '<div class="empty">No claims recorded.</div>'; return; }
    var by = {};
    claims.forEach(function (c) { by[c.status] = (by[c.status] || 0) + 1; });
    out.innerHTML = renderTable(['Status','Count'], Object.keys(by).map(function (k) { return [k, by[k]]; }), 'Total: ' + claims.length);
  } else {
    out.innerHTML = '<div class="empty">Partner analytics available in Phase 2.</div>';
  }
}

/* ---------- AUDIT LOG ---------- */
function renderAdminAuditLog() {
  var box = document.getElementById('auditLogList');
  if (!box) return;
  var seed = [
    { at:'2026-09-20T14:32:00Z', user:'k.modise@bopeu.org.bw',  action:'Signed in (WhatsApp identity + password)' },
    { at:'2026-09-20T14:35:00Z', user:'k.modise@bopeu.org.bw',  action:'Viewed member BOPEU-37K-1003' },
    { at:'2026-09-20T14:38:00Z', user:'n.sekgoma@bopeu.org.bw', action:'Approved submission BUI-1730000004' },
    { at:'2026-09-19T11:12:00Z', user:'t.molefe@bopeu.org.bw',  action:'Published notice "Monthly Subscription Deduction"' },
    { at:'2026-09-18T16:20:00Z', user:'r.mogwe@bopeu.org.bw',   action:'Exported Q3 submissions report' }
  ];
  var custom = LocalStore.get('bopeu_audit_extra') || [];
  var rows = custom.concat(seed);
  box.innerHTML = rows.map(function (r) {
    return '<div class="log-row">' +
      '<div class="log-time">' + new Date(r.at).toLocaleString() + '</div>' +
      '<div><span class="log-user">' + r.user + '</span> — ' + r.action + '</div>' +
      '<div style="text-align:right;"><span class="badge badge-grey">logged</span></div>' +
      '</div>';
  }).join('');
}

/* ---------- GLOBAL SEARCH ---------- */
function adminGlobalSearch() {
  var q = ((document.getElementById('gSearch') || {}).value || '').toLowerCase().trim();
  var box = document.getElementById('gResults');
  if (!box) return;
  if (!q) { box.innerHTML = '<div class="empty">Start typing to search.</div>'; return; }
  var matches = [];
  (BOPEU_MOCK_MEMBERS || []).forEach(function (m) {
    if ((m.name + ' ' + m.omang + ' ' + m.memberNo + ' ' + m.employer).toLowerCase().indexOf(q) >= 0)
      matches.push({ type:'Member', name:m.name, ref:m.memberNo, href:'admin-member-detail.html?omang=' + m.omang });
  });
  (LocalStore.get('bopeu_staff') || []).forEach(function (s) {
    if ((s.name + ' ' + s.email).toLowerCase().indexOf(q) >= 0)
      matches.push({ type:'Staff', name:s.name, ref:s.email, href:'admin-staff-detail.html?id=' + s.id });
  });
  (LocalStore.get('bopeu_leads') || []).forEach(function (l) {
    if ((l.name + ' ' + (l.phone||'') + ' ' + (l.employer||'')).toLowerCase().indexOf(q) >= 0)
      matches.push({ type:'Lead', name:l.name, ref:l.id, href:'admin-lead-detail.html?id=' + l.id });
  });
  (BOPEU_BENEFIT_PARTNERS || []).forEach(function (p) {
    if ((p.name + ' ' + p.sector).toLowerCase().indexOf(q) >= 0)
      matches.push({ type:'Partner', name:p.name, ref:p.sector, href:'admin-partner-detail.html?id=' + p.id });
  });
  box.innerHTML = matches.length ? matches.map(function (m) {
    return '<a class="row" href="' + m.href + '">' +
      '<div class="row-icon">' + m.type.charAt(0) + '</div>' +
      '<div class="row-body"><div class="row-title">' + m.name + '</div><div class="row-desc">' + m.type + ' · ' + m.ref + '</div></div>' +
      '</a>';
  }).join('') : '<div class="empty">No matches.</div>';
}

/* ---------- INIT (runs on every admin page) ---------- */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('admin-modal')) return;

  if (document.getElementById('adminTotal') && document.getElementById('adminPending')) renderAdminStats();
  if (document.getElementById('adminMembersList')) renderAdminMembers();
  if (document.getElementById('submissionsTable')) renderAdminSubmissions();
  if (document.getElementById('detailGrid')) renderAdminSubmissionDetail();
  if (document.getElementById('memberGrid')) renderAdminMemberDetail();
  if (document.getElementById('auditLogList')) renderAdminAuditLog();
  if (document.getElementById('gSearch')) adminGlobalSearch();
});