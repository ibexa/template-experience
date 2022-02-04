(function(global, doc, ibexa) {
    let configPanels = [...doc.querySelectorAll('.ibexa-pb-config-panel')];
    const adjustConfigPanelFooterShadow = (configPanel) => {
        const configPanelBody = configPanel.querySelector('.ibexa-pb-config-panel__body');

        if (!configPanelBody) {
            return;
        }

        const isScrollVisible = configPanelBody.scrollHeight > configPanelBody.clientHeight;
        const scrolledToBottom = configPanelBody.offsetHeight + configPanelBody.scrollTop === configPanelBody.scrollHeight;
        const showShadow = isScrollVisible && !scrolledToBottom;

        configPanelBody.classList.toggle('ibexa-pb-config-panel__body--with-shadow', showShadow);
    };
    const adjustAllConfigPanelsFooterShadow = () => {
        configPanels.forEach(adjustConfigPanelFooterShadow);
    };
    const attachConfigPanelEventListeners = (configPanel) => {
        const configPanelBody = configPanel.querySelector('.ibexa-pb-config-panel__body');

        if (!configPanelBody) {
            return;
        }

        configPanelBody.addEventListener('scroll', adjustConfigPanelFooterShadow.bind(null, configPanel), false);
    };
    const handleNewConfigPanelsAdded = () => {
        const currentConfigPanels = [...doc.querySelectorAll('.ibexa-pb-config-panel')];
        const newConfigPanels = currentConfigPanels.filter((configPanel) => !configPanels.includes(configPanel));

        newConfigPanels.forEach(attachConfigPanelEventListeners);
        adjustAllConfigPanelsFooterShadow();

        configPanels = currentConfigPanels;
    };

    configPanels.forEach(attachConfigPanelEventListeners);

    global.addEventListener('resize', adjustAllConfigPanelsFooterShadow, false);
    adjustAllConfigPanelsFooterShadow();

    doc.addEventListener('ibexa-pb-config-panel-added', handleNewConfigPanelsAdded, false);
})(window, window.document, window.ibexa);
