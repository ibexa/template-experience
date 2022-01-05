(function(global, doc, ibexa) {
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const languageCode = doc.querySelector('meta[name="LanguageCode"]').content;
    const selectLocationContainers = doc.querySelectorAll('.ibexa-fb-form-field-config-location');
    const selectLocation = (widget, selectedLocations) => {
        const [newSelectedLocation] = selectedLocations;

        const locationToAdd = {
            id: newSelectedLocation.id,
            name: ibexa.helpers.text.escapeHTML(newSelectedLocation.ContentInfo.Content.TranslatedName),
        };

        widget.addItems([locationToAdd], true);
    };
    const openUdw = (widget, udwConfig) => {
        const openUdwEvent = new CustomEvent('ibexa-open-udw', {
            detail: {
                onConfirm: selectLocation.bind(null, widget),
                onCancel: () => {},
                restInfo: { token, siteaccess },
                cotfAllowedLanguages: [languageCode],
                ...udwConfig,
            },
        });

        doc.body.dispatchEvent(openUdwEvent);
    };

    selectLocationContainers.forEach((selectLocationContainer) => {
        const selectLocationBtn = selectLocationContainer.querySelector('.ibexa-fb-form-field-config-location__btn-select-path');
        const udwConfig = JSON.parse(selectLocationBtn.dataset.udwConfig);
        const selectLocationWidget = new ibexa.core.TagViewSelect({
            fieldContainer: selectLocationContainer,
        });
        selectLocationBtn.addEventListener('click', openUdw.bind(null, selectLocationWidget, udwConfig));
    });
})(window, window.document, window.ibexa);
