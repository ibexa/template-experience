import { getInstance } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/object.instances';

(function (global, doc) {
    const connectHandlerContainer = doc.querySelector('.ibexa-connect-action-edit-handler-options');

    if (!connectHandlerContainer) {
        return;
    }

    const connectHandlerRows = connectHandlerContainer.querySelectorAll('.ibexa-connect-action-edit-handler-options__row');
    const changeRowState = (event) => {
        const visibleFormGroup = connectHandlerContainer.querySelector(
            '.ibexa-connect-action-edit-handler-options__form-group:not([hidden])',
        );
        const optionRow = event.currentTarget.closest('.ibexa-connect-action-edit-handler-options__row');
        const formGroup = optionRow.querySelector('.ibexa-connect-action-edit-handler-options__form-group');

        if (visibleFormGroup === formGroup) {
            return;
        }

        const visibleDropdown = visibleFormGroup.querySelector('.ibexa-dropdown');
        const visibleDropdownInstance = getInstance(visibleDropdown);

        visibleFormGroup.hidden = true;
        formGroup.hidden = false;

        visibleDropdownInstance.clearCurrentSelection();
        visibleDropdownInstance.selectOption('');
    };

    connectHandlerRows.forEach((connectHandlerRow) => {
        const radioInput = connectHandlerRow.querySelector(
            '.ibexa-connect-action-edit-handler-options__row-group--selector .ibexa-input--radio',
        );

        radioInput.addEventListener('click', changeRowState, false);
    });
})(window, window.document);
