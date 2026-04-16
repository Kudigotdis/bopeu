// db.js
import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@8.0.0/build/umd.js';
const DB_NAME = 'BopeuFixedDB';
let db = null;
export async function initDB() {
    db = await openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('users')) db.createObjectStore('users', { keyPath: 'id' });
            if (!db.objectStoreNames.contains('notes')) db.createObjectStore('notes', { keyPath: 'id' });
            if (!db.objectStoreNames.contains('items')) db.createObjectStore('items', { keyPath: 'id' });
            if (!db.objectStoreNames.contains('motshelo_groups')) db.createObjectStore('motshelo_groups', { keyPath: 'id' });
            if (!db.objectStoreNames.contains('motshelo_contributions')) db.createObjectStore('motshelo_contributions', { keyPath: 'id' });
            if (!db.objectStoreNames.contains('join_requests')) db.createObjectStore('join_requests', { keyPath: 'id' });
        }
    });
    return db;
}
export async function saveRecord(store, rec) { await db.put(store, rec); }
export async function getAll(store) { return await db.getAll(store); }
export async function deleteRecord(store, id) { await db.delete(store, id); }
