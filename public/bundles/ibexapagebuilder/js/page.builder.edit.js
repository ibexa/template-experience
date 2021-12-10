(function(doc, React, ReactDOM, eZ) {
    const SELECTOR_FIELD = '.ez-field-edit--ezlandingpage';
    const pageBuilderContainer = doc.querySelector('#ibexa-pb-app-root');
    // eslint-disable-next-line
    const infobar = new eZ.modules.InfoBar();
    // eslint-disable-next-line
    const pageBuilder = ReactDOM.render(React.createElement(eZ.modules.PageBuilder, eZ.pageBuilder.config), pageBuilderContainer);
    const validator = new eZ.EzLandingPageValidator({
        classInvalid: 'is-invalid',
        pageBuilder,
        fieldSelector: SELECTOR_FIELD,
        eventsMap: [
            {
                selector: '#ezplatform_content_forms_content_edit_fieldsData_page_value',
                eventName: 'change',
                callback: 'validateInput',
                errorNodeSelectors: ['.ez-field-edit__label-wrapper'],
            },
        ],
    });
    const layoutValidator = new eZ.EzLandingPageLayoutValidator({
        classInvalid: 'is-invalid',
        pageBuilder,
        fieldSelector: SELECTOR_FIELD,
        eventsMap: [
            {
                selector: '#ezplatform_content_forms_content_edit_fieldsData_page_value',
                eventName: 'change',
                callback: 'validateLayout',
                errorNodeSelectors: ['.ez-field-edit__label-wrapper'],
            },
        ],
    });

    validator.init();
    layoutValidator.init();

    eZ.fieldTypeValidators = eZ.fieldTypeValidators
        ? [...eZ.fieldTypeValidators, validator, layoutValidator]
        : [validator, layoutValidator];
})(window.document, window.React, window.ReactDOM, window.eZ);