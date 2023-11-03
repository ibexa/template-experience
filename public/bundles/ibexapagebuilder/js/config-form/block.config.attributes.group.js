(function (global, doc) {
    const addNewGroupBtns = doc.querySelectorAll('.ibexa-btn--add-new-group');
    const removeGroupsBtns = doc.querySelectorAll('.ibexa-btn--remove-groups');
    const attributesGroups = doc.querySelectorAll('.ibexa-collapse--attributes-group');
    const removeGroup = ({ currentTarget }) => {
        currentTarget.closest('.ibexa-collapse--attributes-group').remove();
    };
    const removeCheckedGroups = (event) => {
        const selectedGroupCheckboxes = event.currentTarget
            .closest('.ibexa-block-attributes-group-wrapper')
            .querySelectorAll('.ibexa-collapse--attributes-group .ibexa-collapse__header .ibexa-input--checkbox:checked');

        selectedGroupCheckboxes.forEach((selectedGroupCheckbox) =>
            selectedGroupCheckbox.closest('.ibexa-collapse--attributes-group').remove(),
        );

        updateRemoveGroupsBtnState(event);
    };
    const updateRemoveGroupsBtnState = ({ currentTarget }) => {
        const container = currentTarget.closest('.ibexa-block-attributes-group-wrapper');
        const selectedGroupCheckboxes = container.querySelectorAll('.ibexa-collapse--attributes-group .ibexa-input--checkbox:checked');
        const removeGroupsBtn = container.querySelector('.ibexa-btn--remove-groups');

        removeGroupsBtn.disabled = selectedGroupCheckboxes.length === 0;
    };

    addNewGroupBtns.forEach((addNewGroupBtn) => {
        addNewGroupBtn.addEventListener(
            'click',
            ({ currentTarget }) => {
                const groupsContainer = currentTarget
                    .closest('.ibexa-block-attributes-group-wrapper')
                    .querySelector('.ibexa-block-attributes-group-wrapper__container');
                const { nextGroupIndex } = groupsContainer.dataset;
                const template = groupsContainer.dataset.prototype.replaceAll('__name__', nextGroupIndex);
                const wrapper = doc.createElement('div');

                wrapper.insertAdjacentHTML('beforeend', template);

                const group = wrapper.querySelector('.ibexa-collapse--attributes-group');

                group.querySelector('.ibexa-btn--remove-group').addEventListener('click', removeGroup, false);
                group.querySelector('.ibexa-input--checkbox').addEventListener('change', updateRemoveGroupsBtnState, false);

                groupsContainer.append(group);
                groupsContainer.dataset.nextGroupIndex = parseInt(nextGroupIndex, 10) + 1;

                doc.body.dispatchEvent(
                    new CustomEvent('ibexa-attributes-group-added', {
                        detail: {
                            container: group,
                        },
                    }),
                );
            },
            false,
        );
    });

    removeGroupsBtns.forEach((removeGroupsBtn) => {
        removeGroupsBtn.addEventListener('click', removeCheckedGroups, false);
    });

    attributesGroups.forEach((attributesGroup) => {
        const removeGroupBtn = attributesGroup.querySelector('.ibexa-btn--remove-group');

        if (removeGroupBtn) {
            removeGroupBtn.addEventListener('click', removeGroup, false);
        }

        attributesGroup.querySelector('.ibexa-input--checkbox')?.addEventListener('change', updateRemoveGroupsBtnState, false);
    });
})(window, document);
