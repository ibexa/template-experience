(function (global, doc, ibexa, Translator) {
    const personalizations = doc.querySelectorAll('.ibexa-personalization');
    const updateInputValue = (itemsContainer) => {
        const inputValue = [...itemsContainer.querySelectorAll('.ibexa-personalization__item')].map((item) => {
            const segmentSelect = item.querySelector('.ibexa-personalization__select--segment');
            const segmentId = segmentSelect.value;
            const segmentOption = segmentSelect.querySelector(`[value="${segmentId}"]`);
            const segmentName = segmentOption.innerHTML.replace(/\s/g, '');
            const { groupId, groupName } = segmentOption.dataset;
            const scenarioSelect = item.querySelector('.ibexa-personalization__select--scenario');
            const scenarioReferenceCode = scenarioSelect.value;
            const scenarioName = scenarioSelect.querySelector(`[value="${scenarioReferenceCode}"]`).innerHTML;
            const outputTypeSelect = item.querySelector('.ibexa-personalization__select--output-type');
            const outputTypeValue = outputTypeSelect.value;
            const outputTypeOption = outputTypeSelect.querySelector(`[value="${outputTypeValue}"]`);

            return {
                group: { id: parseInt(groupId, 10), name: groupName },
                segment: { id: parseInt(segmentId, 10), name: segmentName },
                scenario: { referenceCode: scenarioReferenceCode, name: scenarioName },
                outputType: JSON.parse(outputTypeOption.dataset.outputType),
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
    const attachEventsToItemInputs = (itemsContainer, listItem) => {
        const segmentsSelect = listItem.querySelector('.ibexa-personalization__select--segment');
        const scenariosSelect = listItem.querySelector('.ibexa-personalization__select--scenario');
        const outputTypesSelect = listItem.querySelector('.ibexa-personalization__select--output-type');

        segmentsSelect.addEventListener('change', updateInputValue.bind(this, itemsContainer), false);
        outputTypesSelect.addEventListener('change', updateInputValue.bind(this, itemsContainer), false);
        scenariosSelect.addEventListener(
            'change',
            (event) => {
                const scenarioValue = event.currentTarget.value;
                const scenariosConfig = getScenariosConfig(itemsContainer);
                const outputTypesConfig = getOutputTypesConfig(itemsContainer);
                const outputTypeDropdownContainer = listItem.querySelector('.ibexa-dropdown--output-type');
                const outputTypesOptions = getOutputTypeOptions(outputTypesConfig, scenariosConfig, scenarioValue);

                renderDropdownSourceOptions(outputTypeDropdownContainer, outputTypesOptions);

                const outputTypeDropdown = ibexa.helpers.objectInstances.getInstance(outputTypeDropdownContainer);

                outputTypeDropdown.recreateOptions();
                outputTypeDropdown.selectOption(outputTypesOptions[0]?.id);
                updateInputValue(itemsContainer);
            },
            false,
        );
    };
    const getSegmentationsConfig = (itemsContainer) => {
        const sourceInput = itemsContainer.closest('.ibexa-data-source').querySelector('.ibexa-data-source__input');
        const segmentationsConfig = JSON.parse(sourceInput.dataset.segments);

        return segmentationsConfig.filter((group) => group.segments.length);
    };
    const getScenariosConfig = (itemsContainer) => {
        const sourceInput = itemsContainer.closest('.ibexa-data-source').querySelector('.ibexa-data-source__input');

        return JSON.parse(sourceInput.dataset.scenarioList);
    };
    const getOutputTypesConfig = (itemsContainer) => {
        const sourceInput = itemsContainer.closest('.ibexa-data-source').querySelector('.ibexa-data-source__input');

        return JSON.parse(sourceInput.dataset.outputTypeList);
    };
    const getOutputTypeOptions = (outputTypesConfig, scenariosConfig, scenarioValue) => {
        const selectedScenarioConfig = scenariosConfig.find((scenarioConfig) => scenarioConfig.referenceCode === scenarioValue);
        const filteredOutputTypesConfig = outputTypesConfig.filter((outputTypeConfig) =>
            selectedScenarioConfig.supportedOutputTypes.includes(outputTypeConfig.description),
        );

        if (!filteredOutputTypesConfig) {
            return [];
        }

        const options = filteredOutputTypesConfig.map((outputType, index) => ({
            id: index,
            name: `${outputType.description} ${outputType.id ? `(${outputType.id})` : ''}`,
            extraDatasets: [
                {
                    name: 'outputType',
                    value: JSON.stringify(outputType),
                },
            ],
        }));

        return options;
    };
    const renderItem = (itemsContainer, draggable, itemData) => {
        const { template } = itemsContainer.dataset;
        const container = doc.createElement('ol');
        const segmentationsConfig = getSegmentationsConfig(itemsContainer);
        const itemConfig = segmentationsConfig.find((category) => category.id === itemData.group?.id) ?? segmentationsConfig[0];

        container.insertAdjacentHTML('beforeend', template);

        const listItem = container.querySelector('.ibexa-personalization__item');

        renderSegmentSelect(itemsContainer, listItem, itemConfig, itemData, segmentationsConfig);
        renderScenarioSelect(itemsContainer, listItem, getScenariosConfig(itemsContainer), itemData);
        renderOutputTypeSelect(itemsContainer, listItem, getOutputTypesConfig(itemsContainer), itemData);
        attachEventsToItem(itemsContainer, listItem);
        attachEventsToItemInputs(itemsContainer, listItem);

        itemsContainer.append(listItem);

        draggable.reinit();
    };
    const createSourceOption = ({ optionTemplate, groupId, groupName, value, label, extraDatasets }) => {
        const optionsContainer = doc.createElement('select');
        const optionRendered = optionTemplate
            .replace('{{ group_id }}', groupId)
            .replace('{{ group_name }}', groupName)
            .replace('{{ value }}', value)
            .replace('{{ label }}', label);

        optionsContainer.insertAdjacentHTML('beforeend', optionRendered);

        const createdOption = optionsContainer.querySelector('option');

        extraDatasets.forEach((extraDataset) => {
            createdOption.dataset[extraDataset.name] = extraDataset.value;
        });

        return createdOption;
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
                    selectOptionsFragment.append(
                        createSourceOption({
                            optionTemplate,
                            groupId,
                            groupName,
                            value: subOption.id,
                            label: subOption.name,
                            extraDatasets: subOption.extraDatasets || [],
                        }),
                    );
                });
            } else {
                selectOptionsFragment.append(
                    createSourceOption({
                        optionTemplate,
                        groupId: '',
                        groupName: '',
                        value: option.id,
                        label: option.name,
                        extraDatasets: option.extraDatasets || [],
                    }),
                );
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

        itemsList.innerHTML = '';

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
        const optionToSelect = itemData.segment ? itemData.segment.id : itemConfig.segments[0].id;
        const segmentDropdown = new ibexa.core.Dropdown({
            container: segmentDropdownContainer,
        });

        renderDropdownSourceOptions(segmentDropdownContainer, options);
        renderDropdownListOptions(segmentDropdownContainer, options);

        segmentDropdown.init();
        segmentDropdown.selectOption(optionToSelect);
    };
    const renderScenarioSelect = (itemsContainer, listItem, config, itemData) => {
        const scenarioDropdownContainer = listItem.querySelector('.ibexa-dropdown--scenario');
        const options = config.map((scenario) => ({ id: scenario.referenceCode, name: scenario.title }));
        const optionToSelect = itemData.scenario ? itemData.scenario.referenceCode : config[0].referenceCode;
        const scenarioDropdown = new ibexa.core.Dropdown({
            container: scenarioDropdownContainer,
        });

        renderDropdownSourceOptions(scenarioDropdownContainer, options);
        renderDropdownListOptions(scenarioDropdownContainer, options);

        scenarioDropdown.init();
        scenarioDropdown.selectOption(optionToSelect);
    };
    const renderOutputTypeSelect = (itemsContainer, listItem, config, itemData) => {
        const scenarioSelect = listItem.querySelector('.ibexa-personalization__select--scenario');
        const outputTypeDropdownContainer = listItem.querySelector('.ibexa-dropdown--output-type');
        const options = getOutputTypeOptions(config, getScenariosConfig(itemsContainer), scenarioSelect.value);
        const outputType = itemData.outputType || {};
        const selectedOutputTypeLabel = outputType ? `${outputType.description} ${outputType.id ? `(${outputType.id})` : ''}` : '';
        const optionToSelect = options.find((option) => option.name === selectedOutputTypeLabel);
        const outputTypeDropdown = new ibexa.core.Dropdown({
            container: outputTypeDropdownContainer,
        });

        renderDropdownSourceOptions(outputTypeDropdownContainer, options);
        renderDropdownListOptions(outputTypeDropdownContainer, options);

        outputTypeDropdown.init();

        if (!options.length) {
            return;
        }

        outputTypeDropdown.selectOption(optionToSelect?.id ?? options[0].id);
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
