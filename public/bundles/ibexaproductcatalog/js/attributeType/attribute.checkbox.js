(function (global, doc, ibexa) {
    const SELECTOR_FIELD = '.ibexa-attribute-edit--checkbox';
    const SELECTOR_LABEL = '.ibexa-attribute-edit__label, .ibexa-label--checkbox-radio, .ibexa-label';
    const SELECTOR_FORM_CHECK = '.form-check';

    class IbexaAttributeCheckboxValidator extends ibexa.BaseFieldValidator {
        validateInput(event) {
            const input = event.currentTarget ?? event.target;
            const field = input.closest(SELECTOR_FIELD);

            if (!field) {
                return this.cancelErrors();
            }

            const isRequired = input.required || field.classList.contains('ibexa-attribute-edit--required');
            const isError = isRequired && !input.checked;
            const labelNode = field.querySelector(SELECTOR_LABEL);
            const label = labelNode ? labelNode.innerText : input.name;
            const errorMessage = ibexa.errors.emptyField.replace('{fieldName}', label);

            return {
                isError,
                errorMessage,
            };
        }
    }

    const validator = new IbexaAttributeCheckboxValidator({
        classInvalid: 'is-invalid',
        fieldSelector: SELECTOR_FIELD,
        eventsMap: [
            {
                selector: `${SELECTOR_FIELD} .form-check-input`,
                eventName: 'change',
                callback: 'validateInput',
                errorNodeSelectors: ['.ibexa-form-error'],
                invalidStateSelectors: [SELECTOR_LABEL, SELECTOR_FORM_CHECK],
            },
        ],
    });

    validator.init();

    ibexa.addConfig('fieldTypeValidators', [validator], true);
})(window, window.document, window.ibexa);
