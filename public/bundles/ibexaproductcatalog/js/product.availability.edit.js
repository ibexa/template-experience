(function (global, doc) {
    const productInfiniteCheckbox = doc.querySelector('.ibexa-pc-edit__product-infinite-checkbox');
    const productStockInput = doc.querySelector('.ibexa-pc-edit__product-stock-input');

    productInfiniteCheckbox.addEventListener(
        'change',
        () => {
            productStockInput.disabled = productInfiniteCheckbox.checked;
        },
        false,
    );
})(window, window.document);
