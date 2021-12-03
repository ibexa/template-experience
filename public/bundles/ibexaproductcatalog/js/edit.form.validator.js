(function(global, doc, Translator) {
    const submitBtn = doc.querySelector('.ibexa-pc-edit__submit-btn');
    const editForm = doc.querySelector('.ibexa-pc-edit__form');
    const fieldsToValidate = editForm.querySelectorAll('.ibexa-pc-edit__form-field-required');
    const validateField = (field) => {
        const input = field.querySelector('.ibexa-input');
        const label = field.querySelector('.ibexa-label');
        const errorWrapper = field.querySelector('.ibexa-form-error');
        const fieldName = label.innerText;
        const errorText = Translator.trans(
            /*@Desc("%fieldName% Field is required")*/ 'error.required.field',
            { fieldName },
            'forms',
        );

        input.classList.toggle('is-invalid', !input.value);
        errorWrapper.innerText = input.value ? '' : errorText;

        return !!input.value;
    };
    const validateForm = (event) => {
        event.preventDefault();

        const isFormValid =[...fieldsToValidate].map(validateField).every((isValid) => isValid);

        if (isFormValid) {
            editForm.submit();
        }
    };

    submitBtn.addEventListener('click', validateForm, false);
    fieldsToValidate.forEach((field) => {
        const input = field.querySelector('.ibexa-input');

        input.addEventListener('blur', () => validateField(field), false);
    });
})(window, window.document, window.Translator);
