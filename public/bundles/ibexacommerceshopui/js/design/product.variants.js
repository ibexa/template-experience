(function(global, doc, ibexa) {
    class Product extends ibexa.eshop.widgets.ProductVariants {
        updateContainer({ container, response }) {
            const { priceData } = response.get_ProductInformation;

            if (priceData.price) {
                container.querySelector('[itemprop="price"]').innerHTML = priceData.price.formattedPrice;
            } else {
                container.querySelector('[itemprop="price"]').innerHTML = priceData.minPrice.formattedPrice;
            }

            return { container, response };
        }
    }

    const product = new Product({
        sku: doc.querySelector('input[name="ses_basket[0][sku]"]').value,
    });
    const accordion = new ibexa.eshop.widgets.Accordion();

    product.init();
    accordion.init('.ibexa-commerce-accordion--product');
})(window, window.document, window.ibexa);
