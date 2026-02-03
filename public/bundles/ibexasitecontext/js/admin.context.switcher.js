(function (doc) {
    const CONTEXT_FORM_SELECTOR = '.ibexa-preview-context-switch-form';
    const CONTEXT_SELECT_INPUT = '.ibexa-input--select';
    const form = doc.querySelector(CONTEXT_FORM_SELECTOR);

    if (form) {
        form.querySelector(CONTEXT_SELECT_INPUT).addEventListener('change', () => {
            form.submit();
        });
    }
})(window.document);
