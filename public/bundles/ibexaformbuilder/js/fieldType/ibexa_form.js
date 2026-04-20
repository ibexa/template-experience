(function (global, doc, ibexa) {
    const CLASS_LOADING_PREVIEW = 'ibexa-field-edit--loading-preview';
    const SELECTOR_FIELD = '.ibexa-field-edit--ibexa_form';
    const SELECTOR_LABEL = '.ibexa-field-edit__label';
    const fieldContainer = doc.querySelector(SELECTOR_FIELD);
    const formBuilderField = doc.querySelector('.ibexa-fb-content-edit-form');

    if (!formBuilderField) {
        return;
    }

    const formPreview = formBuilderField.querySelector('[data-ibexa-form-preview]');

    class IbexaFormValidator extends ibexa.BaseFieldValidator {
        /**
         * Validates the input field value
         *
         * @method validateInput
         * @param {Event} event
         * @returns {Object}
         * @memberof IbexaFormValidator
         */
        validateInput(event) {
            const result = { isError: false };
            const field = event.currentTarget;
            const label = field.closest(SELECTOR_FIELD).querySelector(SELECTOR_LABEL).innerText;
            const errorMessage = ibexa.errors.emptyField.replace('{fieldName}', label);

            if (!field.required) {
                return result;
            }

            const fieldValue = JSON.parse(field.value);

            if (fieldValue.fields.length) {
                return result;
            }

            result.isError = true;
            result.errorMessage = errorMessage;

            return result;
        }
    }

    const validator = new IbexaFormValidator({
        classInvalid: 'is-invalid',
        fieldSelector: SELECTOR_FIELD,
        fieldContainer,
        eventsMap: [
            {
                selector: `${SELECTOR_FIELD} input`,
                eventName: 'change',
                callback: 'validateInput',
                errorNodeSelectors: ['.ibexa-form-error'],
                invalidStateSelectors: [SELECTOR_LABEL],
            },
        ],
    });

    validator.init();

    formPreview.onload = () => {
        formPreview.contentWindow.onbeforeunload = () => fieldContainer.classList.add(CLASS_LOADING_PREVIEW);
        fieldContainer.classList.remove(CLASS_LOADING_PREVIEW);
    };

    ibexa.fieldTypeValidators = ibexa.fieldTypeValidators ? [...ibexa.fieldTypeValidators, validator] : [validator];
})(window, window.document, window.ibexa);
