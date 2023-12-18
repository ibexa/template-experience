(function (doc, bootstrap, ibexa) {
    const { validateIsEmptyField } = ibexa.helpers.formValidation;
    const SELECTOR_INVALID = '.is-invalid';
    const SELECTOR_TAB = '.ibexa-pb-block-config__tab';
    const errorNodes = [...doc.querySelectorAll(SELECTOR_INVALID)];
    const configForm = doc.querySelector('form[name="block_configuration"]');
    const requiredInputs = configForm.querySelectorAll('[required="required"]');
    const validateInput = (input) => {
        const field = input.closest('.ibexa-field-edit, .form-group');

        return validateIsEmptyField(field);
    };

    errorNodes.forEach((errorNode, index) => {
        const tab = errorNode.closest(SELECTOR_TAB);
        const navLinkId = tab.getAttribute('aria-labelledby');
        const navLink = doc.getElementById(navLinkId);
        const navItem = navLink.closest('.ibexa-tabs__tab');

        navItem.classList.add('ibexa-tabs__tab--error');

        if (!index) {
            bootstrap.Tab.getOrCreateInstance(navLink).show();
        }
    });

    requiredInputs.forEach((requiredInput) => {
        requiredInput.addEventListener('change', (event) => validateInput(event.target), false);
        requiredInput.addEventListener('blur', (event) => validateInput(event.target), false);
        requiredInput.addEventListener('input', (event) => validateInput(event.target), false);
    });

    configForm.addEventListener(
        'submit',
        (event) => {
            const { submitter } = event;

            if (!submitter?.hasAttribute('formnovalidate')) {
                const isFormValid = [...requiredInputs].map(validateInput).every(({ isValid }) => isValid);

                if (!isFormValid) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
            }
        },
        false,
    );
})(window.document, window.bootstrap, window.ibexa);
