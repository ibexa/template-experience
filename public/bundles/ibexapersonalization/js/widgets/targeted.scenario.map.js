(function (global, doc, ibexa, Translator) {
    const personalizations = doc.querySelectorAll('.ibexa-personalization');
    const updateInputValue = (itemsContainer) => {
        const inputValue = [...itemsContainer.querySelectorAll('.ibexa-personalization__item')].map((item) => {
            const categorySelect = item.querySelector('.ibexa-personalization__select--category');
            const groupId = categorySelect.value;
            const categoryName = categorySelect.querySelector(`[value="${groupId}"]`).innerHTML;
            const segmentSelect = item.querySelector('.ibexa-personalization__select--segment');
            const segmentId = segmentSelect.value;
            const segmentName = segmentSelect.querySelector(`[value="${segmentId}"]`).innerHTML;
            const scenarioSelect = item.querySelector('.ibexa-personalization__select--scenario');
            const scenarioReferenceCode = scenarioSelect.value;
            const scenarioName = scenarioSelect.querySelector(`[value="${scenarioReferenceCode}"]`).innerHTML;

            return {
                group: { id: parseInt(groupId, 10), name: categoryName },
                segment: { id: parseInt(segmentId, 10), name: segmentName },
                scenario: { referenceCode: scenarioReferenceCode, name: scenarioName },
            };
        });

        itemsContainer.closest('.ibexa-data-source').querySelector('.ibexa-data-source__input').value = JSON.stringify(inputValue);
    };
    const attachEventsToItem = (itemsContainer, listItem) => {
        listItem.querySelector('.ibexa-btn--trash').addEventListener(
            'click',
            () => {
                if (itemsContainer.querySelectorAll('.ibexa-personalization__item').length > 1) {
                    listItem.remove();
                }

                if (itemsContainer.querySelectorAll('.ibexa-personalization__item').length === 1) {
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
    const getScenarioConfig = (itemsContainer) => {
        return JSON.parse(itemsContainer.closest('.ibexa-data-source').querySelector('.ibexa-data-source__input').dataset.scenarioList);
    };
    const renderItem = (itemsContainer, draggable, itemData) => {
        const { template } = itemsContainer.dataset;
        const container = doc.createElement('ol');
        const segmentationsConfig = getSegmentationsConfig(itemsContainer);
        const itemConfig = segmentationsConfig.find((category) => category.id === itemData.group?.id) ?? segmentationsConfig[0];

        container.insertAdjacentHTML('beforeend', template);

        const listItem = container.querySelector('.ibexa-personalization__item');

        renderCategorySelect(itemsContainer, listItem, segmentationsConfig, itemConfig);
        renderSegmentSelect(itemsContainer, listItem, itemConfig, itemData);
        renderScenarioSelect(itemsContainer, listItem, getScenarioConfig(itemsContainer), itemData);

        attachEventsToItem(itemsContainer, listItem, draggable);

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
        const categorySelect = listItem.querySelector('.ibexa-personalization__select--category');

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
        const segmentSelect = listItem.querySelector('.ibexa-personalization__select--segment');

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
    const renderScenarioSelect = (itemsContainer, listItem, config, itemData) => {
        const scenarioDropdownContainer = listItem.querySelector('.ibexa-dropdown--scenario');
        const scenarioSelect = listItem.querySelector('.ibexa-personalization__select--scenario');
        const options = config.map((scenario) => ({ id: scenario.referenceCode, name: scenario.title }));

        scenarioSelect.addEventListener('change', updateInputValue.bind(this, itemsContainer));

        renderDropdownSourceOptions(scenarioDropdownContainer, options);
        renderDropdownListOptions(scenarioDropdownContainer, options);

        const optionToSelect = itemData.scenario ? itemData.scenario.referenceCode : config[0].referenceCode;
        const scenarioDropdown = new ibexa.core.Dropdown({
            container: scenarioDropdownContainer,
        });

        scenarioDropdown.init();
        scenarioDropdown.selectOption(optionToSelect);
    };

    class PersonalizationDraggable extends global.ibexa.core.Draggable {
        onDrop() {
            super.onDrop();

            updateInputValue(this.itemsContainer);
        }
    }

    personalizations.forEach((personalization) => {
        const itemsContainer = personalization.querySelector('.ibexa-personalization__items');
        const draggable = new PersonalizationDraggable({
            itemsContainer,
            selectorItem: '.ibexa-personalization__item',
            selectorPlaceholder: '.ibexa-personalization__item--placeholder',
        });
        const sourceInput = itemsContainer.closest('.ibexa-data-source').querySelector('.ibexa-data-source__input');
        const inputValue = sourceInput.value ? JSON.parse(sourceInput.value) : [];
        const items = inputValue.length ? inputValue : [{}];
        const segmentationsConfig = JSON.parse(sourceInput.dataset.segments);
        const allSegmentGroupsEmpty = segmentationsConfig.every((group) => group.segments.length === 0);
        const addItemBtn = personalization.querySelector('.ibexa-btn--add');

        if (!segmentationsConfig.length || allSegmentGroupsEmpty) {
            const noConfigurationMessage = Translator.trans(
                /*@Desc("No segments defined. Create Segments in the Admin panel to use this block.")*/ 'targeted_scenario_map.no_configuration',
                {},
                'ibexa_personalization',
            );
            const item = `<li class="ibexa-personalization__item ibexa-personalization__item--no-configuration">${noConfigurationMessage}</li>`;
            const labels = personalization.querySelector('.ibexa-personalization__labels');

            itemsContainer.insertAdjacentHTML('beforeend', item);
            addItemBtn.disabled = true;
            labels.classList.add('ibexa-personalization__labels--hidden');

            return;
        }

        draggable.init();

        items.forEach((item) => renderItem(itemsContainer, draggable, item));
        updateInputValue(itemsContainer);

        if (items.length === 1) {
            const item = personalization.querySelector('.ibexa-personalization__item');
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
