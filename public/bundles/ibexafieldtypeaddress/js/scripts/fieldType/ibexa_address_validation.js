(function (global, doc, ibexa, Translator) {
    const SELECTOR_FIELD = '.ibexa-field-edit--ibexa_address';
    const SELECTOR_LABEL = '.ibexa-data-source__label';
    const SELECTOR_ERROR_NODE = '.ibexa-form-error';
    const SELECTOR_FIELD_NAME = `.ibexa-data-source__field--name`;
    const SELECTOR_FIELD_COUNTRY = '.ibexa-data-source__field--country';
    const SELECTOR_FIELD_REGION = `.ibexa-data-source__field--region`;
    const SELECTOR_FIELD_CITY = '.ibexa-data-source__field--locality';
    const SELECTOR_FIELD_STREET = '.ibexa-data-source__field--street';
    const SELECTOR_FIELD_POSTAL_CODE = '.ibexa-data-source__field--postal_code';

    class IbexaAddressValidator extends ibexa.BaseFieldValidator {
        validateInput(event) {
            const result = {
                isError: false,
                errorMessage: null,
            };
            const input = event.currentTarget;
            const fieldValue = input.value.trim();
            const isRequired = input.required;
            const isEmpty = !fieldValue;
            const label =
                event.target.labels[0]?.innerText ??
                Translator.trans(/* @Desc("This") */ 'ibexa.address.validation.this', {}, 'ibexa_fieldtype_address');

            if (isRequired && isEmpty) {
                result.isError = true;
                result.errorMessage = ibexa.errors.emptyField.replace('{fieldName}', label);
            }

            return result;
        }

        validateSelector(event) {
            const result = {
                isError: false,
                errorMessage: null,
            };
            const input = event.currentTarget;
            const fieldContainer = event.currentTarget.closest('.ibexa-data-source__field--country');
            const isSelectRequired = fieldContainer.classList.contains('ibexa-data-source__field--required');
            const hasValue = !!input.value;
            const label = fieldContainer.querySelector('.ibexa-data-source__label').innerText;

            if (isSelectRequired && !hasValue) {
                result.isError = true;
                result.errorMessage = ibexa.errors.emptyField.replace('{fieldName}', label);
            }
            return result;
        }
    }

    const validator = new IbexaAddressValidator({
        classInvalid: 'is-invalid',
        fieldSelector: SELECTOR_FIELD,
        eventsMap: [
            {
                selector: `${SELECTOR_FIELD} ${SELECTOR_FIELD_NAME} .ibexa-data-source__input`,
                eventName: 'blur',
                callback: 'validateInput',
                invalidStateSelectors: [`${SELECTOR_FIELD_NAME} ${SELECTOR_LABEL}`],
                errorNodeSelectors: [`${SELECTOR_FIELD_NAME} ${SELECTOR_ERROR_NODE}`],
            },
            {
                selector: `${SELECTOR_FIELD} ${SELECTOR_FIELD_COUNTRY} .ibexa-data-source__input`,
                eventName: 'change',
                callback: 'validateSelector',
                invalidStateSelectors: [`${SELECTOR_FIELD_COUNTRY} ${SELECTOR_LABEL}`],
                errorNodeSelectors: [`${SELECTOR_FIELD_COUNTRY} ${SELECTOR_ERROR_NODE}`],
            },
            {
                selector: `${SELECTOR_FIELD} ${SELECTOR_FIELD_REGION} .ibexa-data-source__input`,
                eventName: 'blur',
                callback: 'validateInput',
                invalidStateSelectors: [`${SELECTOR_FIELD_REGION} ${SELECTOR_LABEL}`],
                errorNodeSelectors: [`${SELECTOR_FIELD_REGION} ${SELECTOR_ERROR_NODE}`],
            },
            {
                selector: `${SELECTOR_FIELD} ${SELECTOR_FIELD_CITY} .ibexa-data-source__input`,
                eventName: 'blur',
                callback: 'validateInput',
                invalidStateSelectors: [`${SELECTOR_FIELD_CITY} ${SELECTOR_LABEL}`],
                errorNodeSelectors: [`${SELECTOR_FIELD_CITY} ${SELECTOR_ERROR_NODE}`],
            },
            {
                selector: `${SELECTOR_FIELD} ${SELECTOR_FIELD_STREET} .ibexa-data-source__input`,
                eventName: 'blur',
                callback: 'validateInput',
                invalidStateSelectors: [`${SELECTOR_FIELD_STREET} ${SELECTOR_LABEL}`],
                errorNodeSelectors: [`${SELECTOR_FIELD_STREET} ${SELECTOR_ERROR_NODE}`],
            },
            {
                selector: `${SELECTOR_FIELD} ${SELECTOR_FIELD_POSTAL_CODE} .ibexa-data-source__input`,
                eventName: 'blur',
                callback: 'validateInput',
                invalidStateSelectors: [`${SELECTOR_FIELD_POSTAL_CODE} ${SELECTOR_LABEL}`],
                errorNodeSelectors: [`${SELECTOR_FIELD_POSTAL_CODE} ${SELECTOR_ERROR_NODE}`],
            },
        ],
    });

    validator.init();

    doc.body.addEventListener(
        'ibexa-fieldtype-address:form-loaded',
        () => {
            validator.reinit();
        },
        false,
    );
    ibexa.addConfig('fieldTypeValidators', [validator], true);
})(window, window.document, window.ibexa, window.Translator);
