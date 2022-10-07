(function (global, doc, ibexa) {
    const userMenuContainer = doc.querySelector('.ibexa-ca-main-header__user-menu-column');

    if (!userMenuContainer) {
        return;
    }

    const togglerElement = userMenuContainer.querySelector('.ibexa-ca-main-header__username-btn');
    const popupMenuElement = userMenuContainer.querySelector('.ibexa-ca-main-header__user-popup-menu');

    new ibexa.core.PopupMenu({
        triggerElement: togglerElement,
        popupMenuElement,
    });
})(window, window.document, window.ibexa);
