(function (global, doc, ibexa) {
    const SELECTOR_FIELD = '.ibexa-field-edit--ibexa_taxonomy_entry_assignment';
    const SELECTOR_INPUT = '.ibexa-tag-view-select .ibexa-input--text.form-control';
    const SELECTOR_LABEL = '.ibexa-field-edit__label';
    const SELECTOR_ERROR_NODE = `${SELECTOR_FIELD} .ibexa-form-error`;

    if (!doc.querySelector(SELECTOR_FIELD)) {
        return;
    }

    class IbexaTaxonomyEntryAssignmentValidator extends ibexa.BaseFieldValidator {
        validateEntries(event) {
            const input = event.target;
            const isRequired = input.required;
            const isEmpty = !input.value;
            const isError = isEmpty && isRequired;
            const label = input.closest(SELECTOR_FIELD).querySelector(SELECTOR_LABEL).innerText;
            const result = { isError };

            if (isEmpty) {
                result.errorMessage = ibexa.errors.emptyField.replace('{fieldName}', label);
            }

            return result;
        }
    }

    const validator = new IbexaTaxonomyEntryAssignmentValidator({
        classInvalid: 'is-invalid',
        fieldSelector: SELECTOR_FIELD,
        eventsMap: [
            {
                selector: `${SELECTOR_FIELD} ${SELECTOR_INPUT}`,
                eventName: 'change',
                callback: 'validateEntries',
                invalidStateSelectors: [SELECTOR_LABEL],
                errorNodeSelectors: [SELECTOR_ERROR_NODE],
            },
        ],
    });

    validator.init();

    ibexa.addConfig('fieldTypeValidators', [validator], true);
})(window, window.document, window.ibexa);
