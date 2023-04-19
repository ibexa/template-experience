(function (doc, ibexa) {
    const segmentsContainer = doc.querySelector('.ibexa-perso-segments');

    if (!segmentsContainer) {
        return;
    }

    let draggedItem = null;
    let _idNo = 0;
    const relationValues = ['AND', 'OR'];
    const groupsWithIds = [];
    const groupsContainer = segmentsContainer.querySelector('.ibexa-perso-segments__container');
    const jsonContainer = segmentsContainer.querySelector('.ibexa-perso-segments__json-container');
    const groupsWrapper = segmentsContainer.querySelector('.ibexa-perso-segments__groups-wrapper');
    const addGroupBtn = segmentsContainer.querySelector('.ibexa-perso-segments__add-group-btn');
    const filterFieldInput = segmentsContainer.querySelector('.ibexa-perso-segments-sidebar__sidebar-filter');

    const initTooltip = (item) => {
        if (item.scrollWidth > 500) {
            ibexa.helpers.tooltips.parse(item);
        }
    };
    const updateSubGroup = (subGroup) => {
        const subGroupItems = [
            ...subGroup.querySelectorAll('.ibexa-perso-segments-sub-group__segments > .ibexa-perso-segments-sub-group-item'),
        ];
        const relation = subGroup.querySelector('.ibexa-perso-segments-sub-group__relationship');
        const isSubGroupEmpty = !subGroupItems.length;

        relation.classList.toggle('ibexa-perso-segments-sub-group__relationship--hidden', isSubGroupEmpty);
    };
    const updateGroup = (group) => {
        const groupItems = [...group.querySelectorAll('.ibexa-perso-segments-group__segments > .ibexa-perso-segments-group-item')];
        const emptyGroup = group.querySelector('.ibexa-perso-segments-drop-empty-group');
        const placeholder = group.querySelector('.ibexa-perso-segments-group-item-placeholder');
        const relation = group.querySelector('.ibexa-perso-segments-group__relationship');
        const isGroupEmpty = !groupItems.length;

        relation.classList.toggle('ibexa-perso-segments-group__relationship--hidden', isGroupEmpty);
        placeholder.classList.toggle('ibexa-perso-segments-group-item-placeholder--hidden', isGroupEmpty);
        emptyGroup.classList.toggle('ibexa-perso-segments-drop-empty-group--hidden', !isGroupEmpty);
    };
    const dropSubItem = (event) => {
        const { currentTarget: placeholder } = event;
        const subGroupContainer = placeholder.closest('.ibexa-perso-segments-sub-group');

        event.stopPropagation();

        addSubGroupItem(subGroupContainer);
        updateSubGroup(subGroupContainer);
        togglePlaceholderHovered(placeholder, false);
    };
    const dropItem = (event) => {
        event.stopPropagation();

        const { currentTarget: placeholder } = event;
        const group = placeholder.closest('.ibexa-perso-segments-group');

        addGroupItem(group);
        updateGroup(group);
        togglePlaceholderHovered(placeholder, false);
    };
    const updateGroupEvents = (group) => {
        group.addEventListener('drop', dropItemOnEmptyGroup, false);
    };
    const dropItemOnEmptyGroup = (event) => {
        const { currentTarget: group } = event;

        event.stopPropagation();
        addGroupItem(group);
        updateGroup(group);
        attachGroupPlaceholderEvents(group);
        group.removeEventListener('drop', dropItemOnEmptyGroup, false);
    };
    const togglePlaceholderHovered = (placeholder, hovered) => {
        const PLACEHOLDER_ANCHORED_CLASS = placeholder.classList[0];

        if (
            PLACEHOLDER_ANCHORED_CLASS === 'ibexa-perso-segments-group-item-placeholder' ||
            PLACEHOLDER_ANCHORED_CLASS === 'ibexa-perso-segments-sub-group-item-placeholder'
        ) {
            placeholder.classList.toggle(`${PLACEHOLDER_ANCHORED_CLASS}--anchored`, !hovered);
        }
    };
    const dragLeave = ({ currentTarget }) => togglePlaceholderHovered(currentTarget, false);
    const dragEnter = ({ currentTarget }) => togglePlaceholderHovered(currentTarget, true);
    const dragStart = ({ target }) => (draggedItem = target.closest('.ibexa-perso-segments-sidebar-item'));
    const updateGroupingOperation = (id, value) => {
        groupsWithIds.forEach((group) => {
            if (group._id === id) {
                group.groupingOperation = value;
            }

            group.groupElements.forEach((item) => {
                if (item._id === id) {
                    item.childGroupingOperation = value;
                }
            });
        });
    };
    const attachDropdownEvents = (dropdown) => {
        dropdown.sourceInput.addEventListener('change', (event) => {
            const { currentTarget } = event;
            const id = currentTarget.dataset.groupId || currentTarget.dataset.groupItemId;

            updateGroupingOperation(parseInt(id, 10), currentTarget.value);
            saveSegments();
        });
    };
    const initDropdown = (relationContainer, groupingOperation) => {
        const dropdownContainer = relationContainer.querySelector('.ibexa-dropdown:not(.ibexa-dropdown--custom-init)');
        const dropdown = new ibexa.core.Dropdown({
            container: dropdownContainer,
        });

        dropdown.init();

        if (relationValues.includes(groupingOperation)) {
            dropdown.selectOption(groupingOperation);
        }

        attachDropdownEvents(dropdown);
    };
    const getSubItemIndex = (groupIndex, itemIndex, subItemId) => {
        return groupsWithIds[groupIndex].groupElements[itemIndex].childSegments.findIndex((subItem) => subItem._id === subItemId);
    };
    const getItemIndex = (groupIndex, itemId) => {
        return groupsWithIds[groupIndex].groupElements.findIndex((item) => item._id === itemId);
    };
    const getGroupIndex = (groupId) => {
        return groupsWithIds.findIndex((group) => group._id === groupId);
    };
    const removeSubGroupItem = ({ currentTarget }) => {
        const subGroupItem = currentTarget.closest('.ibexa-perso-segments-sub-group-item');
        const subGroup = currentTarget.closest('.ibexa-perso-segments-sub-group');
        const groupItem = currentTarget.closest('.ibexa-perso-segments-group-item');
        const group = currentTarget.closest('.ibexa-perso-segments-group');
        const { groupId } = group.dataset;
        const { groupItemId } = groupItem.dataset;
        const { groupSubItemId } = subGroupItem.dataset;
        const groupIndex = getGroupIndex(parseInt(groupId, 10));
        const itemIndex = getItemIndex(groupIndex, parseInt(groupItemId, 10));
        const groupSubItemIndexToRemove = getSubItemIndex(groupIndex, itemIndex, parseInt(groupSubItemId, 10));

        groupsWithIds[groupIndex].groupElements[itemIndex].childSegments.splice(groupSubItemIndexToRemove, 1);
        subGroupItem.remove();
        updateSubGroup(subGroup);
        saveSegments();
    };
    const removeGroupItem = ({ currentTarget }) => {
        const groupItem = currentTarget.closest('.ibexa-perso-segments-group-item');
        const group = currentTarget.closest('.ibexa-perso-segments-group');
        const groupItemContainer = group.querySelector('.ibexa-perso-segments-group__segments');
        const { groupId } = group.dataset;
        const { groupItemId } = groupItem.dataset;
        const groupIndex = getGroupIndex(parseInt(groupId, 10));
        const groupItemIndexToRemove = getItemIndex(groupIndex, parseInt(groupItemId, 10));

        groupsWithIds[groupIndex].groupElements.splice(groupItemIndexToRemove, 1);
        groupItem.remove();
        updateGroup(group);
        saveSegments();

        if (!groupItemContainer.children.length) {
            updateGroupEvents(group);
        }
    };
    const removeGroup = ({ currentTarget }) => {
        const group = currentTarget.closest('.ibexa-perso-segments-group');
        const { groupId } = group.dataset;
        const groupIndexToRemove = getGroupIndex(parseInt(groupId, 10));

        groupsWithIds.splice(groupIndexToRemove, 1);
        group.remove();
        saveSegments();
    };
    const attachSubGroupItemEvents = (subItem) => {
        const subItemRemoveBtn = subItem.querySelector('.ibexa-perso-segments-sub-group-item__remove-btn');

        subItemRemoveBtn.addEventListener('click', removeSubGroupItem, false);
    };
    const attachGroupItemEvents = (item) => {
        const itemRemoveBtn = item.querySelector('.ibexa-perso-segments-group-item__remove-btn');

        itemRemoveBtn.addEventListener('click', removeGroupItem, false);
    };
    const attachGroupPlaceholderEvents = (group) => {
        const placeholder = group.querySelector('.ibexa-perso-segments-group-item-placeholder');

        if (!placeholder.classList.contains('ibexa-perso-segments-group-item-placeholder--events-added')) {
            placeholder.addEventListener('drop', dropItem, false);
            placeholder.addEventListener('dragenter', dragEnter, false);
            placeholder.addEventListener('dragleave', dragLeave, false);
            placeholder.classList.add('ibexa-perso-segments-group-item-placeholder--events-added');
        }
    };
    const attachEmptyGroupEvents = (group) => {
        const removeBtn = group.querySelector('.ibexa-perso-segments-group__remove-btn');

        removeBtn.addEventListener('click', removeGroup, false);
        group.addEventListener('drop', dropItemOnEmptyGroup, false);
        group.addEventListener('dragover', (event) => event.preventDefault(), false);
    };
    const addSubGroupItem = (groupSubItemsContainer, subItem = {}) => {
        const { _id = _idNo++, segment = { group: {} } } = subItem;
        const segmentId = segment.id ?? draggedItem.dataset.segmentId;
        const segmentName = segment.name ?? draggedItem.dataset.segmentName;
        const groupId = segment.group.id ?? draggedItem.dataset.groupId;
        const groupName = segment.group.name ?? draggedItem.dataset.groupName;
        const groupSubItemSegmentsContainer = groupSubItemsContainer.querySelector('.ibexa-perso-segments-sub-group__segments');
        const { subItemTemplate } = groupSubItemSegmentsContainer.dataset;
        const renderedSubItem = subItemTemplate.replaceAll('__group_sub_item_id__', _id).replaceAll('__sub_name__', segmentName);

        groupSubItemSegmentsContainer.insertAdjacentHTML('beforeend', renderedSubItem);

        const insertedSubItem = groupSubItemSegmentsContainer.lastElementChild;
        const insertedSubItemName = insertedSubItem.querySelector('.ibexa-perso-segments-sub-group-item__name');

        if (!Object.keys(subItem).length) {
            const itemElement = groupSubItemsContainer.closest('.ibexa-perso-segments-group-item');
            const { groupItemId } = itemElement.dataset;

            groupsWithIds.forEach((group) => {
                group.groupElements.forEach((item) => {
                    if (item._id === parseInt(groupItemId, 10)) {
                        item.childSegments.push({
                            _id,
                            segment: {
                                id: segmentId,
                                name: segmentName,
                                group: {
                                    id: groupId,
                                    name: groupName,
                                },
                            },
                        });
                    }
                });
            });
            saveSegments();
        }

        initTooltip(insertedSubItemName);
        attachSubGroupItemEvents(insertedSubItem);
    };
    const addGroupItem = (groupItemsContainer, item = {}) => {
        const { _id = _idNo++, childSegments = [], mainSegment = null, childGroupingOperation = null } = item;
        const groupName = mainSegment ? mainSegment.segment.group.name : draggedItem.dataset.groupName;
        const groupId = mainSegment ? mainSegment.segment.group.id : draggedItem.dataset.groupId;
        const segmentName = mainSegment ? mainSegment.segment.name : draggedItem.dataset.segmentName;
        const segmentId = mainSegment ? mainSegment.segment.id : draggedItem.dataset.segmentId;
        const groupItemSegmentsContainer = groupItemsContainer.querySelector('.ibexa-perso-segments-group__segments');
        const { itemTemplate } = groupItemSegmentsContainer.dataset;
        const renderedItem = itemTemplate.replaceAll('__group_item_id__', _id).replaceAll('__name__', segmentName);

        groupItemSegmentsContainer.insertAdjacentHTML('beforeend', renderedItem);

        const insertedItem = groupItemSegmentsContainer.lastElementChild;
        const insertedItemName = insertedItem.querySelector('.ibexa-perso-segments-group-item__name');
        const subItemPlaceholder = insertedItem.querySelector('.ibexa-perso-segments-sub-group-item-placeholder');
        const subGroupRelationContainer = insertedItem.querySelector('.ibexa-perso-segments-sub-group__relationship');

        subItemPlaceholder.addEventListener('drop', dropSubItem, false);
        subItemPlaceholder.addEventListener('dragenter', dragEnter, false);
        subItemPlaceholder.addEventListener('dragleave', dragLeave, false);

        if (childSegments.length) {
            childSegments.forEach((subItem) => addSubGroupItem(insertedItem, subItem));
        }

        if (!Object.keys(item).length) {
            const { groupId: groupItemsId } = groupItemsContainer.dataset;

            groupsWithIds.forEach((group) => {
                if (group._id === parseInt(groupItemsId, 10)) {
                    group.groupElements.push({
                        _id,
                        mainSegment: {
                            segment: {
                                id: segmentId,
                                name: segmentName,
                                group: {
                                    id: groupId,
                                    name: groupName,
                                },
                            },
                            isActive: false,
                        },
                        childSegments: [],
                        childGroupingOperation: 'AND',
                    });
                }
            });
            saveSegments();
        }

        updateSubGroup(insertedItem);
        initDropdown(subGroupRelationContainer, childGroupingOperation);
        initTooltip(insertedItemName);
        attachGroupItemEvents(insertedItem);
    };
    const addGroup = (group = {}) => {
        const { _id = _idNo++, groupingOperation = null, groupElements = [] } = group;
        const { groupTemplate } = groupsContainer.dataset;
        const groupTemplateRendered = groupTemplate.replaceAll('__group_id__', _id);

        groupsWrapper.insertAdjacentHTML('beforeend', groupTemplateRendered);

        const insertedGroup = groupsWrapper.lastElementChild;
        const groupRelationContainer = insertedGroup.querySelector('.ibexa-perso-segments-group__relationship');

        attachEmptyGroupEvents(insertedGroup);

        if (groupElements.length) {
            groupElements.forEach((groupElement) => addGroupItem(insertedGroup, groupElement));
            attachGroupPlaceholderEvents(insertedGroup);
            insertedGroup.removeEventListener('drop', dropItemOnEmptyGroup, false);
        }

        if (!Object.keys(group).length) {
            groupsWithIds.push({
                groupElements: [],
                groupingOperation: 'AND',
                _id,
            });
        }

        initDropdown(groupRelationContainer, groupingOperation);
        updateGroup(insertedGroup);
    };
    const saveSegments = () => {
        const getAllEmptyGroupIndex = [];
        const groupsCopy = groupsWithIds.map((group) => {
            const groupItems = group.groupElements.map((item) => {
                const groupSubItems = item.childSegments.map((subItem) => ({ ...subItem }));

                return { ...item, childSegments: [...groupSubItems] };
            });

            return { ...group, groupElements: [...groupItems] };
        });

        groupsCopy.forEach((group, index) => {
            if (!group.groupElements.length) {
                getAllEmptyGroupIndex.push(index);
            }
        });
        getAllEmptyGroupIndex.reverse().forEach((index) => {
            groupsCopy.splice(index, 1);
        });
        groupsCopy.forEach((group) => {
            delete group._id;

            group.groupElements.forEach((item) => {
                delete item._id;

                item.childSegments.forEach((subItem) => {
                    delete subItem._id;
                });
            });
        });

        jsonContainer.setAttribute('value', JSON.stringify(groupsCopy));
    };
    const initGroups = () => {
        const json = jsonContainer.value ?? [];
        const groups = JSON.parse(json).reverse();

        groups.forEach((group, groupIndex) => {
            groupsWithIds.push({ ...group, _id: _idNo++ });

            const groupItemWithId = group.groupElements.map((groupItem) => ({
                ...groupItem,
                _id: _idNo++,
            }));

            groupsWithIds[groupIndex].groupElements = groupItemWithId;

            group.groupElements.forEach((groupItem, itemIndex) => {
                const groupSubItemWithId = groupItem.childSegments.map((groupSubItem) => ({
                    ...groupSubItem,
                    _id: _idNo++,
                }));

                groupsWithIds[groupIndex].groupElements[itemIndex].childSegments = groupSubItemWithId;
            });
        });
        ibexa.helpers.tooltips.hideAll();
        groupsWithIds.forEach((groupItem) => {
            addGroup(groupItem);
        });
    };

    initGroups();
    addGroupBtn.addEventListener('click', () => addGroup(), false);

    const sidebarActiveItemsList = segmentsContainer.querySelector(
        '.ibexa-perso-segments-sidebar-group__segments-container--active-segments',
    );
    const sidebarActiveItems = sidebarActiveItemsList.querySelectorAll('.ibexa-perso-segments-sidebar-item');
    const sidebarGroups = [...segmentsContainer.querySelectorAll('.ibexa-perso-segments-sidebar-group')];
    const sidebarGroupsTitleBars = [...segmentsContainer.querySelectorAll('.ibexa-perso-segments-sidebar-group__title-bar')];
    const sidebarSegmentsGroups = [...segmentsContainer.querySelectorAll('.ibexa-perso-segments-sidebar-group__segments-group')];

    const disableEmptyGroups = (sidebarGroup) => {
        const sidebarSegments = sidebarGroup.querySelector('.ibexa-perso-segments-sidebar-group__segments-container');

        if (sidebarSegments.children.length) {
            return;
        }

        sidebarGroup.classList.add('ibexa-perso-segments-sidebar-group--hidden');
    };
    const toggleSidebarGroup = ({ currentTarget }) => {
        const sidebarGroup = currentTarget.closest('.ibexa-perso-segments-sidebar-group');

        sidebarGroup.classList.toggle('ibexa-perso-segments-sidebar-group--collapsed');
    };
    const toggleSegmentGroup = ({ currentTarget }) => {
        const segmentGroupContainer = currentTarget.closest('.ibexa-perso-segments-sidebar-group__segments');

        segmentGroupContainer.classList.toggle('ibexa-perso-segments-sidebar-group__segments--collapsed');
    };
    const searchField = (event) => {
        const fieldFilterQueryLowerCase = event.currentTarget.value.toLowerCase();
        const sidebarFields = segmentsContainer.querySelectorAll('.ibexa-perso-segments-sidebar-item');

        sidebarFields.forEach((field) => {
            const fieldNameNode = field.querySelector('.ibexa-perso-segments-sidebar-item__label');
            const fieldNameLowerCase = fieldNameNode.innerText.toLowerCase();
            const isFieldHidden = !fieldNameLowerCase.includes(fieldFilterQueryLowerCase);

            field.classList.toggle('ibexa-perso-segments-sidebar-item--hidden', isFieldHidden);
        });
    };
    const attachSidebarItemEvents = (item) => {
        const contentContainer = item.querySelector('.ibexa-perso-segments-sidebar-item__content');

        contentContainer.addEventListener('dragstart', dragStart, false);
    };

    filterFieldInput.addEventListener('keyup', searchField, false);
    sidebarActiveItems.forEach(attachSidebarItemEvents);
    sidebarGroups.forEach((sidebarGroup) => disableEmptyGroups(sidebarGroup));
    sidebarGroupsTitleBars.forEach((titleBar) => titleBar.addEventListener('click', toggleSidebarGroup, false));
    sidebarSegmentsGroups.forEach((segmentGroup) => segmentGroup.addEventListener('click', toggleSegmentGroup, false));
})(window.document, window.ibexa);
