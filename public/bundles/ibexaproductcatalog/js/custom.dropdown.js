(function(global, doc, eZ) {
    const dropdowns = doc.querySelectorAll('.ibexa-pc-custom-dropdown');

    dropdowns.forEach((dropdownContainer) => {
        const dropdown = new eZ.core.Dropdown({
            container: dropdownContainer,
            hasDefaultSelection: true,
        });

        dropdown.init();
    });
})(window, window.document, window.eZ);
