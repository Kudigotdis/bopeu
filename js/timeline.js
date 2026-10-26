/* =====================================================
   BOPEU TIMELINE / NEWS FEED  (js/timeline.js)
   Renders the Home tab as a timeline-only member feed
   (modeled on the Bopeu2 reference feed). Posts are
   defined in data.js (BOPEU_TIMELINE_POSTS). Tapping a
   post opens the full story with accordion sections.
   ===================================================== */
function timelineCoverFor(post) {
    if (!post.cover) return '';
    return post.cover;
}

function renderTimeline() {
    const container = document.getElementById('timelineFeed');
    if (!container) return;

    const posts = window.BOPEU_TIMELINE_POSTS || [];
    if (!posts.length) {
        container.innerHTML = '<div class="empty-state">The union feed is still being prepared. Check back soon.</div>';
        return;
    }

    let html = '<div class="feed-list">';
    posts.forEach(p => {
        const cover = timelineCoverFor(p);
        html +=
            '<article class="feed-card" onclick="openTimelinePost(\'' + escAttr(p.id) + '\')">' +
            (cover ? '<div class="feed-image"><img src="' + escAttr(cover) + '" alt="' + escAttr(p.title) + '" onerror="this.closest(\'.feed-image\').classList.add(\'no-feed-img\');" loading="' + (onDataSaver() ? 'lazy' : 'eager') + '">' + '</div>' : '<div class="feed-image no-feed-img"></div>') +
            '<div class="feed-content">' +
            '<div class="feed-meta">' + esc(p.date || '') + (p.category ? ' \u00b7 ' + esc(p.category) : '') + '</div>' +
            '<div class="feed-title">' + esc(p.title) + '</div>' +
            '<div class="feed-description">' + esc(p.teaser || '') + '</div>' +
            '</div>' +
            '</article>';
    });
    html += '</div>';
    container.innerHTML = html;
}

function openTimelinePost(id) {
    const p = (window.BOPEU_TIMELINE_POSTS || []).find(x => x.id === id);
    if (!p) return;

    const img   = document.getElementById('postModalImage');
    const media = document.getElementById('postModalMedia');
    const body  = document.getElementById('postModalBody');
    if (!body) return;

    if (media && img) {
        media.classList.remove('no-img');
        if (p.cover) {
            img.src = p.cover;
            img.alt = p.title || '';
        } else {
            img.removeAttribute('src');
            img.alt = '';
            media.classList.add('no-img');
        }
    }

    let html = '';
    html += '<div class="feed-meta">' + esc(p.date || '') + (p.category ? ' \u00b7 ' + esc(p.category) : '') + '</div>';
    html += '<div class="post-card-headline"><h3>' + esc(p.title || 'Update') + '</h3><p>' + esc(p.teaser || '') + '</p></div>';

    (p.paragraphs || []).forEach(par => {
        html += '<p class="post-paragraph">' + esc(par) + '</p>';
    });

    (p.sections || []).forEach(s => {
        html += '<details class="accordion" open><summary>' + esc(s.h || 'More') + '</summary><div class="accordion-inner">' + esc(s.b || '') + '</div></details>';
    });

    if (p.memberActions && p.memberActions.length) {
        html += '<details class="accordion" open><summary>What members can do</summary><div class="accordion-inner"><ul class="post-actions">';
        p.memberActions.forEach(item => {
            html += '<li>' + esc(item) + '</li>';
        });
        html += '</ul></div></details>';
    }

    (p.funeralTable ? [p.funeralTable] : []).forEach(t => {
        let rows = '';
        t.rows.forEach(r => {
            rows += '<tr><td>' + esc(r.label) + '</td><td>' + esc(r.value) + '</td></tr>';
        });
        html += '<details class="accordion" open><summary>' + esc(t.title || 'Funeral Benefit Table') + '</summary><div class="accordion-inner"><table class="benefit-table"><tbody>' + rows + '</tbody></table></div></details>';
    });

    body.innerHTML = html;
    openModal('postModal');
}

function renderTimelineFeed() {
    renderTimeline();
}
