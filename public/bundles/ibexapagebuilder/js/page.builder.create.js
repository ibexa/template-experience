(function (doc, React, ReactDOM, ibexa) {
    const SELECTOR_FIELD = '.ibexa-field-edit--ezlandingpage';
    const pageBuilderContainer = doc.querySelector('#ibexa-pb-app-root');
    // eslint-disable-next-line
    const infobar = new ibexa.modules.InfoBar({ isCreateMode: true });
    const pageBuilderConfig = { ...ibexa.pageBuilder.config, isCreateMode: true };
    // eslint-disable-next-line
    const pageBuilder = ReactDOM.render(React.createElement(ibexa.modules.PageBuilder, pageBuilderConfig), pageBuilderContainer);
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

    validator.init();

    ibexa.fieldTypeValidators = ibexa.fieldTypeValidators ? [...ibexa.fieldTypeValidators, validator] : [validator];
})(window.document, window.React, window.ReactDOM, window.ibexa);
