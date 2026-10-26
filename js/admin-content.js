/* ============================================================
   admin-content.js
   Content hub, promotions, noticeboards, analytics, calendar, media
   ============================================================ */

var ADMIN_DEMO_PROMOS = {
  'P-1': { id:'P-1', title:'Diagnofirm Health Week', teaser:'Exclusive health & fitness discounts.',
           cover:'Assets/timeline_feed_images/lifestyle_discounts_at_selected_retailers_and_hotels.webp',
           audience:['All members'], start:'2026-09-01', end:'2026-09-30', status:'live', priority:'high', source:'Diagnofirm' },
  'P-2': { id:'P-2', title:'Funeral Cover Awareness', teaser:'Know your Metropolitan Life cover.',
           cover:'Assets/timeline_feed_images/insurance_bopeu_funeral_cover.webp',
           audience:['Central Government'], start:'2026-10-01', end:'2026-10-31', status:'scheduled', priority:'normal', source:'BOPEU' },
  'P-3': { id:'P-3', title:'Bursary Applications Open', teaser:'Interest-free bursary up to P30,000.',
           cover:'Assets/timeline_feed_images/educational_bursaries.webp',
           audience:['All members'], start:'2026-08-01', end:'2026-08-31', status:'ended', priority:'normal', source:'BOPEU' }
};

/* ---------- PROMOTIONS LIST ---------- */
function adminRenderPromotions() {
  var box = document.getElementById('promoList');
  if (!box) return;
  var custom = LocalStore.get('bopeu_promotions') || [];
  var rows = custom.concat(Object.values(ADMIN_DEMO_PROMOS).filter(function (p) {
    return !custom.some(function (c) { return c.id === p.id; });
  }));
  box.innerHTML = rows.map(function (p) {
    var cls = p.status === 'live' ? 'badge-green' : (p.status === 'scheduled' ? 'badge-blue' : 'badge-grey');
    return '<tr><td><strong>' + p.title + '</strong></td>' +
      '<td>' + (Array.isArray(p.audience) ? p.audience.join(', ') : p.audience) + '</td>' +
      '<td>' + (p.start || '—') + ' → ' + (p.end || '—') + '</td>' +
      '<td><span class="badge ' + cls + '">' + p.status + '</span></td>' +
      '<td><a href="admin-promotion-edit.html?id=' + p.id + '" style="font-weight:700;color:#D32F2F;text-decoration:none;">Edit →</a></td></tr>';
  }).join('');
}

/* ---------- PROMOTION EDIT ---------- */
var ADMIN_EDIT_PROMO_ID = null;

function adminLoadPromotion() {
  ADMIN_EDIT_PROMO_ID = new URLSearchParams(location.search).get('id');
  if (!ADMIN_EDIT_PROMO_ID) { adminResetPromoForm(); return; }
  var live = (LocalStore.get('bopeu_promotions') || []).find(function (p) { return p.id === ADMIN_EDIT_PROMO_ID; });
  var p = live || ADMIN_DEMO_PROMOS[ADMIN_EDIT_PROMO_ID];
  if (!p) return;
  ['pTitle:p.title','pTeaser:p.teaser','pBody:p.body','pCover:p.cover','pStart:p.start','pEnd:p.end','pPriority:p.priority','pSource:p.source'].forEach(function (pair) {
    var parts = pair.split(':');
    var el = document.getElementById(parts[0]);
    if (el && p[parts[1]] !== undefined) el.value = p[parts[1]];
  });
  (p.audience || []).forEach(function (v) {
    document.querySelectorAll('#audiencePills input').forEach(function (cb) { if (cb.value === v) cb.checked = true; });
  });
  var deleteCard = document.getElementById('deleteCard');
  if (deleteCard) deleteCard.style.display = 'block';
  adminRefreshPromoPreview();
}

function adminResetPromoForm() {
  var iso = function (d) { return d.toISOString().slice(0,10); };
  var today = new Date();
  var end = new Date(today); end.setDate(end.getDate() + 30);
  var s = document.getElementById('pStart'); if (s) s.value = iso(today);
  var e = document.getElementById('pEnd'); if (e) e.value = iso(end);
  adminRefreshPromoPreview();
}

