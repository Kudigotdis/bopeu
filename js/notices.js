/* =====================================================
   1. NOTICES / UPDATES (BOPEU)
   ===================================================== */
function getNotices() {
    return BOPEU_NOTICES;
}

function noticeSearchText(notice) {
    const sectionText = (notice.sections || []).map(section => [
        section.heading || '',
        (section.paragraphs || []).join(' '),
        (section.bullets || []).join(' ')
    ].join(' ')).join(' ');

    return [
        notice.title,
        notice.category,
        notice.cardLabel,
        notice.summary,
        notice.body,
        notice.intro,
        notice.importantNotice,
        (notice.memberActions || []).join(' '),
        sectionText
    ].filter(Boolean).join(' ').toLowerCase();
}

function renderNotices(filter) {
    const container = document.getElementById('noticesList');
    if (!container) return;

    let notices = getNotices();
    if (filter && filter.trim()) {
        const f = filter.trim().toLowerCase();
        notices = notices.filter(n => noticeSearchText(n).indexOf(f) >= 0);
    }

    const countEl = document.getElementById('noticeCount');
    if (countEl) countEl.textContent = String(notices.length);

    const emptyEl = document.getElementById('noticeEmpty');
    if (emptyEl) emptyEl.hidden = notices.length > 0;

    let html = '';
    notices.forEach(n => {
        const id = escAttr(n.id);
        const summary = n.summary || n.body || '';
        html +=
            '<article class="feed-post" id="post-' + id + '" data-search="' + escAttr(noticeSearchText(n)) + '">' +
            '<div class="feed-card" role="button" tabindex="0" ' +
                'onclick="openArticleModal(\'' + id + '\')" ' +
                'onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openArticleModal(\'' + id + '\');}">' +
            '<div class="feed-meta">' +
                '<span class="feed-act">' + esc(n.category || 'Update') + '</span>' +
                '<span class="feed-date">' + esc(n.date || '') + '</span>' +
            '</div>' +
            '<h3 class="feed-title">' + esc(n.title) + '</h3>' +
            '<p class="feed-body">' + esc(summary) + '</p>' +
            '</div>' +
            '</article>';
    });
    container.innerHTML = html;
}

function handleSearch() {
    const qInput = document.getElementById('updateSearch');
    if (!qInput) return;
    const q = (qInput.value || '').trim().toLowerCase();

    const notices = Array.from(document.querySelectorAll('#noticesList .feed-post'));
    const articles = Array.from(document.querySelectorAll('#articleList .member-card'));

    let nCount = 0, aCount = 0;

    notices.forEach(el => {
        const match = !q || (el.dataset.search || '').toLowerCase().indexOf(q) >= 0;
        el.hidden = !match;
        if (match) nCount++;
    });

    articles.forEach(el => {
        const match = !q || (el.dataset.search || '').toLowerCase().indexOf(q) >= 0;
        el.hidden = !match;
        if (match) aCount++;
    });

    const noticeCount = document.getElementById('noticeCount');
    const articleCount = document.getElementById('articleCount');
    const noticeEmpty = document.getElementById('noticeEmpty');
    const articleEmpty = document.getElementById('articleEmpty');
    if (noticeCount) noticeCount.textContent = String(nCount);
    if (articleCount) articleCount.textContent = String(aCount);
    if (noticeEmpty) noticeEmpty.hidden = nCount > 0;
    if (articleEmpty) articleEmpty.hidden = aCount > 0;
}

function openReview(id) {
    openArticleModal(id);
}

function openArticleModal(id) {
    const notice = getNotices().find(n => n.id === id);
    if (!notice) return;

    /* Prefer the rich floating notice modal when the page provides one. */
    if (document.getElementById('noticeModal')) {
        openNoticeModal(id);
        return;
    }

    /* Legacy article modal (e.g. notifications.html). */
    const title = document.getElementById('articleTitle');
    const date = document.getElementById('articleDate');
    const body = document.getElementById('articleBody');
    if (title) title.textContent = notice.title;
    if (date) date.textContent = (notice.category || 'Update') + ' — ' + (notice.date || '');
    if (body) body.textContent = notice.body;
    openModal('article-modal');
}

