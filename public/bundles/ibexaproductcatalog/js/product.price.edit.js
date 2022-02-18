(function(global, doc) {
    const productPriceForm = doc.querySelector('.ibexa-pc-product-price-edit-form');
    const { currencySubunits } = productPriceForm.dataset;
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
    const isNumberValueValid = (value) => !isNaN(value);
    const setUpdateBasePricesButtonState = () => {
        const isAnyCheckboxSelected = [...markRowCheckboxes].some((checkbox) => checkbox.checked);

        updateBasePricesButton.disabled = !isAnyCheckboxSelected;
    };
    const updateBasePrices = () => {
        const basePriceValue = parseNumberValue(basePriceInput.value);

        if (!isNumberValueValid(basePriceValue)) {
            basePriceInput.classList.add('is-invalid');

            return;
        }

        basePriceInput.classList.remove('is-invalid');
        markRowCheckboxes.forEach((checkbox) => {
            if (!checkbox.checked) {
                return;
            }

            const customerBasePriceInput = checkbox
                .closest('.ibexa-table__row')
                .querySelector('.ibexa-pc-product-custom-price__customer-base-price-input');

            customerBasePriceInput.value = basePriceValue;
            customerBasePriceInput.dispatchEvent(new Event('change'));
        });
    };
    const calculateCustomPrice = ({ currentTarget }) => {
        const customerGroupPriceRow = currentTarget.closest('.ibexa-table__row');
        const customerBasePriceInput = customerGroupPriceRow.querySelector('.ibexa-pc-product-custom-price__customer-base-price-input');
        const globalPriceRuleInput = customerGroupPriceRow.querySelector('.ibexa-pc-product-custom-price__global-price-rule-input');
        const customPriceRuleInput = customerGroupPriceRow.querySelector('.ibexa-pc-product-custom-price__custom-price-rule-input');
        const customPriceInput = customerGroupPriceRow.querySelector('.ibexa-pc-product-custom-price__custom-price-input');
        const customerBasePriceValue = parseNumberValue(customerBasePriceInput.value);
        const globalPriceRuleValue = parseNumberValue(globalPriceRuleInput.value);
        const customPriceRuleValue = parseNumberValue(customPriceRuleInput.value);
        const isCustomPriceRuleOutOfRange = customPriceRuleValue < -100;

        customerBasePriceInput.classList.toggle('is-invalid', !isNumberValueValid(customerBasePriceValue));
        customPriceRuleInput.classList.toggle('is-invalid', isCustomPriceRuleOutOfRange);

        if (!isNumberValueValid(customerBasePriceValue) || isCustomPriceRuleOutOfRange) {
            return;
        }

        const priceRuleValue = isNumberValueValid(customPriceRuleValue) ? customPriceRuleValue : globalPriceRuleValue;
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
        const customerBasePriceValue = parseNumberValue(customerBasePriceInput.value);
        const customPriceValue = parseNumberValue(customPriceInput.value);

        customerBasePriceInput.classList.toggle('is-invalid', !isNumberValueValid(customerBasePriceValue));
        customPriceInput.classList.toggle('is-invalid', !isNumberValueValid(customPriceValue));

        if (!isNumberValueValid(customerBasePriceValue) || !isNumberValueValid(customPriceValue)) {
            return;
        }

        const percentageCustomPriceOfBasePrice = parseNumberValue((customPriceValue / customerBasePriceValue) * 100);
        const customPriceRule = parseNumberValue(percentageCustomPriceOfBasePrice - 100);

        customPriceRuleInput.value = customPriceRule;
        customPriceRuleInput.dispatchEvent(new Event('change'));
    };
    const toggleGlobalPriceState = ({ currentTarget }) => {
        const customPriceRuleInput = currentTarget;
        const customPriceRuleValue = parseNumberValue(customPriceRuleInput.value);
        const customerGroupPriceRow = customPriceRuleInput.closest('.ibexa-table__row');
        const globalPriceRuleCell = customerGroupPriceRow.querySelector('.ibexa-pc-product-custom-price__global-price-rule-cell');

        globalPriceRuleCell.classList.toggle(
            'ibexa-pc-product-custom-price__global-price-rule-cell--unused',
            isNumberValueValid(customPriceRuleValue),
        );
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
    });
    markRowCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', setUpdateBasePricesButtonState, false));
    updateBasePricesButton.addEventListener('click', updateBasePrices, false);
    setUpdateBasePricesButtonState();
})(window, window.document);
