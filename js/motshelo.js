// motshelo.js
import { saveRecord, getAll, deleteRecord } from './db.js';
import { showToast } from './utils.js';
import { currentUser } from './auth.js';
export let motsheloGroups = [];
export let motsheloContributions = [];
export let joinRequests = [];
export let currentGroupId = null;
export async function createGroup(name, amount) {
    const newGroup = { id: Date.now().toString(), name, amount, members: [{ id: currentUser.id, name: currentUser.name, vouches:0 }], socialFund:0, createdAt: new Date().toISOString() };
    motsheloGroups.push(newGroup);
    await saveRecord('motshelo_groups', newGroup);
    const seal = Math.random().toString(36).substring(2,10).toUpperCase();
    showToast(`Group "${name}" created! Paper Seal: ${seal} — write it down.`, 4000);
}
export async function selectGroup(id) { currentGroupId = id; }
export function vouchMember(groupId, memberId) { showToast('Vouch recorded (PIN not required for demo)'); }
export async function recordContribution(groupId, memberId, amt) {
    const contrib = { id: Date.now().toString(), groupId, memberId, amount: amt, confirmed: true };
    motsheloContributions.push(contrib);
    await saveRecord('motshelo_contributions', contrib);
    showToast('Contribution recorded');
}
export async function joinGroup(code) {
    const group = motsheloGroups.find(g=>g.id===code);
    if (!group) { showToast('Group not found'); return; }
    if (group.members.some(m=>m.id===currentUser.id)) { showToast('Already member'); return; }
    const req = { id: Date.now().toString(), groupId: group.id, userId: currentUser.id, userName: currentUser.name };
    joinRequests.push(req);
    await saveRecord('join_requests', req);
    showToast('Join request sent to admin');
}
export function startBereavement() { showToast('Bereavement claim: P2,000 bridge loan approved. Upload death certificate.'); }
export function generatePaperSeal() {
    const seal = Math.random().toString(36).substring(2,10).toUpperCase();
    document.getElementById('sealDisplay').innerHTML = `<div style="background:var(--accent-light);padding:16px;border-radius:16px;text-align:center;font-family:monospace;font-size:28px;margin-top:12px;">📜 ${seal}</div><p style="font-size:12px;margin-top:8px;">Write this in your notebook.</p>`;
    showToast(`Paper Seal: ${seal} — write it down!`);
}
export function shareWhatsApp() { window.open(`https://wa.me/?text=${encodeURIComponent('Motshelo update: group active.')}`,'_blank'); }
export async function renderMotsheloContent() {
    const cont = document.getElementById('mainContent');
    if (!cont) return;
    cont.innerHTML = `<div class="card"><h3>Your Motshelo Groups</h3>${motsheloGroups.map(g=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--grey1);"><span>🤝 ${g.name} · P${g.amount}/mo</span><button class="btn-sm" onclick="window.selectGroup('${g.id}')">Open</button></div>`).join('')}<button class="btn" onclick="window.createGroup()">+ Create Group</button><button class="btn btn-outline" style="margin-top:8px" onclick="window.joinGroup()">Join Group</button></div>`;
}
