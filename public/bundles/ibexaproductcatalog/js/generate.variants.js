(function (global, doc, Taggify) {
    const taggifyWidgets = doc.querySelectorAll('.ibexa-pc-taggify .ibexa-pc-taggify__widget');
    const updateValue = (event) => {
        const sourceInput = event.currentTarget.closest('.ibexa-pc-taggify').querySelector('.ibexa-pc-taggify__source-input');

        sourceInput.value = event.detail.tags.map((tag) => tag.label).join();
        sourceInput.dispatchEvent(new Event('change'));
    };
    const initTaggify = (field) => {
        new Taggify({
            containerNode: field,
            displayLabel: false,
            displayInputValues: false,
            hotKeys: [32, 188],
        });

        field.addEventListener('tagsCreated', updateValue, false);
        field.addEventListener('tagRemoved', updateValue, false);
    };

    taggifyWidgets.forEach(initTaggify);
})(window, window.document, window.Taggify);
