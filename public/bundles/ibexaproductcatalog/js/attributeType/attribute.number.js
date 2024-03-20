(function (global, doc, ibexa) {
    const SELECTOR_FIELD = '.ibexa-attribute-edit--number';
    const SELECTOR_INTEGER_FIELD = '.ibexa-attribute-edit--integer';
    const SELECTOR_SOURCE_INPUT = '.ibexa-input--text';
    const SELECTOR_LABEL = '.ibexa-attribute-edit__label';

    class IbexaAttributeNumberValidator extends ibexa.BaseFieldValidator {
        validateInput({ currentTarget }) {
            const isRequired = currentTarget.required;
            const parsedValue = currentTarget.value.replaceAll(' ', '');
            const isEmpty = !parsedValue;
            const isTooShort = parsedValue.length < parseInt(currentTarget.dataset.min, 10);
            const isTooLong = parsedValue.length > parseInt(currentTarget.dataset.max, 10);
            const isError = (isEmpty && isRequired) || isTooShort || isTooLong;
            const label = currentTarget.closest(SELECTOR_FIELD).querySelector(SELECTOR_LABEL).innerHTML;
            const result = { isError };

            if (isEmpty) {
                result.errorMessage = ibexa.errors.emptyField.replace('{fieldName}', label);
            } else if (isTooShort) {
                result.errorMessage = ibexa.errors.tooShort.replace('{fieldName}', label).replace('{minLength}', currentTarget.dataset.min);
            } else if (isTooLong) {
                result.errorMessage = ibexa.errors.tooLong.replace('{fieldName}', label).replace('{maxLength}', currentTarget.dataset.max);
            }

            return result;
        }
        validateInteger({ currentTarget }) {
            const label = currentTarget.closest(SELECTOR_INTEGER_FIELD).querySelector(SELECTOR_LABEL).innerHTML;
            const isError = !Number.isInteger(Number(currentTarget.value));
            const result = { isError };

            if (isError) {
                result.errorMessage = ibexa.errors.isNotInteger.replace('{fieldName}', label);
            }

            return result;
        }
    }

    const validator = new IbexaAttributeNumberValidator({
        classInvalid: 'is-invalid',
        fieldSelector: SELECTOR_FIELD,
        eventsMap: [
            {
                selector: `${SELECTOR_FIELD} input`,
                eventName: 'blur',
                callback: 'validateInput',
                errorNodeSelectors: ['.ibexa-form-error'],
                invalidStateSelectors: [SELECTOR_SOURCE_INPUT],
            },
            {
                selector: `${SELECTOR_FIELD}${SELECTOR_INTEGER_FIELD} input`,
                eventName: 'blur',
                callback: 'validateInteger',
                errorNodeSelectors: ['.ibexa-form-error'],
                invalidStateSelectors: [SELECTOR_SOURCE_INPUT],
            },
        ],
    });

    validator.init();

    ibexa.addConfig('fieldTypeValidators', [validator], true);
})(window, window.document, window.ibexa);
