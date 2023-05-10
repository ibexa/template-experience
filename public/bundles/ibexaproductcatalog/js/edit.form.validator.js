(function (global, doc, Translator, ibexa) {
    const submitBtn = doc.querySelector('.ibexa-pc-edit__submit-btn');
    const editForm = doc.querySelector('.ibexa-pc-edit__form');
    let fieldsToValidate = editForm.querySelectorAll('.ibexa-pc-edit__form-field-required');
    const validateField = (field) => {
        let errorText = '';
        const input = field.querySelector('.ibexa-input');
        const label = field.querySelector('.ibexa-label');
        const errorWrapper = field.querySelector('.ibexa-form-error');

        if (label) {
            const fieldName = label.innerText;

            errorText = Translator.trans(/*@Desc("%fieldName% Field is required")*/ 'error.required.field', { fieldName }, 'forms');
        } else {
            errorText = Translator.trans(/*@Desc("This value should not be blank")*/ 'error.required.field_not_blank', {}, 'forms');
        }

        errorWrapper.innerText = '';

        if (!input.value) {
            errorWrapper.append(ibexa.helpers.formError.formatLine(errorText));
        }

        input.classList.toggle('is-invalid', !input.value);

        return !!input.value;
    };
    const validateForm = (event) => {
        event.preventDefault();

        const isFormValid = [...fieldsToValidate].map(validateField).every((isValid) => isValid);

        if (isFormValid) {
            editForm.submit();
        }
    };
    const attachTriggerToValidateFields = (fieldList) => {
        fieldList.forEach((field) => {
            const input = field.querySelector('.ibexa-input');

            if (input) {
                input.addEventListener('blur', () => validateField(field), false);
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
})(window, window.document, window.Translator, window.ibexa);
