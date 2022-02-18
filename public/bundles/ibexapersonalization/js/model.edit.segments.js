(function(doc) {
    const GROUP_ITEM_ID_PLACEHOLDER = '{{ groupItemId }}';
    const segmentsContainer = doc.querySelector('.ibexa-perso-segments-edit');

    if (!segmentsContainer) {
        return;
    }

    let draggedItem = null;
    let dragItemSourceContainer = null;
    const groupsContainer = segmentsContainer.querySelector('.ibexa-perso-models-drop-groups');
    const groups = groupsContainer.querySelectorAll('.ibexa-perso-models-drop-group');
    const groupsItems = [...segmentsContainer.querySelectorAll('.ibexa-perso-segment-group-item')];
    const groupsItemsSegmentsContainer = [...segmentsContainer.querySelectorAll('.ibexa-perso-models-drop-group-item__segments')];
    const sidebar = segmentsContainer.querySelector('.ibexa-perso-segment-sidebar');
    const sidebarActiveItemsList = segmentsContainer.querySelector('.ibexa-perso-segment-sidebar-group__segments--active-segments');
    const sidebarActiveItems = sidebarActiveItemsList.querySelectorAll('.ibexa-perso-segment-sidebar-item');
    const { itemTemplate: sidebarItemTemplate } = sidebar.dataset;
    const sidebarGroupsTitleBars = [...segmentsContainer.querySelectorAll('.ibexa-perso-segment-sidebar-group__title-bar')];
    const addGroupBtn = segmentsContainer.querySelector('.ibexa-perso-models-drop-groups__add-group-btn');
    const filterFieldInput = segmentsContainer.querySelector('.ibexa-perso-segment-sidebar__sidebar-filter');
    let groupsCount = groups.length;
    const attachSidebarItemEvents = (item) => {
        item.addEventListener('dragstart', dragStart, false);
        item.addEventListener('click', addItemByClick, false);
    };
    const attachGroupEvents = (group) => {
        const removeBtn = group.querySelector('.ibexa-perso-models-drop-group__remove-btn');

        removeBtn.addEventListener('click', removeGroup, false);

        group.addEventListener('dragstart', dragStart, false);
        group.addEventListener('drop', dropItem, false);
        group.addEventListener('dragover', (event) => event.preventDefault(), false);
    };
    const attachGroupItemEvents = (item) => {
        const itemRemoveBtn = item.querySelector('.ibexa-perso-segment-group-item__remove-btn');

        itemRemoveBtn.addEventListener('click', removeGroupItem, false);
    };
    const addSidebarItem = (value, isActive) => {
        const sidebarGroupList = isActive
            ? sidebar.querySelector('.ibexa-perso-segment-sidebar-group__segments--active-segments')
            : sidebar.querySelector('.ibexa-perso-segment-sidebar-group__segments--inactive-segments');
        const itemRendered = sidebarItemTemplate.replaceAll('{{ value }}', value);

        sidebarGroupList.insertAdjacentHTML('afterbegin', itemRendered);

        const insertedItem = sidebarGroupList.querySelector('.ibexa-perso-segment-sidebar-item:first-child');

        insertedItem.draggable = isActive;
        attachSidebarItemEvents(insertedItem);
    };
    const removeSidebarItem = (value) => {
        const itemToRemove = sidebar.querySelector(`.ibexa-perso-segment-sidebar-item[data-value="${value}"`);

        itemToRemove.remove();
    };
    const toggleSidebarGroup = (event) => {
        const titleBar = event.currentTarget;
        const sidebarGroup = titleBar.closest('.ibexa-perso-segment-sidebar-group');

        sidebarGroup.classList.toggle('ibexa-perso-segment-sidebar-group--collapsed');
    };
    const addItemByClick = (event) => {
        draggedItem = event.currentTarget;

        const activeGroup = segmentsContainer.querySelector('.ibexa-perso-models-drop-group--active');

        if (activeGroup) {
            addGroupItem(activeGroup);
            removeSidebarItem(draggedItem.dataset.value);
        }
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

        const groupItemsContainer = event.currentTarget;
        const groupsWrapper = groupItemsContainer.closest('.ibexa-perso-models-drop-groups__groups-wrapper');
        const activeGroup = groupsWrapper.querySelector('.ibexa-perso-models-drop-group--active');

        draggedItem.parentNode.removeChild(draggedItem);

        activeGroup?.classList.remove('ibexa-perso-models-drop-group--active');
        groupItemsContainer.classList.add('ibexa-perso-models-drop-group--active');

        addGroupItem(groupItemsContainer);
    };
    const addGroupItem = (groupItemsContainer) => {
        const { value } = draggedItem.dataset;
        const groupItemSegmentsContainer = groupItemsContainer.querySelector('.ibexa-perso-models-drop-group-item__segments');
        const groupItemTemplate = groupItemSegmentsContainer.dataset.prototype;
        const itemsCount = parseInt(groupItemSegmentsContainer.dataset.itemsCount, 10);
        const renderedItem = groupItemTemplate.replaceAll('{{ name }}', value).replaceAll(GROUP_ITEM_ID_PLACEHOLDER, itemsCount);

        groupItemSegmentsContainer.insertAdjacentHTML('beforeend', renderedItem);

        const insertedItem = groupItemSegmentsContainer.querySelector(':scope > :last-child');
        const insertedItemInput = insertedItem.querySelector('.ibexa-perso-segment-group-item__input');
        const insertedItemInputGroupId = insertedItem.querySelector('.ibexa-perso-segment-group-item__input-group-id');

        groupItemSegmentsContainer.dataset.itemsCount = itemsCount + 1;
        insertedItem.dataset.value = value;
        insertedItemInput.value = value;
        insertedItemInputGroupId.value = groupItemSegmentsContainer.dataset.groupId;
        attachGroupItemEvents(insertedItem);
    };
    const addGroup = () => {
        groupsCount = groupsCount + 1;

        const { groupTemplate } = groupsContainer.dataset;
        const groupsWrapper = groupsContainer.querySelector('.ibexa-perso-models-drop-groups__groups-wrapper');
        const groupTemplateRendered = groupTemplate.replace('__name__', groupsCount).replace('__name__', groupsCount);

        groupsWrapper.insertAdjacentHTML('beforeend', groupTemplateRendered);

        const insertedGroup = groupsWrapper.querySelector(':scope > :last-child');
        const insertedGroupSegmentsContainer = insertedGroup.querySelector('.ibexa-perso-models-drop-group-item__segments');
        const groupIdInput = insertedGroup.querySelector('.ibexa-perso-segment-group__input-group-id');
        const groupItemTemplate = insertedGroupSegmentsContainer.dataset.prototype;

        groupIdInput.value = groupsCount;
        insertedGroupSegmentsContainer.dataset.prototype = groupItemTemplate
            .replace('__name__', groupsCount)
            .replace('__name__', GROUP_ITEM_ID_PLACEHOLDER)
            .replace('__name__', groupsCount)
            .replace('__name__', GROUP_ITEM_ID_PLACEHOLDER)
            .replace('__name__', groupsCount)
            .replace('__name__', GROUP_ITEM_ID_PLACEHOLDER)
            .replace('__name__', groupsCount)
            .replace('__name__', GROUP_ITEM_ID_PLACEHOLDER);
        insertedGroupSegmentsContainer.dataset.itemsCount = 0;
        insertedGroupSegmentsContainer.dataset.groupId = groupsCount;

        attachGroupEvents(insertedGroup);
    };
    const removeGroup = (event) => {
        const removeBtn = event.currentTarget;
        const group = removeBtn.closest('.ibexa-perso-models-drop-group');
        const groupItems = [...group.querySelectorAll('.ibexa-perso-segment-group-item')];

        groupItems.reverse().forEach((groupItem) => {
            const itemValue = groupItem.dataset.value;
            const isGroupItemActive = checkIsGroupItemActive(groupItem);

            addSidebarItem(itemValue, isGroupItemActive);
        });

        group.remove();
    };
    const removeGroupItem = (event) => {
        const removeBtn = event.currentTarget;
        const groupItem = removeBtn.closest('.ibexa-perso-segment-group-item');
        const groupItemValue = groupItem.dataset.value;
        const isGroupItemActive = checkIsGroupItemActive(groupItem);

        groupItem.remove();
        addSidebarItem(groupItemValue, isGroupItemActive);
    };
    const checkIsGroupItemActive = (groupItem) => !!groupItem.querySelector('.ibexa-perso-segment-group-item__status--active');
    const searchField = (event) => {
        const fieldFilterQueryLowerCase = event.currentTarget.value.toLowerCase();
        const sidebarFields = segmentsContainer.querySelectorAll('.ibexa-perso-segment-sidebar-item');

        sidebarFields.forEach((field) => {
            const fieldNameNode = field.querySelector('.ibexa-perso-segment-sidebar-item__label');
            const fieldNameLowerCase = fieldNameNode.innerText.toLowerCase();
            const isFieldHidden = !fieldNameLowerCase.includes(fieldFilterQueryLowerCase);

            field.classList.toggle('ibexa-perso-segment-sidebar-item--hidden', isFieldHidden);
        });
    };

    sidebarActiveItems.forEach(attachSidebarItemEvents);
    groups.forEach(attachGroupEvents);
    groupsItems.forEach(attachGroupItemEvents);

    addGroupBtn.addEventListener('click', addGroup, false);
    sidebarGroupsTitleBars.forEach((titleBar) => titleBar.addEventListener('click', toggleSidebarGroup, false));

    groupsItemsSegmentsContainer.forEach((groupItemSegmentsContainer) => {
        const groupItemTemplate = groupItemSegmentsContainer.dataset.prototype;

        groupItemSegmentsContainer.dataset.prototype = groupItemTemplate.replaceAll('__name__', GROUP_ITEM_ID_PLACEHOLDER);
        groupItemSegmentsContainer.dataset.itemsCount = groupItemSegmentsContainer.children.length;
    });

    filterFieldInput.addEventListener('keyup', searchField, false);
})(window.document);
