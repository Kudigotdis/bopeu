// auth.js
import { saveRecord, getAll, deleteRecord } from './db.js';
import { showToast } from './utils.js';
export let currentUser = null;
export let isUnionMember = false;
export async function loadUserFromDB() {
    const users = await getAll('users');
    const stored = localStorage.getItem('bopeu_userId');
    if (stored) {
        const user = users.find(u => u.id === stored);
        if (user) { currentUser = user; isUnionMember = !!user.memberNumber; return true; }
    }
    if (users.length === 0) {
        const demoUser = { id: 'demo1', name: 'Katlego', whatsapp: '+26771234567', password: 'pass', memberNumber: null };
        await saveRecord('users', demoUser);
        currentUser = demoUser;
        isUnionMember = false;
        localStorage.setItem('bopeu_userId', demoUser.id);
        return true;
    }
    return false;
}
export async function login(name, wa, pwd) {
    const users = await getAll('users');
    const user = users.find(u => (u.name.toLowerCase().includes(name.toLowerCase()) || u.whatsapp === wa) && u.password === pwd);
    if (!user) { showToast('Invalid credentials'); return false; }
    currentUser = user;
    isUnionMember = !!user.memberNumber;
    localStorage.setItem('bopeu_userId', user.id);
    return true;
}
export async function register(fn, wa, pwd, conf, mem) {
    if (!fn || !wa || !pwd) { showToast('Fill required fields'); return false; }
    if (pwd !== conf) { showToast('Passwords do not match'); return false; }
    const users = await getAll('users');
    if (users.some(u => u.whatsapp === wa)) { showToast('WhatsApp already registered'); return false; }
    const newUser = { id: Date.now().toString(), name: fn, whatsapp: wa, password: pwd, memberNumber: mem || null };
    await saveRecord('users', newUser);
    currentUser = newUser;
    isUnionMember = !!mem;
    localStorage.setItem('bopeu_userId', newUser.id);
    return true;
}
export function logout() {
    localStorage.removeItem('bopeu_userId');
    currentUser = null;
    isUnionMember = false;
}
