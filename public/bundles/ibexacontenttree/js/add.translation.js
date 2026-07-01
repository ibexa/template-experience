(function (doc, ibexa, bootstrap) {
    const { escapeHTML, escapeHTMLAttribute } = ibexa.helpers.text;
    const { dangerouslyInsertAdjacentHTML } = ibexa.helpers.dom;
    const FORM_ACTION_CONTENT_ID_PLACEHOLDER = '__contentId__';
    const openTranslationModal = (event) => {
        const { item, contentLanguages, permissions, contentId } = event.detail;
        const { restrictedLanguageCodes } = permissions.restrictedLanguageCodesList;
        const existingLanguages = contentLanguages.map(({ languageCode }) => languageCode);
        const contentFormContainer = doc.querySelector('.ibexa-content-tree-content-form-container--translation');
        const modal = contentFormContainer.querySelector('#content-tree-add-translation-modal');
        const buttonCreate = modal.querySelector('.ibexa-btn--create-translation');
        const formActionTemplate = buttonCreate?.dataset.formactionTemplate;
        const locationInput = modal.querySelector('[name="content_tree_content_translation[location]"]');
        const baseLanguage = modal.querySelector('.ibexa-translation__language-wrapper--base-language');
        const targetLanguage = modal.querySelector('.ibexa-translation__language-wrapper--language');
        const modalWidget = bootstrap.Modal.getOrCreateInstance(modal);
        const noLanguageOption = baseLanguage.querySelector('[value=""]');

        locationInput.value = item.id;
        if (buttonCreate && formActionTemplate && Number.isInteger(contentId)) {
            buttonCreate.setAttribute('formaction', formActionTemplate.replace(FORM_ACTION_CONTENT_ID_PLACEHOLDER, String(contentId)));
        }
        targetLanguage.innerHTML = '';
        baseLanguage.innerHTML = '';

        baseLanguage.append(noLanguageOption);

        Object.values(ibexa.adminUiConfig.languages.mappings).forEach(({ languageCode, name, enabled }) => {
            const hasPermissionToLanguage = restrictedLanguageCodes.length === 0 || restrictedLanguageCodes.includes(languageCode);

            if (!enabled || !hasPermissionToLanguage) {
                return;
            }

            const nameHtmlEscaped = escapeHTML(name);
            const languageCodeHtmlAttributeEscaped = escapeHTMLAttribute(languageCode);
            const optionRendered = `<option value="${languageCodeHtmlAttributeEscaped}">${nameHtmlEscaped}</option>`;
            const container = doc.createElement('select');

            dangerouslyInsertAdjacentHTML(container, 'beforeend', optionRendered);

            if (existingLanguages.includes(languageCode)) {
                baseLanguage.append(container.firstElementChild);
            } else {
                targetLanguage.append(container.firstElementChild);
            }
        });

        modalWidget.show();
    };

    doc.body.addEventListener('ibexa-content-tree:open-language-modal', openTranslationModal, false);
})(window.document, window.ibexa, window.bootstrap);
