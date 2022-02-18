(function(global, doc, ibexa) {
    const SELECTOR_FIELD = '.ibexa-data-source__field--code';
    const SELECTOR_SOURCE_INPUT = '.ibexa-data-source__input';
    const SELECTOR_LABEL = '.ibexa-data-source__label';

    class IbexaCodeValidator extends ibexa.BaseFieldValidator {
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

    const validator = new IbexaCodeValidator({
        classInvalid: 'is-invalid',
        fieldSelector: SELECTOR_FIELD,
        eventsMap: [
            {
                selector: `${SELECTOR_FIELD} ${SELECTOR_SOURCE_INPUT}`,
                eventName: 'blur',
                callback: 'validateInput',
                errorNodeSelectors: ['.ibexa-form-error'],
                invalidStateSelectors: [SELECTOR_SOURCE_INPUT],
            },
        ],
    });

    validator.init();

    ibexa.addConfig('fieldTypeValidators', [validator], true);
})(window, window.document, window.ibexa);
