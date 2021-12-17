(function(doc, bootstrap) {
    const SELECTOR_INVALID = '.is-invalid';
    const SELECTOR_TAB = '.ibexa-pb-block-config__tab';
    const SELECTOR_NAV_LINK = '.ibexa-pb-block-config__link';
    const CLASS_HAS_INVALID_FIELDS = 'ibexa-pb-block-config__link--has-invalid-fields';
    const errorNodes = [...doc.querySelectorAll(SELECTOR_INVALID)];

    errorNodes.forEach((errorNode, index) => {
        const tab = errorNode.closest(SELECTOR_TAB);
        const tabId = tab.id;
        const navLink = doc.querySelector(`${SELECTOR_NAV_LINK}[href="#${tabId}"]`);

        navLink.classList.add(CLASS_HAS_INVALID_FIELDS);

        if (!index) {
            bootstrap.Tab.getOrCreateInstance(navLink).show();
        }
    });
})(window.document, window.bootstrap);
