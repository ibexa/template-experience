(function(global, doc, ibexa) {
    const CLASS_FORM_INVALID = 'is-form-invalid';
    const CLASS_PAGE_FIELD_TYPE_INVALID = 'has-page-fieldtype-invalid';
    const CLASS_OTHER_FIELD_TYPES_INVALID = 'has-other-fieldtypes-invalid';
    const VALIDATOR_NAME_PAGE = 'EzLandingPageValidator';
    const VALIDATOR_NAME_PAGE_LAYOUT = 'EzLandingPageLayoutValidator';
    const form = doc.querySelector('.ibexa-form-validate');
    const submitBtns = form.querySelectorAll('[type="submit"]:not([formnovalidate])');
    const contentModeSwitcher = doc.querySelector('.ibexa-page-info-bar__content-mode-switcher');

    if (!contentModeSwitcher) {
        return;
    }

    submitBtns.forEach((btn) => {
        const clickHandler = () => {
            const isFormError = !parseInt(btn.dataset.isFormValid, 10);

            if (!isFormError) {
                return;
            }

            const validatorsWithErrors = btn.dataset.validatorsWithErrors.split(',');
            const isPageFieldTypeError = validatorsWithErrors.includes(VALIDATOR_NAME_PAGE);
            const isPageLayoutError = validatorsWithErrors.includes(VALIDATOR_NAME_PAGE_LAYOUT);
            const pageFieldTypeInvalidMethodName = isPageFieldTypeError ? 'add' : 'remove';
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
            const otherFieldTypesInvalidMethodName = otherFieldTypesInvalid ? 'add' : 'remove';

            contentModeSwitcher.classList.add(CLASS_FORM_INVALID);
            contentModeSwitcher.classList[pageFieldTypeInvalidMethodName](CLASS_PAGE_FIELD_TYPE_INVALID);
            contentModeSwitcher.classList[otherFieldTypesInvalidMethodName](CLASS_OTHER_FIELD_TYPES_INVALID);

            const iconWrapper = contentModeSwitcher.querySelector('.ibexa-warning-icon');
            const formAndPageFieldTypeErrorMessage = iconWrapper.dataset.formAndPageFieldTypeErrorMessage;
            const pageFieldTypeErrorMessage = iconWrapper.dataset.pageFieldTypeErrorMessage;
            const pageLayoutErrorMessage = iconWrapper.dataset.pageLayoutErrorMessage;
            const formErrorMessage = iconWrapper.dataset.formErrorMessage;
            let message = formErrorMessage;

            if (isPageFieldTypeError && otherFieldTypesInvalid) {
                message = formAndPageFieldTypeErrorMessage;
            } else if (isPageFieldTypeError && validatorsWithErrors.length === 1) {
                message = pageFieldTypeErrorMessage;
            } else if (isPageLayoutError) {
                message = pageLayoutErrorMessage;
            }

            ibexa.helpers.notification.showErrorNotification(message);
        };

        btn.addEventListener('click', clickHandler, false);
    });
})(window, document, window.ibexa);
