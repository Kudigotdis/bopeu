/* =====================================================
   1. APP STATE & STORAGE
   ===================================================== */
class LocalStore {
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Storage quota exceeded');
        }
    }

    static get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return null;
        }
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}

/* Login prompt: only auto-open the login modal once per app session */
const LoginPrompt = {
    key: 'bopeu_login_prompted',
    seen() {
        try {
            return sessionStorage.getItem(this.key) === '1';
        } catch (e) {
            return false;
        }
    },
    mark() {
        try {
            sessionStorage.setItem(this.key, '1');
        } catch (e) { /* storage unavailable */ }
    }
};

const BOPEU_WHATSAPP = '2673214200';

/* =====================================================
   2. NAVIGATION & UI HELPERS
   ===================================================== */
function switchTab(tabIndex) {
    const pages = document.querySelectorAll('.tab-page');
    const navItems = document.querySelectorAll('.nav-item');

    pages.forEach((page, index) => {
        page.classList.toggle('active', index === tabIndex);
    });

    navItems.forEach((item, index) => {
        item.classList.toggle('active', index === tabIndex);
    });

    const area = document.querySelector('.content-area');
    if (area) area.scrollTop = 0;
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        return;
    }
    // The member app has no staff admin modal. Keep the legacy
    // "Admin Dashboard" entry point useful by sending it to staff sign-in.
    if (modalId === 'admin-modal') {
        window.location.href = 'admin-login.html';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }
}

function toast(message) {
    alert(message);
}

function initialsOf(name) {
    if (!name) return '?';
    return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('') || '?';
}

