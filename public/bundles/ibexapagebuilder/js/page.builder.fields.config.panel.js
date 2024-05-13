(function (global, doc, ibexa) {
    const EXCLUDED_VALIDATOR_NAMES = ['EzLandingPageValidator', 'EzLandingPageLayoutValidator'];
    const CLOSE_CONFIG_PANEL_KEY = 'Escape';
    const CONFIG_PANEL_FOOTER_WITH_SCROLL = 'ibexa-pb-config-panel__footer--slim';
    const fieldsConfigPanel = doc.querySelector('.ibexa-pb-fields-config-panel');
    const fieldsConfigPanelTogglerBtn = doc.querySelector('.ibexa-pb-action-bar__action-btn--show-fields');
    const configPanelCloseBtn = doc.querySelector('.ibexa-pb-config-panel__footer-close');
    const configPanelFooter = doc.querySelector('.ibexa-pb-config-panel__footer');
    const configPanelBody = doc.querySelector('.ibexa-pb-config-panel__body');
    const isFieldsConfigPanelOpenedAtStartup = fieldsConfigPanelTogglerBtn.classList.contains('ibexa-btn--selected');
    const backdrop = new window.ibexa.core.Backdrop({ extraClasses: ['ibexa-pb-config-panel__backdrop'] });
    const LEFT_CONFIG_PANEL_WIDTH_KEY_NAME = 'ibexa-pb-config-panel-width-left';
    const DEFAULT_CONFIG_PANEL_MIN_WIDTH = 830;
    const DEFAULT_CONFIG_PANEL_MAX_WIDTH = 1920;
    const localStoragePanelWidth = window.localStorage.getItem(LEFT_CONFIG_PANEL_WIDTH_KEY_NAME);
    const configPanelLocalWidth = localStoragePanelWidth ? Number(localStoragePanelWidth) : DEFAULT_CONFIG_PANEL_MIN_WIDTH;
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
    const toggleFooterScrollClass = (isScroll) => {
        configPanelFooter.classList.toggle(CONFIG_PANEL_FOOTER_WITH_SCROLL, isScroll);
    };
    const fitFooter = () => {
        const hasVerticalScrollbar = configPanelBody.scrollHeight > configPanelBody.clientHeight;

        toggleFooterScrollClass(hasVerticalScrollbar);
    };
    const openConfigPanel = () => {
        fieldsConfigPanel.classList.toggle('ibexa-pb-config-panel--closed');
        fieldsConfigPanel.style.width = `${configPanelLocalWidth}px`;
        fieldsConfigPanelTogglerBtn.classList.toggle('ibexa-btn--selected');
        fieldsConfigPanelTogglerBtn.style.zIndex = 656;
        backdrop.show();
        fitFooter();
        resizer.addEventListener('mousedown', startResizing, false);
        doc.addEventListener('mousemove', resize, false);
        doc.addEventListener('mouseup', stopResizing, false);
        doc.addEventListener('click', closeConfigPanelByClickOutside, false);
        doc.addEventListener('keyup', closeConfigPanelByKeyboard, false);
        configPanelCloseBtn.addEventListener('click', closeConfigPanel, false);
        window.addEventListener('resize', fitFooter, false);

        return true;
    };
    const closeConfigPanel = () => {
        fieldsConfigPanel.classList.add('ibexa-pb-config-panel--closed');
        fieldsConfigPanelTogglerBtn.classList.remove('ibexa-btn--selected');
        fieldsConfigPanelTogglerBtn.style.zIndex = 0;
        backdrop.remove();
        resizer.removeEventListener('mousedown', startResizing, false);
        doc.removeEventListener('mousemove', resize, false);
        doc.removeEventListener('mouseup', stopResizing, false);
        doc.removeEventListener('click', closeConfigPanelByClickOutside);
        doc.removeEventListener('keyup', closeConfigPanelByKeyboard);
        configPanelCloseBtn.removeEventListener('click', closeConfigPanel, false);
        window.removeEventListener('resize', fitFooter, false);

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
    const closeConfigPanelByClickOutside = (event) => event.target.classList.contains('ibexa-backdrop') && closeConfigPanel();
    const closeConfigPanelByKeyboard = (event) => event.key === CLOSE_CONFIG_PANEL_KEY && closeConfigPanel();

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
