(function(global, doc, Translator, eZ) {
    let prevInputValue;
    const contentConfigContainer = doc.querySelector('.ibexa-fb-form-field-config-fieldset__attribute-config[data-config="location_id"]');

    if (!contentConfigContainer) {
        return;
    }

    const configInput = contentConfigContainer.querySelector('.ibexa-fb-form-field-config-fieldset__attribute-input--location-id');
    const openUdwBtn = contentConfigContainer.querySelector('.ibexa-fb-field-config__btn--open-udw');
    const selectedItemContainer = doc.querySelector('.ibexa-fb-form-field-config-selected-item');
    const selectedItemName = selectedItemContainer.querySelector('.ibexa-fb-form-field-config-selected-item__name');
    const selectedItemType = selectedItemContainer.querySelector('.ibexa-fb-form-field-config-selected-item__type');
    const selectedItemCreatedDate = selectedItemContainer.querySelector('.ibexa-fb-form-field-config-selected-item__created-date');
    const removeSelectedItemBtn = selectedItemContainer.querySelector('.ibexa-fb-form-field-config-selected-item__action--remove');
    const openUdw = (event) => {
        event.preventDefault();

        const config = JSON.parse(event.currentTarget.dataset.udwConfig);
        const title = Translator.trans(/*@Desc("Select content")*/ 'action.redirect.udw.title', {}, 'form_builder');
        const openUdwEvent = new CustomEvent('ez-open-udw', {
            detail: {
                title,
                multiple: false,
                onConfirm: setSelectedItem,
                onCancel: restorePrevInputValue,
                ...config,
            },
        });

        doc.body.dispatchEvent(openUdwEvent);

        prevInputValue = configInput.value;
    };
    const restorePrevInputValue = () => (configInput.value = prevInputValue);
    const setSelectedItem = (items) => {
        const [selectedItem] = items;
        const { formatShortDateTime } = eZ.helpers.timezone;
        const itemName = eZ.helpers.text.escapeHTML(selectedItem.ContentInfo.Content.TranslatedName);
        const itemType = eZ.helpers.text.escapeHTML(selectedItem.ContentInfo.Content.ContentTypeInfo.names.value[0]['#text']);
        const itemPublishDate = formatShortDateTime(selectedItem.ContentInfo.Content.publishedDate);

        selectedItemName.innerHTML = itemName;
        selectedItemType.innerHTML = itemType;
        selectedItemCreatedDate.innerHTML = itemPublishDate;
        configInput.value = selectedItem.id;

        selectedItemContainer.classList.remove('ibexa-fb-form-field-config-selected-item--hidden');
        openUdwBtn.setAttribute('hidden', true);
    };
    const removeSelectedItem = () => {
        configInput.value = '';

        openUdwBtn.removeAttribute('hidden');
        selectedItemContainer.classList.add('ibexa-fb-form-field-config-selected-item--hidden');
    };

    removeSelectedItemBtn.addEventListener('click', removeSelectedItem, false);
    openUdwBtn.addEventListener('click', openUdw, false);
})(window, window.document, window.Translator, window.eZ);
