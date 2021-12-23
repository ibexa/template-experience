(function(global, doc) {
    const SELECTOR_FIELD = '.ibexa-fb-form-field-config-fieldset__validator--regex';
    const SELECTOR_SOURCE_INPUT = '.ibexa-fb-form-field-config-fieldset__validator-input--dropdown';
    const SELECTOR_CUSTOM_REGEX = '.ibexa-fb-form-field-config-fieldset__validator-config';
    const SELECTOR_REGEX_INPUT = '#field_configuration_validators_regex_value_pattern';
    const SELECTOR_SELECTED_ITEM = '.ibexa-dropdown__selected-item';
    const CUSTOM_REGEX_VALUE = '/.*/';
    let wasCustomRegexSelected = false;
    let customRegexValue = CUSTOM_REGEX_VALUE;
    const updateRegexStoredValue = (event) => (customRegexValue = event.currentTarget.value);
    const attachEventsToRegexInput = (input) => {
        input.addEventListener('keyup', updateRegexStoredValue, false);
        input.addEventListener('blur', updateRegexStoredValue, false);
    };
    const showRegexConfig = (container, event) => {
        const selectedOptionValue = [...event.currentTarget.selectedOptions][0].value;
        const isCustomRegexSelected = selectedOptionValue === CUSTOM_REGEX_VALUE;
        const regexConfigMethodName = isCustomRegexSelected ? 'removeAttribute' : 'setAttribute';
        const regexInput = container.querySelector(SELECTOR_REGEX_INPUT);

        container.querySelector(SELECTOR_CUSTOM_REGEX)[regexConfigMethodName]('hidden', true);

        if (!isCustomRegexSelected) {
            regexInput.value = selectedOptionValue;

            regexInput.removeEventListener('keyup', updateRegexStoredValue);
            regexInput.removeEventListener('blur', updateRegexStoredValue);

            return;
        }

        if (wasCustomRegexSelected) {
            regexInput.value = customRegexValue;
        } else {
            wasCustomRegexSelected = true;
            regexInput.value = CUSTOM_REGEX_VALUE;
        }

        attachEventsToRegexInput(regexInput);
    };

    doc.querySelectorAll(SELECTOR_FIELD).forEach((container) => {
        const sourceInput = container.querySelector(SELECTOR_SOURCE_INPUT);
        const selectedItem = container.querySelector(SELECTOR_SELECTED_ITEM);

        if (selectedItem && selectedItem.dataset.value === CUSTOM_REGEX_VALUE) {
            const regexInput = container.querySelector(SELECTOR_REGEX_INPUT);

            wasCustomRegexSelected = true;
            customRegexValue = regexInput.value;

            showRegexConfig(container, {
                currentTarget: {
                    selectedOptions: [{ value: selectedItem.dataset.value }],
                },
            });
        }

        sourceInput.addEventListener('change', showRegexConfig.bind(null, container), false);
    });
})(window, window.document);
