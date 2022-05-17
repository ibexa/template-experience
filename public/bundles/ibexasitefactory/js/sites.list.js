(function (global, doc, ibexa) {
    const popupMenusContainer = doc.querySelectorAll('.ibexa-grid-view-item__actions-container');
    const switchViewSelect = doc.querySelector('.ibexa-sf-list-view-switcher');
    const selectView = ({ currentTarget }) => {
        const linkToChangeView = doc.querySelector(`.ibexa-sf-list-change-view[data-view-value="${currentTarget.value}"]`);

        linkToChangeView.click();
    };

    switchViewSelect.addEventListener('change', selectView, false);
    popupMenusContainer.forEach((container) => {
        const triggerElement = container.querySelector('.ibexa-sf-list-grid-entry__tools-trigger');
        const popupMenuElement = container.querySelector('.ibexa-popup-menu');

        if (!triggerElement) {
            return;
        }

        new ibexa.core.PopupMenu({
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
})(global, window.document, window.ibexa);
