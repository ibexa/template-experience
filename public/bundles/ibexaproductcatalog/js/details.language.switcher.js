(function (global, doc) {
    const languageSwitcherForm = doc.querySelector('.ibexa-raw-content-title__language-form');

    if (!languageSwitcherForm) {
        return;
    }

    const languageSwitcherDropdownSourceInput = languageSwitcherForm.querySelector('.ibexa-dropdown__source select');

    languageSwitcherDropdownSourceInput.addEventListener('change', () => languageSwitcherForm.submit(), false);
})(window, window.document);
