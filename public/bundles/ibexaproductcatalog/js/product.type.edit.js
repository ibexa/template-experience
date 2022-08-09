(function (global, doc, eZ) {
    let currentlyDraggedItem = null;
    const REMOVE_ATTRIBUTE_DELAY_TIME = 400;
    const HIGHLIGHT_GROUP_TIME = 5000;
    const ATTRIBUTE_DRAG_TYPE = 'item';
    const GROUP_DRAG_TYPE = 'group';
    const dropZoneContainer = doc.querySelector('.ibexa-pc-attributes-drop-zone');
    const emptyDropZoneMessageNode = doc.querySelector('.ibexa-pc-attributes-empty-drop-zone');
    const availableAttributesGroups = doc.querySelectorAll('.ibexa-available-attribute-item-group');
    const availableAttributesForDrag = doc.querySelectorAll('.ibexa-available-attribute-item-group, ibexa-available-attribute-item');
    const attributesGroups = doc.querySelectorAll('.ibexa-pc-added-attributes-group');
    const assignedAttributes = doc.querySelectorAll('.ibexa-pc-assigned-attribute');
    const filterAttributesInput = doc.querySelector('.ibexa-pc-attributes-sidebar__filter');
    const availableAttributesGroupTogglers = doc.querySelectorAll('.ibexa-available-attribute-item-group__header-toggler');
    const searchAttribute = (event) => {
        const filterInput = event.currentTarget;
        const attributeFilterQueryLowerCase = filterInput.value.toLowerCase();

        availableAttributesGroups.forEach((availableAttributesGroup) => {
            const attributesWrappers = availableAttributesGroup.querySelectorAll(
                '.ibexa-available-attribute-item-group__attribute-wrapper',
            );
            const attributeGroupNameLowerCase = availableAttributesGroup
                .querySelector('.ibexa-available-attribute-item-group__header-label')
                .innerText.toLowerCase();
            const matchGroupName = attributeGroupNameLowerCase.includes(attributeFilterQueryLowerCase);

            attributesWrappers.forEach((attributeWrapper) => {
                const attributeNameLowerCase = attributeWrapper
                    .querySelector('.ibexa-available-attribute-item__label')
                    .innerText.toLowerCase();
                const isMatchingSearchAttributeName = attributeNameLowerCase.includes(attributeFilterQueryLowerCase);

                attributeWrapper.classList.toggle(
                    'ibexa-available-attribute-item-group__attribute-wrapper--hidden',
                    !isMatchingSearchAttributeName,
                );
            });

            const allAttributesWrappersNotVisible = [...attributesWrappers].every((item) => {
                const containsHiddenClass = item.classList.contains('ibexa-available-attribute-item-group__attribute-wrapper--hidden');
                const containsAssignedClass = item.classList.contains('ibexa-available-attribute-item-group__attribute-wrapper--assigned');

                return containsHiddenClass || containsAssignedClass;
            });

            const hideGroup = !matchGroupName && allAttributesWrappersNotVisible;

            availableAttributesGroup.classList.toggle('ibexa-available-attribute-item-group--hidden', hideGroup);
        });
    };
    const shouldHideAvailableGroup = (attributesGroupNode) => {
        const availableAttributes = attributesGroupNode.querySelectorAll('.ibexa-available-attribute-item-group__attribute-wrapper');

        return [...availableAttributes].every((availableItem) => {
            return availableItem.classList.contains('ibexa-available-attribute-item-group__attribute-wrapper--assigned');
        });
    };
    const shouldHideAddedGroup = (attributesGroupNode) => {
        const addedAttributes = attributesGroupNode.querySelectorAll(
            '.ibexa-pc-assigned-attribute:not(.ibexa-pc-assigned-attribute--in-removing)',
        );

        return !addedAttributes.length;
    };
    const shouldHideEmptyDropZoneMessage = () => {
        const addedAttributes = doc.querySelectorAll(
            '.ibexa-pc-attributes-drop-zone .ibexa-pc-assigned-attribute:not(.ibexa-pc-assigned-attribute--in-removing)',
        );

        return !!addedAttributes.length;
    };
    const removeAttributesGroup = (event) => {
        const attributesInGroup = event.currentTarget
            .closest('.ibexa-pc-added-attributes-group')
            .querySelectorAll('.ibexa-pc-assigned-attribute');

        attributesInGroup.forEach((attribute) => {
            const removeAttributeBtn = attribute.querySelector('.ibexa-pc-assigned-attribute--remove-btn');

            removeAttributeBtn.click();
        });
    };
    const attachEventsToAttribute = (attributeNode) => {
        const removeAttributeBtn = attributeNode.querySelector('.ibexa-pc-assigned-attribute--remove-btn');

        removeAttributeBtn.addEventListener('click', removeAttribute, false);
    };
    const removeAttribute = (event) => {
        const attributeNodeToRemove = event.currentTarget.closest('.ibexa-pc-assigned-attribute');
        const addedAttributesGroupNode = attributeNodeToRemove.closest('.ibexa-pc-added-attributes-group');
        const { attributeId } = attributeNodeToRemove.dataset;
        const availableAttribute = doc.querySelector(`.ibexa-available-attribute-item[data-attribute-id="${attributeId}"]`);
        const availableAttributesGroup = availableAttribute.closest('.ibexa-available-attribute-item-group');

        attributeNodeToRemove.classList.add('ibexa-pc-assigned-attribute--in-removing');

        setTimeout(() => {
            attributeNodeToRemove.remove();
        }, REMOVE_ATTRIBUTE_DELAY_TIME);

        addedAttributesGroupNode.classList.toggle('ibexa-collapse--hidden', shouldHideAddedGroup(addedAttributesGroupNode));
        emptyDropZoneMessageNode.classList.toggle('ibexa-pc-attributes-empty-drop-zone--hidden', shouldHideEmptyDropZoneMessage());

        toggleAvailableAttributeStatus(availableAttribute);
        availableAttributesGroup.classList.remove('ibexa-available-attribute-item-group--hidden');
    };
    const replacePrototypePlaceholder = (inputNode, attributeGroupId, attributePosition) => {
        inputNode.id = inputNode.id.replace('__name__', attributeGroupId).replace('__name__', attributePosition);
        inputNode.name = inputNode.name.replace('__name__', attributeGroupId).replace('__name__', attributePosition);
    };
    const prepareAttribute = ({ attributeId, attributeName, attributeType, attributeGroupId, attributePosition }) => {
        const { attributeTemplate } = dropZoneContainer.dataset;
        const container = document.createElement('table');

        container.insertAdjacentHTML('beforeend', attributeTemplate);

        const attributeDefinitionWrapper = container.querySelector('.ibexa-pc-assigned-attribute');
        const nameLabelNode = attributeDefinitionWrapper.querySelector(
            '.ibexa-pc-assigned-attribute__item--name .ibexa-pc-assigned-attribute__item-label',
        );
        const nameInputNode = attributeDefinitionWrapper.querySelector(
            '.ibexa-pc-assigned-attribute__item--name .ibexa-pc-assigned-attribute__item-input',
        );
        const typeNode = attributeDefinitionWrapper.querySelector('.ibexa-pc-assigned-attribute__item--type');
        const requiredInputNode = attributeDefinitionWrapper.querySelector(
            '.ibexa-pc-assigned-attribute__item--required-bool .ibexa-pc-assigned-attribute__item-input',
        );
        const discriminatorInputNode = attributeDefinitionWrapper.querySelector(
            '.ibexa-pc-assigned-attribute__item--discriminator .ibexa-pc-assigned-attribute__item-input',
        );

        attributeDefinitionWrapper.dataset.attributeId = attributeId;
        attributeDefinitionWrapper.dataset.attributePosition = attributePosition;
        nameLabelNode.innerHTML = attributeName;
        nameInputNode.value = attributeId;
        typeNode.innerHTML = attributeType;

        replacePrototypePlaceholder(nameInputNode, attributeGroupId, attributePosition);
        replacePrototypePlaceholder(requiredInputNode, attributeGroupId, attributePosition);
        replacePrototypePlaceholder(discriminatorInputNode, attributeGroupId, attributePosition);

        const filledAttributesDefinitions = container.querySelector('.ibexa-pc-assigned-attribute');
        const toggleNodes = filledAttributesDefinitions.querySelectorAll('.ibexa-toggle');

        toggleNodes.forEach((toggleNode) => {
            const toggleButton = new eZ.core.ToggleButton({ toggleNode });

            toggleButton.init();
        });

        attachEventsToAttribute(filledAttributesDefinitions);

        return filledAttributesDefinitions;
    };
    const findAttributeAfterPosition = (attributesGroupNode, targetAttributePosition) => {
        const addedAttributes = attributesGroupNode.querySelectorAll('.ibexa-pc-assigned-attribute');

        return [...addedAttributes].find((attributeNode) => {
            const { attributePosition } = attributeNode.dataset;

            return parseInt(targetAttributePosition, 10) < parseInt(attributePosition, 10);
        });
    };
    const toggleAvailableAttributeStatus = (availableAttribute) => {
        availableAttribute.parentNode.classList.toggle('ibexa-available-attribute-item-group__attribute-wrapper--assigned');
    };
    const highlightAttributesGroup = (attributesGroupNode) => {
        attributesGroupNode.classList.add('ibexa-pc-added-attributes-group--highlight-drop');

        setTimeout(() => {
            attributesGroupNode.classList.remove('ibexa-pc-added-attributes-group--highlight-drop');
        }, HIGHLIGHT_GROUP_TIME);
    };
    const isAttributeAssigned = (attributeId) => {
        return !!dropZoneContainer.querySelector(`[data-attribute-id="${attributeId}"]`);
    };
    const addAttribute = () => {
        const { attributeId, attributeGroupId, attributePosition } = currentlyDraggedItem.dataset;
        const targetAttributesGroup = dropZoneContainer.querySelector(`[data-group-id="${attributeGroupId}"]`);
        const sourceAttributeGroup = doc.querySelector(`.ibexa-available-attribute-item-group[data-group-id="${attributeGroupId}"]`);

        if (isAttributeAssigned(attributeId)) {
            return;
        }

        targetAttributesGroup.classList.remove('ibexa-collapse--hidden');
        highlightAttributesGroup(targetAttributesGroup);

        const attributeToAssign = prepareAttribute(currentlyDraggedItem.dataset);
        const targetInsertContainer = targetAttributesGroup.querySelector('.ibexa-pc-added-attributes-group__list .ibexa-table__body');

        targetInsertContainer.insertBefore(attributeToAssign, findAttributeAfterPosition(targetAttributesGroup, attributePosition));
        toggleAvailableAttributeStatus(currentlyDraggedItem);

        sourceAttributeGroup.classList.toggle(
            'ibexa-available-attribute-item-group--hidden',
            shouldHideAvailableGroup(sourceAttributeGroup),
        );
        emptyDropZoneMessageNode.classList.toggle('ibexa-pc-attributes-empty-drop-zone--hidden', shouldHideEmptyDropZoneMessage());
    };
    const addGroup = () => {
        const { groupId } = currentlyDraggedItem.dataset;
        const targetAttributesGroup = dropZoneContainer.querySelector(`[data-group-id="${groupId}"]`);
        const sourceAttributeGroup = doc.querySelector(`.ibexa-available-attribute-item-group[data-group-id="${groupId}"]`);
        const availableAttributes = doc.querySelectorAll(`.ibexa-available-attribute-item[data-attribute-group-id="${groupId}"]`);

        targetAttributesGroup.classList.remove('ibexa-collapse--hidden');
        highlightAttributesGroup(targetAttributesGroup);

        availableAttributes.forEach((availableAttribute) => {
            const { attributeId: availableAttributeId, attributePosition: availableAttributePosition } = availableAttribute.dataset;

            if (isAttributeAssigned(availableAttributeId)) {
                return;
            }

            const attributeToAssign = prepareAttribute(availableAttribute.dataset);
            const targetInsertContainer = targetAttributesGroup.querySelector('.ibexa-pc-added-attributes-group__list .ibexa-table__body');

            targetInsertContainer.insertBefore(
                attributeToAssign,
                findAttributeAfterPosition(targetAttributesGroup, availableAttributePosition),
            );

            toggleAvailableAttributeStatus(availableAttribute);
        });

        sourceAttributeGroup.classList.toggle('ibexa-available-attribute-item-group--hidden', true);
        emptyDropZoneMessageNode.classList.toggle('ibexa-pc-attributes-empty-drop-zone--hidden', shouldHideEmptyDropZoneMessage());
    };

    class AttributesDraggable extends eZ.core.Draggable {
        constructor(config) {
            super(config);

            this.emptyContainer = this.itemsContainer.querySelector('.ibexa-pc-attributes-empty-drop-zone');
            this.getPlaceholderNode = this.getPlaceholderNode.bind(this);
        }

        onDrop() {
            const { type } = currentlyDraggedItem.dataset;

            if (type === ATTRIBUTE_DRAG_TYPE) {
                addAttribute();
            } else if (type === GROUP_DRAG_TYPE) {
                addGroup();
            }

            this.placeholder.remove();
            dropZoneContainer.classList.add('ibexa-pc-attributes-drop-zone--active');
        }

        onDragEnd() {
            currentlyDraggedItem.style.removeProperty('display');
        }

        getPlaceholderNode(target) {
            if (target.closest(this.selectorPlaceholder)) {
                return null;
            }

            const draggableItem = target.closest(`${this.selectorItem}:not(${this.selectorPlaceholder})`);

            if (draggableItem) {
                return draggableItem;
            }

            if (this.emptyContainer.contains(target)) {
                return this.emptyContainer;
            }

            return this.itemsContainer.querySelector(
                '.ibexa-pc-assigned-attribute:not(.ibexa-pc-assigned-attribute--in-removing):last-child',
            );
        }

        onDragOver(event) {
            const item = this.getPlaceholderNode(event.target);

            if (!item) {
                return false;
            }

            this.removePlaceholder();
            this.addPlaceholder();

            if (item.isSameNode(this.emptyContainer)) {
                this.emptyContainer.classList.toggle('ibexa-pc-attributes-empty-drop-zone--hidden');
            }
        }

        addPlaceholder() {
            let placeholderTargetContainer = dropZoneContainer;
            const { type, attributeGroupId } = currentlyDraggedItem.dataset;
            const container = doc.createElement('div');

            attributesGroups.forEach((attributeGroup) => attributeGroup.classList.remove('ibexa-pc-added-attributes-group--active'));

            container.insertAdjacentHTML('beforeend', this.itemsContainer.dataset.placeholder);
            this.placeholder = container.querySelector(this.selectorPlaceholder);

            if (type === ATTRIBUTE_DRAG_TYPE) {
                const targetGroup = doc.querySelector(`.ibexa-pc-added-attributes-group[data-group-id="${attributeGroupId}"]`);
                const isGroupVisible = !targetGroup.classList.contains('ibexa-collapse--hidden');

                targetGroup.classList.add('ibexa-pc-added-attributes-group--active');

                if (isGroupVisible) {
                    placeholderTargetContainer = targetGroup;
                }
            }

            placeholderTargetContainer.insertBefore(this.placeholder, null);
        }

        removePlaceholder() {
            if (this.placeholder) {
                this.placeholder.remove();

                this.emptyContainer.classList.toggle('ibexa-pc-attributes-empty-drop-zone--hidden', shouldHideEmptyDropZoneMessage());
            }

            attributesGroups.forEach((attributeGroup) => attributeGroup.classList.remove('ibexa-pc-added-attributes-group--active'));
        }
    }

    const dropAttributesWidget = new AttributesDraggable({
        itemsContainer: dropZoneContainer,
        selectorItem: '.ibexa-pc-assigned-attribute',
        selectorPlaceholder: '.ibexa-pc-attributes-drop-zone-item-placeholder',
    });

    dropAttributesWidget.init();

    availableAttributesForDrag.forEach((availableAttribute) => {
        availableAttribute.addEventListener(
            'dragstart',
            (event) => {
                currentlyDraggedItem = event.target;
                currentlyDraggedItem.classList.add('ibexa-available-field-type--is-dragging-out');
            },
            false,
        );
        availableAttribute.addEventListener(
            'dragend',
            () => {
                emptyDropZoneMessageNode.classList.toggle('ibexa-pc-attributes-empty-drop-zone--hidden', shouldHideEmptyDropZoneMessage());
                currentlyDraggedItem.classList.remove('ibexa-available-field-type--is-dragging-out');
            },
            false,
        );
        availableAttribute.addEventListener(
            'click',
            (event) => {
                if (!dropZoneContainer.classList.contains('ibexa-pc-attributes-drop-zone--active')) {
                    return;
                }

                currentlyDraggedItem = event.target.closest('[draggable="true"]');

                const { type } = currentlyDraggedItem.dataset;

                if (type === ATTRIBUTE_DRAG_TYPE) {
                    addAttribute();
                } else if (type === GROUP_DRAG_TYPE) {
                    addGroup();
                }
            },
            false,
        );
    });
    filterAttributesInput.addEventListener('keyup', searchAttribute, false);
    assignedAttributes.forEach(attachEventsToAttribute);
    availableAttributesGroupTogglers.forEach((toggler) => {
        const availableAttributesGroup = toggler.closest('.ibexa-available-attribute-item-group');

        toggler.addEventListener(
            'click',
            () => {
                availableAttributesGroup.classList.toggle('ibexa-available-attribute-item-group--collapsed');
            },
            false,
        );
    });
    attributesGroups.forEach((attributesGroupNode) => {
        const removeAttributesGroupBtn = attributesGroupNode.querySelector('.ibexa-collapse__extra-action-button--remove-attributes-group');

        removeAttributesGroupBtn.addEventListener('click', removeAttributesGroup, false);
    });
})(window, window.document, window.eZ);
