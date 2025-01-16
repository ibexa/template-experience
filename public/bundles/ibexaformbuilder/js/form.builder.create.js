(function (global, doc, ibexa, React, ReactDOM, Translator) {
    const CLASS_FORM_BUILDER_CLOSED = 'ibexa-fb-modal--closed';
    const CLASS_FORM_BUILDER_VISIBLE = 'ibexa-fb-modal--visible';
    const CLASS_SCROLL_DISABLED = 'ibexa-scroll-disabled';
    const CLASS_FIELD_NO_VALUE = 'ibexa-fb-content-edit-form--no-value';
    const SELECTOR_MODAL = '.ibexa-fb-modal';
    const DEFAULT_FIELDVALUE = { fields: [] };
    const KEYCODE_ESCAPE = 27;
    const FIELDTYPE_EMPTY_VALUE = JSON.stringify({ fields: [], content_id: null, content_field_id: null, language_code: null });
    const INVALID_FIELDS_ERROR = Translator.trans(
        /*@Desc("Not all the fields were configured correctly. Provide missing configuration.")*/ 'invalid.fields',
        {},
        'ibexa_form_builder',
    );
    const fieldTypeContainer = doc.querySelector('.ibexa-fb-content-edit-form');
    const formBuilderContainer = doc.querySelector('#ibexa-fb-root');
    const openFormBuilderBtns = doc.querySelectorAll('[data-open-form-builder]');
    const formFieldsConfigInput = doc.querySelector('[data-ezform-fieldvalue]');
    let formBuilderRoot = null;
    let formBuilder;

    if (!formFieldsConfigInput) {
        return;
    }

    const handleEscapeOnKeyup = (event) => {
        if (event.keyCode !== KEYCODE_ESCAPE) {
            return;
        }

        closeFormBuilder();
    };
    const findFieldConfig = (field) => ibexa.formBuilder.config.fieldsConfig.find((config) => config.identifier === field.identifier);
    const checkFieldIsInValid = (field) => {
        const fieldConfig = findFieldConfig(field);

        if (!fieldConfig) {
            return true;
        }

        return !field.attributes.every((attr) => checkAttributeValidState(fieldConfig, attr));
    };
    const checkAttributeValidState = (fieldConfig, attr) => {
        const attrConfig = fieldConfig.attributes.find((config) => config.identifier === attr.identifier);

        if (!Object.keys(attrConfig.constraints).length) {
            return true;
        }

        const isRequired = !!Object.keys(attrConfig.constraints).find((key) => key === 'not_blank');

        if (!isRequired) {
            return true;
        }

        const isValid = !!attr.value.trim().length;

        return isValid;
    };
    const checkCanCloseFormBuilder = () => {
        const formFieldsConfig = formFieldsConfigInput.value ? JSON.parse(formFieldsConfigInput.value) : null;
        const formHasAnyFields = formFieldsConfig && formFieldsConfig.fields && formFieldsConfig.fields.length > 0;

        if (!formHasAnyFields) {
            return {
                canClose: true,
                invalidFields: [],
            };
        }

        const invalidFields = formFieldsConfig.fields.filter(checkFieldIsInValid);

        return {
            canClose: !invalidFields.length,
            invalidFields,
        };
    };
    const hideFormBuilderModal = () => {
        const modal = fieldTypeContainer.querySelector('.ibexa-fb-modal');

        doc.body.classList.add(CLASS_FORM_BUILDER_CLOSED);
        doc.body.classList.remove(CLASS_SCROLL_DISABLED);

        global.parent.document.body.dispatchEvent(new CustomEvent('ibexa-udw-show-footer'));

        modal.classList.remove(CLASS_FORM_BUILDER_VISIBLE);
        modal.removeEventListener('keyup', handleEscapeOnKeyup);

        formBuilderRoot.unmount();
        formBuilderRoot = null;
    };
    const hideSaveMenuPopup = () => {
        const saveMenuItem = fieldTypeContainer.querySelector('.ibexa-fb-modal__save-menu-item');
        const splitBtnTrigger = saveMenuItem.querySelector('.ibexa-split-btn__toggle-btn');
        const popupMenuElement = saveMenuItem.querySelector('.ibexa-multilevel-popup-menu');
        const popupMenu = ibexa.helpers.objectInstances.getInstance(popupMenuElement);

        popupMenu.closeBranch(splitBtnTrigger.branchElement);
    };
    const saveFormBuilder = () => {
        const { canClose, invalidFields } = checkCanCloseFormBuilder();

        if (!canClose) {
            ibexa.helpers.notification.showErrorNotification(INVALID_FIELDS_ERROR);

            formBuilder.markInvalidFields(invalidFields);

            return;
        }

        updatePreview();
        hideSaveMenuPopup();
    };
    const saveAndCloseFormBuilder = () => {
        const { canClose, invalidFields } = checkCanCloseFormBuilder();

        if (!canClose) {
            ibexa.helpers.notification.showErrorNotification(INVALID_FIELDS_ERROR);

            formBuilder.markInvalidFields(invalidFields);

            return;
        }

        ibexa.helpers.tooltips.hideAll();
        updatePreview();
        hideFormBuilderModal();
    };
    const closeFormBuilder = () => {
        doc.body.dispatchEvent(new CustomEvent('ibexa-form-builder:before-close'));
        hideFormBuilderModal();
    };
    const openFormBuilder = (event) => {
        event.preventDefault();
        doc.body.dispatchEvent(new CustomEvent('ibexa-form-builder:before-open'));

        const modal = fieldTypeContainer.querySelector(SELECTOR_MODAL);
        const hasCorrectValue = formFieldsConfigInput.value.trim().length && formFieldsConfigInput.value !== 'null';
        const fieldValue = hasCorrectValue ? JSON.parse(formFieldsConfigInput.value) : DEFAULT_FIELDVALUE;
        const config = {
            ...ibexa.formBuilder.config,
            fieldValue,
            fieldValueInput: formFieldsConfigInput,
            fieldFormRequestConfig: doc.querySelector('form[name="request_field_configuration"]'),
        };

        doc.body.classList.remove(CLASS_FORM_BUILDER_CLOSED);
        doc.body.classList.add(CLASS_SCROLL_DISABLED);

        modal.classList.add(CLASS_FORM_BUILDER_VISIBLE);
        modal.focus();
        modal.addEventListener('keyup', handleEscapeOnKeyup, false);

        formBuilderRoot = ReactDOM.createRoot(formBuilderContainer);
        formBuilderRoot.render(
            React.createElement(ibexa.modules.FormBuilder, {
                ...config,
                ref: (formBuilderRef) => {
                    formBuilder = formBuilderRef;
                },
            }),
        );
    };
    const removeFieldValue = () => {
        formFieldsConfigInput.value = FIELDTYPE_EMPTY_VALUE;

        updatePreview();
    };
    const attachEventHandlers = (btn) => {
        const btnClose = fieldTypeContainer.querySelector('[data-close-form-builder]');
        const saveMenuItem = fieldTypeContainer.querySelector('.ibexa-fb-modal__save-menu-item');
        const saveMenuItemSplitBtnTrigger = saveMenuItem.querySelector('.ibexa-split-btn__toggle-btn');
        const btnSave = saveMenuItemSplitBtnTrigger.branchElement.querySelector('[data-save-form-builder]');
        const btnSaveAndClose = fieldTypeContainer.querySelector('[data-save-and-close-form-builder]');
        const btnRemove = fieldTypeContainer.querySelector('.ibexa-fb-content-edit-form__preview-action--trash');

        btn.addEventListener('click', openFormBuilder, false);
        btnClose.addEventListener('click', closeFormBuilder, false);
        btnSave.addEventListener('click', saveFormBuilder, false);
        btnSaveAndClose.addEventListener('click', saveAndCloseFormBuilder, false);
        btnRemove.addEventListener('click', removeFieldValue, false);
    };
    const updatePreview = () => {
        const formFieldsConfig = formFieldsConfigInput.value ? JSON.parse(formFieldsConfigInput.value) : null;
        const formHasAnyFields = formFieldsConfig && formFieldsConfig.fields && formFieldsConfig.fields.length > 0;
        const callToAction = doc.querySelector('.ibexa-fb-content-edit-form__call-to-action');

        if (formHasAnyFields) {
            const iframeForm = doc.querySelector('form[name=request_form_preview]');
            const iframeFormInput = doc.querySelector('#request_form_preview_form');

            iframeFormInput.value = formFieldsConfigInput.value;
            iframeForm.submit();

            fieldTypeContainer.classList.remove(CLASS_FIELD_NO_VALUE);
            callToAction.setAttribute('hidden', true);

            return;
        }

        fieldTypeContainer.classList.add(CLASS_FIELD_NO_VALUE);
        callToAction.removeAttribute('hidden');
    };

    openFormBuilderBtns.forEach(attachEventHandlers);
    updatePreview();
})(window, window.document, window.ibexa, window.React, window.ReactDOM, window.Translator);
