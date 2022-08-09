(function (global, doc, ibexa, Routing) {
    const ADDRESS_FORM_LOADED_EVENT = 'ibexa-fieldtype-address:form-loaded';
    const addressFields = doc.querySelectorAll('.ibexa-field-edit--ibexa_address');
    const getHtmlFromResponse = (response) => {
        const range = doc.createRange();
        const formDOMElement = range.createContextualFragment(response);

        return formDOMElement.querySelector('.ibexa-data-source__fields-wrapper');
    };
    const replaceFormOnCountryChange = (country, { formNode }) => {
        const { contentTypeIdentifier, fieldIdentifier, languageCode, formName } = formNode.dataset;
        const countryFormLink = Routing.generate('ibexa.address.country.form', {
            contentTypeIdentifier,
            fieldIdentifier,
            languageCode,
            formName,
            country,
        });

        fetch(countryFormLink, { mode: 'same-origin', credentials: 'same-origin' })
            .then(ibexa.helpers.request.getTextFromResponse)
            .then(getHtmlFromResponse)
            .then((htmlResponse) => {
                formNode.replaceWith(htmlResponse);
                doc.body.dispatchEvent(new CustomEvent(ADDRESS_FORM_LOADED_EVENT));
            })
            .catch(ibexa.helpers.notification.showErrorNotification);
    };
    const attachChangeCountryEvents = (addressField) => {
        const countryField = addressField.querySelector('.ibexa-data-source__field--country');
        const countryDropdown = countryField.querySelector('.ibexa-data-source__country-dropdown');
        const formNode = addressField.querySelector('.ibexa-data-source__fields-wrapper');
        const countryDropdownInstance = new ibexa.core.Dropdown({
            container: countryDropdown,
        });

        countryDropdownInstance.init();
        countryDropdownInstance.sourceInput.addEventListener(
            'change',
            ({ currentTarget }) => {
                replaceFormOnCountryChange(currentTarget.value, {
                    formNode,
                });
            },
            false,
        );
    };

    addressFields.forEach(attachChangeCountryEvents);
})(window, window.document, window.ibexa, window.Routing);
