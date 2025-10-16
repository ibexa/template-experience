(function (global, doc, ibexa, React, ReactDOM, Routing) {
    let udwRoot = null;
    const udwContainer = doc.getElementById('react-udw');
    const quickActionUDWTrigers = doc.querySelectorAll('.ibexa-db-quick-actions [data-udw-config]');
    const onConfirm = (items) => {
        closeUDW();

        global.location.href = Routing.generate('ibexa.content.view', {
            contentId: items[0].ContentInfo.Content._id,
            locationId: items[0].id,
        });
    };
    const onCancel = () => closeUDW();
    const openUDW = (event) => {
        event.preventDefault();

        const triggerBtn = event.currentTarget;
        const { udwTitle: title, udwConfig } = triggerBtn.dataset;
        const config = JSON.parse(udwConfig);

        udwRoot = ReactDOM.createRoot(udwContainer);
        udwRoot.render(
            React.createElement(ibexa.modules.UniversalDiscovery, {
                onConfirm,
                onCancel,
                activeTab: 'create',
                title,
                ...config,
            }),
        );
    };
    const closeUDW = () => udwRoot.unmount();

    quickActionUDWTrigers.forEach((tiggerBtn) => {
        tiggerBtn.addEventListener('click', openUDW, false);
    });
})(window, window.document, window.ibexa, window.React, window.ReactDOM, window.Routing);
