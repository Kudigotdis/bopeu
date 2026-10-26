/* ============================================================
   BOPEU unified demo authentication
   Member / Staff / Benefit Partner portals
   Login: WhatsApp number + first name + password (demo: 1234)
   ============================================================ */
(function () {
  'use strict';

  if (window.BOPEUAuth) return;

  var SESSION_KEY = 'bopeu_session';
  var DEMO_PASSWORD = String(window.BOPEU_DEMO_PASSWORD || '1234');
  var NO_IMAGE = 'Assets/Demo Profile Images/NO IMAGE.png';
  var STYLE_ID = 'bopeuAuthStyles';

  var LEGACY_PURGE_KEYS = ['bopeu_otp', 'bopeu_admin_otp', 'bopeu_partner_otp', 'bopeu_mfa', 'bopeu_mfa_enabled', 'bopeu_mfa_recovery'];
  var LEGACY_SESSION_KEYS = [
    'bopeu_logged_in', 'bopeu_profile',
    'bopeu_admin_logged_in', 'bopeu_admin_user',
    'bopeu_partner_logged_in', 'bopeu_partner_user', 'bopeu_partner_profile'
  ];

  var STAFF_BASE_PAGES = [
    'admin-dashboard.html',
    'admin-global-search.html',
    'admin-notifications-center.html',
    'admin-feedback.html',
    'admin-reports.html'
  ];

  var STAFF_ROLE_PAGES = {
    ROLE_MARKETING: [
      'admin-content.html', 'admin-content-calendar.html', 'admin-content-analytics.html',
      'admin-content-moderation.html', 'admin-promotions.html', 'admin-promotion-edit.html',
      'admin-noticeboards.html', 'admin-notice-edit.html', 'admin-media-library.html',
      'admin-partners.html', 'admin-partner-detail.html', 'admin-insurance-quotes.html',
      'admin-email-templates.html', 'admin-sms-templates.html', 'admin-whatsapp-templates.html'
    ],
    ROLE_SALES_RECRUITMENT: [
      'admin-sales-pipeline.html', 'admin-sales-reports.html', 'admin-lead-import.html',
      'admin-lead-detail.html', 'admin-members.html', 'admin-member-detail.html',
      'admin-member-tags.html', 'admin-submissions.html', 'admin-submission-detail.html',
      'admin-content-moderation.html'
    ],
    ROLE_FINANCE_AUDITOR: [
      'admin-finance-dashboard.html', 'admin-loan-queue.html', 'admin-data-import.html',
      'admin-approvals.html'
    ],
    ROLE_WELFARE_CLAIMS: [
      'admin-welfare-queue.html', 'admin-funeral-claims.html', 'admin-bursary-queue.html',
      'admin-submissions.html', 'admin-submission-detail.html', 'admin-members.html',
      'admin-member-detail.html', 'admin-member-tags.html', 'admin-approvals.html'
    ],
    ROLE_REGIONAL_COORDINATOR: [
      'admin-regional-meetings.html', 'admin-shop-stewards.html', 'admin-members.html',
      'admin-member-detail.html', 'admin-member-tags.html', 'admin-submissions.html',
      'admin-submission-detail.html', 'admin-grievances.html', 'admin-noticeboards.html',
      'admin-notice-edit.html'
    ],
    ROLE_OPERATIONS_LEGAL: [
      'admin-grievances.html', 'admin-bargaining-alerts.html', 'admin-submissions.html',
      'admin-submission-detail.html'
    ]
  };

  var PORTAL_LABELS = {
    member: 'BOPEU Member',
    staff: 'BOPEU Staff',
    partner: 'Benefit Partner'
  };

  /* ---------------- storage helpers ---------------- */
  function read(key) {
    try {
      var value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      return null;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* private mode / quota */
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      /* ignore */
    }
  }

  function currentPage() {
    var name = (window.location.pathname || '').split('/').pop();
    return name || 'index.html';
  }

  function currentSearch() {
    return window.location.search || '';
  }

  function currentHash() {
    return window.location.hash || '';
  }

  /* ---------------- data helpers ---------------- */
  function demoProfiles() {
    return Array.isArray(window.BOPEU_DEMO_PROFILES) ? window.BOPEU_DEMO_PROFILES : [];
  }

  function demoGroups() {
    return Array.isArray(window.BOPEU_DEMO_GROUPS) ? window.BOPEU_DEMO_GROUPS : [];
  }

  function registeredAccounts() {
    var accounts = read('bopeu_accounts');
    return Array.isArray(accounts) ? accounts : [];
  }

  function allProfiles() {
    return demoProfiles().concat(registeredAccounts());
  }

  function profileById(id) {
    if (!id) return null;
    return allProfiles().find(function (profile) { return profile.id === id; }) || null;
  }

  function normalisePhone(value) {
    var digits = String(value || '').replace(/\D/g, '');
    if (digits.length > 8) return digits.slice(-8);
    return digits;
  }

  function normaliseName(value) {
    return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function profileByCredentials(whatsapp, firstName) {
    var phone = normalisePhone(whatsapp);
    var name = normaliseName(firstName);
    if (!phone || !name) return null;
    return allProfiles().find(function (profile) {
      return normalisePhone(profile.whatsapp || profile.whatsappDigits) === phone &&
        normaliseName(profile.firstName) === name;
    }) || null;
  }

  function passwordOverrides() {
    var overrides = read('bopeu_password_overrides');
    return overrides && typeof overrides === 'object' ? overrides : {};
  }

  function passwordFor(profile) {
    if (!profile) return DEMO_PASSWORD;
    var overrides = passwordOverrides();
    return String(overrides[profile.id] || profile.password || DEMO_PASSWORD);
  }

  function setPassword(profileId, password) {
    if (!profileId || !password) return false;
    var overrides = passwordOverrides();
    overrides[profileId] = String(password);
    write('bopeu_password_overrides', overrides);

    var accounts = registeredAccounts();
    var changed = false;
    accounts.forEach(function (account) {
      if (account.id === profileId) {
        account.password = String(password);
        changed = true;
      }
    });
    if (changed) write('bopeu_accounts', accounts);
    return true;
  }

  function session() {
    return read(SESSION_KEY);
  }

  function clearSessionFlags() {
    LEGACY_SESSION_KEYS.concat(LEGACY_PURGE_KEYS).forEach(remove);
    remove(SESSION_KEY);
  }

  function startSession(profile) {
    if (!profile) return null;

    clearSessionFlags();

    var payload = {
      profileId: profile.id,
      recordId: profile.recordId || profile.id,
      portal: profile.portal || 'member',
      roleKey: profile.roleKey || 'ROLE_MEMBER',
      roleLabel: profile.roleLabel || PORTAL_LABELS[profile.portal] || 'Member',
      firstName: profile.firstName || '',
      surname: profile.surname || '',
      displayName: profile.displayName || profile.firstName || '',
      whatsapp: profile.whatsapp || '',
      whatsappDigits: profile.whatsappDigits || normalisePhone(profile.whatsapp),
      email: profile.email || '',
      workPlace: profile.workPlace || '',
      jobTitle: profile.jobTitle || '',
      organization: profile.organization || '',
      branch: profile.branch || '',
      image: profile.image || NO_IMAGE,
      groupId: profile.groupId || '',
      groupLabel: profile.groupLabel || PORTAL_LABELS[profile.portal] || '',
      metrics: profile.metrics || {},
      permissions: profile.permissions || '',
      dataScope: profile.dataScope || '',
      loginAt: new Date().toISOString(),
      demo: true
    };

    write(SESSION_KEY, payload);

    if (payload.portal === 'staff') {
      write('bopeu_admin_logged_in', true);
      write('bopeu_admin_user', {
        name: payload.displayName,
        email: payload.email,
        role: payload.roleKey,
        roleLabel: payload.roleLabel,
        staffId: payload.recordId,
        department: payload.workPlace,
        loginAt: payload.loginAt
      });
    } else if (payload.portal === 'partner') {
      write('bopeu_partner_logged_in', true);
      write('bopeu_partner_user', {
        id: payload.recordId,
        name: payload.displayName,
        organization: payload.organization,
        role: payload.roleLabel,
        loginAt: payload.loginAt
      });
      write('bopeu_partner_profile', {
        name: payload.organization || payload.displayName,
        sector: payload.roleLabel,
        contact: payload.displayName,
        email: payload.email,
        phone: payload.whatsapp,
        web: '',
        about: payload.permissions || '',
        branch: payload.branch || ''
      });
    } else {
      write('bopeu_logged_in', true);
      write('bopeu_profile', profile.memberProfile || {
        personal: {
          firstName: payload.firstName,
          surname: payload.surname,
          phone: payload.whatsapp,
          email: payload.email,
          omang: '',
          dob: ''
        },
        employment: { jobTitle: payload.jobTitle, employerLabel: payload.workPlace },
        location: { district: '', town: '', area: '', workStation: payload.workPlace },
        memberNo: payload.recordId,
        joined: '',
        status: 'active'
      });
    }

    write('bopeu_demo_profile_id', profile.id);
    return payload;
  }

  /* ---------------- page access ---------------- */
  function allowedStaffPages(roleKey) {
    if (roleKey === 'ROLE_SUPER_ADMIN') return null;
    var pages = STAFF_BASE_PAGES.concat(STAFF_ROLE_PAGES[roleKey] || []);
    return new Set(pages);
  }

  function staffCanAccess(roleKey, page) {
    var allowed = allowedStaffPages(roleKey);
    return !allowed || allowed.has(page);
  }

  function safeNext(value) {
    if (!value || value.indexOf('://') !== -1 || value.indexOf('//') === 0 || value.indexOf('..') !== -1) return '';
    if (!/^[a-z0-9][a-z0-9-]*\.html(?:[?#].*)?$/i.test(value)) return '';
    return value;
  }

  function nextAllowedFor(profile) {
    var next = safeNext(new URLSearchParams(currentSearch()).get('next'));
    if (!next) return '';
    var page = next.split(/[?#]/)[0];
    if (profile.portal === 'staff' && staffCanAccess(profile.roleKey, page)) return next;
    if (profile.portal === 'partner' && page.indexOf('partner-') === 0) return next;
    if (profile.portal === 'member' && page.indexOf('admin-') !== 0 && page.indexOf('partner-') !== 0) return next;
    return '';
  }

  function redirectForLogin(profile) {
    return nextAllowedFor(profile) || profile.landing || 'index.html';
  }

  function guardCurrentPage() {
    var page = currentPage();
    var active = session();

    if (page.indexOf('admin-') === 0 && page !== 'admin-login.html') {
      if (!active || active.portal !== 'staff' || !read('bopeu_admin_logged_in')) {
        var next = page + currentSearch() + currentHash();
        window.location.replace('admin-login.html?next=' + encodeURIComponent(next));
        return false;
      }
      if (!staffCanAccess(active.roleKey, page)) {
        window.location.replace('admin-dashboard.html?denied=' + encodeURIComponent(page));
        return false;
      }
    }

    if (page.indexOf('partner-') === 0 && page !== 'partner-login.html') {
      if (!active || active.portal !== 'partner' || !read('bopeu_partner_logged_in')) {
        var pnext = page + currentSearch() + currentHash();
        window.location.replace('partner-login.html?next=' + encodeURIComponent(pnext));
        return false;
      }
    }

    return true;
  }

  /* ---------------- UI helpers ---------------- */
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function themeForPage() {
    var page = currentPage();
    if (page.indexOf('partner-') === 0) return 'partner';
    if (page.indexOf('admin-') === 0) return 'staff';
    return 'member';
  }

  function ensureAuthStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var link = document.createElement('link');
    link.id = STYLE_ID;
    link.rel = 'stylesheet';
    link.href = 'css/auth.css';
    document.head.appendChild(link);
  }

  function openModal(id) {
    if (typeof window.openModal === 'function') {
      window.openModal(id);
      return;
    }
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('active');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal(id) {
    if (typeof window.closeModal === 'function') {
      window.closeModal(id);
      return;
    }
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('active');
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  function ensureModalBody() {
    var modal = document.getElementById('login-modal');
    if (!modal) return null;
    var content = modal.querySelector('.modal-content');
    if (!content) return null;
    var body = document.getElementById('loginModalBody');
    if (!body) {
      content.innerHTML = '<button class="modal-close" type="button" onclick="closeModal(\'login-modal\')">✕</button>' +
        '<div id="loginModalBody"></div>';
      body = document.getElementById('loginModalBody');
    }
    content.classList.add('auth-modal-content');
    return body;
  }

  function loginFormHtml(theme) {
    return '' +
      '<div class="auth-view" data-auth-theme="' + escapeHtml(theme) + '">' +
        '<div class="auth-hero">' +
          '<div class="auth-kicker">' + (theme === 'partner' ? 'Benefit Partner Portal' : theme === 'staff' ? 'BOPEU Staff Portal' : 'BOPEU Member Services') + '</div>' +
          '<h2>Sign in to your portal</h2>' +
          '<p>Use your WhatsApp number, first name and password.</p>' +
        '</div>' +
        '<form class="auth-form" onsubmit="event.preventDefault();BOPEUAuth.loginFromForm();">' +
          '<div class="auth-field">' +
            '<label for="authWhatsapp">WhatsApp Number</label>' +
            '<input id="authWhatsapp" name="whatsapp" type="tel" inputmode="tel" autocomplete="tel" placeholder="e.g. 71 000 101" required>' +
          '</div>' +
          '<div class="auth-field">' +
            '<label for="authFirstName">First Name</label>' +
            '<input id="authFirstName" name="firstName" type="text" autocomplete="given-name" placeholder="e.g. Jackson" required>' +
          '</div>' +
          '<div class="auth-field">' +
            '<label for="authPassword">Password</label>' +
            '<input id="authPassword" name="password" type="password" autocomplete="current-password" placeholder="Demo password" required>' +
          '</div>' +
          '<div class="auth-error" id="authError" role="alert" aria-live="polite"></div>' +
          '<button class="auth-submit" type="submit">Sign in</button>' +
          '<button class="auth-demo-link" type="button" onclick="BOPEUAuth.openDemoProfiles()">Browse demo profiles</button>' +
        '</form>' +
        '<p class="auth-hint">Every demo profile uses password <strong>1234</strong>.</p>' +
        '<div class="auth-links">' +
          (theme === 'member' ? '<a href="register.html">Create account</a>' : '') +
          '<a href="login.html">Member sign in</a>' +
          '<a href="admin-login.html">Staff sign in</a>' +
          '<a href="partner-login.html">Partner sign in</a>' +
          '<a href="forgot-password.html">Reset password</a>' +
        '</div>' +
      '</div>';
  }

  function renderLoginInto(container, theme) {
    if (!container) return;
    container.innerHTML = loginFormHtml(theme || themeForPage());
  }

  function tileHtml(profile) {
    var meta = [profile.workPlace, profile.jobTitle].filter(Boolean).join(' · ');
    return '' +
      '<button type="button" class="demo-profile-tile" onclick="BOPEUAuth.loginAsDemo(\'' + escapeHtml(profile.id) + '\')" aria-label="Sign in as ' + escapeHtml(profile.displayName) + '">' +
        '<img class="demo-profile-thumb" src="' + escapeHtml(profile.image || NO_IMAGE) + '" alt="" loading="lazy" onerror="this.onerror=null;this.src=\'' + NO_IMAGE + '\';">' +
        '<span class="demo-profile-copy">' +
          '<span class="demo-profile-name">' + escapeHtml(profile.displayName) + '</span>' +
          '<span class="demo-profile-meta">' + escapeHtml(meta) + '</span>' +
        '</span>' +
      '</button>';
  }

  function renderDemoInto(container) {
    if (!container) return;
    var groups = demoGroups();
    var profiles = demoProfiles();

    if (!profiles.length) {
      container.innerHTML = '<div class="auth-demo-head"><div><h2>Demo profiles</h2><p>Profile data did not load.</p></div>' +
        '<button type="button" class="auth-back" onclick="BOPEUAuth.openPortalLogin()">Back to sign in</button></div>';
      return;
    }

    var html = '<div class="auth-view auth-demo-view" data-auth-theme="' + escapeHtml(themeForPage()) + '">' +
      '<div class="auth-demo-head">' +
        '<div><h2>Demo profiles</h2><p>Tap a profile to sign in to that portal.</p></div>' +
        '<button type="button" class="auth-back" onclick="BOPEUAuth.openPortalLogin()">← Back to sign in</button>' +
      '</div>' +
      '<div class="auth-demo-scroll">';

    groups.forEach(function (group) {
      var items = profiles.filter(function (profile) { return profile.groupId === group.id; });
      if (!items.length) return;
      html += '<section class="demo-profile-group">' +
        '<div class="demo-profile-group-title"><span>' + escapeHtml(group.label) + '</span><span class="demo-profile-count">' + items.length + '</span></div>' +
        items.map(tileHtml).join('') +
        '</section>';
    });

    html += '</div><p class="auth-hint">All demo profiles use password <strong>1234</strong>.</p></div>';
    container.innerHTML = html;
  }

  function showAuthError(message) {
    var box = document.getElementById('authError');
    if (!box) return;
    box.textContent = message || '';
    box.classList.toggle('show', !!message);
    if (message) {
      var field = document.getElementById('authWhatsapp');
      if (field) field.focus();
    }
  }

  /* ---------------- actions ---------------- */
  function loginFromForm() {
    var whatsappEl = document.getElementById('authWhatsapp');
    var firstNameEl = document.getElementById('authFirstName');
    var passwordEl = document.getElementById('authPassword');
    if (!whatsappEl || !firstNameEl || !passwordEl) return false;

    var whatsapp = whatsappEl.value.trim();
    var firstName = firstNameEl.value.trim();
    var password = passwordEl.value;

    if (!whatsapp || !firstName || !password) {
      showAuthError('Enter your WhatsApp number, first name and password.');
      return false;
    }

    var profile = profileByCredentials(whatsapp, firstName);
    if (!profile) {
      showAuthError('No account matches that WhatsApp number and first name.');
      return false;
    }

    if (passwordFor(profile) !== String(password)) {
      showAuthError('Check your password. Demo profiles use 1234.');
      return false;
    }

    startSession(profile);
    window.location.href = redirectForLogin(profile);
    return true;
  }

  function loginAsDemo(id) {
    var profile = profileById(id);
    if (!profile) {
      showAuthError('That demo profile could not be found.');
      return false;
    }
    startSession(profile);
    window.location.href = redirectForLogin(profile);
    return true;
  }

  function openPortalLogin() {
    var body = ensureModalBody();
    if (body) {
      renderLoginInto(body, themeForPage());
      openModal('login-modal');
      return true;
    }
    var page = currentPage();
    if (page.indexOf('admin-') === 0) window.location.href = 'admin-login.html';
    else if (page.indexOf('partner-') === 0) window.location.href = 'partner-login.html';
    else window.location.href = 'login.html';
    return false;
  }

  function openDemoProfiles() {
    var body = ensureModalBody();
    if (body) {
      renderDemoInto(body);
      openModal('login-modal');
      return true;
    }
    window.location.href = 'login.html?demo=1';
    return false;
  }

  function logout(options) {
    clearSessionFlags();
    if (options && options.redirect === false) return;
    var page = currentPage();
    if (page.indexOf('admin-') === 0) {
      window.location.href = 'admin-login.html';
      return;
    }
    if (page.indexOf('partner-') === 0) {
      window.location.href = 'partner-login.html';
      return;
    }
    if (document.getElementById('login-modal')) {
      var body = ensureModalBody();
      if (body) renderLoginInto(body, themeForPage());
      if (typeof window.refreshHeader === 'function') window.refreshHeader();
      openModal('login-modal');
      return;
    }
    window.location.href = 'login.html';
  }

  function toggleLogin() {
    if (session() || read('bopeu_logged_in')) logout({ redirect: true });
    else openPortalLogin();
  }

  /* ---------------- portal chrome ---------------- */
  function labelFor(key) {
    return String(key || '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, function (letter) { return letter.toUpperCase(); });
  }

  function metricCards(metrics) {
    return Object.keys(metrics || {}).slice(0, 5).map(function (key) {
      var value = metrics[key];
      if (value == null || value === '') value = '—';
      return '<div class="auth-kpi"><div class="auth-kpi-label">' + escapeHtml(labelFor(key)) +
        '</div><div class="auth-kpi-value">' + escapeHtml(value) + '</div></div>';
    }).join('');
  }

  function addUserChip(sessionData) {
    if (!sessionData) return;
    var header = document.querySelector('.admin-header, .p-header');
    if (!header || header.querySelector('.auth-user-chip')) return;
    var nav = header.querySelector('.admin-nav, .p-nav');
    var chip = document.createElement('div');
    chip.className = 'auth-user-chip';
    chip.innerHTML = '<span class="auth-user-dot"></span>' +
      '<span class="auth-user-meta"><strong>' + escapeHtml(sessionData.displayName) + '</strong>' +
      '<small>' + escapeHtml(sessionData.roleLabel) + (sessionData.organization ? ' · ' + escapeHtml(sessionData.organization) : '') + '</small></span>' +
      '<button type="button" class="auth-signout" onclick="BOPEUAuth.logout({redirect:true})">Sign out</button>';
    if (nav) header.insertBefore(chip, nav);
    else header.appendChild(chip);
  }

  function bindSignOutLinks() {
    var links = document.querySelectorAll(
      'a[href="admin-login.html"], a[href="partner-login.html"]'
    );
    Array.prototype.forEach.call(links, function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        logout({ redirect: true });
      });
    });
  }

  function filterStaffNav(sessionData) {
    if (!sessionData || sessionData.portal !== 'staff') return;
    var allowed = allowedStaffPages(sessionData.roleKey);
    if (!allowed) return;
    var links = document.querySelectorAll('.admin-nav a, .admin-side a, .admin-header nav a, .admin-layout aside a');
    Array.prototype.forEach.call(links, function (link) {
      var href = (link.getAttribute('href') || '').split(/[?#]/)[0];
      if (href.indexOf('admin-') !== 0) return;
      if (href === 'admin-login.html') return;
      if (!allowed.has(href)) {
        link.style.display = 'none';
        link.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function renderStaffWorkspace(sessionData) {
    if (!sessionData || sessionData.portal !== 'staff') return;
    if (currentPage() !== 'admin-dashboard.html') return;
    if (document.getElementById('authRoleWorkspace')) return;

    var main = document.querySelector('.admin-main');
    if (!main) return;
    var subtitle = main.querySelector('p');
    var anchor = subtitle || main.querySelector('h1');
    if (!anchor) return;

    var denied = new URLSearchParams(currentSearch()).get('denied');
    var workspace = document.createElement('section');
    workspace.id = 'authRoleWorkspace';

    var metrics = sessionData.metrics || {};
    var cards = metricCards(metrics);
    workspace.innerHTML =
      (denied ? '<div class="auth-denied">That page is outside your role. You were returned to your dashboard.</div>' : '') +
      '<div class="auth-role-banner"><div><strong>' + escapeHtml(sessionData.displayName) + '</strong>' +
        '<span>' + escapeHtml(sessionData.roleLabel) + ' · ' + escapeHtml(sessionData.workPlace || 'BOPEU') + '</span></div>' +
        '<small>Navigation and workspace are limited to this role.</small></div>' +
      (cards ? '<div class="auth-kpi-grid">' + cards + '</div>' : '');

    anchor.insertAdjacentElement('afterend', workspace);
  }

  function renderPartnerWorkspace(sessionData) {
    if (!sessionData || sessionData.portal !== 'partner') return;
    if (currentPage() !== 'partner-dashboard.html') return;
    if (document.getElementById('authPartnerWorkspace')) return;

    var main = document.querySelector('.p-main');
    if (!main) return;
    var heading = main.querySelector('h1');
    var subtitle = main.querySelector('p');
    if (heading) heading.textContent = 'Welcome, ' + sessionData.firstName;
    if (subtitle) {
      subtitle.textContent = (sessionData.organization || 'Benefit partner') + ' · ' + (sessionData.jobTitle || sessionData.roleLabel);
    }

    var anchor = subtitle || heading;
    if (!anchor) return;
    var workspace = document.createElement('section');
    workspace.id = 'authPartnerWorkspace';
    workspace.innerHTML =
      '<div class="auth-role-banner auth-role-banner-partner"><div><strong>' + escapeHtml(sessionData.displayName) + '</strong>' +
        '<span>' + escapeHtml(sessionData.roleLabel) + ' · ' + escapeHtml(sessionData.organization || '') + '</span></div>' +
        '<small>Partner account: ' + escapeHtml(sessionData.recordId || '') + '</small></div>' +
      (Object.keys(sessionData.metrics || {}).length
        ? '<div class="auth-kpi-grid">' + metricCards(sessionData.metrics) + '</div>'
        : '');
    anchor.insertAdjacentElement('afterend', workspace);
  }

  function decoratePortal() {
    var active = session();
    if (!active) return;
    addUserChip(active);
    bindSignOutLinks();
    if (active.portal === 'staff') {
      filterStaffNav(active);
      renderStaffWorkspace(active);
    }
    if (active.portal === 'partner') {
      renderPartnerWorkspace(active);
    }
  }

  /* ---------------- init ---------------- */
  function init() {
    ensureAuthStyles();

    var modalBody = ensureModalBody();
    if (modalBody) {
      renderLoginInto(modalBody, themeForPage());
    }

    var pageBody = document.getElementById('authPageBody');
    if (pageBody) {
      var wantsDemo = new URLSearchParams(currentSearch()).get('demo') === '1';
      if (wantsDemo) renderDemoInto(pageBody);
      else renderLoginInto(pageBody, themeForPage());
    }

    decoratePortal();
    document.body.classList.add('auth-ready');
  }

  window.BOPEUAuth = {
    session: session,
    profiles: allProfiles,
    loginFromForm: loginFromForm,
    loginAsDemo: loginAsDemo,
    startSession: startSession,
    logout: logout,
    toggleLogin: toggleLogin,
    openPortalLogin: openPortalLogin,
    openDemoProfiles: openDemoProfiles,
    renderLoginInto: renderLoginInto,
    renderDemoInto: renderDemoInto,
    normalisePhone: normalisePhone,
    findProfileByCredentials: profileByCredentials,
    passwordFor: passwordFor,
    setPassword: setPassword,
    allowedStaffPages: allowedStaffPages,
    staffCanAccess: staffCanAccess,
    clearSessionFlags: clearSessionFlags
  };

  /* Global wrappers keep the existing inline onclick handlers working. */
  window.doLogin = function () { return loginFromForm(); };
  window.skipLogin = function () { return openDemoProfiles(); };
  window.logout = function () { return logout({ redirect: true }); };
  window.handleLoginToggle = function () { return toggleLogin(); };

  if (guardCurrentPage()) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }
})();
