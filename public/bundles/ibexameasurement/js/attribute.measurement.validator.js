(function (global, doc, ibexa) {
    const SELECTOR_FIELD = '.ibexa-attribute-edit--measurement';
    const SELECTOR_SOURCE_INPUT = '.ibexa-input--text';
    const SELECTOR_LABEL = '.ibexa-attribute-edit__label';

    class IbexaAttributeMeasurementSimpleValidator extends ibexa.BaseFieldValidator {
        validateInput({ currentTarget }) {
            const isRequired = currentTarget.required;
            const parsedValue = currentTarget.value.replaceAll(' ', '');
            const isEmpty = !parsedValue;
            const isError = isEmpty && isRequired;
            const label = currentTarget.closest(SELECTOR_FIELD).querySelector(SELECTOR_LABEL).innerHTML;
            const result = { isError };

            if (isEmpty) {
                result.errorMessage = ibexa.errors.emptyField.replace('{fieldName}', label);
            }

            return result;
        }
    }

    const validator = new IbexaAttributeMeasurementSimpleValidator({
        classInvalid: 'is-invalid',
        fieldSelector: SELECTOR_FIELD,
        eventsMap: [
            {
                selector: `${SELECTOR_FIELD} .ibexa-input-text-wrapper--type-number input`,
                eventName: 'blur',
                callback: 'validateInput',
                errorNodeSelectors: ['.ibexa-form-error'],
                invalidStateSelectors: [SELECTOR_SOURCE_INPUT],
            },
        ],
    });

    validator.init();

    ibexa.addConfig('fieldTypeValidators', [validator], true);
})(window, document, window.ibexa);
