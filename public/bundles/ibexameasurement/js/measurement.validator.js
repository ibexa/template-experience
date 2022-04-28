export class IbexaMeasurementValidator extends window.ibexa.BaseFieldValidator {
    constructor(config) {
        super(config);

        this.fieldSelector = config.fieldSelector;
        this.labelSelector = config.labelSelector;
    }

    checkSingleMeasurementInput(input) {
        const isRequired = input.required;
        const minValue = parseFloat(input.min);
        const maxValue = parseFloat(input.max);
        const parsedValue = parseFloat(input.value);
        const isEmpty = isNaN(parsedValue);
        const isBelowMinValue = !isNaN(minValue) && parsedValue < minValue;
        const isAboveMaxValue = !isNaN(maxValue) && parsedValue > maxValue;

        return { isEmpty, isRequired, isBelowMinValue, isAboveMaxValue, minValue, maxValue };
    }

    validateSimpleMeasurement(input) {
        const { isEmpty, isRequired, isBelowMinValue, isAboveMaxValue, minValue, maxValue } = this.checkSingleMeasurementInput(input);
        const label = input.closest(this.fieldSelector).querySelector(this.labelSelector).innerHTML;
        const isError = (isEmpty && isRequired) || isBelowMinValue || isAboveMaxValue;
        const result = { isError };

        if (isEmpty && isRequired) {
            result.errorMessage = window.ibexa.errors.emptyField.replace('{fieldName}', label);
        } else if (isBelowMinValue || isAboveMaxValue) {
            result.errorMessage = window.ibexa.errors.outOfRangeValue
                .replace('{fieldName}', label)
                .replace('{min}', minValue)
                .replace('{max}', maxValue);
        }

        return result;
    }

    validateRangeMeasurement(rangeContainer) {
        const label = rangeContainer.closest(this.fieldSelector).querySelector(this.labelSelector).innerHTML;
        const firstInput = rangeContainer.querySelector('.ibexa-measurement-form-number__input--first');
        const secondInput = rangeContainer.querySelector('.ibexa-measurement-form-number__input--second');
        const firstInputParsedValue = parseFloat(firstInput.value);
        const secondInputParsedValue = parseFloat(secondInput.value);
        const firstInputChecks = this.checkSingleMeasurementInput(firstInput);
        const secondInputChecks = this.checkSingleMeasurementInput(secondInput);
        const isFirstInputError =
            (firstInputChecks.isEmpty && firstInputChecks.isRequired) ||
            firstInputChecks.isBelowMinValue ||
            firstInputChecks.isAboveMaxValue;
        const isSecondInputError =
            (secondInputChecks.isEmpty && secondInputChecks.isRequired) ||
            secondInputChecks.isBelowMinValue ||
            secondInputChecks.isAboveMaxValue;
        const rangeMinValue = firstInputChecks.minValue;
        const rangeMaxValue = firstInputChecks.maxValue;
        const isRangeRequired = firstInputChecks.isRequired;
        const isRangeError = firstInputParsedValue && secondInputParsedValue && firstInputParsedValue > secondInputParsedValue;
        const isError = isFirstInputError || isSecondInputError || isRangeError;
        const result = { isError };

        if (isRangeRequired && (firstInputChecks.isEmpty || secondInputChecks.isEmpty)) {
            result.errorMessage = window.ibexa.errors.emptyField.replace('{fieldName}', label);
        } else if (
            firstInputChecks.isBelowMinValue ||
            firstInputChecks.isAboveMaxValue ||
            secondInputChecks.isBelowMinValue ||
            secondInputChecks.isAboveMaxValue
        ) {
            result.errorMessage = window.ibexa.errors.outOfRangeValue
                .replace('{fieldName}', label)
                .replace('{min}', rangeMinValue)
                .replace('{max}', rangeMaxValue);
        } else if (isRangeError) {
            result.errorMessage = window.Translator.trans(/*@Desc("First value should not be greater than the second one.")*/ 'error.first_greater_than_second.message', {}, 'validators');
        }

        return result;
    }

    validateInput({ currentTarget }) {
        const rangeContainer = currentTarget.closest('.ibexa-measurement-form-number--range');
        const isRangeMeasurement = !!rangeContainer;

        if (isRangeMeasurement) {
            return this.validateRangeMeasurement(rangeContainer);
        }

        return this.validateSimpleMeasurement(currentTarget);
    }
}
