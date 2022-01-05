(function (global, doc, ibexa) {
    const fieldsConfigPanel = doc.querySelector('.ibexa-pb-config-panel--fields');
    const fieldsConfigPanelTogglerBtn = doc.querySelector('.ibexa-btn--show-fields');
    const fieldsConfigPanelCloseBtn = fieldsConfigPanel.querySelector('.ibexa-pb-config-panel__close-btn');
    const openConfigPanel = () => {
        fieldsConfigPanelTogglerBtn.classList.toggle('ibexa-btn--selected');
        fieldsConfigPanel.classList.toggle('ibexa-pb-config-panel--closed');

        return true;
    };
    const closeConfigPanel = () => {
        fieldsConfigPanel.classList.add('ibexa-pb-config-panel--closed');
        fieldsConfigPanelTogglerBtn.classList.remove('ibexa-btn--selected');

        return true;
    };
    const toggleFieldsConfigPanel = () => {
        const isConfigPanelClosed = fieldsConfigPanel.classList.contains('ibexa-pb-config-panel--closed');

        if (isConfigPanelClosed) {
            const wasConfigPanelOpened = doc.dispatchEvent(
                new CustomEvent('ibexa-pb-config-panel-open', {
                    cancelable: true,
                    detail: { settings: { onOpen: openConfigPanel, onClose: closeConfigPanel } },
                })
            );

            if (wasConfigPanelOpened) {
                ibexa.helpers.tooltips.hideAll();
            }
        } else {
            doc.dispatchEvent(new CustomEvent('ibexa-pb-config-panel-close-itself'));
            closeConfigPanel();
        }
    };

    fieldsConfigPanelTogglerBtn.addEventListener('click', toggleFieldsConfigPanel, false);
    fieldsConfigPanelCloseBtn.addEventListener('click', () => doc.dispatchEvent(new CustomEvent('ibexa-pb-config-panel-close')), false);
})(window, window.document, window.ibexa);
