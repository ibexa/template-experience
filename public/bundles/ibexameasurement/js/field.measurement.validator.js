import { IbexaMeasurementValidator } from './measurement.validator';

(function (global, doc, ibexa) {
    const SELECTOR_FIELD = '.ibexa-field-edit--ibexa_measurement';
    const SELECTOR_SOURCE_INPUT = '.ibexa-measurement-form-number__input-wrapper .ibexa-input--text';
    const SELECTOR_LABEL = '.ibexa-field-edit__label-wrapper .ibexa-field-edit__label';

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
