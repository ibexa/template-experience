(function (global, doc, ibexa, Routing) {
    const ADDRESS_FORM_LOADED_EVENT = 'ibexa-fieldtype-address:form-loaded';
    const addressFields = doc.querySelectorAll('.ibexa-field-edit--ibexa_address');
    const getHtmlFromResponse = (response) => {
        const range = doc.createRange();
        const formDOMElement = range.createContextualFragment(response);

        return formDOMElement.querySelector('.ibexa-data-source__fields-wrapper');
    };
    const getLoaderElement = (addressWrapper) => {
        const template = addressWrapper.dataset.dropdownLoaderTemplate;
        const container = doc.createElement('div');

        container.insertAdjacentHTML('beforeend', template);

        return container.firstElementChild;
    };
    const blockAddressFields = (addressWrapper) => {
        const form = addressWrapper.closest('form');
        const allFormFields = [...form.elements];
        const addressFormFields = allFormFields.filter((formField) => addressWrapper.contains(formField));

        addressFormFields.forEach((formField) => {
            formField.disabled = true;
        });
    };
    const replaceFormOnCountryChange = (country, { dataSourceNode, dropdownNode }) => {
        const formNode = dataSourceNode.querySelector('.ibexa-data-source__fields-wrapper');
        const { formIntent, contentTypeIdentifier, fieldIdentifier, languageCode, parentLocationId, contentId, formName } =
            formNode.dataset;
        const selectedItem = dropdownNode.querySelector('.ibexa-dropdown__selected-item');
        const loader = getLoaderElement(formNode);

        blockAddressFields(formNode);
        selectedItem.appendChild(loader);

        const countryFormLink =
            formIntent === 'update'
                ? Routing.generate('ibexa.address.country.form.update', {
                      contentTypeIdentifier,
                      fieldIdentifier,
                      languageCode,
                      contentId,
                      formName,
                      country,
                  })
                : Routing.generate('ibexa.address.country.form.create', {
                      contentTypeIdentifier,
                      fieldIdentifier,
                      languageCode,
                      parentLocationId,
                      formName,
                      country,
                  });

        fetch(countryFormLink, { mode: 'same-origin', credentials: 'same-origin' })
            .then(ibexa.helpers.request.getTextFromResponse)
            .then(getHtmlFromResponse)
            .then((htmlResponse) => {
                loader.remove();
                formNode.replaceWith(htmlResponse);
                doc.body.dispatchEvent(new CustomEvent(ADDRESS_FORM_LOADED_EVENT));
            })
            .catch(ibexa.helpers.notification.showErrorNotification);
    };
    const attachChangeCountryEvents = (addressField) => {
        const countryField = addressField.querySelector('.ibexa-data-source__field--country');
        const countryDropdown = countryField.querySelector('.ibexa-data-source__country-dropdown');
        const dataSourceNode = addressField.querySelector('.ibexa-data-source');
        const countryDropdownInstance = new ibexa.core.Dropdown({
            container: countryDropdown,
        });

        countryDropdownInstance.init();
        countryDropdownInstance.sourceInput.addEventListener(
            'change',
            ({ currentTarget }) => {
                replaceFormOnCountryChange(currentTarget.value, {
                    dataSourceNode,
                    dropdownNode: currentTarget.closest('.ibexa-dropdown'),
                });
            },
            false,
        );
    };

    addressFields.forEach(attachChangeCountryEvents);
})(window, window.document, window.ibexa, window.Routing);
