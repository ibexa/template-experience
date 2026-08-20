(function (doc, React, ReactDOMClient, ibexa) {
    const SELECTOR_FIELD = '.ibexa-field-edit--ibexa_landing_page';
    const SELECTOR_INPUT = '.ibexa-data-source__input';
    const pageBuilderContainer = doc.querySelector('#ibexa-pb-app-root');
    const pageBuilderRoot = ReactDOMClient.createRoot(pageBuilderContainer);
    // eslint-disable-next-line
    const infobar = new ibexa.modules.InfoBar({ isCreateMode: true });
    const pageBuilderConfig = { ...ibexa.pageBuilder.config, isCreateMode: true };

    const initValidators = (pageBuilder) => {
        const validator = new ibexa.IbexaLandingPageValidator({
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

        validator.init();

        ibexa.fieldTypeValidators = ibexa.fieldTypeValidators ? [...ibexa.fieldTypeValidators, validator] : [validator];
    };

    pageBuilderRoot.render(React.createElement(ibexa.modules.PageBuilder, { ...pageBuilderConfig, ref: initValidators }));
})(window.document, window.React, window.ReactDOMClient, window.ibexa);
