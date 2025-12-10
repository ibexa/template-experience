import { getInstance } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/object.instances';

(function (global, doc) {
    const createActions = doc.querySelector('.ibexa-extra-actions.ibexa-extra-actions--action-configuration');

    if (!createActions) {
        return;
    }

    const actionTypeDropdown = createActions.querySelector('.ibexa-form-field--action-type .ibexa-dropdown');
    const actionHandlerDropdown = createActions.querySelector('.ibexa-form-field--action-handler .ibexa-dropdown');
    const actionTypeDropdownInstance = getInstance(actionTypeDropdown);
    const actionHandlerDropdownInstance = getInstance(actionHandlerDropdown);
    const filterActionHandlers = () => {
        const actionTypeValue = actionTypeDropdownInstance.sourceInput.value;
        const actionHandlerOptions = actionHandlerDropdownInstance.sourceInput.querySelectorAll(
            `option[data-action-type="${actionTypeValue}"]`,
        );
        const actionHandlerDropdownItems = actionHandlerDropdownInstance.itemsListContainer.querySelectorAll('.ibexa-dropdown__item');
        const actionHandlerVisibleOptionsIds = [...actionHandlerOptions].map(({ value }) => value);

        actionHandlerDropdownItems.forEach((itemNode) => {
            itemNode.hidden = !actionHandlerVisibleOptionsIds.includes(itemNode.dataset.value);
        });

        const firstVisibleItem = actionHandlerDropdownInstance.itemsListContainer.querySelector('.ibexa-dropdown__item:not([hidden])');
        const firstVisibleItemId = firstVisibleItem.dataset.value;

        if (firstVisibleItemId !== actionHandlerDropdownInstance.sourceInput.value) {
            actionHandlerDropdownInstance.selectOption(firstVisibleItemId);
        }
    };

    filterActionHandlers();
    actionTypeDropdownInstance.sourceInput.addEventListener(
        'change',
        () => {
            filterActionHandlers();
        },
        false,
    );
})(window, window.document);
