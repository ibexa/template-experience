(function (global, doc) {
    const openContentEditWidget = (event) => {
        const { item, contentLanguages } = event.detail;
        const contentFormContainer = doc.querySelector('.ibexa-content-tree-content-form-container--edit');
        const counterContainer = contentFormContainer.querySelector('.ibexa-extra-actions__counter');
        const contentInput = contentFormContainer.querySelector('[name="content_tree_content_edit[content_info]"]');
        const locationInput = contentFormContainer.querySelector('[name="content_tree_content_edit[location]"]');
        const contentLanguagesCodes = contentLanguages.map(({ languageCode }) => languageCode);

        contentInput.value = item.internalItem.contentId;
        locationInput.value = item.internalItem.locationId;

        if (contentLanguagesCodes.length !== 1) {
            const inputs = contentFormContainer.querySelectorAll('.ibexa-input--radio');

            [...inputs].forEach((input) => {
                const optionWrapper = input.closest('.form-check');

                optionWrapper.hidden = !contentLanguagesCodes.includes(input.value);
            });
            counterContainer.innerHTML = contentLanguagesCodes.length;

            document.body.dispatchEvent(
                new CustomEvent('ibexa-extra-actions:toggle-widget', {
                    detail: {
                        actions: 'content-tree-edit',
                    },
                }),
            );
        } else {
            const languageRadioOption = contentFormContainer.querySelector(`.ibexa-input--radio[value="${contentLanguagesCodes[0]}"]`);

            if (!languageRadioOption) {
                return;
            }

            languageRadioOption.checked = true;
            languageRadioOption.dispatchEvent(new CustomEvent('change'));
        }
    };

    doc.body.addEventListener('ibexa-content-tree:open-edit-widget', openContentEditWidget, false);
})(window, window.document);
