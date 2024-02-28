(function (global, doc, ibexa, bootstrap) {
    const openTranslationModal = (event) => {
        const { item, contentLanguages } = event.detail;
        const existingLanguages = contentLanguages.map(({ languageCode }) => languageCode);
        const contentFormContainer = doc.querySelector('.ibexa-content-tree-content-form-container--translation');
        const modal = contentFormContainer.querySelector('#content-tree-add-translation-modal');
        const locationInput = modal.querySelector('[name="content_tree_content_translation[location]"]');
        const baseLanguage = modal.querySelector('.ibexa-translation__language-wrapper--base-language');
        const targetLanguage = modal.querySelector('.ibexa-translation__language-wrapper--language');
        const modalWidget = bootstrap.Modal.getOrCreateInstance(modal);
        const noLanguageOption = baseLanguage.querySelector('[value=""]');

        locationInput.value = item.id;
        targetLanguage.innerHTML = '';
        baseLanguage.innerHTML = '';

        baseLanguage.append(noLanguageOption);

        Object.values(ibexa.adminUiConfig.languages.mappings).forEach(({ languageCode, name, enabled }) => {
            if (!enabled) {
                return;
            }

            const optionRendered = `<option value="${languageCode}">${name}</option>`;
            const container = doc.createElement('select');

            container.insertAdjacentHTML('beforeend', optionRendered);

            if (existingLanguages.includes(languageCode)) {
                baseLanguage.append(container.firstElementChild);
            } else {
                targetLanguage.append(container.firstElementChild);
            }
        });

        modalWidget.show();
    };

    doc.body.addEventListener('ibexa-content-tree:open-language-modal', openTranslationModal, false);
})(window, window.document, window.ibexa, window.bootstrap);
