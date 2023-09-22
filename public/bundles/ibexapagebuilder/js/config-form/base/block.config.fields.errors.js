(function (doc, bootstrap) {
    const SELECTOR_INVALID = '.is-invalid';
    const SELECTOR_TAB = '.ibexa-pb-block-config__tab';
    const errorNodes = [...doc.querySelectorAll(SELECTOR_INVALID)];

    errorNodes.forEach((errorNode, index) => {
        const tab = errorNode.closest(SELECTOR_TAB);
        const navLinkId = tab.getAttribute('aria-labelledby');
        const navLink = doc.getElementById(navLinkId);
        const navItem = navLink.closest('.ibexa-tabs__tab');

        navItem.classList.add('ibexa-tabs__tab--error');

        if (!index) {
            bootstrap.Tab.getOrCreateInstance(navLink).show();
        }
    });
})(window.document, window.bootstrap);