function adminRefreshPromoPreview() {
  var title = ((document.getElementById('pTitle')||{}).value || '').trim();
  var teaser = ((document.getElementById('pTeaser')||{}).value || '').trim();
  var cover = ((document.getElementById('pCover')||{}).value || '').trim();
  var start = (document.getElementById('pStart')||{}).value || '';
  var meta = start ? new Date(start).toLocaleDateString() : 'Unscheduled';

  var pvMeta = document.getElementById('pvMeta'); if (pvMeta) pvMeta.textContent = meta + ' · Promotion';
  var pvTitle = document.getElementById('pvTitle'); if (pvTitle) pvTitle.textContent = title || 'Your promotion title';
  var pvDesc = document.getElementById('pvDesc'); if (pvDesc) pvDesc.textContent = teaser || 'Teaser appears here…';
  var pvImg = document.getElementById('pvImg');
  if (pvImg) {
    if (cover) pvImg.innerHTML = '<img src="' + cover + '" alt="" onerror="this.style.display=\'none\'">';
    else pvImg.textContent = 'BOPEU';
  }
}

function adminSavePromotion(publish) {
  var title = ((document.getElementById('pTitle')||{}).value || '').trim();
  if (!title) { alert('Title required.'); return; }
  var audience = [];
  document.querySelectorAll('#audiencePills input:checked').forEach(function (cb) { audience.push(cb.value); });

  var rec = {
    id: ADMIN_EDIT_PROMO_ID || ('P-' + Date.now()),
    title: title,
    teaser: (document.getElementById('pTeaser')||{}).value || '',
    body: (document.getElementById('pBody')||{}).value || '',
    cover: (document.getElementById('pCover')||{}).value || '',
    audience: audience,
    start: (document.getElementById('pStart')||{}).value || '',
    end: (document.getElementById('pEnd')||{}).value || '',
    priority: (document.getElementById('pPriority')||{}).value || 'normal',
    source: (document.getElementById('pSource')||{}).value || '',
    status: publish ? 'live' : 'draft',
    updatedAt: new Date().toISOString()
  };
  var list = (LocalStore.get('bopeu_promotions') || []).filter(function (p) { return p.id !== rec.id; });
  list.unshift(rec);
  LocalStore.set('bopeu_promotions', list);
  adminAudit((publish ? 'Published' : 'Saved draft') + ' promotion "' + rec.title + '"');
  alert(publish ? 'Published.' : 'Saved as draft.');
  location.href = 'admin-promotions.html';
}

function adminDeletePromotion() {
  if (!ADMIN_EDIT_PROMO_ID) return;
  if (!confirm('Delete this promotion?')) return;
  var list = (LocalStore.get('bopeu_promotions') || []).filter(function (p) { return p.id !== ADMIN_EDIT_PROMO_ID; });
  LocalStore.set('bopeu_promotions', list);
  adminAudit('Deleted promotion ' + ADMIN_EDIT_PROMO_ID);
  location.href = 'admin-promotions.html';
}

/* ---------- NOTICEBOARDS ---------- */
function adminRenderNoticeboards() {
  var box = document.getElementById('noticeList');
  if (!box) return;
  var custom = LocalStore.get('bopeu_admin_notices') || [];
  var seed = (BOPEU_NOTICES || []).map(function (n) {
    return { id:n.id, title:n.title, category:'General', pinned:false, date:n.date, status:'published' };
  });
  var rows = custom.concat(seed);
  box.innerHTML = rows.map(function (n) {
    return '<tr><td><strong>' + n.title + '</strong></td>' +
      '<td>' + (n.category || 'General') + '</td>' +
      '<td>' + (n.pinned ? '📌' : '—') + '</td>' +
      '<td>' + (n.date || '') + '</td>' +
      '<td><a href="admin-notice-edit.html?id=' + n.id + '" style="font-weight:700;color:#D32F2F;text-decoration:none;">Edit →</a></td></tr>';
  }).join('');
}

function adminSaveNotice() {
  var n = {
    id: 'N-' + Date.now(),
    title: (document.getElementById('nT')||{}).value || '',
    body: (document.getElementById('nBody')||{}).value || '',
    category: (document.getElementById('nCat')||{}).value || 'General',
    date: (document.getElementById('nDate')||{}).value || new Date().toISOString().slice(0,10),
    end: (document.getElementById('nEnd')||{}).value || '',
    pinned: !!(document.getElementById('nPin')||{}).checked,
    status: 'published'
  };
  if (!n.title) { alert('Title required.'); return; }
  var list = LocalStore.get('bopeu_admin_notices') || [];
  list.unshift(n);
  LocalStore.set('bopeu_admin_notices', list);
  adminAudit('Published notice "' + n.title + '"');
  alert('Saved.');
  location.href = 'admin-noticeboards.html';
}

