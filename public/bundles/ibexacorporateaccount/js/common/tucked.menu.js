(function (global, doc, ibexa, Popper) {
    const tuckedMenus = doc.querySelectorAll('.ibexa-ca-tucked-menu');

    tuckedMenus.forEach((tuckedMenu) => {
        const tuckedMenuBtn = tuckedMenu.querySelector('.ibexa-ca-tucked-menu__btn');
        const popupMenu = tuckedMenu.querySelector('.ibexa-popup-menu');
        const popperInstance = Popper.createPopper(tuckedMenuBtn, popupMenu, {
            placement: 'bottom-end',
        });
        const handleClickOutsidePopup = (event) => {
            const isClickInsideTuckedMenu = event.target.closest('.ibexa-ca-tucked-menu') === tuckedMenu;

            if (isClickInsideTuckedMenu) {
                return;
            }

            popupMenu.classList.add('ibexa-popup-menu--hidden');
            doc.removeEventListener('click', handleClickOutsidePopup, false);
        };
        const handleBtnClick = () => {
            const isPopupOpened = !popupMenu.classList.contains('ibexa-popup-menu--hidden');

            if (isPopupOpened) {
                popupMenu.classList.add('ibexa-popup-menu--hidden');
                doc.removeEventListener('click', handleClickOutsidePopup, false);
            } else {
                popupMenu.classList.remove('ibexa-popup-menu--hidden');
                popperInstance.update();
                doc.addEventListener('click', handleClickOutsidePopup, false);
            }
        };

        tuckedMenuBtn.addEventListener('click', handleBtnClick, false);
    });
})(window, window.document, window.ibexa, window.Popper);
