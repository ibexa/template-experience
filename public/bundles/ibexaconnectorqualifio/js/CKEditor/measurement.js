import MeasurementInputView from './common/measurement-input/measurement.input.js';

(function (global, doc, ibexa) {
    const measurementRender = (config, locale, name) => {
        const measurementInput = new MeasurementInputView({ locale, config, name });

        return measurementInput;
    };
    const measurementSetValue = (attributeView, value) => {
        const number = value?.split(/px|%/)[0] ?? '';
        const unit = value?.match(/px|%/)[0] ?? 'px';

        attributeView.labeledInput.fieldView.element.value = number;
        attributeView.labeledInput.fieldView.set('value', number);
        attributeView.labeledInput.fieldView.set('isEmpty', number !== 0 && !number);

        attributeView.labeledDropdown.fieldView.element.value = unit;
        attributeView.labeledDropdown.fieldView.buttonView.set({
            label: unit,
            withText: true,
        });
        attributeView.labeledDropdown.set('isEmpty', !unit);
    };
    const measurementGetValue = (attributeView) => {
        const number = attributeView.labeledInput.fieldView.element.value;
        const unit = attributeView.labeledDropdown.fieldView.element.value;

        return `${number}${unit}`;
    };

    ibexa.addConfig('richText.CKEditor.customTags.attributeRenderMethods.measurement', measurementRender, true);
    ibexa.addConfig('richText.CKEditor.customTags.setValueMethods.measurement', measurementSetValue, true);
    ibexa.addConfig('richText.CKEditor.customTags.getValueMethods.measurement', measurementGetValue, true);
})(window, document, window.ibexa);
