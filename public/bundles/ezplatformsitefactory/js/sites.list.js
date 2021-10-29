(function(global, doc, eZ) {
    const popupMenusContainer = doc.querySelectorAll('.ibexa-grid-view-item__actions-container');

    popupMenusContainer.forEach((container) => {
        const triggerElement = container.querySelector('.ibexa-sf-list-grid-entry__tools-trigger');
        const popupMenuElement = container.querySelector('.ibexa-popup-menu');

        if (!triggerElement) {
            return;
        }

        new eZ.core.PopupMenu({
            popupMenuElement,
            triggerElement,
            position: (menu) => {
                const leftPositionCorrectedOffset = 14;
                const { width: menuWidth, x: menuXPosition } = menu.getBoundingClientRect();
                const maxLeftPositionOfMenu = global.innerWidth - menuWidth;

                if (menuXPosition > maxLeftPositionOfMenu) {
                    const correctedLeftPosition = menuWidth + leftPositionCorrectedOffset;

                    menu.style.left = `-${correctedLeftPosition}px`;
                }
            },
        });
    });
})(global, window.document, window.eZ);
