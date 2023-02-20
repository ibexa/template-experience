(function(doc, React, ReactDOM, eZ) {
    const SELECTOR_FIELD = '.ez-field-edit--ezlandingpage';
    const SELECTOR_INPUT = '.ez-data-source__input';
    const pageBuilderContainer = doc.querySelector('#ez-page-builder-root');
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
                selector: `${SELECTOR_FIELD} ${SELECTOR_INPUT}`,
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
                selector: `${SELECTOR_FIELD} ${SELECTOR_INPUT}`,
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
