// lifulator.js
import { saveRecord, getAll, deleteRecord } from './db.js';
import { showToast } from './utils.js';
export let budgetIncome = 18500;
export let budgetLimit = 15000;
export let notes = [];
export let items = [];
export const defaultNotes = [
    { id: 'home', label: 'Home', icon: '🏠' }, { id: 'transport', label: 'Transport', icon: '🚗' },
    { id: 'food', label: 'Food & Groceries', icon: '🍲' }, { id: 'health', label: 'Health', icon: '🏥' },
    { id: 'savings', label: 'Savings', icon: '💰' }
];
export function getTotalSpent() { return items.reduce((s,i)=>s+(i.amount||0),0); }
export async function addItem(noteId, name, amount) {
    const newItem = { id: Date.now().toString(), noteId, name, amount };
    items.push(newItem);
    await saveRecord('items', newItem);
}
export async function deleteItem(itemId) {
    items = items.filter(i=>i.id!==itemId);
    await deleteRecord('items', itemId);
}
export async function addCategory(label) {
    const newNote = { id: Date.now().toString(), label, icon: '📁' };
    notes.push(newNote);
    await saveRecord('notes', newNote);
}
export async function renderLifulatorContent() {
    const cont = document.getElementById('mainContent');
    if (!cont) return;
    const spent = getTotalSpent();
    const remaining = budgetLimit - spent;
    const percent = Math.min(100, (spent/budgetLimit)*100);
    cont.innerHTML = `<div class="card" style="background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:white;"><div>Budget: P${budgetLimit.toFixed(2)}</div><div>Spent: P${spent.toFixed(2)}</div><div>Remaining: P${remaining.toFixed(2)}</div><div style="height:8px;background:rgba(255,255,255,0.3);border-radius:8px;margin:10px 0;"><div style="width:${percent}%;height:100%;background:var(--accent);border-radius:8px;"></div></div><button class="btn" style="background:white;color:var(--primary);margin-top:8px" onclick="window.openAddItemForNote && window.openAddItemForNote(notes[0]?.id)">+ Add Item</button></div>`;
    for (let note of notes) {
        const noteItems = items.filter(i=>i.noteId===note.id);
        cont.innerHTML += `<div class="card"><div style="background:var(--primary);padding:12px 16px;color:white;font-weight:700;display:flex;justify-content:space-between;"><span>${note.icon} ${note.label}</span><span>P${noteItems.reduce((s,i)=>s+(i.amount||0),0).toFixed(2)}</span></div><div style="padding:12px;">${noteItems.map(i=>`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--grey1);"><span>${i.name}</span><span>P${i.amount.toFixed(2)}</span><button class="btn-sm" style="background:var(--danger);color:white;padding:2px 8px;border-radius:6px;" onclick="window.deleteItem('${i.id}')">🗑️</button></div>`).join('')}<button class="btn btn-outline" style="margin-top:8px" onclick="window.openAddItemForNote('${note.id}')">+ Add Item</button></div></div>`;
    }
    cont.innerHTML += `<button class="btn btn-outline" onclick="window.addCategory()">+ Add Category</button>`;
}
