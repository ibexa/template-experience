(function(doc, React, ReactDOM, ibexa) {
    const SELECTOR_FIELD = '.ibexa-field-edit--ezlandingpage';
    const pageBuilderContainer = doc.querySelector('#ibexa-pb-app-root');
    // eslint-disable-next-line
    const infobar = new ibexa.modules.InfoBar();
    // eslint-disable-next-line
    const pageBuilder = ReactDOM.render(React.createElement(ibexa.modules.PageBuilder, ibexa.pageBuilder.config), pageBuilderContainer);
    const validator = new ibexa.EzLandingPageValidator({
        classInvalid: 'is-invalid',
        pageBuilder,
        fieldSelector: SELECTOR_FIELD,
        eventsMap: [
            {
                selector: '#ezplatform_content_forms_content_edit_fieldsData_page_value',
                eventName: 'change',
                callback: 'validateInput',
                errorNodeSelectors: ['.ibexa-field-edit__label-wrapper'],
            },
        ],
    });
    const layoutValidator = new ibexa.EzLandingPageLayoutValidator({
        classInvalid: 'is-invalid',
        pageBuilder,
        fieldSelector: SELECTOR_FIELD,
        eventsMap: [
            {
                selector: '#ezplatform_content_forms_content_edit_fieldsData_page_value',
                eventName: 'change',
                callback: 'validateLayout',
                errorNodeSelectors: ['.ibexa-field-edit__label-wrapper'],
            },
        ],
    });

    validator.init();
    layoutValidator.init();

    ibexa.fieldTypeValidators = ibexa.fieldTypeValidators
        ? [...ibexa.fieldTypeValidators, validator, layoutValidator]
        : [validator, layoutValidator];
})(window.document, window.React, window.ReactDOM, window.ibexa);
