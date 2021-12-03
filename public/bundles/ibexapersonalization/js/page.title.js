(function(doc) {
    const customerIdSelector = doc.querySelector('.ibexa-perso-title__select');

    if (!customerIdSelector) {
        return;
    }

    customerIdSelector.addEventListener(
        'change',
        () => {
            window.location.href = event.target.value;
        },
        false,
    );
})(window.document);
