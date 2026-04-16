// utils.js
export function showToast(msg, dur = 2500) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), dur);
}
export function updateOfflineBanner() {
    const b = document.getElementById('offlineBanner');
    if (!navigator.onLine) b.classList.add('show');
    else b.classList.remove('show');
}
window.addEventListener('online', updateOfflineBanner);
window.addEventListener('offline', updateOfflineBanner);
