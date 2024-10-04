(function (global, doc) {
    const updateDefaultShippingAddress = (event) => {
        doc.querySelector('#company_update_default_shipping_address_address').value = event.target.value;
        doc.querySelector('form[name="company_update_default_shipping_address"]').submit();
    };

    doc.querySelectorAll('input[name="updateDefaultShippingAddress"]').forEach((input) =>
        input.addEventListener('change', updateDefaultShippingAddress, false),
    );
})(window, window.document);
