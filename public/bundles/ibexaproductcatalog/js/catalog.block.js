(function (global, doc, ibexa) {
    const container = doc.querySelector('.ibexa-catalog-block-options');
    const addOptionBtn = container.querySelector('.ibexa-catalog-block-options__add-btn');
    const removeOptionsBtn = container.querySelector('.ibexa-catalog-block-options__remove-btn');
    const optionsContainer = container.querySelector('.ibexa-catalog-block-options__list');
    const optionsList = optionsContainer.querySelector('#block_configuration_attributes_catalog_map_value_matches');
    const optionsNodes = container.querySelectorAll('.ibexa-catalog-block-options__option');
    const OPTIONS_LIST_HEADERS_HIDDEN_CLASS = 'ibexa-catalog-block-options__list-labels--hidden';
    const INIT_OPTIONS_LIST_LENGTH = 0;
    const FIRST_OPTION_ID = 0;
    const dropdownsInit = (templateId, nextId) => {
        const option = container.querySelector(`#${templateId}_${nextId}`);
        const dropdowns = option.querySelectorAll('.ibexa-dropdown');

        dropdowns.forEach((dropdownContainer) => {
            const dropdown = new ibexa.core.Dropdown({
                container: dropdownContainer,
            });

            dropdown.init();
        });
    };
    const addOption = () => {
        const nextId = parseInt(optionsContainer.dataset.nextOptionId, 10) ?? FIRST_OPTION_ID;
        const { optionTemplate, templateId } = optionsContainer.dataset;
        const filledOptionTemplate = optionTemplate.replaceAll('__name__', nextId);

        optionsContainer.dataset.nextOptionId = nextId + 1;
        optionsList.insertAdjacentHTML('beforeend', filledOptionTemplate);
        attachListenersToOption(optionsList.lastElementChild);
        dropdownsInit(templateId, nextId);

        if (optionsList.children.length > INIT_OPTIONS_LIST_LENGTH) {
            optionsContainer.classList.remove(OPTIONS_LIST_HEADERS_HIDDEN_CLASS);
        }
    };
    const removeOptionNode = (referenceNode) => {
        const optionRow = referenceNode.closest('.ibexa-catalog-block-options__option');

        optionRow.remove();

        if (optionsList.children.length <= INIT_OPTIONS_LIST_LENGTH) {
            optionsContainer.classList.add(OPTIONS_LIST_HEADERS_HIDDEN_CLASS);
        }
    };
    const toggleRemoveOptionsBtn = () => {
        const removeOptionCheckedCheckboxes = container.querySelectorAll('.ibexa-catalog-block-options__remove-option-checkbox:checked');

        removeOptionsBtn.disabled = !removeOptionCheckedCheckboxes.length;
    };
    const removeOptions = () => {
        const removeOptionCheckedCheckboxes = container.querySelectorAll('.ibexa-catalog-block-options__remove-option-checkbox:checked');

        removeOptionCheckedCheckboxes.forEach(removeOptionNode);
        removeOptionsBtn.disabled = true;
    };
    const removeSingleOption = ({ currentTarget }) => removeOptionNode(currentTarget);
    const attachListenersToOption = (optionNode) => {
        const removeOptionCheckbox = optionNode.querySelector('.ibexa-catalog-block-options__remove-option-checkbox');
        const removeOptionBtn = optionNode.querySelector('.ibexa-catalog-block-options__remove-option-btn');

        removeOptionCheckbox.addEventListener('change', toggleRemoveOptionsBtn, false);
        removeOptionBtn.addEventListener('click', removeSingleOption, false);
    };
    const init = () => {
        if (optionsList.children.length > INIT_OPTIONS_LIST_LENGTH) {
            optionsNodes.forEach(attachListenersToOption);
        } else {
            optionsContainer.classList.add(OPTIONS_LIST_HEADERS_HIDDEN_CLASS);
        }
    };

    addOptionBtn?.addEventListener('click', addOption, false);
    removeOptionsBtn?.addEventListener('click', removeOptions, false);
    init();
})(window, window.document, window.ibexa);
