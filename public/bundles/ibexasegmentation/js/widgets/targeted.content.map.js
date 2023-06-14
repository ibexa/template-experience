(function (global, doc, ibexa, Translator) {
    const segmentations = doc.querySelectorAll('.ibexa-segmentation');
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const createTagContent = (contentName, breadcrumbs) => {
        if (breadcrumbs) {
            return `${breadcrumbs} / ${contentName}`;
        }

        return contentName;
    };
    const updateInputValue = (itemsContainer) => {
        const inputValue = [...itemsContainer.querySelectorAll('.ibexa-segmentation__item')].map((item) => {
            const segmentSelect = item.querySelector('.ibexa-segmentation__select--segment');
            const segmentId = segmentSelect.value;
            const segmentOption = segmentSelect.querySelector(`[value="${segmentId}"]`);
            const segmentName = segmentOption.innerHTML.replace(/\s/g, '');
            const contentInfoTagNode = item.querySelector('.ibexa-tag');
            const { locationId, name, breadcrumbs } = contentInfoTagNode.dataset;

            return {
                segment: { id: parseInt(segmentId, 10), name: segmentName },
                content: { locationId: parseInt(locationId, 10), name, breadcrumbs },
            };
        });

        itemsContainer.closest('.ibexa-data-source').querySelector('.ibexa-data-source__input').value = JSON.stringify(inputValue);
    };
    const removeRootFromPathString = (pathString) => {
        const pathArray = pathString.split('/').filter((val) => val);

        return pathArray.splice(1, pathArray.length - 2);
    };
    const findLocationsByIdList = (idList, callback) => {
        const body = JSON.stringify({
            ViewInput: {
                identifier: `locations-by-path-string-${idList.join('-')}`,
                public: false,
                LocationQuery: {
                    FacetBuilders: {},
                    SortClauses: { SectionIdentifier: 'ascending' },
                    Filter: { LocationIdCriterion: idList.join(',') },
                    limit: 50,
                    offset: 0,
                },
            },
        });
        const request = new Request('/api/ibexa/v2/views', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.ibexa.api.View+json; version=1.1',
                'Content-Type': 'application/vnd.ibexa.api.ViewInput+json; version=1.1',
                'X-Requested-With': 'XMLHttpRequest',
                'X-Siteaccess': siteaccess,
                'X-CSRF-Token': token,
            },
            body,
            mode: 'same-origin',
            credentials: 'same-origin',
        });
        const errorMessage = Translator.trans(
            /*@Desc("Cannot find children Locations with ID %idList%")*/ 'select_location.error',
            { idList: idList.join(',') },
            'page_builder',
        );

        fetch(request)
            .then(ibexa.helpers.request.getJsonFromResponse)
            .then((data) => {
                callback(data.View.Result.searchHits.searchHit);
            })
            .catch(() => ibexa.helpers.notification.showErrorNotification(errorMessage));
    };
    const openUdw = (itemsContainer, draggable, event) => {
        event.preventDefault();

        const { currentTarget } = event;
        const config = JSON.parse(currentTarget.dataset.udwConfig);
        const title = Translator.trans(/*@Desc("Select content")*/ 'config_form.widgets.segmentation.udw.title', {}, 'page_builder');
        const openUdwEvent = new CustomEvent('ibexa-open-udw', {
            detail: {
                title,
                onConfirm: selectContent.bind(this, itemsContainer, currentTarget),
                ...config,
            },
        });

        doc.body.dispatchEvent(openUdwEvent);
    };
    const selectContent = (itemsContainer, openUdwButton, items) => {
        const [selectedContent] = items;
        const contentInfoWrapper = openUdwButton
            .closest('.ibexa-segmentation__content-wrapper')
            .querySelector('.ibexa-segmentation__content-info');
        const contentInfoTagNode = contentInfoWrapper.querySelector('.ibexa-tag');
        const contentInfoTagEllipsisNode = contentInfoTagNode.querySelector('.ibexa-middle-ellipsis');
        const contentItemName = selectedContent.ContentInfo.Content.TranslatedName;

        openUdwButton.setAttribute('hidden', 'hidden');

        contentInfoTagNode.dataset.locationId = selectedContent.id;

        findLocationsByIdList(removeRootFromPathString(selectedContent.pathString), (locations) => {
            const breadcrumbs = locations.map((location) => location.value.Location.ContentInfo.Content.TranslatedName).join(' / ');
            const tagContent = createTagContent(contentItemName, breadcrumbs);

            contentInfoTagNode.dataset.name = contentItemName;
            contentInfoTagNode.dataset.breadcrumbs = breadcrumbs;
            ibexa.helpers.ellipsis.middle.update(contentInfoTagEllipsisNode, tagContent);

            updateInputValue(itemsContainer);
        });

        contentInfoWrapper.classList.remove('ibexa-segmentation__content-info--hidden');
    };
    const attachEventsToItem = (itemsContainer, listItem, openUdwButton) => {
        listItem.querySelector('.ibexa-tag__remove-btn').addEventListener(
            'click',
            () => {
                const contentInfoTagNode = listItem.querySelector('.ibexa-tag');
                const contentInfoTagEllipsisNode = contentInfoTagNode.querySelector('.ibexa-middle-ellipsis');

                contentInfoTagNode.dataset.locationId = '';
                contentInfoTagNode.dataset.name = '';
                contentInfoTagNode.dataset.breadcrumbs = '';
                ibexa.helpers.ellipsis.middle.update(contentInfoTagEllipsisNode, '');

                openUdwButton.removeAttribute('hidden');
                listItem.querySelector('.ibexa-segmentation__content-info').classList.add('ibexa-segmentation__content-info--hidden');

                updateInputValue(itemsContainer);
            },
            false,
        );
        listItem.querySelector('.ibexa-btn--trash').addEventListener(
            'click',
            () => {
                if (itemsContainer.querySelectorAll('.ibexa-segmentation__item').length > 1) {
                    listItem.remove();
                }

                if (itemsContainer.querySelectorAll('.ibexa-segmentation__item').length === 1) {
                    itemsContainer.querySelector('.ibexa-btn--trash').setAttribute('disabled', 'disabled');
                }

                updateInputValue(itemsContainer);
            },
            false,
        );
        listItem.querySelector('.ibexa-link--change').addEventListener(
            'click',
            (event) => {
                event.preventDefault();

                openUdwButton.click();
            },
            false,
        );
    };
    const getSegmentationsConfig = (itemsContainer) => {
        const segmentationsConfig = JSON.parse(
            itemsContainer.closest('.ibexa-data-source').querySelector('.ibexa-data-source__input').dataset.segments,
        );

        return segmentationsConfig.filter((group) => group.segments.length);
    };
    const renderItem = (itemsContainer, draggable, itemData) => {
        const { template } = itemsContainer.dataset;
        const container = doc.createElement('ol');
        const segmentationsConfig = getSegmentationsConfig(itemsContainer);
        const itemConfig =
            segmentationsConfig.find((category) => itemData.group && category.id === itemData.group.id) || segmentationsConfig[0];

        container.insertAdjacentHTML('beforeend', template);

        const listItem = container.querySelector('.ibexa-segmentation__item');
        const openUdwButton = listItem.querySelector('.ibexa-btn--select-content');

        openUdwButton.addEventListener('click', openUdw.bind(this, itemsContainer, draggable), false);
        renderSegmentSelect(itemsContainer, listItem, itemConfig, itemData, segmentationsConfig);

        if (itemData.content && itemData.content.locationId) {
            const contentInfoWrapper = openUdwButton
                .closest('.ibexa-segmentation__content-wrapper')
                .querySelector('.ibexa-segmentation__content-info');
            const contentInfoTagNode = contentInfoWrapper.querySelector('.ibexa-tag');
            const contentInfoTagEllipsisNode = contentInfoTagNode.querySelector('.ibexa-middle-ellipsis');
            const tagContent = createTagContent(itemData.content.name, itemData.content.breadcrumbs);

            openUdwButton.setAttribute('hidden', 'hidden');

            contentInfoTagNode.dataset.locationId = itemData.content.locationId;
            contentInfoTagNode.dataset.name = itemData.content.name;
            contentInfoTagNode.dataset.breadcrumbs = itemData.content.breadcrumbs;
            ibexa.helpers.ellipsis.middle.update(contentInfoTagEllipsisNode, tagContent);
            contentInfoWrapper.classList.remove('ibexa-segmentation__content-info--hidden');
        }

        attachEventsToItem(itemsContainer, listItem, openUdwButton);

        itemsContainer.append(listItem);

        draggable.reinit();
    };
    const renderDropdownSourceOptions = (dropdownContainer, options) => {
        const sourceInput = dropdownContainer.querySelector('.ibexa-dropdown__source .ibexa-input');
        const { optionTemplate } = sourceInput.dataset;
        const selectOptionsFragment = doc.createDocumentFragment();

        options.forEach((option) => {
            if (option.subOptions) {
                const groupName = option.name;
                const groupId = option.id;

                option.subOptions.forEach((subOption) => {
                    const optionsContainer = doc.createElement('select');
                    const optionRendered = optionTemplate
                        .replace('{{ group_id }}', groupName)
                        .replace('{{ group_name }}', groupId)
                        .replace('{{ value }}', subOption.id)
                        .replace('{{ label }}', subOption.name);

                    optionsContainer.insertAdjacentHTML('beforeend', optionRendered);
                    selectOptionsFragment.append(optionsContainer.querySelector('option'));
                });
            } else {
                const optionsContainer = doc.createElement('select');
                const optionRendered = optionTemplate
                    .replace('{{ group_id }}', '')
                    .replace('{{ group_name }}', '')
                    .replace('{{ value }}', option.id)
                    .replace('{{ label }}', option.name);

                optionsContainer.insertAdjacentHTML('beforeend', optionRendered);
                selectOptionsFragment.append(optionsContainer.querySelector('option'));
            }
        });

        sourceInput.innerHTML = '';
        sourceInput.append(selectOptionsFragment);
    };
    const renderDropdownListOptions = (dropdownContainer, options) => {
        const sourceInput = dropdownContainer.querySelector('.ibexa-dropdown__source .ibexa-input');
        const itemsList = dropdownContainer.querySelector('.ibexa-dropdown__items-list');
        const itemsListFragment = doc.createDocumentFragment();
        const { template: itemTemplate } = itemsList.dataset;
        const { dropdownGroupTemplate } = sourceInput.dataset;

        options.forEach((option) => {
            if (option.subOptions) {
                const groupsContainer = doc.createElement('ul');
                const renderedGroup = dropdownGroupTemplate
                    .replace('{{ group_id }}', option.id)
                    .replaceAll('{{ group_name }}', option.name);

                groupsContainer.insertAdjacentHTML('beforeend', renderedGroup);

                const addedGroup = groupsContainer.querySelector('li.ibexa-dropdown__item-group:last-of-type');
                const groupItemsList = addedGroup.querySelector('.ibexa-dropdown__item-group-list');

                option.subOptions.forEach((subOption) => {
                    const itemRendered = itemTemplate.replace('{{ value }}', subOption.id).replaceAll('{{ label }}', subOption.name);

                    groupItemsList.insertAdjacentHTML('beforeend', itemRendered);
                });

                itemsListFragment.append(groupsContainer.querySelector('li.ibexa-dropdown__item-group'));
            } else {
                const itemsContainer = doc.createElement('ul');
                const itemRendered = itemTemplate.replace('{{ value }}', option.id).replaceAll('{{ label }}', option.name);

                itemsContainer.insertAdjacentHTML('beforeend', itemRendered);
                itemsListFragment.append(itemsContainer.querySelector('li'));
            }
        });
        itemsList.append(itemsListFragment);
    };
    const renderSegmentSelect = (itemsContainer, listItem, itemConfig, itemData, segmentationsConfig) => {
        const segmentDropdownContainer = listItem.querySelector('.ibexa-dropdown--segment');
        const segmentSelect = listItem.querySelector('.ibexa-segmentation__select--segment');
        const options = segmentationsConfig.map((segmentationConfig) => {
            return {
                id: segmentationConfig.id,
                name: segmentationConfig.name,
                subOptions:
                    segmentationConfig.segments.map((segment) => ({
                        id: segment.id,
                        name: segment.name,
                    })) || {},
            };
        });

        segmentSelect.addEventListener('change', updateInputValue.bind(this, itemsContainer));

        renderDropdownSourceOptions(segmentDropdownContainer, options);
        renderDropdownListOptions(segmentDropdownContainer, options);

        const optionToSelect = itemData.segment ? itemData.segment.id : itemConfig.segments[0].id;
        const segmentDropdown = new ibexa.core.Dropdown({
            container: segmentDropdownContainer,
        });

        segmentDropdown.init();
        segmentDropdown.selectOption(optionToSelect);
    };

    class SegmentationDraggable extends global.ibexa.core.Draggable {
        constructor(config) {
            super(config);
        }

        onDrop() {
            super.onDrop();

            updateInputValue(this.itemsContainer);
        }
    }

    segmentations.forEach((segmentation) => {
        const itemsContainer = segmentation.querySelector('.ibexa-segmentation__items');
        const draggable = new SegmentationDraggable({
            itemsContainer,
            selectorItem: '.ibexa-segmentation__item',
            selectorPlaceholder: '.ibexa-segmentation__item--placeholder',
        });
        const sourceInput = itemsContainer.closest('.ibexa-data-source').querySelector('.ibexa-data-source__input');
        const inputValue = sourceInput.value ? JSON.parse(sourceInput.value) : [];
        const items = inputValue.length ? inputValue : [{}];
        const segmentationsConfig = JSON.parse(sourceInput.dataset.segments);
        const allSegmentGroupsEmpty = segmentationsConfig.every((group) => group.segments.length === 0);
        const addItemBtn = segmentation.querySelector('.ibexa-btn--add');

        if (!segmentationsConfig.length || allSegmentGroupsEmpty) {
            const noConfigurationMessage = Translator.trans(
                /*@Desc("No segments defined. Create Segments in the Admin panel to use this block.")*/ 'targeted_content_map.no_configuration',
                {},
                'page_builder',
            );
            const item = `<li class="ibexa-segmentation__item ibexa-segmentation__item--no-configuration">${noConfigurationMessage}</li>`;
            const labels = segmentation.querySelector('.ibexa-segmentation__labels');

            itemsContainer.insertAdjacentHTML('beforeend', item);
            addItemBtn.disabled = true;
            labels.classList.add('ibexa-segmentation__labels--hidden');

            return;
        }

        draggable.init();

        items.forEach((item) => renderItem(itemsContainer, draggable, item));
        updateInputValue(itemsContainer);

        if (items.length === 1) {
            const item = segmentation.querySelector('.ibexa-segmentation__item');
            const deleteBtn = item.querySelector('.ibexa-btn--trash');

            deleteBtn.setAttribute('disabled', 'disabled');
        }

        addItemBtn.addEventListener(
            'click',
            () => {
                renderItem(itemsContainer, draggable, {});
                itemsContainer.querySelector('.ibexa-btn--trash').removeAttribute('disabled');
                updateInputValue(itemsContainer);
            },
            false,
        );
    });
})(window, window.document, window.ibexa, window.Translator);
