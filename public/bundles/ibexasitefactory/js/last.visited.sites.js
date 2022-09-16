(function (doc, ibexa) {
    const KEY_SITE_FACTORY_LAST_VISITED = 'ibexa-site-factory-last-visited';
    const menuItems = [...doc.querySelectorAll('#ezplatform_page_manager .navbar-nav .ibexa-navbar__item')];
    const siteData = {
        siteaccess: ibexa.pageBuilder.data.siteaccess,
        locationId: ibexa.pageBuilder.data.locationId,
    };
    const userId = ibexa.helpers.user.getId();
    const saveLastVisited = () => {
        const lastVisitedStringified = localStorage.getItem(KEY_SITE_FACTORY_LAST_VISITED);
        const lastVisited = lastVisitedStringified ? JSON.parse(lastVisitedStringified) : {};
        const isSiteFactoryEntry = menuItems.some((menuItem) => parseInt(menuItem.dataset.ibexaSiteLocationId, 10) === siteData.locationId);
        let lastVisitedIndex = -1;

        if (!lastVisited[userId]) {
            lastVisited[userId] = [];
        }

        if (isSiteFactoryEntry) {
            lastVisitedIndex = lastVisited[userId].findIndex(({ locationId }) => locationId === siteData.locationId);
        } else {
            lastVisitedIndex = lastVisited[userId].findIndex(({ siteaccess }) => siteaccess === siteData.siteaccess);
        }

        if (lastVisitedIndex > -1) {
            lastVisited[userId].splice(lastVisitedIndex, 1);
        }

        lastVisited[userId].unshift(siteData);
        lastVisited[userId].splice(5);

        localStorage.setItem(KEY_SITE_FACTORY_LAST_VISITED, JSON.stringify(lastVisited));
    };

    saveLastVisited();

    doc.body.dispatchEvent(new CustomEvent('ibexa-site-factory-refresh-menu'));
})(window.document, window.ibexa);
