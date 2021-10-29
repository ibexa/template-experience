(function(global, doc) {
    const extraActionsMenu = doc.querySelector('.ibexa-extra-actions--create');
    const triggerCreateActionMenu = doc.querySelector('.ibexa-btn--extra-actions.ibexa-btn--create');
    const closeCreateActionMenuBtn = doc.querySelector('.ibexa-extra-actions .ibexa-btn--close');

    triggerCreateActionMenu.addEventListener('click', () => {
        extraActionsMenu.classList.toggle('ibexa-extra-actions--hidden');
    }, false);

    closeCreateActionMenuBtn.addEventListener('click', () => {
        extraActionsMenu.classList.toggle('ibexa-extra-actions--hidden');
    }, false);
})(window, window.document);
