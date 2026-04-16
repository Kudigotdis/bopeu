// app.js
import { initDB, getAll } from './db.js';
import { loadUserFromDB, login, register, logout, currentUser, isUnionMember } from './auth.js';
import { showToast, updateOfflineBanner } from './utils.js';
import { budgetIncome, budgetLimit, notes, items, defaultNotes, getTotalSpent, addItem, deleteItem, addCategory, renderLifulatorContent } from './lifulator.js';
import { motsheloGroups, motsheloContributions, joinRequests, currentGroupId, createGroup, selectGroup, vouchMember, recordContribution, joinGroup, startBereavement, generatePaperSeal, shareWhatsApp, renderMotsheloContent } from './motshelo.js';
import { renderProfileContent } from './profile.js';

let activeTab = 'home';
let activeSubTab = null;

async function loadScreenFragment(screenName, containerId = 'mainContent') {
    try {
        const response = await fetch(`screens/${screenName}.html`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (err) {
        console.error(`Failed to load ${screenName}.html`, err);
    }
}

async function renderMainContent() {
    if (activeTab === 'home') {
        await loadScreenFragment('home');
    } else if (activeTab === 'lifulator') {
        await loadScreenFragment('lifulator');
        await renderLifulatorContent();
    } else if (activeTab === 'motshelo') {
        await loadScreenFragment('motshelo');
        await renderMotsheloContent();
    } else if (activeTab === 'profile') {
        await loadScreenFragment('profile');
        await renderProfileContent();
    }
}

function renderTopTabs() {
    const container = document.getElementById('topTabs');
    if (!container) return;
    let tabs = [];
    if (activeTab === 'home') tabs = ['Promos', 'Insurance'];
    else if (activeTab === 'lifulator') tabs = ['Budget', 'Goals'];
    else if (activeTab === 'motshelo') tabs = ['My Groups', 'Registry', 'Collection', 'Vault', 'Boma'];
    else if (activeTab === 'profile') tabs = ['Profile'];
    if (!tabs.length) return;
    if (!activeSubTab || !tabs.includes(activeSubTab)) activeSubTab = tabs[0];
    container.innerHTML = tabs.map(t => `<div class="tab ${activeSubTab === t ? 'active' : ''}" data-tab="${t}">${t}</div>`).join('');
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            activeSubTab = tab.dataset.tab;
            renderTopTabs();
            renderMainContent();
        });
    });
}

function switchBottomTab(tabId) {
    activeTab = tabId;
    activeSubTab = null;
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
    if (activeNav) activeNav.classList.add('active');
    if (tabId === 'lifulator') activeSubTab = 'Budget';
    else if (tabId === 'motshelo') activeSubTab = 'My Groups';
    else if (tabId === 'profile') activeSubTab = 'Profile';
    else if (tabId === 'home') activeSubTab = 'Promos';
    renderTopTabs();
    renderMainContent();
}

window.openAddItemForNote = (noteId) => {
    const name = prompt('Item name');
    if (!name) return;
    const amount = parseFloat(prompt('Amount (P)'));
    if (isNaN(amount)) return;
    addItem(noteId, name, amount).then(() => renderMainContent());
};
window.deleteItem = (id) => {
    deleteItem(id).then(() => renderMainContent());
};
window.addCategory = () => {
    const label = prompt('Category name');
    if (label) addCategory(label).then(() => renderMainContent());
};
window.createGroup = async () => {
    const name = prompt('Group name');
    if (!name) return;
    const amount = parseFloat(prompt('Monthly contribution (P)','200'))||200;
    await createGroup(name, amount);
    renderMainContent();
};
window.selectGroup = async (id) => {
    await selectGroup(id);
    activeSubTab = 'Registry';
    renderTopTabs();
    renderMainContent();
};
window.recordContribution = async (groupId, memberId) => {
    const amt = parseFloat(document.getElementById(`amt-${memberId}`).value);
    if (isNaN(amt)) { showToast('Enter amount'); return; }
    await recordContribution(groupId, memberId, amt);
    renderMainContent();
};
window.joinGroup = async () => {
    const code = prompt('Enter Group ID');
    await joinGroup(code);
    renderMainContent();
};
window.startBereavement = startBereavement;
window.generatePaperSeal = generatePaperSeal;
window.shareWhatsApp = shareWhatsApp;
window.logout = () => { logout(); document.getElementById('appScreen').classList.remove('active'); document.getElementById('loginScreen').classList.add('active'); };

document.getElementById('doLoginBtn')?.addEventListener('click', async () => {
    const name = document.getElementById('loginName').value.trim();
    const wa = document.getElementById('loginWhatsapp').value.trim();
    const pwd = document.getElementById('loginPassword').value;
    const success = await login(name, wa, pwd);
    if (success) {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('appScreen').classList.add('active');
        document.getElementById('memberBadge').textContent = isUnionMember ? 'Full Member' : 'Basic';
        await initData();
        switchBottomTab('home');
    }
});
document.getElementById('doRegisterBtn')?.addEventListener('click', async () => {
    const fn = document.getElementById('regFirstName').value.trim();
    const wa = document.getElementById('regWhatsapp').value.trim();
    const pwd = document.getElementById('regPassword').value;
    const conf = document.getElementById('regConfirm').value;
    const mem = document.getElementById('regMemberNo').value.trim();
    const success = await register(fn, wa, pwd, conf, mem);
    if (success) {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('appScreen').classList.add('active');
        document.getElementById('memberBadge').textContent = isUnionMember ? 'Full Member' : 'Basic';
        await initData();
        switchBottomTab('home');
    }
});
document.getElementById('showRegisterLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('registerScreen').classList.add('active');
});
document.getElementById('backToLoginLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('registerScreen').classList.remove('active');
    document.getElementById('loginScreen').classList.add('active');
});
document.querySelectorAll('.nav-item').forEach(nav => nav.addEventListener('click', () => {
    const tab = nav.dataset.tab;
    if (tab) switchBottomTab(tab);
}));

async function initData() {
    const storedNotes = await getAll('notes');
    if (storedNotes.length) notes.push(...storedNotes);
    else {
        notes.push(...defaultNotes);
        for (let n of notes) await saveRecord('notes', n);
    }
    const storedItems = await getAll('items');
    items.push(...storedItems);
    const storedGroups = await getAll('motshelo_groups');
    motsheloGroups.push(...storedGroups);
    const storedContribs = await getAll('motshelo_contributions');
    motsheloContributions.push(...storedContribs);
    const storedRequests = await getAll('join_requests');
    joinRequests.push(...storedRequests);
}

(async () => {
    await initDB();
    if (await loadUserFromDB()) {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('appScreen').classList.add('active');
        document.getElementById('memberBadge').textContent = isUnionMember ? 'Full Member' : 'Basic';
        await initData();
        switchBottomTab('home');
    } else {
        document.getElementById('loginScreen').classList.add('active');
    }
    updateOfflineBanner();
})();
