(function (global, doc) {
    const focusModeForm = doc.querySelector('form[name="focus_mode_change"]');
    const secondLevelMenuNode = doc.querySelector('.ibexa-main-menu .ibexa-main-menu__navbar--second-level');

    if (!focusModeForm) {
        return;
    }

    focusModeForm.addEventListener(
        'submit',
        (event) => {
            const focusModeFormData = new FormData(event.target);
            const focusModeEnabled = focusModeFormData.get('focus_mode_change[enabled]');

            if (focusModeEnabled) {
                secondLevelMenuNode.dispatchEvent(new CustomEvent('ibexa-menu:hide'));
            }
        },
        false,
    );
})(window, window.document);
