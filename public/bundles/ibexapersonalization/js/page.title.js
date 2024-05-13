(function (doc, Routing) {
    const customerIdSelector = doc.querySelector('.ibexa-perso-mandator-selector__select');

    if (!customerIdSelector) {
        return;
    }

    customerIdSelector.addEventListener(
        'change',
        (event) => {
            const url = Routing.generate('ibexa.personalization.dashboard', {
                customerId: event.target.value,
            });

            window.location.href = url;
        },
        false,
    );
})(window.document, window.Routing);
