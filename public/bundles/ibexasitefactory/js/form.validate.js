(function (global, doc, Translator) {
    const siteEditForms = doc.querySelectorAll('form[name="site_create"], form[name="site_update"]');
    const validPublicAccesses = (form) => {
        let arePublicAccessessValid = true;
        const publicAccessContainer = form.querySelector('.ibexa-sf-public-access');
        const publicAccessListContainer = form.querySelector('.ibexa-sf-public-access__list');
        const errorContainer = form.querySelector('.ibexa-sf-public-access__error');
        const publicAccesses = publicAccessListContainer.querySelectorAll('.ibexa-sf-public-access__list-item');
        const hasPublicAccesses = publicAccesses.length > 0;
        const errorText = Translator.trans(
            /*@Desc("Please add a correct public access")*/ 'form.validate.error.public.access',
            {},
            'ibexa_site_factory_ui',
        );

        [...publicAccesses].forEach((publicAccess) => {
            const hasEmptyFields = [...publicAccess.querySelectorAll('input[required="required"]')].some((input) => {
                return input.value === '';
            });

            publicAccess.classList.remove('is-invalid');

            if (hasEmptyFields) {
                publicAccess.classList.add('is-invalid');
                arePublicAccessessValid = false;
            }
        });

        if (!hasPublicAccesses || !arePublicAccessessValid) {
            errorContainer.innerText = errorText;
            publicAccessContainer.classList.add('is-invalid');

            return false;
        }

        publicAccessContainer.classList.remove('is-invalid');
        errorContainer.innerText = '';

        return true;
    };
    const validWidgets = (form) => {
        let areWidgetsValid = true;
        const widgets = [...form.querySelectorAll('.ibexa-sf-edit-widget:not(.ibexa-sf-edit-widget--information-only)')];

        widgets.forEach((widget) => {
            const input = widget.querySelector('.form-control');
            const errorContainer = widget.querySelector('.ibexa-field-edit__error');

            widget.classList.remove('is-invalid');
            input.classList.remove('is-invalid');

            if (errorContainer) {
                errorContainer.innerText = '';
            }

            if (input.hasAttribute('required') && input.value === '') {
                const fieldName = widget.querySelector('.ibexa-label').innerText;
                const errorText = Translator.trans(
                    /*@Desc("%fieldName% Field is required")*/ 'form.validate.error',
                    { fieldName },
                    'ibexa_site_factory_ui',
                );

                areWidgetsValid = false;
                widget.classList.add('is-invalid');
                input.classList.add('is-invalid');

                if (errorContainer) {
                    errorContainer.innerText = errorText;
                }
            }
        });

        return areWidgetsValid;
    };
    const validateForm = (event) => {
        const form = event.currentTarget;
        const areWidgetsValid = validWidgets(form);
        const arePublicAccessesValid = validPublicAccesses(form);
        const isFormValid = areWidgetsValid && arePublicAccessesValid;

        if (!isFormValid) {
            event.preventDefault();
        }
    };

    siteEditForms.forEach((editForm) => {
        editForm.addEventListener('submit', validateForm, false);
    });
})(window, window.document, window.Translator);
