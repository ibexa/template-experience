(function (global, doc, eZ) {
    const CONFIG_PANEL_SIDE_LEFT = 'LEFT';
    const CONFIG_PANEL_SIDE_RIGHT = 'RIGHT';
    const openedConfigPanelSettings = {
        [CONFIG_PANEL_SIDE_LEFT]: null,
        [CONFIG_PANEL_SIDE_RIGHT]: null,
    };
    const getSide = (event) => event.detail?.side?.toUpperCase() ?? CONFIG_PANEL_SIDE_LEFT;
    const closeConfigPanel = (side) => {
        if (openedConfigPanelSettings[side]) {
            const wasConfigPanelClosed = openedConfigPanelSettings[side].onClose();

            if (wasConfigPanelClosed) {
                openedConfigPanelSettings[side] = null;
            }

            return wasConfigPanelClosed;
        }

        return true;
    };
    const openConfigPanel = (configPanelSettings, side) => {
        const wasPrevConfigPanelClosed = closeConfigPanel(side);

        if (wasPrevConfigPanelClosed) {
            const wasNewConfigPanelOpened = configPanelSettings?.onOpen?.() ?? true;

            if (wasNewConfigPanelOpened) {
                openedConfigPanelSettings[side] = configPanelSettings;
            }
        } else {
            configPanelSettings?.onAbort?.();
        }

        return wasPrevConfigPanelClosed;
    };
    const handleConfigPanelClose = (event) => {
        const side = getSide(event);
        const configPanelsClosed = closeConfigPanel(side);

        if (!configPanelsClosed) {
            event.preventDefault();
        }
    };
    const handleConfigPanelCloseItself = (event) => {
        const side = getSide(event);

        openedConfigPanelSettings[side] = null;
    };
    const handleConfigPanelOpen = (event) => {
        const side = getSide(event);
        const configPanelSettings = event.detail?.settings;
        const configPanelsOpened = openConfigPanel(configPanelSettings, side);

        if (!configPanelsOpened) {
            event.preventDefault();
        }
    };

    doc.addEventListener('ibexa-pb-config-panel-open', handleConfigPanelOpen, false);
    doc.addEventListener('ibexa-pb-config-panel-close', handleConfigPanelClose, false);
    doc.addEventListener('ibexa-pb-config-panel-close-itself', handleConfigPanelCloseItself, false);
})(window, window.document, window.eZ);
