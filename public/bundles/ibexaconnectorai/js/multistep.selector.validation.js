(function (global, doc, ibexa) {
    const multistepSelectorNode = doc.querySelector('.ibexa-cai-multistep-selector');
    const formNode = multistepSelectorNode?.closest('form');

    if (!multistepSelectorNode || !formNode) {
        return;
    }
    const sourceFieldsInputNode = multistepSelectorNode.querySelector('.ibexa-cai-multistep-selector__source-fields');
    const targetFieldsInputNode = multistepSelectorNode.querySelector('.ibexa-cai-multistep-selector__target-fields');

    const validateSourceFields = (input) => {
        const sourceFieldsDropdownField = multistepSelectorNode.querySelector(
            '.ibexa-cai-multistep-selector__step-dropdown-widget--source',
        );
        const sourceFieldsField = input.closest('.form-group');
        const sourceFieldsFormErrorNode = sourceFieldsDropdownField.querySelector('.ibexa-form-error');
        const sourceFieldsSelectionInfoNode = sourceFieldsDropdownField.querySelector(
            '.ibexa-cai-multistep-selector__dropdown .ibexa-dropdown__selection-info',
        );
        const isSourceFieldsValidationData = ibexa.helpers.formValidation.checkIsEmpty(sourceFieldsField);

        sourceFieldsSelectionInfoNode.classList.toggle('is-invalid', !isSourceFieldsValidationData.isValid);
        sourceFieldsFormErrorNode.innerHTML = '';

        if (!isSourceFieldsValidationData.isValid) {
            sourceFieldsFormErrorNode.append(ibexa.helpers.formValidation.formatErrorLine(isSourceFieldsValidationData.errorMessage));
        }

        return isSourceFieldsValidationData.isValid;
    };
    const validateTargetFields = (input) => {
        const targetFieldsDropdownField = multistepSelectorNode.querySelector(
            '.ibexa-cai-multistep-selector__step-dropdown-widget--target',
        );
        const targetFieldsField = input.closest('.form-group');
        const targetFieldsFormErrorNode = targetFieldsDropdownField.querySelector('.ibexa-form-error');
        const targetFieldsSelectionInfoNode = targetFieldsDropdownField.querySelector(
            '.ibexa-cai-multistep-selector__dropdown .ibexa-dropdown__selection-info',
        );
        const isTargetFieldsValidationData = ibexa.helpers.formValidation.checkIsEmpty(targetFieldsField);

        targetFieldsSelectionInfoNode.classList.toggle('is-invalid', !isTargetFieldsValidationData.isValid);
        targetFieldsFormErrorNode.innerHTML = '';

        if (!isTargetFieldsValidationData.isValid) {
            targetFieldsFormErrorNode.append(ibexa.helpers.formValidation.formatErrorLine(isTargetFieldsValidationData.errorMessage));
        }

        return isTargetFieldsValidationData.isValid;
    };

    formNode.addEventListener(
        'submit',
        (event) => {
            const isSourceFieldsValid = validateSourceFields(sourceFieldsInputNode);
            const isTargetFieldsValid = validateTargetFields(targetFieldsInputNode);

            if (!isSourceFieldsValid || !isTargetFieldsValid) {
                event.preventDefault();
            }
        },
        false,
    );
})(window, window.document, window.ibexa, window.Translator);
