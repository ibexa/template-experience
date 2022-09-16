(function (global, doc, ibexa) {
    const ADDED_OPTION_TIMEOUT = 200;
    const SELECTOR_OPTIONS_CONTAINER = '.ibexa-pc-attribute-selection-options';
    const addOptionBtn = doc.querySelector('.ibexa-pc-attribute-selection-options__add-option-btn');
    const removeOptionsBtn = doc.querySelector('.ibexa-pc-attribute-selection-options__remove-options-btn');
    const optionsNodes = doc.querySelectorAll('.ibexa-pc-attribute-selection-options__option');
    const removeOptionNode = (referenceNode) => {
        const optionRow = referenceNode.closest('.ibexa-pc-attribute-selection-options__option');

        optionRow.remove();
    };
    const toggleRemoveOptionsBtn = ({ currentTarget }) => {
        const container = currentTarget.closest(SELECTOR_OPTIONS_CONTAINER);
        const removeOptionCheckedCheckboxes = container.querySelectorAll(
            '.ibexa-pc-attribute-selection-options__remove-option-checkbox:checked',
        );

        removeOptionsBtn.disabled = !removeOptionCheckedCheckboxes.length;
    };
    const addOption = ({ currentTarget }) => {
        const container = currentTarget.closest(SELECTOR_OPTIONS_CONTAINER);
        const optionsList = container.querySelector('.ibexa-pc-attribute-selection-options__list');
        const nextId = parseInt(optionsList.dataset.nextOptionId, 10) || 0;
        const { optionTemplate } = optionsList.dataset;
        const filledOptionTemplate = optionTemplate.replaceAll('__name__', nextId);

        optionsList.dataset.nextOptionId = nextId + 1;
        optionsList.insertAdjacentHTML('beforeend', filledOptionTemplate);

        const addedOptionNode = optionsList.querySelector('.ibexa-pc-attribute-selection-options__option:last-of-type');

        attachListenersToOption(addedOptionNode);
        addedOptionNode.classList.add('ibexa-pc-attribute-selection-options__option--added');

        setTimeout(() => {
            addedOptionNode.classList.remove('ibexa-pc-attribute-selection-options__option--added');
        }, ADDED_OPTION_TIMEOUT);

        doc.body.dispatchEvent(new CustomEvent('ibexa-inputs:added'));
        doc.body.dispatchEvent(
            new CustomEvent('ibexa-pc-edit-form-added-field', {
                detail: {
                    inputsContainer: addedOptionNode,
                },
            }),
        );
    };
    const removeOptions = ({ currentTarget }) => {
        const container = currentTarget.closest(SELECTOR_OPTIONS_CONTAINER);
        const removeOptionCheckedCheckboxes = container.querySelectorAll(
            '.ibexa-pc-attribute-selection-options__remove-option-checkbox:checked',
        );

        removeOptionCheckedCheckboxes.forEach(removeOptionNode);
        removeOptionsBtn.disabled = true;
    };
    const removeSingleOption = ({ currentTarget }) => removeOptionNode(currentTarget);
    const attachListenersToOption = (optionNode) => {
        const removeOptionCheckbox = optionNode.querySelector('.ibexa-pc-attribute-selection-options__remove-option-checkbox');
        const removeOptionBtn = optionNode.querySelector('.ibexa-pc-attribute-selection-options__remove-option-btn');
        const sourceInput = optionNode.querySelector('.ibexa-pc-attribute-selection-options__option-label-input');
        const targetInput = optionNode.querySelector('.ibexa-pc-attribute-selection-options__option-value-input');
        const optionValueAutogenerator = new ibexa.core.SlugValueInputAutogenerator({
            sourceInput,
            targetInput,
        });

        optionValueAutogenerator.init();
        removeOptionCheckbox.addEventListener('change', toggleRemoveOptionsBtn, false);
        removeOptionBtn.addEventListener('click', removeSingleOption, false);
    };

    addOptionBtn?.addEventListener('click', addOption, false);
    removeOptionsBtn?.addEventListener('click', removeOptions, false);
    optionsNodes.forEach(attachListenersToOption);
})(window, window.document, window.ibexa);