/* ---------- CONTENT ANALYTICS ---------- */
function adminRenderContentAnalytics() {
  var events = LocalStore.get('bopeu_content_events') || [];
  var kpi = document.getElementById('kpiRow');
  if (!kpi) return;
  function count(t) { return events.filter(function (e) { return e.type === t; }).length; }
  kpi.innerHTML =
    '<div class="kpi"><div class="lbl">Impressions</div><div class="val">' + count('impression') + '</div></div>' +
    '<div class="kpi"><div class="lbl">Views</div><div class="val">' + count('view') + '</div></div>' +
    '<div class="kpi"><div class="lbl">Clicks</div><div class="val">' + count('click') + '</div></div>' +
    '<div class="kpi"><div class="lbl">Shares</div><div class="val">' + count('share') + '</div></div>' +
    '<div class="kpi"><div class="lbl">Redemptions</div><div class="val">' + count('redemption') + '</div></div>';

  var top = document.getElementById('topContent');
  if (top) {
    if (!events.length) {
      top.innerHTML = '<div class="empty">No events yet. As members view promotions and notices, analytics populate here.</div>';
    } else {
      var by = {};
      events.forEach(function (e) {
        if (!by[e.contentId]) by[e.contentId] = { imp:0, views:0, clicks:0 };
        if (e.type === 'impression') by[e.contentId].imp++;
        if (e.type === 'view') by[e.contentId].views++;
        if (e.type === 'click') by[e.contentId].clicks++;
      });
      top.innerHTML = '<table class="admin-table"><thead><tr><th>Content</th><th>Impressions</th><th>Views</th><th>Clicks</th></tr></thead><tbody>' +
        Object.keys(by).map(function (k) {
          return '<tr><td>' + k + '</td><td>' + by[k].imp + '</td><td>' + by[k].views + '</td><td>' + by[k].clicks + '</td></tr>';
        }).join('') + '</tbody></table>';
    }
  }
}

/* ---------- CONTENT CALENDAR ---------- */
function adminRenderCalendar() {
  var grid = document.getElementById('calGrid');
  if (!grid) return;
  var promos = LocalStore.get('bopeu_promotions') || [];
  var notices = LocalStore.get('bopeu_admin_notices') || [];
  var events = [];
  promos.forEach(function (p) { if (p.start) events.push({ date:p.start, title:'[Promo] ' + p.title }); });
  notices.forEach(function (n) { if (n.date) events.push({ date:n.date, title:'[Notice] ' + n.title }); });

  var now = new Date();
  var first = new Date(now.getFullYear(), now.getMonth(), 1);
  var start = new Date(first); start.setDate(1 - first.getDay());
  var html = '';
  for (var w = 0; w < 5; w++) {
    for (var d = 0; d < 7; d++) {
      var cur = new Date(start); cur.setDate(start.getDate() + w * 7 + d);
      var iso = cur.toISOString().slice(0, 10);
      var dayEvents = events.filter(function (e) { return e.date === iso; })
        .map(function (e) { return '<div class="cal-event">' + e.title + '</div>'; }).join('');
      html += '<div class="cal-day"><strong>' + cur.getDate() + '</strong>' + dayEvents + '</div>';
    }
  }
  grid.innerHTML = html;
}

/* ---------- MEDIA LIBRARY ---------- */
function adminRenderMedia() {
  var grid = document.getElementById('mediaGrid');
  if (!grid) return;
  var stored = LocalStore.get('bopeu_media') || [];
  var seed = [
    { name:'bopeu_logo.webp', url:'Assets/logo/bopeu_logo.webp' },
    { name:'bona_life_logo.webp', url:'Assets/logo/forms/bona_life_logo.webp' },
    { name:'blic_logo.webp', url:'Assets/logo/forms/blic_logo.webp' }
  ];
  var all = stored.concat(seed);
  grid.innerHTML = all.map(function (m) {
    return '<div class="media-tile"><img src="' + m.url + '" alt="" onerror="this.style.display=\'none\'"><div>' + m.name + '</div></div>';
  }).join('');
}

function adminUploadMedia(e) {
  var f = e.target.files && e.target.files[0];
  if (!f) return;
  var r = new FileReader();
  r.onload = function (ev) {
    var list = LocalStore.get('bopeu_media') || [];
    list.unshift({ name:f.name, url:ev.target.result });
    LocalStore.set('bopeu_media', list);
    adminRenderMedia();
    alert('Uploaded.');
  };
  r.readAsDataURL(f);
  e.target.value = '';
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('promoList')) adminRenderPromotions();
  if (document.getElementById('pTitle')) adminLoadPromotion();
  if (document.getElementById('noticeList')) adminRenderNoticeboards();
  if (document.getElementById('kpiRow')) adminRenderContentAnalytics();
  if (document.getElementById('calGrid')) adminRenderCalendar();
  if (document.getElementById('mediaGrid')) adminRenderMedia();
});