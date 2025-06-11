(function (global, doc) {
    const createActions = doc.querySelector('.ibexa-extra-actions--create.ibexa-extra-actions--taxonomy');

    if (!createActions) {
        return;
    }

    const createButton = doc.querySelector('.ibexa-btn--create.ibexa-btn--taxonomy-context-menu-entry');
    const form = createActions.querySelector('form');
    const shouldSubmitForm = createActions.classList.contains('ibexa-extra-actions--prevent-show');

    if (shouldSubmitForm) {
        createButton.addEventListener('click', () => form.submit());
    }
})(window, window.document);
