(function (global, doc, ibexa, Translator) {
    const contentFormContainer = doc.querySelector('.ibexa-content-tree-content-form-container--create');

    if (!contentFormContainer) {
        return;
    }

    const contentTypeItemsContainers = contentFormContainer.querySelector('.ibexa-instant-filter__items');
    const contentTypeGroups = [...contentTypeItemsContainers.querySelectorAll('.ibexa-instant-filter__group')];
    const contentTypesMap = Object.values(ibexa.adminUiConfig.contentTypes).reduce((output, contentTypeGroup) => {
        return contentTypeGroup.reduce((groupOutput, group) => {
            return {
                [group.id]: group,
                ...groupOutput,
            };
        }, output);
    }, {});
    const prepareLanguageDropdown = () => {
        const dropdownSource = contentFormContainer.querySelector(
            '.ibexa-extra-actions__section-content .ibexa-dropdown__source .ibexa-input',
        );

        dropdownSource.innerHTML = '';

        const configLanguages = ibexa.adminUiConfig.languages;
        const languages = configLanguages.priority.map((languageCode) => {
            return configLanguages.mappings[languageCode];
        });

        Object.values(languages).forEach(({ languageCode, name, enabled }) => {
            if (!enabled) {
                return;
            }

            const optionRendered = `<option value="${languageCode}">${name}</option>`;
            const container = doc.createElement('select');

            container.insertAdjacentHTML('beforeend', optionRendered);
            dropdownSource.append(container.firstElementChild);
        });

        if (languages.length) {
            dropdownSource.value = languages[0].languageCode;
        }
    };
    const preparePermissionsWidget = (permissions) => {
        if (!permissions.restrictedContentTypeIdsList.restrictedContentTypeIds.length) {
            return;
        }

        const visibleTypes = permissions.restrictedContentTypeIdsList.restrictedContentTypeIds.map(
            (contentTypeId) => contentTypesMap[parseInt(contentTypeId, 10)].identifier,
        );

        contentTypeGroups.forEach((group) => {
            const contentTypeGroupItems = [...group.querySelectorAll('.ibexa-instant-filter__group-item')];
            let groupHiddenItemsCount = 0;

            contentTypeGroupItems.forEach((groupItem) => {
                const groupItemInput = groupItem.querySelector('.ibexa-input--radio');
                const isElementHidden = !visibleTypes.includes(groupItemInput.value);

                groupItem.classList.toggle('ibexa-content-tree-content-form-container__hidden-element', isElementHidden);

                if (isElementHidden) {
                    groupHiddenItemsCount++;
                }
            });

            group.classList.toggle(
                'ibexa-content-tree-content-form-container__hidden-element',
                groupHiddenItemsCount === contentTypeGroupItems.length,
            );
        });
    };
    const prepareSuggestionsWidget = (suggestions = []) => {
        const existingSuggestionContainer = contentTypeItemsContainers.querySelector('.ibexa-instant-filter__group--suggestions');

        existingSuggestionContainer?.remove();

        if (!suggestions.length) {
            return;
        }

        const { groupTemplate } = contentTypeItemsContainers.dataset;
        const suggestionsHeader = Translator.trans(/*@Desc("Suggestions")*/ 'content_type_suggestions', {}, 'ibexa_content_tree_ui');
        const suggestionsNewContainer = doc.createElement('div');
        const filledTemplate = groupTemplate.replace('{{ group_name }}', suggestionsHeader).replace('{{ group_options }}', '');
        const groupsParent = contentTypeItemsContainers.querySelector('.ibexa-instant-filter__group').parentNode;

        suggestionsNewContainer.insertAdjacentHTML('beforeend', filledTemplate);

        const suggestionsGroup = suggestionsNewContainer.querySelector('.ibexa-instant-filter__group');

        suggestionsGroup.classList.add('ibexa-instant-filter__group--suggestions');

        suggestions.forEach(({ identifier }) => {
            const item = contentTypeItemsContainers.querySelector(`.ibexa-instant-filter__group-item[data-identifier="${identifier}"]`);
            const clonedItem = item.cloneNode(true);
            const clonedInput = clonedItem.querySelector('.ibexa-input');
            const clonedInputId = `${clonedInput.id}__ibexa_suggestion`;

            clonedItem
                .querySelectorAll(`label[for="${clonedInput.id}"]`)
                .forEach((labelNode) => labelNode.setAttribute('for', clonedInputId));
            clonedInput.setAttribute('id', clonedInputId);

            suggestionsGroup.append(clonedItem);
        });

        groupsParent.prepend(suggestionsGroup);

        doc.body.dispatchEvent(
            new CustomEvent('ibexa-instant-filters:add-group', {
                detail: { container: suggestionsGroup },
            }),
        );
    };
    const openContentCreateWidget = (event) => {
        const { permissions, item, suggestions } = event.detail;
        const locationInput = contentFormContainer.querySelector('[name="content_tree_content_create[parent_location]"]');

        locationInput.value = item.id;

        preparePermissionsWidget(permissions);
        prepareLanguageDropdown();
        prepareSuggestionsWidget(suggestions);

        document.body.dispatchEvent(
            new CustomEvent('ibexa-extra-actions:toggle-widget', {
                detail: {
                    actions: 'content-tree-create',
                },
            }),
        );
    };

    doc.body.addEventListener('ibexa-content-tree:open-create-widget', openContentCreateWidget, false);
})(window, window.document, window.ibexa, window.Translator);
