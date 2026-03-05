(function (global, doc) {
    const productInfiniteCheckbox = doc.querySelector('.ibexa-pc-edit__product-infinite-checkbox');
    const productStockInput = doc.querySelector('.ibexa-pc-edit__product-stock-input');

    productInfiniteCheckbox.addEventListener(
        'change',
        () => {
            productStockInput.disabled = productInfiniteCheckbox.checked;

            if (productInfiniteCheckbox.checked && productStockInput.classList.contains('is-invalid')) {
                const errorWrapper = doc.querySelector('.ibexa-pc-edit__product-stock-row .ibexa-form-error');

                productStockInput.value = '';
                productStockInput.classList.remove('is-invalid');
                errorWrapper.innerText = '';
            }
        },
        false,
    );
})(window, window.document);
