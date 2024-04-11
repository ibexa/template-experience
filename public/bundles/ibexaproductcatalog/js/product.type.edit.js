(function (global, doc, ibexa, bootstrap, Translator) {
    let currentlyDraggedItem = null;
    const REMOVE_ATTRIBUTE_DELAY_TIME = 400;
    const HIGHLIGHT_GROUP_TIME = 3000;
    const ATTRIBUTE_DRAG_TYPE = 'item';
    const GROUP_DRAG_TYPE = 'group';
    const dropZoneContainer = doc.querySelector('.ibexa-pc-attributes-drop-zone');
    const emptyDropZoneMessageNode = doc.querySelector('.ibexa-pc-attributes-empty-drop-zone');
    const availableAttributesGroups = doc.querySelectorAll('.ibexa-available-attribute-item-group');
    const availableAttributesForDrag = doc.querySelectorAll('.ibexa-available-attribute-item-group, ibexa-available-attribute-item');
    const attributesGroups = doc.querySelectorAll('.ibexa-pc-added-attributes-group');
    const assignedAttributes = doc.querySelectorAll('.ibexa-pc-assigned-attribute');
    const filterAttributesInput = doc.querySelector('.ibexa-pc-attributes-sidebar__filter');
    const filterVatRatesInput = doc.querySelector('.ibexa-pc-assigned-vat-rates__filter');
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
    const searchVatRates = (event) => {
        const filterInput = event.currentTarget;
        const vatRatesFilterQueryLowerCase = filterInput.value.toLowerCase();
        const vatRatesCells = doc.querySelectorAll('.ibexa-pc-assigned-vat-rates .ibexa-table__cell--region-name');

        vatRatesCells.forEach((vatRatesCell) => {
            const vatRateNameLowerCase = vatRatesCell.innerText.toLowerCase();
            const isMatchingSearchVatRateName = vatRateNameLowerCase.includes(vatRatesFilterQueryLowerCase);

            vatRatesCell.closest('tr').hidden = !isMatchingSearchVatRateName;
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
        const availableAttribute = doc.querySelector(`.ibexa-available-attribute-item__content[data-attribute-id="${attributeId}"]`);
        const availableAttributesGroup = availableAttribute.closest('.ibexa-available-attribute-item-group');
        const collapseGroupInstance = bootstrap.Collapse.getOrCreateInstance(
            addedAttributesGroupNode.querySelector('.ibexa-collapse__body'),
            {
                toggle: false,
            },
        );
        const toggleItemAfterRemove = () => {
            addedAttributesGroupNode.classList.remove('ibexa-pc-added-attributes-group--remove-animation');
            addedAttributesGroupNode.classList.add('ibexa-collapse--hidden');
            emptyDropZoneMessageNode.classList.toggle('ibexa-pc-attributes-empty-drop-zone--hidden', shouldHideEmptyDropZoneMessage());
            addedAttributesGroupNode.removeEventListener('animationend', toggleItemAfterRemove, false);
            collapseGroupInstance.show();
        };

        attributeNodeToRemove.classList.add('ibexa-pc-assigned-attribute--in-removing');

        setTimeout(() => {
            attributeNodeToRemove.remove();
        }, REMOVE_ATTRIBUTE_DELAY_TIME);

        if (shouldHideAddedGroup(addedAttributesGroupNode)) {
            addedAttributesGroupNode.classList.add('ibexa-pc-added-attributes-group--remove-animation');
            collapseGroupInstance.hide();

            addedAttributesGroupNode.addEventListener('animationend', toggleItemAfterRemove, false);
        }

        toggleAvailableAttributeStatus(availableAttribute.closest('.ibexa-available-attribute-item__content'));
        availableAttributesGroup.classList.remove('ibexa-available-attribute-item-group--hidden');
    };
    const replacePrototypePlaceholder = (inputNode, attributeGroupId, attributeIndex) => {
        inputNode.id = inputNode.id.replace('__name__', attributeGroupId).replace('__name__', attributeIndex);
        inputNode.name = inputNode.name.replace('__name__', attributeGroupId).replace('__name__', attributeIndex);
    };
    const prepareAttribute = ({ attributeId, attributeName, attributeType, attributeGroupId, attributePosition }, targetGroup) => {
        const { nextAttributeIndex } = targetGroup.dataset;
        const { attributeTemplate } = dropZoneContainer.dataset;
        const container = document.createElement('table');
        const { discriminatorAttributeTypesMap } = ibexa.adminUiConfig;

        container.insertAdjacentHTML('beforeend', attributeTemplate);

        const attributeDefinitionWrapper = container.querySelector('.ibexa-pc-assigned-attribute');
        const nameLabelNode = attributeDefinitionWrapper.querySelector(
            '.ibexa-pc-assigned-attribute__item--name .ibexa-pc-assigned-attribute__item-label',
        );
        const itemIdentifierNode = attributeDefinitionWrapper.querySelector(
            '.ibexa-pc-assigned-attribute__item--name .ibexa-pc-assigned-attribute__item-identifier',
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

        const identifierLabel = Translator.trans(
            /*@Desc("Id: %identifier%")*/ 'attributes.assigned.identifier.label',
            { identifier: attributeId },
            'ibexa_product_catalog',
        );

        nameLabelNode.innerHTML = attributeName;
        nameLabelNode.title = attributeName;
        itemIdentifierNode.innerHTML = identifierLabel;
        itemIdentifierNode.title = identifierLabel;
        nameInputNode.value = attributeId;
        typeNode.innerHTML = attributeType;

        if (discriminatorAttributeTypesMap[attributeType] === false) {
            attributeDefinitionWrapper
                .querySelector('.ibexa-pc-assigned-attribute__item--discriminator .ibexa-toggle.ibexa-toggle--checkbox')
                .classList.add('ibexa-toggle--is-disabled');

            discriminatorInputNode.disabled = true;
        }

        replacePrototypePlaceholder(nameInputNode, attributeGroupId, nextAttributeIndex);
        replacePrototypePlaceholder(requiredInputNode, attributeGroupId, nextAttributeIndex);
        replacePrototypePlaceholder(discriminatorInputNode, attributeGroupId, nextAttributeIndex);

        targetGroup.dataset.nextAttributeIndex = parseInt(nextAttributeIndex, 10) + 1;

        const filledAttributesDefinitions = container.querySelector('.ibexa-pc-assigned-attribute');
        const toggleNodes = filledAttributesDefinitions.querySelectorAll('.ibexa-toggle');

        toggleNodes.forEach((toggleNode) => {
            const toggleButton = new ibexa.core.ToggleButton({ toggleNode });

            toggleButton.init();
        });

        attachEventsToAttribute(filledAttributesDefinitions);
        ibexa.helpers.tooltips.parse(attributeDefinitionWrapper);

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
        availableAttribute
            .closest('.ibexa-available-attribute-item-group__attribute-wrapper')
            .classList.toggle('ibexa-available-attribute-item-group__attribute-wrapper--assigned');
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

        const attributeToAssign = prepareAttribute(currentlyDraggedItem.dataset, targetAttributesGroup);
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
        const availableAttributes = doc.querySelectorAll(`.ibexa-available-attribute-item__content[data-attribute-group-id="${groupId}"]`);

        targetAttributesGroup.classList.remove('ibexa-collapse--hidden');
        highlightAttributesGroup(targetAttributesGroup);

        availableAttributes.forEach((availableAttribute) => {
            const { attributeId: availableAttributeId, attributePosition: availableAttributePosition } = availableAttribute.dataset;

            if (isAttributeAssigned(availableAttributeId)) {
                return;
            }

            const attributeToAssign = prepareAttribute(availableAttribute.dataset, targetAttributesGroup);
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

    class AttributesDraggable extends ibexa.core.Draggable {
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

            this.removeHighlight();
            dropZoneContainer.classList.add('ibexa-pc-attributes-drop-zone--active');
        }

        onDragEnd() {
            currentlyDraggedItem.style.removeProperty('display');
        }

        getPlaceholderNode(event) {
            const { target } = event;

            if (target.closest(this.selectorPlaceholder)) {
                return null;
            }

            const draggableItem = super.getPlaceholderNode(event);

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
            const item = this.getPlaceholderNode(event);

            if (!item) {
                return false;
            }

            this.removeHighlight();
            this.addHighlight();
        }

        addPlaceholder() {}

        removePlaceholder() {}

        addHighlight() {
            const { attributeGroupId, type } = currentlyDraggedItem.dataset;

            this.itemsContainer.classList.add('ibexa-pc-attributes-drop-zone--highlighted');

            if (type !== 'item') {
                return;
            }

            const addedAttributesGroups = [...this.itemsContainer.querySelectorAll('.ibexa-pc-added-attributes-group')];

            addedAttributesGroups.forEach((attributesGroup) => {
                const isActiveGroup = attributesGroup.dataset.groupId === attributeGroupId;

                attributesGroup.classList.toggle('ibexa-pc-added-attributes-group--disabled', !isActiveGroup);
            });
        }

        removeHighlight() {
            const highlightedDropzone = doc.querySelector('.ibexa-pc-attributes-drop-zone--highlighted');

            if (highlightedDropzone) {
                const disabledGroups = [...highlightedDropzone.querySelectorAll('.ibexa-pc-added-attributes-group--disabled')];

                disabledGroups.forEach((attributesGroup) => {
                    attributesGroup.classList.remove('ibexa-pc-added-attributes-group--disabled');
                });

                highlightedDropzone.classList.remove('ibexa-pc-attributes-drop-zone--highlighted');
            }
        }

        init() {
            super.init();

            doc.body.addEventListener('dragover', (event) => {
                if (!this.itemsContainer.contains(event.target)) {
                    this.removeHighlight();
                } else {
                    event.preventDefault();
                }
            });
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
            ({ target }) => {
                const isTargetGroupTogglerBtn =
                    target.classList.contains('ibexa-available-attribute-item-group__header-toggler') ||
                    target.classList.contains('ibexa-available-attribute-item-group__header-toggler-icon');

                if (!dropZoneContainer.classList.contains('ibexa-pc-attributes-drop-zone--active') || isTargetGroupTogglerBtn) {
                    return;
                }

                currentlyDraggedItem = target.closest('[draggable="true"]');

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

    if (filterVatRatesInput) {
        filterVatRatesInput.addEventListener('keyup', searchVatRates, false);
        filterVatRatesInput.addEventListener('input', searchVatRates, false);
    }

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
})(window, window.document, window.ibexa, window.bootstrap, window.Translator);
