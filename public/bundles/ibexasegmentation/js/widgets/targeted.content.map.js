(function (global, doc, ibexa, Translator) {
    const segmentations = doc.querySelectorAll('.ibexa-segmentation');
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const updateInputValue = (itemsContainer) => {
        const inputValue = [...itemsContainer.querySelectorAll('.ibexa-segmentation__item')].map((item) => {
            const categorySelect = item.querySelector('.ibexa-segmentation__select--category');
            const groupId = categorySelect.value;
            const categoryName = categorySelect.querySelector(`[value="${groupId}"]`).innerHTML;
            const segmentSelect = item.querySelector('.ibexa-segmentation__select--segment');
            const segmentId = segmentSelect.value;
            const segmentName = segmentSelect.querySelector(`[value="${segmentId}"]`).innerHTML;
            const contentTitle = item.querySelector('.ibexa-segmentation__content-title');
            const { locationId } = contentTitle.dataset;
            const locationName = contentTitle.innerHTML;
            const locationBreadcrumbs = item.querySelector('.ibexa-segmentation__content-breadcrumbs').innerHTML;

            return {
                group: { id: parseInt(groupId, 10), name: categoryName },
                segment: { id: parseInt(segmentId, 10), name: segmentName },
                content: { locationId: parseInt(locationId, 10), name: locationName, breadcrumbs: locationBreadcrumbs },
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
        const contentTitle = contentInfoWrapper.querySelector('.ibexa-segmentation__content-title');

        openUdwButton.setAttribute('hidden', 'hidden');

        contentTitle.innerHTML = selectedContent.ContentInfo.Content.TranslatedName;
        contentTitle.dataset.locationId = selectedContent.id;

        findLocationsByIdList(removeRootFromPathString(selectedContent.pathString), (locations) => {
            const breadcrumbs = locations.map((location) => location.value.Location.ContentInfo.Content.TranslatedName).join(' / ');

            contentInfoWrapper.querySelector('.ibexa-segmentation__content-breadcrumbs').innerHTML = breadcrumbs || '&nbsp;';

            updateInputValue(itemsContainer);
        });

        contentInfoWrapper.classList.remove('ibexa-segmentation__content-info--hidden');
    };
    const attachEventsToItem = (itemsContainer, listItem, openUdwButton) => {
        listItem.querySelector('.ibexa-btn--remove-content').addEventListener(
            'click',
            () => {
                const contentTitle = listItem.querySelector('.ibexa-segmentation__content-title');

                openUdwButton.removeAttribute('hidden');
                listItem.querySelector('.ibexa-segmentation__content-info').classList.add('ibexa-segmentation__content-info--hidden');

                contentTitle.dataset.locationId = '';
                contentTitle.innerHTML = '';
                listItem.querySelector('.ibexa-segmentation__content-breadcrumbs').innerHTML = '';

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

        renderCategorySelect(itemsContainer, listItem, segmentationsConfig, itemConfig);
        renderSegmentSelect(itemsContainer, listItem, itemConfig, itemData);

        if (itemData.content && itemData.content.locationId) {
            const contentInfoWrapper = openUdwButton
                .closest('.ibexa-segmentation__content-wrapper')
                .querySelector('.ibexa-segmentation__content-info');
            const contentTitle = contentInfoWrapper.querySelector('.ibexa-segmentation__content-title');

            openUdwButton.setAttribute('hidden', 'hidden');

            contentTitle.innerHTML = itemData.content.name;
            contentTitle.dataset.locationId = itemData.content.locationId;
            contentInfoWrapper.querySelector('.ibexa-segmentation__content-breadcrumbs').innerHTML = itemData.content.breadcrumbs;
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
            const optionsContainer = doc.createElement('select');
            const optionRendered = optionTemplate.replace('{{ value }}', option.id).replace('{{ label }}', option.name);

            optionsContainer.insertAdjacentHTML('beforeend', optionRendered);

            selectOptionsFragment.append(optionsContainer.querySelector('option'));
        });

        sourceInput.innerHTML = '';
        sourceInput.append(selectOptionsFragment);
    };
    const renderDropdownListOptions = (dropdownContainer, options) => {
        const itemsList = dropdownContainer.querySelector('.ibexa-dropdown__items-list');
        const { template: itemTemplate } = itemsList.dataset;
        const itemsListFragment = doc.createDocumentFragment();

        options.forEach((option) => {
            const itemsContainer = doc.createElement('ul');
            const itemRendered = itemTemplate.replace('{{ value }}', option.id).replaceAll('{{ label }}', option.name);

            itemsContainer.insertAdjacentHTML('beforeend', itemRendered);

            itemsListFragment.append(itemsContainer.querySelector('li'));
        });

        itemsList.append(itemsListFragment);
    };
    const renderCategorySelect = (itemsContainer, listItem, config, itemConfig) => {
        const categoryDropdownContainer = listItem.querySelector('.ibexa-dropdown--category');
        const segmentDropdownContainer = listItem.querySelector('.ibexa-dropdown--segment');
        const categorySelect = listItem.querySelector('.ibexa-segmentation__select--category');

        renderDropdownSourceOptions(categoryDropdownContainer, config);
        renderDropdownListOptions(categoryDropdownContainer, config);

        const optionToSelect = itemConfig.id;
        const categoryDropdown = new ibexa.core.Dropdown({
            container: categoryDropdownContainer,
        });

        categoryDropdown.init();
        categoryDropdown.selectOption(optionToSelect);

        categorySelect.addEventListener('change', (event) => {
            const categoryConfig = config.find((category) => category.id === parseInt(event.currentTarget.value, 10));

            renderDropdownSourceOptions(segmentDropdownContainer, categoryConfig.segments);
            updateInputValue(itemsContainer);
        });
    };
    const renderSegmentSelect = (itemsContainer, listItem, itemConfig, itemData) => {
        const segmentDropdownContainer = listItem.querySelector('.ibexa-dropdown--segment');
        const segmentSelect = listItem.querySelector('.ibexa-segmentation__select--segment');

        segmentSelect.addEventListener('change', updateInputValue.bind(this, itemsContainer));

        renderDropdownSourceOptions(segmentDropdownContainer, itemConfig.segments);
        renderDropdownListOptions(segmentDropdownContainer, itemConfig.segments);

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
