(function(global, doc, ibexa) {
    const product = new ibexa.eshop.widgets.ProductMulti();
    const accordion = new ibexa.eshop.widgets.Accordion();

    product.init();
    accordion.init('.ibexa-commerce-accordion--product');
})(window, window.document, window.ibexa);
