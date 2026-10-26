function loadBottomNav(activePage) {
    var navHtml =
        '<div class="bottom-nav">' +
        '<div class="nav-item" data-page="index" onclick="window.location.href=\'index.html\'"><img src="Assets/icons/timeline_icon.webp" alt="Timeline"></div>' +
        '<div class="nav-item" data-page="updates" onclick="window.location.href=\'updates-notices-tab.html\'"><img src="Assets/icons/notices_icon.webp" alt="Updates"></div>' +
        '<div class="nav-item" data-page="benefits" onclick="window.location.href=\'benefits-tab.html\'"><img src="Assets/icons/benefits_icon.webp" alt="Benefits"></div>' +
        '<div class="nav-item" data-page="digital" onclick="window.location.href=\'digital-card-tab.html\'"><img src="Assets/icons/claims_icon.webp" alt="Card"></div>' +
        '<div class="nav-item" data-page="help" onclick="window.location.href=\'help-tab.html\'"><img src="Assets/icons/menu_icon.webp" alt="Help"></div>' +
        '</div>';

    var container = document.createElement('div');
    container.innerHTML = navHtml;
    var nav = container.querySelector('.bottom-nav');
    if (!nav) return;

    var items = nav.querySelectorAll('.nav-item');
    items.forEach(function (item) {
        if (item.dataset.page === activePage) item.classList.add('active');
    });

    var appContainer = document.querySelector('.app-container');
    if (appContainer) appContainer.appendChild(nav);
    else document.body.appendChild(nav);
}