function openArticle(id) {
    openArticleModal(id);
}

function openNoticeModal(id) {
    const notice = getNotices().find(n => n.id === id);
    const overlay = document.getElementById('noticeModal');
    if (!notice || !overlay) return;

    const labelEl = document.getElementById('noticeModalLabel');
    const titleEl = document.getElementById('noticeModalTitle');
    const metaEl = document.getElementById('noticeModalMeta');
    const summaryEl = document.getElementById('noticeModalSummary');
    const bodyEl = document.getElementById('noticeModalBody');
    const actionsEl = document.getElementById('noticeModalActions');

    if (labelEl) labelEl.textContent = notice.cardLabel || 'Member notice';
    if (titleEl) titleEl.textContent = notice.title;
    if (metaEl) metaEl.textContent = [notice.category, notice.date].filter(Boolean).join(' · ');
    if (summaryEl) summaryEl.textContent = notice.summary || notice.body || '';

    let html = '';
    if (notice.intro) html += '<p>' + esc(notice.intro) + '</p>';

    (notice.sections || []).forEach(section => {
        if (section.heading) html += '<h3>' + esc(section.heading) + '</h3>';
        (section.paragraphs || []).forEach(paragraph => {
            html += '<p>' + esc(paragraph) + '</p>';
        });
        if (section.bullets && section.bullets.length) {
            html += '<ul>' + section.bullets.map(bullet => '<li>' + esc(bullet) + '</li>').join('') + '</ul>';
        }
    });

    if (notice.importantNotice) {
        html += '<div class="notice-important"><strong>Important</strong><p>' + esc(notice.importantNotice) + '</p></div>';
    }

    if (notice.memberActions && notice.memberActions.length) {
        html += '<div class="notice-actions"><h3>What members can do</h3><ol>' +
            notice.memberActions.map(action => '<li>' + esc(action) + '</li>').join('') +
            '</ol></div>';
    }

    if (bodyEl) bodyEl.innerHTML = html;

    if (actionsEl) {
        actionsEl.innerHTML =
            '<button type="button" class="notice-share" onclick="shareNotice(\'' + escAttr(notice.id) + '\')">' +
            '<img src="Assets/icons/whatsApp_icon_on.png" alt="" class="wa-icon">' +
            '<span>Share on WhatsApp</span>' +
            '</button>';
    }

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('notice-modal-open');
}

function closeNoticeModal() {
    const overlay = document.getElementById('noticeModal');
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('notice-modal-open');
}

function shareNotice(id) {
    const notice = getNotices().find(n => n.id === id);
    if (!notice) return;
    const text = [notice.title, notice.summary || notice.body].filter(Boolean).join('\n\n');
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
}

function renderArticleSidebar() {
    const container = document.getElementById('articleList');
    if (!container) return;

    const countEl = document.getElementById('articleCount');
    if (countEl) countEl.textContent = String(getNotices().length);

    const emptyEl = document.getElementById('articleEmpty');
    if (emptyEl) emptyEl.hidden = getNotices().length > 0;

    let html = '';
    getNotices().forEach(n => {
        const searchText = noticeSearchText(n);
        html += '<div class="member-card" onclick="openArticleModal(\'' + escAttr(n.id) + '\')" ' +
            'data-search="' + escAttr(searchText) + '">' +
            '<div class="member-avatar">' + esc(initialsOf(n.title).slice(0, 1)) + '</div>' +
            '<div class="member-info">' +
            '<div class="member-name">' + esc(n.title) + '</div>' +
            '<div class="member-details">' + esc(n.date || '') + '</div>' +
            '</div>' +
            '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>' +
            '</div>';
    });
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    renderNotices();
    renderArticleSidebar();

    const search = document.getElementById('updateSearch');
    if (search) {
        search.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                e.target.value = '';
                handleSearch();
            }
        });
    }

    const noticeModal = document.getElementById('noticeModal');
    if (noticeModal) {
        noticeModal.addEventListener('click', e => {
            if (e.target === noticeModal) closeNoticeModal();
        });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeNoticeModal();
    });
});
