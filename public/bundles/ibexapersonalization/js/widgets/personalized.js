(function (global, doc, ibexa) {
    const scenarioSelect = doc.querySelector('.ibexa-personalization-block-config__select--scenario-list');
    const outputTypeSelect = doc.querySelector('.ibexa-personalization-block-config__select--output-type-list');

    if (!scenarioSelect || !outputTypeSelect) {
        return;
    }

    const outputTypeDropdownContainer = outputTypeSelect.closest('.ibexa-dropdown');
    const outputTypeDropdown = ibexa.helpers.objectInstances.getInstance(outputTypeDropdownContainer);
    const handleScenarioChange = () => {
        filterContentTypeDropdown();

        const outputTypeDropdownVisibleItems = outputTypeDropdown.itemsListContainer.querySelectorAll(
            '.ibexa-dropdown__item:not(.ibexa-dropdown__item--hidden)',
        );

        if (!outputTypeDropdownVisibleItems.length) {
            return;
        }

        const { value } = outputTypeDropdownVisibleItems[0].dataset;

        outputTypeDropdown.selectOption(value);
    };

    const filterContentTypeDropdown = () => {
        const selectedScenarioValue = scenarioSelect.value;
        const selectedOption = scenarioSelect.querySelector(`[value="${selectedScenarioValue}"]`);
        const supportedOutputTypes = JSON.parse(selectedOption.dataset.supportedOutputTypes);
        const outputTypeDropdownItems = outputTypeDropdown.itemsListContainer.querySelectorAll('.ibexa-dropdown__item');

        outputTypeDropdownItems.forEach((outputTypeDropdownItem) => {
            const { value } = outputTypeDropdownItem.dataset;
            const hideItem = !supportedOutputTypes.includes(value);

            outputTypeDropdownItem.classList.toggle('ibexa-dropdown__item--hidden', hideItem);
        });
    };

    filterContentTypeDropdown();
    scenarioSelect.addEventListener('change', handleScenarioChange, false);
})(window, window.document, window.ibexa);
