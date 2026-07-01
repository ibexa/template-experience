(function (global, doc) {
    const currencyDropdown = doc.querySelector('.ibexa-pc-product-prices__actions-currency-dropdown');

    if (currencyDropdown) {
        const currencyDropdownSourceInput = currencyDropdown.querySelector('.ibexa-dropdown__source select');
        const currencySelectForm = doc.querySelector('.ibexa-pc-product-prices__actions-currency-form');

        currencyDropdownSourceInput.addEventListener('change', () => currencySelectForm.submit(), false);
    }
})(window, window.document);
