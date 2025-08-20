(function (global, doc, ibexa, React, ReactDOM) {
    const productsSelectors = doc.querySelectorAll('.ibexa-pc-product-selector');

    productsSelectors.forEach((container) => {
        const productsSelectorModuleRootContainer = container.querySelector('.ibexa-pc-product-selector__module-root');
        const productsSelectorModuleRoot = ReactDOM.createRoot(productsSelectorModuleRootContainer);
        const { udwConfigProductDiscoveryWidget: udwConfigProductDiscoveryWidgetString, valueInputSelector } = container.dataset;
        const udwConfigProductDiscoveryWidget = JSON.parse(udwConfigProductDiscoveryWidgetString);
        const valueInput = doc.querySelector(valueInputSelector);
        const initialValue = valueInput.value ? JSON.parse(valueInput.value) : [];
        const handleProductsChanged = (newSelectedProductsItems) => {
            const productsItems = newSelectedProductsItems.map(({ productCode, productVariants }) => {
                const item = { productCode };

                if (productVariants) {
                    item.productVariants = productVariants;
                }

                return item;
            });

            valueInput.value = JSON.stringify(productsItems);
            valueInput.dispatchEvent(new Event('change'));
        };

        productsSelectorModuleRoot.render(
            React.createElement(ibexa.modules.ProductsSelector, {
                handleProductsChanged,
                udwConfigProductDiscoveryWidget,
                initialValue,
            }),
        );
    });
})(window, window.document, window.ibexa, window.React, window.ReactDOM);
