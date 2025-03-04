import { formatErrorLine, checkIsEmpty } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/form.validation.helper';

(function (global, doc) {
    const productPriceForm = doc.querySelector('.ibexa-pc-product-price-edit-form');
    const { currencySubunits } = productPriceForm.dataset;
    const inputsWithMinAttr = doc.querySelectorAll('.ibexa-input[min]');
    const basePriceInput = doc.querySelector('.ibexa-pc-product-price-edit-form__base-price-input');
    const customerBasePriceInputs = doc.querySelectorAll('.ibexa-pc-product-custom-price__customer-base-price-input');
    const customPriceRuleInputs = doc.querySelectorAll('.ibexa-pc-product-custom-price__custom-price-rule-input');
    const customPriceInputs = doc.querySelectorAll('.ibexa-pc-product-custom-price__custom-price-input');
    const updateBasePricesButton = doc.querySelector('.ibexa-pc-product-price-edit-form__update-base-prices-button');
    const markRowCheckboxes = doc.querySelectorAll('.ibexa-pc-product-custom-price__mark-row-checkbox');
    const parseNumberValue = (value) => {
        const parsedFloatValue = parseFloat(value);
        const fixedFloatValue = parsedFloatValue.toFixed(currencySubunits);

        return Number(fixedFloatValue);
    };
    const isNumberValueValid = ({ value, minValue = 0, allowEmpty = false, onlyPositive = false }) => {
        if (allowEmpty && !value) {
            return true;
        }

        const parsedValue = parseNumberValue(value);

        if (isNaN(parsedValue)) {
            return false;
        }

        if (onlyPositive) {
            return parsedValue > 0;
        }

        return parsedValue >= minValue;
    };
    const setUpdateBasePricesButtonState = () => {
        const isAnyCheckboxSelected = [...markRowCheckboxes].some((checkbox) => checkbox.checked);

        updateBasePricesButton.disabled = !isAnyCheckboxSelected;
    };
    const updateBasePrices = () => {
        if (!isNumberValueValid({ value: basePriceInput.value, onlyPositive: true })) {
            return;
        }

        markRowCheckboxes.forEach((checkbox) => {
            if (!checkbox.checked) {
                return;
            }

            const customerBasePriceInput = checkbox
                .closest('.ibexa-table__row')
                .querySelector('.ibexa-pc-product-custom-price__customer-base-price-input');

            customerBasePriceInput.value = basePriceInput.value;
            customerBasePriceInput.dispatchEvent(new Event('change'));
        });
    };
    const calculateCustomPrice = ({ currentTarget }) => {
        const customerGroupPriceRow = currentTarget.closest('.ibexa-table__row');
        const customerBasePriceInput = customerGroupPriceRow.querySelector('.ibexa-pc-product-custom-price__customer-base-price-input');
        const globalPriceRuleInput = customerGroupPriceRow.querySelector('.ibexa-pc-product-custom-price__global-price-rule-input');
        const customPriceRuleInput = customerGroupPriceRow.querySelector('.ibexa-pc-product-custom-price__custom-price-rule-input');
        const customPriceInput = customerGroupPriceRow.querySelector('.ibexa-pc-product-custom-price__custom-price-input');
        const isCustomPriceRuleValid = isNumberValueValid({ value: customPriceRuleInput.value, minValue: -100, allowEmpty: true });
        const isCustomerBasePriceValueValid = isNumberValueValid({
            value: customerBasePriceInput.value,
            allowEmpty: true,
            onlyPositive: true,
        });
        const isCustomPriceValueValid = isNumberValueValid({ value: customPriceInput.value, allowEmpty: true });

        customerBasePriceInput.classList.toggle('is-invalid', !isCustomerBasePriceValueValid);
        customPriceRuleInput.classList.toggle('is-invalid', !isCustomPriceRuleValid);
        customPriceInput.classList.toggle('is-invalid', !isCustomPriceValueValid);

        if (customerBasePriceInput.value === '') {
            customPriceInput.value = '';

            return;
        }

        if (!isCustomerBasePriceValueValid || !isCustomPriceRuleValid) {
            return;
        }

        const customerBasePriceValue = parseNumberValue(customerBasePriceInput.value);
        const globalPriceRuleValue = parseNumberValue(globalPriceRuleInput.value);
        const customPriceRuleValue = parseNumberValue(customPriceRuleInput.value);

        const priceRuleValue = isNaN(customPriceRuleValue) ? globalPriceRuleValue : customPriceRuleValue;
        const discount = (customerBasePriceValue * priceRuleValue) / 100;
        const calculatedPrice = parseNumberValue(customerBasePriceValue + discount);

        customPriceInput.value = calculatedPrice;
        customPriceInput.classList.remove('is-invalid');
    };
    const calculateCustomPriceRule = ({ currentTarget }) => {
        const customerGroupPriceRow = currentTarget.closest('.ibexa-table__row');
        const customerBasePriceInput = customerGroupPriceRow.querySelector('.ibexa-pc-product-custom-price__customer-base-price-input');
        const customPriceInput = customerGroupPriceRow.querySelector('.ibexa-pc-product-custom-price__custom-price-input');
        const customPriceRuleInput = customerGroupPriceRow.querySelector('.ibexa-pc-product-custom-price__custom-price-rule-input');
        const globalPriceRuleCell = customerGroupPriceRow.querySelector('.ibexa-pc-product-custom-price__global-price-rule-cell');
        const isCustomerBasePriceValueValid = isNumberValueValid({ value: customerBasePriceInput.value, onlyPositive: true });
        const isCustomPriceValue = isNumberValueValid({ value: customPriceInput.value });

        customerBasePriceInput.classList.toggle('is-invalid', !isCustomerBasePriceValueValid);
        customPriceInput.classList.toggle('is-invalid', !isCustomPriceValue);

        if (customPriceInput.value === '') {
            customPriceRuleInput.value = '';
            globalPriceRuleCell.classList.remove('ibexa-pc-product-custom-price__global-price-rule-cell--unused');

            return;
        }

        if (!isCustomerBasePriceValueValid || !isCustomPriceValue) {
            return;
        }

        const customerBasePriceValue = parseNumberValue(customerBasePriceInput.value);
        const customPriceValue = parseNumberValue(customPriceInput.value);
        const percentageCustomPriceOfBasePrice = parseNumberValue((customPriceValue / customerBasePriceValue) * 100);
        const customPriceRule = parseNumberValue(percentageCustomPriceOfBasePrice - 100);

        customPriceRuleInput.value = customPriceRule;
        customPriceRuleInput.dispatchEvent(new Event('change'));
    };
    const toggleGlobalPriceState = ({ currentTarget }) => {
        const customPriceRuleInput = currentTarget;
        const customerGroupPriceRow = customPriceRuleInput.closest('.ibexa-table__row');
        const globalPriceRuleCell = customerGroupPriceRow.querySelector('.ibexa-pc-product-custom-price__global-price-rule-cell');

        globalPriceRuleCell.classList.toggle(
            'ibexa-pc-product-custom-price__global-price-rule-cell--unused',
            isNumberValueValid({ value: customPriceRuleInput.value, minValue: -100 }),
        );
    };
    const validateBasePriceInput = () => {
        const field = basePriceInput.closest('.ibexa-pc-edit__form-field');
        const label = field.querySelector('.ibexa-label');
        const errorWrapper = field.querySelector('.ibexa-form-error');
        const emptyValueValidatorOutput = checkIsEmpty(field);
        const isFieldValid = isNumberValueValid({ value: basePriceInput.value, onlyPositive: true }) && emptyValueValidatorOutput.isValid;

        basePriceInput.classList.toggle('is-invalid', !isFieldValid);
        label.classList.toggle('is-invalid', !isFieldValid);
        errorWrapper.innerText = '';

        if (!emptyValueValidatorOutput.isValid) {
            errorWrapper.append(formatErrorLine(emptyValueValidatorOutput.errorMessage));
        }
    };

    customerBasePriceInputs.forEach((customerBasePriceInput) => {
        customerBasePriceInput.addEventListener('change', calculateCustomPrice, false);
        customerBasePriceInput.addEventListener('input', calculateCustomPrice, false);
    });
    customPriceInputs.forEach((customPriceInput) => {
        customPriceInput.addEventListener('change', calculateCustomPriceRule, false);
        customPriceInput.addEventListener('input', calculateCustomPriceRule, false);
    });
    customPriceRuleInputs.forEach((customPriceRuleInput) => {
        customPriceRuleInput.addEventListener(
            'change',
            (event) => {
                calculateCustomPrice(event);
                toggleGlobalPriceState(event);
            },
            false,
        );
        customPriceRuleInput.addEventListener(
            'input',
            (event) => {
                calculateCustomPrice(event);
                toggleGlobalPriceState(event);
            },
            false,
        );
    });
    markRowCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', setUpdateBasePricesButtonState, false));
    updateBasePricesButton.addEventListener('click', updateBasePrices, false);
    basePriceInput.addEventListener('blur', validateBasePriceInput, false);
    inputsWithMinAttr.forEach((input) => {
        const { min: minInputValue } = input;

        input.addEventListener('change', (event) => (event.target.value = Math.max(event.target.value, minInputValue)), false);
    });
    productPriceForm.addEventListener(
        'submit',
        (event) => {
            validateBasePriceInput();

            const invalidInputs = productPriceForm.querySelectorAll('.is-invalid');

            if (invalidInputs.length) {
                event.preventDefault();
            }
        },
        false,
    );
    setUpdateBasePricesButtonState();
})(window, window.document);