function esc(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escAttr(str) {
    return esc(str).replace(/'/g, '&#39;');
}

function onDataSaver() {
    return !!LocalStore.get('dataSaver');
}

/* =====================================================
   3. WHATSAPP INTEGRATION
   ===================================================== */
function whatsappShare(message) {
    const text = encodeURIComponent(message);
    const url = 'https://wa.me/' + BOPEU_WHATSAPP + '?text=' + text;
    window.open(url, '_blank');
}

function openWhatsapp(message) {
    whatsappShare(message);
}

/* =====================================================
   4. LOGIN / SESSION
   All credential handling lives in js/auth.js so the member,
   staff and partner portals share one login contract:
   WhatsApp number + first name + password.
   ===================================================== */
function doLogin() {
    if (window.BOPEUAuth) return window.BOPEUAuth.loginFromForm();
    toast('Sign-in is still loading. Please try again.');
    return false;
}

function skipLogin() {
    if (window.BOPEUAuth) return window.BOPEUAuth.openDemoProfiles();
    location.href = 'login.html?demo=1';
    return false;
}

function logout() {
    if (window.BOPEUAuth) return window.BOPEUAuth.logout({ redirect: true });
    LocalStore.remove('bopeu_logged_in');
    refreshHeader();
    openModal('login-modal');
}

function handleLoginToggle() {
    if (window.BOPEUAuth) return window.BOPEUAuth.toggleLogin();
    if (LocalStore.get('bopeu_logged_in')) logout();
    else openModal('login-modal');
}

function toasts() {
    toast('Welcome back to BOPEU. Tshwaragano... your voice in labour issues matters.');
}

function currentMemberNo() {
    const profile = loadOnboarding();
    return (profile && profile.memberNo) || BOPEU_STATS.memberNoPrefix + '1001';
}

function memberMonths() {
    const profile = loadOnboarding();
    if (!profile || !profile.joined) return 0;
    const d = new Date(profile.joined);
    const now = new Date();
    return Math.max(0, (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth()));
}

/* =====================================================
   5. LOGO CONTROLLER (change logo app-wide)
   ===================================================== */
window.BOPEU_LOGOS = {
    bopeu: {
        label: 'BOPEU',
        desc: 'Official BOPEU emblem (default)',
        src: 'Assets/logo/bopeu_logo.webp'
    },
    file: {
        label: 'Uploaded logo',
        desc: 'Your own uploaded image',
        src: null
    }
};

function getLogoSource() {
    const saved = LocalStore.get('bopeu_logo');
    if (saved && saved.key === 'file' && saved.dataUrl) return saved;
    if (saved && BOPEU_LOGOS[saved.key]) return saved;
    return { key: 'bopeu', dataUrl: null };
}

function applyAppLogo() {
    const sel = getLogoSource();
    let src = sel.dataUrl || BOPEU_LOGOS.bopeu.src;
    if (sel.key === 'file' && !src) src = BOPEU_LOGOS.bopeu.src;
    document.querySelectorAll('.app-logo').forEach(img => {
        img.src = src;
        img.dataset.logoKey = sel.key;
    });
}

function renderLogoOptions() {
    const container = document.getElementById('logoOptions');
    const preview = document.getElementById('logoPreview');
    if (!container) return;
    const sel = getLogoSource();

    let html = '';
    Object.keys(BOPEU_LOGOS).forEach(key => {
        const logo = BOPEU_LOGOS[key];
        const src = key === 'file' ? (sel.key === 'file' ? sel.dataUrl : null) : logo.src;
        html +=
            '<button type="button" class="logo-option' + (sel.key === key ? ' selected' : '') + '" onclick="selectLogo(\'' + key + '\')">' +
            (src ? '<img src="' + src + '" alt="' + esc(logo.label) + '">' : '<div class="status-avatar" style="width:42px;height:42px;font-size:18px;">?</div>') +
            '<div>' +
            '<div class="lo-title">' + esc(logo.label) + '</div>' +
            '<div class="lo-desc">' + esc(logo.desc) + '</div>' +
            '</div>' +
            '</button>';
    });
    html += '<input type="file" id="logoUploader" accept="image/*" style="display:none;" onchange="uploadLogo(event)">';
    html += '<button type="button" class="btn btn-secondary" onclick="document.getElementById(\'logoUploader\').click()">Upload your own logo</button>';
    container.innerHTML = html;

    if (preview) {
        const src = sel.dataUrl || BOPEU_LOGOS.bopeu.src;
        preview.innerHTML = '<img src="' + src + '" alt="Current logo">';
    }
}

function selectLogo(key) {
    if (BOPEU_LOGOS[key] && BOPEU_LOGOS[key].src) {
        LocalStore.set('bopeu_logo', { key: key, dataUrl: null });
    } else if (key === 'file') {
        document.getElementById('logoUploader').click();
        return;
    }
    applyAppLogo();
    renderLogoOptions();
}

function uploadLogo(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        LocalStore.set('bopeu_logo', { key: 'file', dataUrl: e.target.result });
        applyAppLogo();
        renderLogoOptions();
        toast('Logo updated across the app!');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
}

/* =====================================================
   6. OFFLINE DETECTION / DATA SAVER / CLEAR
   ===================================================== */
window.addEventListener('online', () => {
    const dot = document.getElementById('statusDot');
    if (dot) dot.style.backgroundColor = '#4CAF50';
});

window.addEventListener('offline', () => {
    const dot = document.getElementById('statusDot');
    if (dot) dot.style.backgroundColor = '#FFC107';
});

function toggleDataSaver() {
    const cb = document.getElementById('dataSaver') || document.getElementById('dataSaverFlip');
    const app = document.getElementById('appContainer');
    const enabled = cb ? cb.checked : false;
    app.classList.toggle('data-saver', enabled);
    LocalStore.set('dataSaver', enabled);
}

function clearLocalData() {
    if (confirm('Are you sure? This will delete all saved data.')) {
        LocalStore.clear();
        location.reload();
    }
}

/* =====================================================
   7. HOME DASHBOARD
   ===================================================== */
function renderHome() {
    const container = document.getElementById('timelineFeed');
    if (!container) return;
    container.innerHTML = '';
    if (typeof renderTimeline === 'function') {
        renderTimeline(container);
    }
    const ds = LocalStore.get('dataSaver');
    const dsBox = document.getElementById('dataSaverFlip');
    if (dsBox) dsBox.checked = !!ds;
}

function getOfficeLabelFromDistrict(district) {
    const d = district || '';
    if (d === 'Ngamiland') return 'Maun';
    if (d === 'Central District') return 'Palapye';
    if (d === 'Ngwaketse' || d === 'Kgalagadi') return 'Kang';
    if (d === 'Francistown' || d === 'North-East') return 'Francistown';
    return 'Gaborone';
}

function buildHomeHtml() {
    const profile = loadOnboarding();
    const name = profile ? (profile.personal.firstName + ' ' + profile.personal.surname) : 'BOPEU Member';
    const memberNo = currentMemberNo();
    const status = profile ? (profile.status || 'pending_verification') : 'active';
    const since = profile && profile.joined ? profile.joined : '2023-04-10';
    const months = memberMonths();
    const st = BOPEU_STATS;

    let html = '';

    if (months >= 6) {
        html += '<div class="banner-callout">' +
            '<div class="bc-kicker">Ready to Amplify Your Voice</div>' +
            '<div class="bc-title">' + st.members + ' members strong</div>' +
            '<div class="bc-text">BOPEU is ready for you. Legal representation, collective bargaining, dispute resolution and organising — united under #WorkersRights.</div>' +
            '<div class="bc-cta"><a class="btn btn-secondary" style="background:rgba(255,255,255,0.15);border-color:rgba(255,255,255,0.4);color:#fff;" href="tel:+' + BOPEU_CONTACTS.generalLine + '">Call (267) 3214 200</a></div>' +
            '</div>';
    } else {
        html += '<div class="alert alert-warning">⚠️ You have been a BOPEU member for ' + months + ' months. Some benefits require at least 6 months of membership.</div>';
    }

    html += '<div class="status-card">' +
        '<div class="status-avatar">' + initialsOf(name) + '</div>' +
        '<div class="status-info">' +
        '<div class="status-name">' + esc(name) + '</div>' +
        '<div class="status-role">' + (profile ? esc(profile.employment.sectorLabel || profile.employment.employerLabel || 'Public Employee') : 'Public Employee') + '</div>' +
        '<div class="status-meta">' +
        '<span class="tag ' + (status === 'active' ? 'green' : 'amber') + '">' + (status === 'active' ? 'Active' : 'Pending') + '</span>' +
        '<span class="tag blue">' + esc(memberNo) + '</span>' +
        '</div>' +
        '</div>' +
        '</div>';

    html += '<div class="dashboard-grid" style="margin-bottom:12px;">' +
        '<div class="dashboard-card"><div class="dashboard-card-value">' + st.members + '</div><div class="dashboard-card-label">Members</div></div>' +
        '<div class="dashboard-card"><div class="dashboard-card-value">' + st.offices + '</div><div class="dashboard-card-label">Offices</div></div>' +
        '<div class="dashboard-card"><div class="dashboard-card-value">' + st.services + '</div><div class="dashboard-card-label">Services</div></div>' +
        '<div class="dashboard-card"><div class="dashboard-card-value">' + st.affiliates + '</div><div class="dashboard-card-label">Affiliates</div></div>' +
        '</div>';

    html += '<div class="card"><div class="card-header">Quick Actions</div><div class="quick-grid">' +
        '<button type="button" class="quick-action" onclick="openForm(\'bursary\')"><em>🎓</em><span>Apply Bursary</span></button>' +
        '<button type="button" class="quick-action" onclick="openForm(\'building\')"><em>🏠</em><span>Building Material</span></button>' +
        '<button type="button" class="quick-action" onclick="openForm(\'funeral\')"><em>🛡️</em><span>Funeral Cover</span></button>' +
        '<button type="button" class="quick-action" onclick="openForm(\'loan\')"><em>💰</em><span>Quick Loan</span></button>' +
        '<button type="button" class="quick-action" onclick="switchTab(3)"><em>🪪</em><span>My Card</span></button>' +
        '<button type="button" class="quick-action" onclick="switchTab(4); scrollToOffices();"><em>📍</em><span>Find Office</span></button>' +
        '</div></div>';

    html += '<div class="card"><div class="card-header">Updates</div><div id="homeUpdates"></div></div>';

    html += '<div class="card"><div class="card-header">Settings & Information</div>' +
        '<div class="checkbox-group" style="margin-bottom:10px;">' +
        '<input type="checkbox" id="dataSaverFlip" onchange="toggleDataSaver()">' +
        '<label for="dataSaverFlip">Data Saver Mode (hide images)</label>' +
        '</div>' +
        '<button class="btn btn-secondary" onclick="openModal(\'logo-modal\')" style="margin-bottom:8px;">🎨 Change App Logo</button>' +
        '<button class="btn btn-secondary" onclick="openModal(\'privacy-modal\')" style="margin-bottom:8px;">Privacy Policy</button>' +
        '<button class="btn btn-secondary" onclick="openModal(\'terms-modal\')" style="margin-bottom:8px;">Terms of Service</button>' +
        '<button class="btn btn-secondary" onclick="location.href=\'admin-login.html\'" style="margin-bottom:8px;">Staff / Partner sign in</button>' +
        '<button class="btn btn-secondary" onclick="clearLocalData()">Clear Local Data</button>' +
        '</div>';

    return html;
}

function renderHomeUpdates() {
    const container = document.getElementById('homeUpdates');
    if (!container) return;
    let html = '';
    BOPEU_NOTICES.slice(0, 2).forEach(n => {
        html += '<div class="member-card">' +
            '<div class="member-avatar">' + initialsOf(n.title) + '</div>' +
            '<div class="member-info">' +
            '<div class="member-name">' + esc(n.title) + '</div>' +
            '<div class="member-details">' + esc(n.body) + '</div>' +
            '<div class="member-tags"><span class="tag">' + esc(n.date) + '</span></div>' +
            '</div></div>';
    });
    html += '<button class="btn btn-secondary" onclick="switchTab(1)">View Notices & Articles</button>';
    container.innerHTML = html;
}

function scrollToOffices() {
    const el = document.getElementById('officesList');
    if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 120);
}

function renderOffices() {
    const container = document.getElementById('officesList');
    if (!container) return;
    let html = '';
    let lastCat = '';
    BOPEU_OFFICES.forEach(o => {
        if (o.category !== lastCat) {
            lastCat = o.category;
            html += '<div class="office-group-title">' + esc(o.category) + '</div>';
        }
        html +=
            '<div class="office-card">' +
            '<div class="office-name">' + esc(o.name) + '</div>' +
            '<div class="office-details">' +
            'Location: ' + esc(o.plot) +
            '<div class="office-phone">Tel: ' + esc(o.phone) + '</div>' +
            '<div class="member-tags" style="margin-top:6px;">' +
            '<button class="btn btn-secondary btn-small" style="width:auto;" onclick="location.href=\'tel:+' + o.tel + '\'">Call</button>' +
            '<button class="btn btn-secondary btn-small" style="width:auto;" onclick="whatsappShare(\'Hoping to reach the ' + esc(o.name) + ' office of BOPEU.\')">WhatsApp</button>' +
            '</div></div></div>';
    });
    html += '<div class="emergency-bar">' +
        '<a class="btn btn-success" href="tel:+' + BOPEU_CONTACTS.generalLine + '">📞 Call BOPEU HQ (267) 3214 200</a>' +
        '</div>';
    container.innerHTML = html;
}

function renderFaq() {
    const container = document.getElementById('faqList');
    if (!container) return;
    let html = '';
    (window.BOPEU_FAQ || []).forEach(g => {
        html += '<div class="faq-group-title">' + esc(g.cat) + '</div>';
        (g.items || []).forEach(f => {
            html += '<details class="accordion"><summary>' + esc(f.q) + '</summary><div class="accordion-inner">' + esc(f.a) + '</div></details>';
        });
    });
    container.innerHTML = html;
}

function callSupport() {
    location.href = 'tel:+' + BOPEU_CONTACTS.supportTel;
}

function emailSupport() {
    location.href = 'mailto:' + BOPEU_CONTACTS.email;
}

/* =====================================================
   8. HEADER / INITIALIZE
   ===================================================== */
function ensureHeaderToggle() {
    const header = document.querySelector('.app-header');
    if (!header || !document.getElementById('login-modal')) return null;

    let toggle = document.getElementById('loginToggleBtn');
    if (toggle) return toggle;

    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.id = 'loginToggleBtn';
    toggle.className = 'btn btn-primary header-login-btn';
    toggle.setAttribute('onclick', 'handleLoginToggle()');
    toggle.textContent = 'Login';
    header.appendChild(toggle);
    return toggle;
}

function refreshHeader() {
    const authSession = window.BOPEUAuth && typeof window.BOPEUAuth.session === 'function'
        ? window.BOPEUAuth.session()
        : null;
    const loggedIn = !!authSession || !!LocalStore.get('bopeu_logged_in');

    const statusDot = document.getElementById('statusDot');
    if (statusDot) statusDot.style.display = loggedIn ? 'block' : 'none';

    const toggle = ensureHeaderToggle();
    if (toggle) {
        toggle.textContent = loggedIn ? 'Logout' : 'Login';
        toggle.classList.toggle('btn-primary', !loggedIn);
        toggle.classList.toggle('btn-secondary', loggedIn);
    }
}

/* Decide when the login modal should auto-open:
   - never when a member is logged in
   - on reload
   - on the first page load of a browser tab/session (e.g. opened via run.bat)
   - when arriving from outside the app (external referrer)
   Not on internal navigation between the app's own tabs. */
function shouldPromptLogin() {
    if (window.BOPEUAuth && typeof window.BOPEUAuth.session === 'function' && window.BOPEUAuth.session()) return false;
    if (LocalStore.get('bopeu_logged_in')) return false;
    if (!document.getElementById('login-modal')) return false;

    const nav = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || null;
    const isReload = nav ? nav.type === 'reload'
                         : (performance.navigation && performance.navigation.type === 1);
    if (isReload) return true;

    if (!LoginPrompt.seen()) return true;

    if (!document.referrer) return false;
    try {
        return new URL(document.referrer).origin !== window.location.origin;
    } catch (e) {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tabFromUrl = parseInt(new URLSearchParams(window.location.search).get('tab'), 10);
    switchTab(!isNaN(tabFromUrl) && tabFromUrl >= 0 && tabFromUrl <= 4 ? tabFromUrl : 0);

    const dataSaver = LocalStore.get('dataSaver');
    if (dataSaver) {
        const box = document.getElementById('dataSaverFlip');
        if (box) box.checked = true;
        const appContainer = document.getElementById('appContainer');
        if (appContainer) appContainer.classList.add('data-saver');
    }

    applyAppLogo();
    refreshHeader();
    renderHome();

    if (shouldPromptLogin()) {
        LoginPrompt.mark();
        openModal('login-modal');
    }
});