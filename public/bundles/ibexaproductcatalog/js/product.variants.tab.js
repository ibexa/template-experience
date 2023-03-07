(function (global, doc) {
    const ENTER_KEY_CODE = 13;
    const generateVariantsForm = doc.querySelector('.ibexa-generate-variants__form');
    const generateVariantsModalNode = doc.querySelector('#generate-variants-modal');

    if (!generateVariantsForm) {
        return;
    }

    const inputsToValidate = generateVariantsForm.querySelectorAll('.ibexa-input[required]');
    const toggleFormSpinner = () => {
        generateVariantsForm.classList.toggle('ibexa-generate-variants__form--sent');
    };
    const validateForm = (event) => {
        inputsToValidate.forEach(validateField);

        const invalidInputs = generateVariantsForm.querySelectorAll('.is-invalid');

        if (invalidInputs.length) {
            event.preventDefault();

            return;
        }

        toggleFormSpinner();
    };
    const validateField = (input) => {
        const invalidClassTargetNode = input
            .closest('.ibexa-generate-variants__form-field')
            .querySelector('.ibexa-pc-invalid-class-target');

        invalidClassTargetNode?.classList.toggle('is-invalid', !input.value);
    };
    const resetInvalidNodesState = () => {
        const invalidNodes = generateVariantsForm.querySelectorAll('.is-invalid');

        invalidNodes.forEach((invalidNode) => invalidNode.classList.remove('is-invalid'));
    };

    generateVariantsModalNode.addEventListener('hidden.bs.modal', resetInvalidNodesState, false);
    inputsToValidate.forEach((input) => input.addEventListener('change', (event) => validateField(event.currentTarget), false));
    generateVariantsForm.addEventListener('submit', validateForm, false);
    generateVariantsForm.addEventListener(
        'keydown',
        (event) => {
            if (event.keyCode === ENTER_KEY_CODE) {
                event.preventDefault();
            }
        },
        false,
    );
})(window, window.document);
