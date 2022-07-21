(function (global, doc, ibexa, Translator) {
    const CLASS_LOADING_PREVIEW = 'ibexa-field-edit--loading-preview';
    const SELECTOR_FIELD = '.ibexa-field-edit--ezform';
    const fieldContainer = doc.querySelector(SELECTOR_FIELD);
    const formBuilderField = doc.querySelector('.ibexa-fb-content-edit-form');

    if (!formBuilderField) {
        return;
    }

    const formPreview = formBuilderField.querySelector('[data-ibexa-form-preview]');

    class EzFormValidator extends ibexa.BaseFieldValidator {
        /**
         * Validates the input field value
         *
         * @method validateInput
         * @param {Event} event
         * @returns {Object}
         * @memberof EzFormValidator
         */
        validateInput(event) {
            const result = { isError: false };
            const field = event.currentTarget;
            const errorMessage = Translator.trans(/*@Desc("Form field is required")*/ 'form.cannot.be.empty', {}, 'form_builder');

            if (!field.required) {
                return result;
            }

            const fieldValue = JSON.parse(field.value);

            if (fieldValue.fields.length) {
                return result;
            }

            result.isError = true;
            result.errorMessage = errorMessage;

            return result;
        }
    }

    const validator = new EzFormValidator({
        classInvalid: 'is-invalid',
        fieldContainer,
        eventsMap: [
            {
                elements: doc.querySelectorAll('[data-ezform-fieldvalue]'),
                eventName: 'change',
                callback: 'validateInput',
                errorNodeSelectors: ['.ibexa-field-edit__label-wrapper'],
            },
        ],
    });

    validator.init();

    formPreview.onload = () => {
        formPreview.contentWindow.onbeforeunload = () => fieldContainer.classList.add(CLASS_LOADING_PREVIEW);
        fieldContainer.classList.remove(CLASS_LOADING_PREVIEW);
    };

    ibexa.fieldTypeValidators = ibexa.fieldTypeValidators ? [...ibexa.fieldTypeValidators, validator] : [validator];
})(window, window.document, window.ibexa, window.Translator);
