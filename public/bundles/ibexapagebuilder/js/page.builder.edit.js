(function (doc, React, ReactDOM, ibexa) {
    const SELECTOR_FIELD = '.ibexa-field-edit--ezlandingpage';
    const SELECTOR_INPUT = '.ibexa-data-source__input';
    const pageBuilderContainer = doc.querySelector('#ibexa-pb-app-root');
    const pageBuilderRoot = ReactDOM.createRoot(pageBuilderContainer);
    const infobar = new ibexa.modules.InfoBar();
    const initValidators = (pageBuilder) => {
        const validator = new ibexa.EzLandingPageValidator({
            classInvalid: 'is-invalid',
            pageBuilder,
            fieldSelector: SELECTOR_FIELD,
            eventsMap: [
                {
                    selector: `${SELECTOR_FIELD} ${SELECTOR_INPUT}`,
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
                    selector: `${SELECTOR_FIELD} ${SELECTOR_INPUT}`,
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
    };

    pageBuilderRoot.render(React.createElement(ibexa.modules.PageBuilder, { ...ibexa.pageBuilder.config, ref: initValidators }));
})(window.document, window.React, window.ReactDOM, window.ibexa);
