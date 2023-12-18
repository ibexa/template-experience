(function (global, doc, ibexa) {
    const EXCLUDED_VALIDATOR_NAMES = ['EzLandingPageValidator', 'EzLandingPageLayoutValidator'];
    const fieldsConfigPanel = doc.querySelector('.ibexa-pb-fields-config-panel');
    const fieldsConfigPanelTogglerBtn = doc.querySelector('.ibexa-pb-action-bar__action-btn--show-fields');
    const isFieldsConfigPanelOpenedAtStartup = fieldsConfigPanelTogglerBtn.classList.contains('ibexa-btn--selected');
    const backdrop = new window.ibexa.core.Backdrop({ extraClasses: ['ibexa-pb-config-panel__backdrop'] });
    const LEFT_CONFIG_PANEL_WIDTH_KEY_NAME = 'ibexa-pb-config-panel-width-left';
    const localStoragePanelWidth = window.localStorage.getItem(LEFT_CONFIG_PANEL_WIDTH_KEY_NAME);
    const configPanelLocalWidth = localStoragePanelWidth ? Number(localStoragePanelWidth) : DEFAULT_CONFIG_PANEL_MIN_WIDTH;
    const DEFAULT_CONFIG_PANEL_MIN_WIDTH = 830;
    const DEFAULT_CONFIG_PANEL_MAX_WIDTH = 1920;
    const configPanelWidth = configPanelLocalWidth;
    const resizer = fieldsConfigPanel.querySelector('.ibexa-pb-config-panel__resizer');
    const clientXWhenStartDraging = {
        clientX: null,
        resizing: false,
    };
    const startResizing = ({ clientX }) => {
        clientXWhenStartDraging.clientX = clientX;
        clientXWhenStartDraging.resizing = true;
    };
    const stopResizing = () => {
        clientXWhenStartDraging.resizing = false;
    };
    const resize = ({ clientX }) => {
        if (!clientXWhenStartDraging.resizing) {
            return;
        }

        const newConfigPanelWidth = configPanelWidth - (clientXWhenStartDraging.clientX - clientX);
        const maxConfigPanelWidth = Math.min(window.screen.width, DEFAULT_CONFIG_PANEL_MAX_WIDTH);
        const minMaxConfigPanelWidth = Math.min(Math.max(newConfigPanelWidth, DEFAULT_CONFIG_PANEL_MIN_WIDTH), maxConfigPanelWidth);

        window.localStorage.setItem(LEFT_CONFIG_PANEL_WIDTH_KEY_NAME, minMaxConfigPanelWidth);

        fieldsConfigPanel.style.width = `${minMaxConfigPanelWidth}px`;
    };
    const openConfigPanel = () => {
        fieldsConfigPanel.classList.toggle('ibexa-pb-config-panel--closed');
        fieldsConfigPanel.style.width = `${configPanelLocalWidth}px`;
        fieldsConfigPanelTogglerBtn.classList.toggle('ibexa-btn--selected');
        fieldsConfigPanelTogglerBtn.style.zIndex = 651;
        backdrop.show();
        resizer.addEventListener('mousedown', startResizing, false);
        document.addEventListener('mousemove', resize, false);
        document.addEventListener('mouseup', stopResizing, false);

        return true;
    };
    const closeConfigPanel = () => {
        fieldsConfigPanel.classList.add('ibexa-pb-config-panel--closed');
        fieldsConfigPanelTogglerBtn.classList.remove('ibexa-btn--selected');
        fieldsConfigPanelTogglerBtn.style.zIndex = 0;
        backdrop.remove();
        resizer.removeEventListener('mousedown', startResizing, false);
        document.removeEventListener('mousemove', resize, false);
        document.removeEventListener('mouseup', stopResizing, false);

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
    fieldsConfigPanel.style.width = `${configPanelWidth}px`;

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
