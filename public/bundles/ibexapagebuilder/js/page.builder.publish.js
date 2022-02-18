(function(global, doc, ibexa) {
    const VALIDATOR_NAME_PAGE = 'EzLandingPageValidator';
    const VALIDATOR_NAME_PAGE_LAYOUT = 'EzLandingPageLayoutValidator';
    const form = doc.querySelector('.ibexa-form-validate');
    const submitBtns = form.querySelectorAll('[type="submit"]:not([formnovalidate])');

    submitBtns.forEach((btn) => {
        const clickHandler = () => {
            const isFormError = !parseInt(btn.dataset.isFormValid, 10);

            if (!isFormError) {
                return;
            }

            const validatorsWithErrors = btn.dataset.validatorsWithErrors.split(',');
            const isPageLayoutError = validatorsWithErrors.includes(VALIDATOR_NAME_PAGE_LAYOUT);
            const isPageFieldTypeError = validatorsWithErrors.includes(VALIDATOR_NAME_PAGE);
            let otherInvalidFieldTypes = [...validatorsWithErrors];
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
                    'ezplatform_page_builder_infobar'
                );

                ibexa.helpers.notification.showErrorNotification(pageFieldTypeErrorMessage);
            }

            if (isPageLayoutError) {
                const pageLayoutErrorMessage = Translator.trans(
                    /*@Desc("The layout of this landing page is no longer available and you cannot publish it. Please select a different layout.")*/ 'infobar.page.layout.error.label',
                    {},
                    'ezplatform_page_builder_infobar'
                );

                ibexa.helpers.notification.showErrorNotification(pageLayoutErrorMessage);
            }

            if (isPageFieldTypeError) {
                const pageFieldTypeErrorMessage = Translator.trans(
                    /*@Desc("Update missing configuration in the Block view")*/ 'infobar.page.field.type.error.message',
                    {},
                    'ezplatform_page_builder_infobar'
                );

                ibexa.helpers.notification.showErrorNotification(pageFieldTypeErrorMessage);
            }

            doc.body.dispatchEvent(
                new CustomEvent('ibexa-pb:validation:other-field-types', {
                    detail: { isValid: !otherFieldTypesInvalid },
                })
            );
            doc.body.dispatchEvent(
                new CustomEvent('ibexa-pb:validation:layout', {
                    detail: { isValid: !isPageLayoutError },
                })
            );
        };

        btn.addEventListener('click', clickHandler, false);
    });
})(window, document, window.ibexa);
