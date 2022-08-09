(function (global, doc) {
    const addNewGroupBtn = doc.querySelector('.ibexa-btn--add-new-group');
    const removeGroupsBtn = doc.querySelector('.ibexa-btn--remove-groups');
    const attributesGroups = doc.querySelectorAll('.ibexa-collapse--attributes-group');
    let nextGroupIndex = attributesGroups.length;
    const removeGroup = ({ currentTarget }) => {
        currentTarget.closest('.ibexa-collapse--attributes-group').remove();
    };
    const updateRemoveGroupsBtnState = () => {
        const selectedGroupCheckboxes = doc.querySelectorAll('.ibexa-collapse--attributes-group .ibexa-input--checkbox:checked');

        removeGroupsBtn.disabled = selectedGroupCheckboxes.length === 0;
    };

    if (addNewGroupBtn) {
        addNewGroupBtn.addEventListener(
            'click',
            () => {
                const groupsContainer = doc.querySelector('#block_configuration_attributes_group_value_attributes');
                const template = groupsContainer.dataset.prototype.replaceAll('__name__', nextGroupIndex++);
                const wrapper = doc.createElement('div');

                wrapper.insertAdjacentHTML('beforeend', template);

                const group = wrapper.querySelector('.ibexa-collapse--attributes-group');

                group.querySelector('.ibexa-btn--remove-group').addEventListener('click', removeGroup, false);
                group.querySelector('.ibexa-input--checkbox').addEventListener('change', updateRemoveGroupsBtnState, false);

                groupsContainer.append(group);

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
    }

    if (removeGroupsBtn) {
        removeGroupsBtn.addEventListener(
            'click',
            () => {
                const selectedGroupCheckboxes = doc.querySelectorAll('.ibexa-collapse--attributes-group .ibexa-input--checkbox:checked');

                selectedGroupCheckboxes.forEach((selectedGroupCheckbox) =>
                    selectedGroupCheckbox.closest('.ibexa-collapse--attributes-group').remove(),
                );

                updateRemoveGroupsBtnState();
            },
            false,
        );
    }

    attributesGroups.forEach((attributesGroup) => {
        attributesGroup.querySelector('.ibexa-btn--remove-group').addEventListener('click', removeGroup, false);
        attributesGroup.querySelector('.ibexa-input--checkbox').addEventListener('change', updateRemoveGroupsBtnState, false);
    });
})(window, document);
