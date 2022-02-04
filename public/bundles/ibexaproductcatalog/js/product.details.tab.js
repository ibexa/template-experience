(function(global, doc) {
    const previewLanguageDropdown = doc.querySelector('.ibexa-pc-product-details__preview-language-dropdown');

    if (previewLanguageDropdown) {
        const previewLanguageDropdownSourceInput = previewLanguageDropdown.querySelector('.ibexa-dropdown__source select');
        const previewLanguageSelectForm = doc.querySelector('.ibexa-pc-product-details__preview-language-form');

        previewLanguageDropdownSourceInput.addEventListener('change', () => previewLanguageSelectForm.submit(), false);
    }
})(window, window.document);
