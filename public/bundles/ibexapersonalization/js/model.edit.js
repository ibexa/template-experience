(function(doc, Routing, eZ) {
    let draggedItem = null;
    let dragItemSourceContainer = null;
    let submodelSelectedKey = '';
    let submodelSelectedType = '';
    let submodelAttributeSource = null;
    let submodelSource = null;
    let submodelSelectedContainer = '';
    const { getJsonFromResponse } = eZ.helpers.request;
    const submodelTypeSelectNode = doc.querySelector('.ibexa-perso-submodel-select');
    const emptyTagTemplateNode = doc.querySelector('.ibexa-perso-submodel-empty-tag-template');
    const NOMINAL_TYPE = 'NOMINAL';
    const setSubmodelData = () => {
        const selectedOption = doc.querySelector(`option[value="${submodelTypeSelectNode.value}"]`);
        const { type, attributeSource, source } = selectedOption.dataset;

        submodelSelectedContainer = doc.querySelector(`.ibexa-perso-submodel--${selectedOption.value}`);
        submodelSelectedKey = selectedOption.value;
        submodelSelectedType = type;
        submodelAttributeSource = attributeSource;
        submodelSource = source;
    };
    const submodelTypeChange = () => {
        setSubmodelData();

        const selectedSubmodelClass = `ibexa-perso-submodel--${submodelSelectedKey}`;
        const submodelsForm = submodelTypeSelectNode.closest('.ibexa-perso-model-edit__submodels');

        submodelsForm.querySelectorAll('.ibexa-perso-submodel').forEach((submodelNode) => {
            const isSelectedSubmodel = submodelNode.classList.contains(selectedSubmodelClass);

            submodelNode.classList.toggle('d-none', !isSelectedSubmodel);

            if (isSelectedSubmodel && submodelSelectedType === NOMINAL_TYPE) {
                fetchSubmodelAvailableItems();
            }
        });
    };
    const fetchSubmodelAvailableItems = () => {
        const { customerId } = doc.querySelector('.ibexa-perso-model-edit__form').dataset;
        const submodelSidebarItemsContainer = submodelSelectedContainer.querySelector('.ibexa-perso-submodel-sidebar__list');
        const areItemsAlreadyFetched = submodelSidebarItemsContainer.children.length > 0;

        if (areItemsAlreadyFetched) {
            return;
        }

        const url = Routing.generate('ibexa.personalization.model.attribute', {
            attributeKey: submodelSelectedKey,
            attributeType: submodelSelectedType,
            attributeSource: submodelAttributeSource,
            source: submodelSource,
            customerId,
        });
        const request = new Request(url, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
            },
        });

        fetch(request)
            .then(getJsonFromResponse)
            .then((response) => {
                const groupsWrapper = submodelSelectedContainer.querySelector('.ibexa-perso-submodel-groups__groups-wrapper');
                const allGroupsItems = groupsWrapper.querySelectorAll('.ibexa-perso-submodel-group-item');
                const valuesAlreadyAssignedToGroups = [...allGroupsItems]
                    .map((item) => item.querySelector('.ibexa-perso-submodel-group-item__input'))
                    .map((input) => input.value);
                const { template: itemTemplate } = emptyTagTemplateNode.dataset;
                const fragment = doc.createDocumentFragment();

                response.forEach((itemValue) => {
                    const container = doc.createElement('div');
                    const templateRendered = itemTemplate.replaceAll('{{ name }}', itemValue);

                    container.insertAdjacentHTML('beforeend', templateRendered);

                    const newItem = container.querySelector('.ibexa-perso-submodel-sidebar-item');
                    const isNewItemAlreadyAssigned = valuesAlreadyAssignedToGroups.includes(itemValue);

                    newItem.classList.toggle('ibexa-perso-submodel-sidebar-item--hidden', isNewItemAlreadyAssigned);
                    fragment.append(newItem);
                });

                submodelSidebarItemsContainer.append(fragment);
                attachSidebarItemsEvents(submodelSidebarItemsContainer);
            })
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const attachSidebarItemsEvents = (sidebar) => {
        const sidebarItems = sidebar.querySelectorAll('.ibexa-perso-submodel-sidebar-item');

        sidebarItems.forEach((sidebarItem) => {
            sidebarItem.addEventListener('dragstart', dragStart, false);
        });
    };
    const updateGroupContainer = (groupsWrapper) => {
        let groupNumber = 1;
        const itemTemplateNode = submodelSelectedContainer.querySelector('.ibexa-perso-submodel__item-template');
        const { inputIdPattern, inputNamePattern } = itemTemplateNode.dataset;
        const groups = groupsWrapper.querySelectorAll('.ibexa-perso-submodel-group');

        groups.forEach((group) => {
            const groupItems = group.querySelectorAll('.ibexa-perso-submodel-group-item');

            groupItems.forEach((item, itemIndex) => {
                const input = item.querySelector('input');

                input.id = inputIdPattern.replace('__name__', groupNumber).replace('__name__', itemIndex);
                input.name = inputNamePattern.replace('__name__', groupNumber).replace('__name__', itemIndex);
            });
            groupNumber++;
        });
    };
    const dragStart = (event) => {
        draggedItem = event.target;
        dragItemSourceContainer = event.currentTarget;
    };
    const dropItem = (event) => {
        event.stopPropagation();

        if (event.currentTarget.isSameNode(dragItemSourceContainer)) {
            return;
        }

        const isFromSidebar = dragItemSourceContainer.closest('.ibexa-perso-submodel-sidebar') !== null;

        if (!isFromSidebar) {
            draggedItem.parentNode.removeChild(draggedItem);
        }

        const { value } = draggedItem.dataset;
        const { template } = submodelSelectedContainer.querySelector('.ibexa-perso-submodel__item-template').dataset;
        const groupItemsContainer = event.currentTarget;
        const itemPlaceholder = groupItemsContainer.querySelector('.ibexa-perso-submodel-group-item-placeholder');

        itemPlaceholder.insertAdjacentHTML('beforebegin', template.replace('__name__', value).replace('__name__', value));

        const insertedItem = groupItemsContainer.querySelector('.ibexa-perso-submodel-group-item:nth-last-child(2)');
        const insertedItemInput = insertedItem.querySelector('.ibexa-perso-submodel-group-item__input');

        insertedItem.dataset.value = value;
        insertedItemInput.setAttribute('value', value);
        attachGroupItemEvents(insertedItem);

        const groupsWrapper = groupItemsContainer.closest('.ibexa-perso-submodel-groups__groups-wrapper');

        updateGroupContainer(groupsWrapper);
        toggleSidebarItem(value, false);
    };
    const attachGroupEvents = (group) => {
        const removeBtn = group.querySelector('.ibexa-perso-submodel-group__remove-btn');

        removeBtn.addEventListener('click', removeGroup, false);

        group.addEventListener('dragstart', dragStart, false);
        group.addEventListener('drop', dropItem, false);
        group.addEventListener('dragover', (event) => event.preventDefault(), false);
    };
    const attachGroupItemEvents = (groupItem) => {
        const itemRemoveBtn = groupItem.querySelector('.ibexa-perso-submodel-group-item__remove-btn');

        itemRemoveBtn.addEventListener('click', removeGroupItem, false);
    };
    const addGroup = (event) => {
        const addGroupBtn = event.currentTarget;
        const groups = addGroupBtn.closest('.ibexa-perso-submodel-groups');
        const { groupTemplate } = groups.dataset;
        const groupsWrapper = groups.querySelector('.ibexa-perso-submodel-groups__groups-wrapper');

        groupsWrapper.insertAdjacentHTML('beforeend', groupTemplate);

        const allGroups = groupsWrapper.querySelectorAll('.ibexa-perso-submodel-group');
        const insertedGroup = allGroups[allGroups.length - 1];

        attachGroupEvents(insertedGroup);
        updateGroupContainer(groupsWrapper);
    };
    const removeGroup = (event) => {
        const removeBtn = event.currentTarget;
        const group = removeBtn.closest('.ibexa-perso-submodel-group');
        const groupItems = group.querySelectorAll('.ibexa-perso-submodel-group-item');
        const groupsWrapper = removeBtn.closest('.ibexa-perso-submodel-groups__groups-wrapper');

        [...groupItems]
            .map((groupItem) => groupItem.dataset.value)
            .forEach((itemValue) => {
                toggleSidebarItem(itemValue, true);
            });

        group.remove();

        updateGroupContainer(groupsWrapper);
    };
    const removeGroupItem = (event) => {
        const removeBtn = event.currentTarget;
        const groupItem = removeBtn.closest('.ibexa-perso-submodel-group-item');

        groupItem.remove();
        toggleSidebarItem(groupItem.dataset.value, true);
    };
    const toggleSidebarItem = (value, isVisible) => {
        const sidebarItemsList = submodelSelectedContainer.querySelector('.ibexa-perso-submodel-sidebar__list');
        const item = sidebarItemsList.querySelector(`.ibexa-perso-submodel-sidebar-item[data-value=${value}`);

        item.classList.toggle('ibexa-perso-submodel-sidebar-item--hidden', !isVisible);
    };
    const addRange = () => {
        const numberOfItems = submodelSelectedContainer.querySelectorAll('.ibexa-perso-submodel-range').length;
        const { template } = submodelSelectedContainer.querySelector('.ibexa-perso-submodel__item-template').dataset;
        const rangesContainer = submodelSelectedContainer.querySelector('.ibexa-perso-submodel-ranges__items-wrapper');

        rangesContainer.insertAdjacentHTML('beforeend', template.replaceAll('__name__', numberOfItems));

        const allRanges = submodelSelectedContainer.querySelectorAll('.ibexa-perso-submodel-range');
        const insertedRange = allRanges[allRanges.length - 1];
        const insertedRangeRemoveBtn = insertedRange.querySelector('.ibexa-perso-submodel-range__remove-btn');

        insertedRangeRemoveBtn.addEventListener('click', removeRange, false);
    };
    const removeRange = (event) => {
        const nodeToRemove = event.currentTarget.closest('.ibexa-perso-submodel-range');

        nodeToRemove.remove();
    };

    if (submodelTypeSelectNode) {
        setSubmodelData();

        if (submodelSelectedType === NOMINAL_TYPE) {
            fetchSubmodelAvailableItems();
        }

        submodelTypeSelectNode.addEventListener('change', submodelTypeChange, false);
    }

    doc.querySelectorAll('.ibexa-perso-submodel-groups__add-group-btn').forEach((button) => {
        button.addEventListener('click', addGroup, false);
    });

    doc.querySelectorAll('.ibexa-perso-submodel-ranges__add-range-btn').forEach((button) => {
        button.addEventListener('click', addRange, false);
    });

    doc.querySelectorAll('.ibexa-perso-submodel-range__remove-btn').forEach((button) => {
        button.addEventListener('click', removeRange, false);
    });

    doc.querySelectorAll('.ibexa-perso-submodel-group').forEach(attachGroupEvents);
    doc.querySelectorAll('.ibexa-perso-submodel-group-item').forEach(attachGroupItemEvents);

    doc.querySelector('.ibexa-btn--save-close').addEventListener('click', () => {
        doc.querySelector('#model_save_and_close').click();
    });
})(window.document, window.Routing, window.eZ);
