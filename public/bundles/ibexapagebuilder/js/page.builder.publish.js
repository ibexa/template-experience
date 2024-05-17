(function (global, doc, ibexa, Translator) {
    const VALIDATOR_NAME_PAGE = 'EzLandingPageValidator';
    const VALIDATOR_NAME_PAGE_LAYOUT = 'EzLandingPageLayoutValidator';
    const form = doc.querySelector('.ibexa-form-validate');
    const submitBtns = form.querySelectorAll('[type="submit"]:not([formnovalidate])');
    const menuBtnsToValidate = doc.querySelectorAll('button[data-validate]');

    const validateForm = (event) => {
        const btn = event.currentTarget;
        const isFormError = !parseInt(btn.dataset.isFormValid, 10);

        if (!isFormError) {
            doc.body.dispatchEvent(
                new CustomEvent('ibexa-pb:validation:other-field-types', {
                    detail: { isValid: true },
                }),
            );
            doc.body.dispatchEvent(
                new CustomEvent('ibexa-pb:validation:layout', {
                    detail: { isValid: true },
                }),
            );

            return;
        }

        const validatorsWithErrors = btn.dataset.validatorsWithErrors.split(',');
        const isPageLayoutError = validatorsWithErrors.includes(VALIDATOR_NAME_PAGE_LAYOUT);
        const isPageFieldTypeError = validatorsWithErrors.includes(VALIDATOR_NAME_PAGE);
        const otherInvalidFieldTypes = [...validatorsWithErrors];
        const pageFieldTypeIndex = otherInvalidFieldTypes.indexOf(VALIDATOR_NAME_PAGE);

        if (pageFieldTypeIndex > -1) {
            otherInvalidFieldTypes.splice(pageFieldTypeIndex, 1);
        }

        const pageLayoutTypeIndex = otherInvalidFieldTypes.indexOf(VALIDATOR_NAME_PAGE_LAYOUT);

        if (pageLayoutTypeIndex > -1) {
            otherInvalidFieldTypes.splice(pageLayoutTypeIndex, 1);
        }

        const otherFieldTypesInvalid = !!otherInvalidFieldTypes.length;

        if (otherFieldTypesInvalid) {
            const pageFieldTypeErrorMessage = Translator.trans(
                /*@Desc("Fields error")*/ 'infobar.form.error.message',
                {},
                'ibexa_page_builder_infobar',
            );

            ibexa.pb.notification.addNotification({ message: pageFieldTypeErrorMessage, type: ibexa.pb.notification.type.ERROR });
        }

        if (isPageLayoutError) {
            const pageLayoutErrorMessage = Translator.trans(
                /*@Desc("The layout of this landing page is no longer available and you cannot publish it. Please select a different layout.")*/ 'infobar.page.layout.error.label',
                {},
                'ibexa_page_builder_infobar',
            );

            ibexa.pb.notification.addNotification({ message: pageLayoutErrorMessage, type: ibexa.pb.notification.type.ERROR });
        }

        if (isPageFieldTypeError) {
            const pageFieldTypeErrorMessage = Translator.trans(
                /*@Desc("Update missing configuration in the Block view")*/ 'infobar.page.field.type.error.message',
                {},
                'ibexa_page_builder_infobar',
            );

            ibexa.pb.notification.addNotification({ message: pageFieldTypeErrorMessage, type: ibexa.pb.notification.type.ERROR });
        }

        doc.body.dispatchEvent(
            new CustomEvent('ibexa-pb:validation:other-field-types', {
                detail: { isValid: !otherFieldTypesInvalid },
            }),
        );
        doc.body.dispatchEvent(
            new CustomEvent('ibexa-pb:validation:layout', {
                detail: { isValid: !isPageLayoutError },
            }),
        );
    };

    submitBtns.forEach((btn) => {
        btn.addEventListener('click', validateForm, false);
    });

    menuBtnsToValidate.forEach((btn) => {
        btn.addEventListener('click', validateForm, false);
    });
})(window, document, window.ibexa, window.Translator);
