(function (global, doc) {
    const FORM_SELECTOR = '[name="taxonomy_product_assign"]';
    const PRODUCT_SELECTOR_INPUT_ID = '#taxonomy_product_assign_product_selector';
    const form = doc.querySelector(FORM_SELECTOR);

    if (!form) {
        return;
    }

    const productSelectorInput = form.querySelector(PRODUCT_SELECTOR_INPUT_ID);

    doc.body.addEventListener('ibexa-pc-product-selector:selected-products-changed', ({ detail }) => {
        const { selectedProductsItems } = detail;
        const productData = selectedProductsItems.map(({ productCode, productVariants }) => ({
            productCode,
            productVariants,
        }));

        productSelectorInput.value = JSON.stringify(productData);
        form.submit();
    });
})(window, window.document);
