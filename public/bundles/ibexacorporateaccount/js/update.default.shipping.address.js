(function (global, doc) {
    const updateDefaultShippingAddress = (event) => {
        doc.querySelector('#default_address_update_address').value = event.target.value;
        doc.querySelector('form[name="default_address_update"]').submit();
    };

    doc.querySelectorAll('input[name="updateDefaultShippingAddress"]').forEach((input) =>
        input.addEventListener('change', updateDefaultShippingAddress, false),
    );
})(window, window.document);
