(function(global, doc, ibexa, Translator) {
    const toggleItemSelect = (event) => {
        const itemCheckbox = event.currentTarget;
        const groupContent = itemCheckbox.closest('.ibexa-page-select-items__group-content');
        const itemClassMethod = itemCheckbox.checked ? 'add' : 'remove';

        itemCheckbox.closest('.ibexa-page-select-items__item').classList[itemClassMethod]('ibexa-page-select-items__item--selected');
        updateGroupHeader(groupContent);
    };
    const toggleGroupItemsSelect = (event) => {
        const actionCheckbox = event.currentTarget;
        const groupContent = actionCheckbox.closest('.ibexa-page-select-items__group-content');
        const itemClassMethod = actionCheckbox.checked ? 'add' : 'remove';

        groupContent.querySelectorAll('.ibexa-page-select-items__items-list .ibexa-input--checkbox').forEach((itemCheckbox) => {
            itemCheckbox.checked = actionCheckbox.checked;
            itemCheckbox.closest('.ibexa-page-select-items__item').classList[itemClassMethod]('ibexa-page-select-items__item--selected');
        });
        updateGroupHeader(groupContent);
    };
    const updateGroupHeader = (container) => {
        container.querySelectorAll('.ibexa-page-select-items__select-all-items').forEach((selectAllItemsCheckbox) => {
            const group = selectAllItemsCheckbox.closest('.ibexa-page-select-items__group-content');
            const warningNode = group.querySelector('.ibexa-page-select-items__group-warning');
            const actionLabelNode = group.querySelector('.ibexa-page-select-items__group-action-label');
            const actionCheckboxNode = group.querySelector('.ibexa-page-select-items__select-all-items');
            const isAnyBlockUnchecked = [...group.querySelectorAll('.ibexa-page-select-items__items-list .ibexa-input--checkbox')].some(
                (checkbox) => !checkbox.checked,
            );
            const warningClassMethod = isAnyBlockUnchecked ? 'remove' : 'add';

            if (isAnyBlockUnchecked) {
                actionCheckboxNode.checked = false;
                actionLabelNode.innerHTML = Translator.trans(/*@Desc("Select all")*/ 'item.select_all', {}, 'ezplatform_page_fieldtype');
            } else {
                actionCheckboxNode.checked = true;
                actionLabelNode.innerHTML = Translator.trans(
                    /*@Desc("Unselect all")*/ 'item.unselect_all',
                    {},
                    'ezplatform_page_fieldtype',
                );
            }

            if (warningNode) {
                warningNode.classList[warningClassMethod]('ibexa-page-select-items__group-warning--hidden');
            }
        });
    };

    doc.querySelectorAll('.ibexa-page-select-items__select-all-items').forEach((groupCheckbox) => {
        groupCheckbox.addEventListener('change', toggleGroupItemsSelect, false);
    });
    doc.querySelectorAll('.ibexa-page-select-items__item .ibexa-input--checkbox').forEach((itemCheckbox) => {
        itemCheckbox.addEventListener('change', toggleItemSelect, false);
    });

    doc.body.addEventListener(
        'ibexa-drop-field-definition',
        (event) => {
            const { nodes } = event.detail;

            nodes.forEach((node) => {
                node.querySelectorAll('.ibexa-page-select-items__select-all-items').forEach((groupCheckbox) => {
                    groupCheckbox.addEventListener('change', toggleGroupItemsSelect, false);
                });
                node.querySelectorAll('.ibexa-page-select-items__item .ibexa-input--checkbox').forEach((itemCheckbox) => {
                    itemCheckbox.addEventListener('change', toggleItemSelect, false);
                });
            });
        },
        false,
    );
})(window, window.document, window.ibexa, window.Translator);
