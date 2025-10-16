(function (global, doc) {
    const openContentEditWidget = (event) => {
        const MIN_ITEMS_WITH_SEARCH = 10;
        const { item, contentLanguages, permissions } = event.detail;
        const { restrictedLanguageCodes } = permissions.restrictedLanguageCodesList;
        const contentFormContainer = doc.querySelector('.ibexa-content-tree-content-form-container--edit');
        const contentInput = contentFormContainer.querySelector('[name="content_tree_content_edit[content_info]"]');
        const locationInput = contentFormContainer.querySelector('[name="content_tree_content_edit[location]"]');
        const contentLanguagesCodes = contentLanguages
            .map(({ languageCode }) => languageCode)
            .filter((languageCode) => restrictedLanguageCodes.length === 0 || restrictedLanguageCodes.includes(languageCode));
        const isSearchEnabled = contentLanguages.length >= MIN_ITEMS_WITH_SEARCH;
        const extraActionsContainer = contentFormContainer.querySelector('.ibexa-extra-actions');
        const instantFilterInput = extraActionsContainer.querySelector('.ibexa-instant-filter__input-wrapper');

        extraActionsContainer.classList.toggle('ibexa-extra-actions--has-search', isSearchEnabled);
        instantFilterInput.classList.toggle('ibexa-instant-filter__input-wrapper--hidden', !isSearchEnabled);

        contentInput.value = item.internalItem.contentId;
        locationInput.value = item.internalItem.locationId;

        if (contentLanguagesCodes.length !== 1) {
            const inputs = contentFormContainer.querySelectorAll('.ibexa-input--radio');

            [...inputs].forEach((input) => {
                const optionWrapper = input.closest('.form-check');

                optionWrapper.hidden = !contentLanguagesCodes.includes(input.value);
            });

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
            languageRadioOption.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        sendImmediately: true,
                    },
                }),
            );
        }
    };

    doc.body.addEventListener('ibexa-content-tree:open-edit-widget', openContentEditWidget, false);
})(window, window.document);
