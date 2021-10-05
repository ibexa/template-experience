(function(global, doc) {
    const CLASS_NO_SELECTION = 'fb-config-field--no-selection';
    const SELECTOR_FIELD = '.fb-config-field--action';
    const SELECTOR_SOURCE_INPUT = '.fb-config-field__input';
    const SELECTOR_ACTION_VALUE = '#field_configuration_attributes_action_value_action';
    const showActionConfig = (container, event) => {
        const selectedOptionValue = [...event.currentTarget.selectedOptions][0].value;
        const configContainers = [...container.querySelectorAll('[data-config]')];

        configContainers.forEach((config) => config.setAttribute('hidden', true));

        const selectedConfigContainer = configContainers.find((config) => config.dataset.config === selectedOptionValue);

        if (!selectedConfigContainer) {
            container.classList.add(CLASS_NO_SELECTION);

            return;
        }

        container.classList.remove(CLASS_NO_SELECTION);
        selectedConfigContainer.removeAttribute('hidden');
        container.querySelector(SELECTOR_ACTION_VALUE).value = selectedOptionValue;
    };

    doc.querySelectorAll(SELECTOR_FIELD).forEach((container) => {
        const sourceInput = container.querySelector(SELECTOR_SOURCE_INPUT);

        sourceInput.addEventListener('change', showActionConfig.bind(null, container), false);
    });
})(window, window.document);
