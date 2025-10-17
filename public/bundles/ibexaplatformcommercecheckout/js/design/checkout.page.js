(function(global, doc, ibexa) {
    const checkout = new ibexa.eshop.widgets.CheckoutPage({
        getBasket: ibexa.eshop.helpers.basket.get,
    });

    checkout.init();

    checkout.validateState();
})(window, window.document, window.ibexa);
