(function(global, doc, eZ) {
    const CLASS_FORM_INVALID = 'is-form-invalid';
    const CLASS_PAGE_FIELD_TYPE_INVALID = 'has-page-fieldtype-invalid';
    const CLASS_OTHER_FIELD_TYPES_INVALID = 'has-other-fieldtypes-invalid';
    const VALIDATOR_NAME_PAGE = 'EzLandingPageValidator';
    const VALIDATOR_NAME_PAGE_LAYOUT = 'EzLandingPageLayoutValidator';
    const form = doc.querySelector('.ez-form-validate');
    const submitBtns = form.querySelectorAll('[type="submit"]:not([formnovalidate])');
    const contentModeSwitcher = doc.querySelector('.ez-page-info-bar__content-mode-switcher');
    const menuBtnsToValidate = doc.querySelectorAll('button[data-validate]');

    if (!contentModeSwitcher) {
        return;
    }

    const validateForm = (event) => {
        const btn = event.currentTarget;
        const isFormError = !parseInt(btn.dataset.isFormValid, 10);

        if (!isFormError) {
            contentModeSwitcher.classList.remove(CLASS_FORM_INVALID);
            contentModeSwitcher.classList.remove(CLASS_PAGE_FIELD_TYPE_INVALID);
            contentModeSwitcher.classList.remove(CLASS_OTHER_FIELD_TYPES_INVALID);

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

        const iconWrapper = contentModeSwitcher.querySelector('.ez-warning-icon');
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

        eZ.helpers.notification.showErrorNotification(message);
    };

    submitBtns.forEach((btn) => {
        btn.addEventListener('click', validateForm, false);
    });

    menuBtnsToValidate.forEach((btn) => {
        btn.addEventListener('click', validateForm, false);
    });
})(window, document, window.eZ);
