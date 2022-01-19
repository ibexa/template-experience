(function(global, doc, bootstrap) {
    const cancelButton = doc.querySelector('.ibexa-btn--schedule-hide-cancel');
    const form = doc.querySelector('form[name="date_based_hide_cancel"]');
    const modal = doc.querySelector('.ibexa-modal--content-reveal-confirmation');

    if (!cancelButton) {
        return;
    }

    if (modal) {
        modal.querySelector('.ibexa-btn--confirm').addEventListener('click', () => {
            form.submit();
        });
    }

    cancelButton.addEventListener(
        'click',
        () => {
            bootstrap.Modal.getOrCreateInstance(modal).show();
        },
        false
    );
})(window, window.document, window.bootstrap);
