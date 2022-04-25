(function (global, doc, ibexa) {
    const contentFormContainer = doc.querySelector('.ibexa-content-tree-content-form-container--create');
    const contentTypeGroups = [...contentFormContainer.querySelectorAll('.ibexa-instant-filter__group')];
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

        Object.values(ibexa.adminUiConfig.languages.mappings).forEach(({ languageCode, name, enabled }) => {
            if (!enabled) {
                return;
            }

            const optionRendered = `<option value="${languageCode}">${name}</option>`;
            const container = doc.createElement('select');

            container.insertAdjacentHTML('beforeend', optionRendered);
            dropdownSource.append(container.firstElementChild);
        });
    };
    const preparePermissionsWidget = (permissions) => {
        if (!permissions.restrictedContentTypeIds.length) {
            return;
        }

        const visibleTypes = permissions.restrictedContentTypeIds.map(
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
    const openContentCreateWidget = (event) => {
        const { permissions, item } = event.detail;
        const locationInput = contentFormContainer.querySelector('[name="content_tree_content_create[parent_location]"]');

        locationInput.value = item.id;

        preparePermissionsWidget(permissions);
        prepareLanguageDropdown();

        document.body.dispatchEvent(
            new CustomEvent('ibexa-extra-actions:toggle-widget', {
                detail: {
                    actions: 'content-tree-create',
                },
            }),
        );
    };

    doc.body.addEventListener('ibexa-content-tree:open-create-widget', openContentCreateWidget, false);
})(window, window.document, window.ibexa);
