(function (global, doc) {
    doc.querySelectorAll('.ez-personalization-block-config__dropdown').forEach((container) => {
        const dropdown = new global.eZ.core.CustomDropdown({
            container,
            itemsContainer: container.querySelector('.ez-custom-dropdown__items'),
            sourceInput: doc.querySelector(container.dataset.sourceSelector),
        });

        dropdown.init();
    });
})(window, window.document);
