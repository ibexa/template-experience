import { IbexaMeasurementValidator } from './measurement.validator';

(function (global, doc, ibexa) {
    const SELECTOR_FIELD = '.ibexa-attribute-edit--measurement';
    const SELECTOR_SOURCE_INPUT = '.ibexa-input--text';
    const SELECTOR_LABEL = '.ibexa-attribute-edit__label';

    const validator = new IbexaMeasurementValidator({
        classInvalid: 'is-invalid',
        fieldSelector: SELECTOR_FIELD,
        labelSelector: SELECTOR_LABEL,
        eventsMap: [
            {
                selector: `${SELECTOR_FIELD} .ibexa-input-text-wrapper--type-number input`,
                eventName: 'blur',
                callback: 'validateInput',
                errorNodeSelectors: ['.ibexa-form-error'],
                invalidStateSelectors: [SELECTOR_SOURCE_INPUT],
            },
        ],
    });

    validator.init();

    ibexa.addConfig('fieldTypeValidators', [validator], true);
})(window, document, window.ibexa);
