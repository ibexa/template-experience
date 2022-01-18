(function(doc) {
    const customerIdSelector = doc.querySelector('.ibexa-perso-mandator-selector__select');

    if (!customerIdSelector) {
        return;
    }

    customerIdSelector.addEventListener(
        'change',
        (event) => {
            window.location.href = event.target.value;
        },
        false,
    );
})(window.document);
