(function (doc, ibexa) {
    doc.body.addEventListener(
        'ibexa-attributes-group-added',
        ({ detail }) => {
            const dropdowns = detail.container.querySelectorAll('.ibexa-dropdown:not(.ibexa-dropdown--custom-init)');

            dropdowns.forEach((dropdownContainer) => {
                const dropdown = new ibexa.core.Dropdown({
                    container: dropdownContainer,
                });

                dropdown.init();
            });
        },
        false,
    );
})(window.document, window.ibexa);
