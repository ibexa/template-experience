(function (global, doc, ibexa) {
    const { validateIsEmptyField } = ibexa.helpers.formValidation;
    const submitBtn = doc.querySelector('.ibexa-pc-edit__submit-btn');
    const editForm = doc.querySelector('.ibexa-pc-edit__form');
    let fieldsToValidate = editForm.querySelectorAll('.ibexa-pc-edit__form-field-required');
    const validateForm = (event) => {
        event.preventDefault();

        const isFormValid = [...fieldsToValidate].map(validateIsEmptyField).every(({ isValid }) => isValid);

        if (isFormValid) {
            editForm.submit();
        }
    };
    const attachTriggerToValidateFields = (fieldList) => {
        fieldList.forEach((field) => {
            const input = field.querySelector('.ibexa-input');

            if (input) {
                input.addEventListener('blur', () => validateIsEmptyField(field), false);
            }
        });
    };

    attachTriggerToValidateFields(fieldsToValidate);
    submitBtn.addEventListener('click', validateForm, false);

    doc.body.addEventListener('ibexa-pc-edit-form-added-field', (event) => {
        const { inputsContainer } = event.detail;
        const addedRequiredFields = inputsContainer.querySelectorAll('.ibexa-pc-edit__form-field-required');

        fieldsToValidate = editForm.querySelectorAll('.ibexa-pc-edit__form-field-required');
        attachTriggerToValidateFields(addedRequiredFields);
    });
})(window, window.document, window.ibexa);
