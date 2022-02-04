(function(global, doc) {
    const identifierField = doc.querySelector('.ibexa-input[data-taxonomy-identifier-autogenerate]');

    if (!identifierField) {
        return;
    }

    const nameFieldSelector = identifierField.dataset.taxonomyIdentifierAutogenerate;
    const nameField = doc.querySelector(nameFieldSelector);
    const slugify = (text) => {
        const lowercaseText = text.toLowerCase();
        const normalizedText = lowercaseText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        // workaround, as polish letter 'ł' doesn't belong to Unicode Block “Combining Diacritical Marks”
        const normalizedTextExtraChars = normalizedText.replace('ł', 'l');
        const noWhitespaceText = normalizedTextExtraChars.trim().replace(/ /g, '-');
        const noSpecialCharsText = noWhitespaceText.replace(/[^a-zA-Z0-9-]/g, '');
        const noMultiHyphenText = noSpecialCharsText.replace(/-+/g, '-');

        return noMultiHyphenText;
    };
    let shouldAutogenerateIdentifier = !identifierField.value;

    identifierField.addEventListener('keyup', (event) => {
        shouldAutogenerateIdentifier = event.currentTarget.value === '';
    });

    nameField.addEventListener('keyup', (event) => {
        if (shouldAutogenerateIdentifier) {
            const slugValue = slugify(event.currentTarget.value);

            identifierField.value = slugValue;

            identifierField.dispatchEvent(new Event('blur'));
        }
    });
})(window, window.document);
