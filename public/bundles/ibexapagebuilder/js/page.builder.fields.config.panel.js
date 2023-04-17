(function (global, doc, ibexa) {
    const EXCLUDED_VALIDATOR_NAMES = ['EzLandingPageValidator', 'EzLandingPageLayoutValidator'];
    const fieldsConfigPanel = doc.querySelector('.ibexa-pb-fields-config-panel');
    const fieldsConfigPanelTogglerBtn = doc.querySelector('.ibexa-btn--show-fields');
    const isFieldsConfigPanelOpenedAtStartup = fieldsConfigPanelTogglerBtn.classList.contains('ibexa-btn--selected');
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
                }),
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

    if (isFieldsConfigPanelOpenedAtStartup) {
        doc.dispatchEvent(
            new CustomEvent('ibexa-pb-config-panel-open', {
                cancelable: true,
                detail: { settings: { onOpen: () => {}, onClose: closeConfigPanel, onAbort: closeConfigPanel } },
            }),
        );
    }
    doc.body.addEventListener(
        'ibexa-form-builder:before-open',
        () => {
            fieldsConfigPanel.classList.add('ibexa-pb-fields-config-panel--full-screen-field-opened');
        },
        false,
    );
    doc.body.addEventListener(
        'ibexa-form-builder:before-close',
        () => {
            fieldsConfigPanel.classList.remove('ibexa-pb-fields-config-panel--full-screen-field-opened');
        },
        false,
    );
    doc.body.addEventListener(
        'ibexa-pb:validation:other-field-types',
        (event) => {
            const { isValid } = event.detail;

            fieldsConfigPanelTogglerBtn.classList.toggle('ibexa-btn--error', !isValid);
        },
        false,
    );
    doc.body.addEventListener('ibexa-inputs-validation:change-state', () => {
        let isFormValid = true;

        ibexa.fieldTypeValidators.forEach((validator) => {
            const validatorName = validator.constructor.name;
            const isValidatorExcluded = EXCLUDED_VALIDATOR_NAMES.includes(validatorName);

            if (!isValidatorExcluded) {
                const { fieldsToValidate, fieldSelector } = validator;

                fieldsToValidate.forEach((fieldToValidate) => {
                    const fieldContainer = validator.getFieldTypeContainer(fieldToValidate.item.closest(fieldSelector));
                    const hasContainerErrorClass = fieldContainer.classList.contains('is-invalid');
                    const hasInvalidNodes = !!fieldContainer.querySelectorAll('.is-invalid').length;

                    if (hasContainerErrorClass || hasInvalidNodes) {
                        isFormValid = false;
                    }
                });
            }
        });

        fieldsConfigPanelTogglerBtn.classList.toggle('ibexa-btn--error', !isFormValid);
    });
})(window, window.document, window.ibexa);
