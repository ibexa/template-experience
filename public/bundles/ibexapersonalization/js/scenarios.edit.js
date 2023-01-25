import { CategoryPathSelect } from './core/category.path.select';

(function (doc, ibexa, bootstrap) {
    let activeSettingsState = {
        selectedRadioName: null,
        includeParentChecked: false,
        levelsValue: null,
        categoryLevelsValue: null,
    };
    let activeModal = null;
    let sourceDraggedModel = '';
    const TIMEOUT_REMOVE_HIGHLIGHT = 3000;
    const SELECTOR_SETTINGS_RADIO = '.ibexa-input--radio';
    const SELECTOR_SETTINGS_INCLUDE_PARENT = '.ibexa-modal__input--include-parent';
    const SELECTOR_SETTINGS_LEVELS = '.ibexa-modal__input--levels';
    const SELECTOR_SETTINGS_CATEGORY_LEVELS = '.ibexa-modal__input--category-levels';
    const modalRadioInputs = doc.querySelectorAll('.ibexa-modal .ibexa-input--radio');
    const dropPlaceholders = doc.querySelectorAll('.ibexa-perso-scenario-strategy-placeholder');
    const draggedModels = doc.querySelectorAll('.ibexa-perso-strategy-sidebar-item, .ibexa-perso-strategy-model');
    const actionCheckboxes = doc.querySelectorAll('.ibexa-perso-scenario-edit__checkbox--with-subfields .ibexa-input--checkbox');
    const categoryPathCheckbox = doc.querySelector('.ibexa-perso-scenario-edit__checkbox--with-category-path .ibexa-input--checkbox');
    const openModalBtns = doc.querySelectorAll('.ibexa-perso-strategy-models__open-modal-button');
    const discardSettingsBtns = doc.querySelectorAll('.ibexa-modal__discard-settings-button');
    const removeStrategyModelBtns = doc.querySelectorAll('.ibexa-perso-scenario-strategy-edit__remove-model-button');
    const filterFieldInput = doc.querySelector('.ibexa-perso-strategy-sidebar__search-bar .ibexa-input');
    const categoryPathSelectContainer = doc.querySelector('.ibexa-perso-category-path-select');
    const form = doc.querySelector('.ibexa-scenario-edit-form');
    const submitBtns = form.querySelectorAll('[type="submit"]:not([formnovalidate])');
    let categoryPathSelect = null;
    const dataTypeDropdownsMap = new Map();
    const contextDropdownsMap = new Map();
    const dataTypeDropdownsContainers = doc.querySelectorAll(
        '.ibexa-perso-strategy-model__select-submodels-container .ibexa-dropdown--custom-init',
    );
    const contextDropdownsContainers = doc.querySelectorAll(
        '.ibexa-perso-strategy-model__select-context-container .ibexa-dropdown--custom-init',
    );
    const prerenderedStrategyModels = doc.querySelectorAll('.ibexa-perso-strategy-model:not(.ibexa-perso-strategy-model--hidden)');
    const initializeDropdown = (dropdownContainer, dropdownsMap) => {
        const dropdown = new ibexa.core.Dropdown({
            container: dropdownContainer,
        });

        dropdown.init();
        dropdownsMap.set(dropdownContainer, dropdown);
    };
    const initializeDataTypeDropdown = (dropdownContainer) => {
        initializeDropdown(dropdownContainer, dataTypeDropdownsMap);
    };
    const initializeContextDropdown = (dropdownContainer) => {
        initializeDropdown(dropdownContainer, contextDropdownsMap);
    };
    const adjustDataTypeDropdownSelection = (dropdownContainer, allowedValues, optionToSelect = null, forceNoSelect = false) => {
        const dropdown = dataTypeDropdownsMap.get(dropdownContainer);
        const allItems = dropdown.itemsListContainer.querySelectorAll('[data-value]');

        if (!forceNoSelect) {
            if (optionToSelect) {
                dropdown.selectOption(optionToSelect);
            } else {
                dropdown.selectFirstOption();
            }
        }

        allItems.forEach((item) => {
            const shouldBeVisible = !allowedValues || allowedValues.includes(item.dataset.value);

            item.classList.toggle('ibexa-dropdown__item--hidden', !shouldBeVisible);
        });
    };
    const adjustDataTypeDropdownVisibility = (dropdownContainer, allowedValues) => {
        const submodelsContainer = dropdownContainer.closest('.ibexa-perso-strategy-model__select-submodels-container');
        const hasOnlyOneOption = allowedValues?.length === 1;

        submodelsContainer.classList.toggle('d-none', hasOnlyOneOption);
    };
    const adjustContextDropdownSelection = (dropdownContainer, optionToSelect) => {
        const dropdown = contextDropdownsMap.get(dropdownContainer);

        if (optionToSelect) {
            dropdown.selectOption(optionToSelect);
        } else {
            dropdown.selectFirstOption();
        }
    };
    const removeErrorMessages = (strategyContainer) => {
        const errorMessages = strategyContainer.querySelectorAll('.ibexa-form-error');

        errorMessages.forEach((errorMessage) => errorMessage.remove());
    };
    const getStrategyAllowedValues = (strategyElement) => JSON.parse(strategyElement.dataset.dataTypeSupportedValues);
    const onCheckboxChangeValue = (event) => {
        const { checked, dataset } = event.currentTarget;
        const container = event.currentTarget.closest('.ibexa-perso-scenario-edit__checkbox--with-subfields');
        const inputs = container.querySelectorAll('.ibexa-perso-scenario-edit__checkbox-input');

        if (dataset.relatedId) {
            doc.querySelectorAll(`[data-related="${dataset.relatedId}"]`).forEach((relatedCheckbox) => {
                relatedCheckbox.disabled = !checked;

                if (!checked) {
                    relatedCheckbox.checked = false;
                }
            });
        }

        inputs.forEach((input) => {
            input.disabled = !checked;
        });
    };
    const discardSettings = () => {
        const radioNode = activeModal.querySelector(`[name="${activeSettingsState.selectedRadioName}"]`);
        const includeParentCheckbox = activeModal.querySelector(SELECTOR_SETTINGS_INCLUDE_PARENT);
        const levelsInput = activeModal.querySelector(SELECTOR_SETTINGS_LEVELS);
        const categoryLevelsInput = activeModal.querySelector(SELECTOR_SETTINGS_CATEGORY_LEVELS);

        radioNode.click();

        if (includeParentCheckbox.checked !== activeSettingsState.includeParentChecked) {
            includeParentCheckbox.click();
        }

        levelsInput.value = activeSettingsState.levelsValue;
        categoryLevelsInput.value = activeSettingsState.categoryLevelsValue;
    };
    const saveSettingsState = () => {
        if (activeModal) {
            const radioNode = activeModal.querySelector(`${SELECTOR_SETTINGS_RADIO}:checked`);
            const includeParentCheckbox = activeModal.querySelector(SELECTOR_SETTINGS_INCLUDE_PARENT);
            const levelsInput = activeModal.querySelector(SELECTOR_SETTINGS_LEVELS);
            const categoryLevelsInput = activeModal.querySelector(SELECTOR_SETTINGS_CATEGORY_LEVELS);

            activeSettingsState = {
                selectedRadioName: radioNode ? radioNode.name : null,
                includeParentChecked: includeParentCheckbox.checked,
                levelsValue: levelsInput.value,
                categoryLevelsValue: categoryLevelsInput.value,
            };
        }
    };
    const openModal = (event) => {
        const { strategyModalSelector } = event.currentTarget.dataset;

        activeModal = doc.querySelector(strategyModalSelector);

        saveSettingsState();

        bootstrap.Modal.getOrCreateInstance(strategyModalSelector).show();
    };
    const toggleStrategyPlaceholder = (strategyModel, isModelPresent) => {
        const placeholder = strategyModel.nextElementSibling;

        strategyModel.classList.toggle('ibexa-perso-strategy-model--hidden', !isModelPresent);
        placeholder.classList.toggle('ibexa-perso-scenario-strategy-placeholder--hidden', isModelPresent);
        placeholder.classList.toggle('ibexa-perso-scenario-strategy-placeholder--anchored', !isModelPresent);
    };
    const removeStrategyModel = (event) => {
        const container = event.currentTarget.closest('.ibexa-perso-strategy-model');
        const iconContainer = container.querySelector('.ibexa-perso-strategy-model__icon');
        const toggleStrategyPlaceholderAfterRemove = () => {
            container.classList.remove('ibexa-perso-strategy-model--removed');
            container.removeEventListener('animationend', toggleStrategyPlaceholderAfterRemove, false);
            toggleStrategyPlaceholder(container, false);
        };

        iconContainer.classList.add('d-none');

        setContainerData({
            container,
            showSettings: false,
        });
        removeErrorMessages(container);

        container.classList.add('ibexa-perso-strategy-model--removed');
        container.addEventListener('animationend', toggleStrategyPlaceholderAfterRemove, false);
    };
    const setContainerData = ({
        container,
        dataset = {},
        showSettings,
        dataTypeOptionToSelect = null,
        contextOptionToSelect = null,
        dataTypeAllowedValues = null,
    }) => {
        const contextSelectContainer = container.querySelector('.ibexa-perso-strategy-model__select-context-container');
        const settingsMethod = showSettings ? 'remove' : 'add';
        const dataTypeDropdownContainer = container.querySelector(
            '.ibexa-perso-strategy-model__select-submodels-container .ibexa-dropdown',
        );
        const contextDropdownContainer = container.querySelector('.ibexa-perso-strategy-model__select-context-container .ibexa-dropdown');

        container.dataset.modelName = dataset.modelName || '';
        container.dataset.referenceCode = dataset.referenceCode || '';
        container.dataset.dataTypeSupportedValues = dataset.dataTypeSupportedValues || '';
        container.dataset.websiteContextSupported = dataset.websiteContextSupported || '';
        container.querySelector('.ibexa-perso-strategy-model__name').innerHTML = dataset.modelName || '';
        container.querySelector('.ibexa-perso-strategy-model__reference-code-input').setAttribute('value', dataset.referenceCode || '');
        container.querySelector('.ibexa-perso-strategy-model__settings').classList[settingsMethod]('d-none');
        contextSelectContainer.classList.toggle('d-none', dataset.websiteContextSupported !== '1');
        adjustDataTypeDropdownSelection(dataTypeDropdownContainer, dataTypeAllowedValues, dataTypeOptionToSelect);
        adjustDataTypeDropdownVisibility(dataTypeDropdownContainer, dataTypeAllowedValues);
        adjustContextDropdownSelection(contextDropdownContainer, contextOptionToSelect);
    };
    const onDragOver = (event) => {
        const placeholder = event.currentTarget;

        placeholder.classList.remove('ibexa-perso-scenario-strategy-placeholder--anchored');

        event.preventDefault();
    };
    const onDropModel = (event) => {
        const placeholder = event.currentTarget;
        const container = placeholder.previousElementSibling;
        const { type, modelName } = sourceDraggedModel.dataset;
        const referenceCodeInput = container.querySelector('.ibexa-perso-strategy-model__reference-code-input');

        if (modelName) {
            if (!referenceCodeInput.value) {
                const sourceDragIconContainer = sourceDraggedModel.querySelector('.ibexa-perso-strategy-model__icon');
                const targetDragIconContainer = container.querySelector('.ibexa-perso-strategy-model__icon');

                if (sourceDragIconContainer) {
                    sourceDragIconContainer.classList.add('d-none');
                }

                container.classList.add('ibexa-perso-strategy-model--highlighted');
                targetDragIconContainer.classList.remove('d-none');

                const dataTypeSelect = sourceDraggedModel.querySelector(
                    '.ibexa-perso-strategy-model__select-submodels-container .ibexa-input--select',
                );
                const contextSelect = sourceDraggedModel.querySelector(
                    '.ibexa-perso-strategy-model__select-context-container .ibexa-input--select',
                );
                const dataTypeSelectedOption = dataTypeSelect?.options[dataTypeSelect.selectedIndex].value ?? null;
                const contextSelectedOption = contextSelect?.options[contextSelect.selectedIndex].value ?? null;

                setContainerData({
                    container,
                    dataset: sourceDraggedModel.dataset,
                    showSettings: true,
                    dataTypeOptionToSelect: dataTypeSelectedOption,
                    contextOptionToSelect: contextSelectedOption,
                    dataTypeAllowedValues: getStrategyAllowedValues(sourceDraggedModel),
                });
                toggleStrategyPlaceholder(container, true);

                if (type === 'existing') {
                    setContainerData({
                        container: sourceDraggedModel,
                        showSettings: false,
                    });
                    toggleStrategyPlaceholder(sourceDraggedModel, false);
                    removeErrorMessages(sourceDraggedModel);
                }

                setTimeout(() => {
                    container.classList.remove('ibexa-perso-strategy-model--highlighted');
                }, TIMEOUT_REMOVE_HIGHLIGHT);
            } else {
                container.classList.add('ibexa-perso-strategy-model--is-error');

                setTimeout(() => {
                    container.classList.remove('ibexa-perso-strategy-model--is-error');
                }, TIMEOUT_REMOVE_HIGHLIGHT);
            }
        }
    };
    const onDragStart = (event) => {
        sourceDraggedModel = event.currentTarget;
    };
    const onRadioClick = (event) => {
        const radiosContainer = event.currentTarget.closest('.ibexa-modal__inputs');

        radiosContainer.querySelectorAll('.ibexa-input--radio').forEach((radio) => {
            const radioRow = radio.closest('.ibexa-modal__row-input');
            const radioSubRows = radioRow.querySelectorAll('.ibexa-modal__sub-row-input');

            if (!radio.isEqualNode(event.currentTarget)) {
                radio.checked = false;

                radioSubRows.forEach((row) => {
                    row.classList.add('ibexa-modal__sub-row-input--inactive');
                });
            } else {
                radioSubRows.forEach((row) => {
                    row.classList.remove('ibexa-modal__sub-row-input--inactive');
                });
            }
        });
    };
    const onSubmitClick = (event) => {
        const isFormValid = form.reportValidity();

        if (!isFormValid) {
            event.preventDefault();
        }
    };
    const searchField = (event) => {
        const fieldFilterQueryLowerCase = event.currentTarget.value.toLowerCase();
        const sidebarFields = doc.querySelectorAll('.ibexa-perso-strategy-sidebar__list .ibexa-perso-strategy-sidebar-item');

        sidebarFields.forEach((field) => {
            const fieldNameNode = field.querySelector('.ibexa-perso-strategy-sidebar-item__label');
            const fieldNameLowerCase = fieldNameNode.innerText.toLowerCase();
            const isFieldHidden = !fieldNameLowerCase.includes(fieldFilterQueryLowerCase);

            field.classList.toggle('ibexa-perso-strategy-sidebar-item--hidden', isFieldHidden);
        });
    };

    if (categoryPathSelectContainer) {
        const hiddenInputsContainer = doc.querySelector('.ibexa-perso-scenario-edit__category-path-inputs');
        const hiddenInputTemplate = hiddenInputsContainer.dataset.inputTemplate;
        const hiddenInputs = hiddenInputsContainer.querySelectorAll('.ibexa-input-text-wrapper');
        let newInputIndex = hiddenInputs.length;

        categoryPathSelect = new CategoryPathSelect({
            container: categoryPathSelectContainer,
            onAdd: (value) => {
                const renderedTemplate = hiddenInputTemplate.replaceAll('__name__', newInputIndex);

                hiddenInputsContainer.insertAdjacentHTML('beforeend', renderedTemplate);
                newInputIndex += 1;

                const newHiddenInput = hiddenInputsContainer.querySelector('.ibexa-input-text-wrapper:last-of-type .ibexa-input');

                newHiddenInput.value = value;
                newHiddenInput.dataset.value = value;
            },
            onRemove: (value) => {
                const hiddenInput = hiddenInputsContainer.querySelector(`.ibexa-input[data-value="${value}"]`);
                const hiddenInputWrapper = hiddenInput.closest('.ibexa-input-text-wrapper');

                hiddenInputWrapper.remove();
            },
        });

        categoryPathSelect.init();
    }

    openModalBtns.forEach((button) => {
        button.addEventListener('click', openModal, false);
    });

    discardSettingsBtns.forEach((button) => {
        button.addEventListener('click', discardSettings, false);
    }, false);

    modalRadioInputs.forEach((radio) => {
        radio.addEventListener('click', onRadioClick, false);
    });

    draggedModels.forEach((model) => {
        model.addEventListener('dragstart', onDragStart, false);
    });

    removeStrategyModelBtns.forEach((button) => {
        button.addEventListener('click', removeStrategyModel, false);
    });

    actionCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', onCheckboxChangeValue, false);
    });

    if (categoryPathCheckbox) {
        const updateSelectState = () => {
            categoryPathSelect.toggleDisabled(!categoryPathCheckbox.checked);
        };

        updateSelectState();
        categoryPathCheckbox.addEventListener('change', updateSelectState, false);
    }

    dropPlaceholders.forEach((container) => {
        container.addEventListener('drop', onDropModel, false);
        container.addEventListener('dragover', onDragOver, false);
    });

    doc.body.addEventListener('dragover', (event) => {
        const isTargetPlaceholder = !!event.target.closest('.ibexa-perso-scenario-strategy-placeholder');

        if (!isTargetPlaceholder) {
            const activePlaceholder = doc.querySelector(
                '.ibexa-perso-scenario-strategy-placeholder:not(.ibexa-perso-scenario-strategy-placeholder--anchored',
            );

            if (activePlaceholder) {
                activePlaceholder.classList.add('ibexa-perso-scenario-strategy-placeholder--anchored');
            }
        }
    });

    submitBtns.forEach((btn) => {
        btn.dataset.isFormValid = 0;
        btn.addEventListener('click', onSubmitClick, false);
    });

    dataTypeDropdownsContainers.forEach(initializeDataTypeDropdown);
    contextDropdownsContainers.forEach(initializeContextDropdown);
    prerenderedStrategyModels.forEach((strategyContainer) => {
        const dataTypeDropdownContainer = strategyContainer.querySelector(
            '.ibexa-perso-strategy-model__select-submodels-container .ibexa-dropdown',
        );
        const dataTypeAllowedValues = getStrategyAllowedValues(strategyContainer);

        adjustDataTypeDropdownSelection(dataTypeDropdownContainer, dataTypeAllowedValues, null, true);
        adjustDataTypeDropdownVisibility(dataTypeDropdownContainer, dataTypeAllowedValues);
    });

    filterFieldInput.addEventListener('keyup', searchField, false);
})(window.document, window.ibexa, window.bootstrap);
