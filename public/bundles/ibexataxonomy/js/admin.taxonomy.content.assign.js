(function (global, doc, ibexa, React, ReactDOM, Translator) {
    const assignContentBtns = doc.querySelectorAll('.ibexa-btn--assign-content');
    const form = doc.querySelector('form[name="taxonomy_content_assign"]');
    const IDS_SEPARATOR = ',';

    if (!form) {
        return;
    }

    const submitButton = form.querySelector('#taxonomy_content_assign_assign');
    const assignedLocationsInput = form.querySelector('#taxonomy_content_assign_locations');
    const udwContainer = doc.getElementById('react-udw');
    let udwRoot = null;
    const closeUDW = () => udwRoot.unmount();
    const onConfirm = (items) => {
        closeUDW();

        assignedLocationsInput.value = items.map((item) => item.id).join(IDS_SEPARATOR);
        submitButton.click();
    };
    const onCancel = () => closeUDW();
    const openUDW = (event) => {
        const config = JSON.parse(event.currentTarget.dataset.udwConfig);
        const title = Translator.trans(/*@Desc("Select Location")*/ 'add_location.title', {}, 'universal_discovery_widget');
        const selectedLocationsIds = assignedLocationsInput.value
            .split(IDS_SEPARATOR)
            .filter((idString) => !!idString)
            .map((idString) => parseInt(idString, 10));

        udwRoot = ReactDOM.createRoot(udwContainer);
        udwRoot.render(
            React.createElement(ibexa.modules.UniversalDiscovery, {
                onConfirm,
                onCancel,
                title,
                selectedLocations: selectedLocationsIds,
                ...config,
            }),
        );
    };

    assignContentBtns.forEach((btn) => btn.addEventListener('click', openUDW, false));
})(window, window.document, window.ibexa, window.React, window.ReactDOM, window.Translator);
