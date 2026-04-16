// profile.js
import { currentUser, isUnionMember, logout } from './auth.js';
export function renderProfileContent() {
    const cont = document.getElementById('mainContent');
    if (!cont) return;
    cont.innerHTML = `<div class="card"><div style="display:flex;gap:12px;"><div style="width:60px;height:60px;background:var(--primary-light);border-radius:60px;display:flex;align-items:center;justify-content:center;font-size:28px;">👤</div><div><h3>${currentUser?.name}</h3><div>${isUnionMember?'✅ Union Member':'⚠️ Basic'}</div></div></div><button class="btn btn-danger" style="margin-top:16px" onclick="window.logout()">Sign Out</button></div>`;
}
