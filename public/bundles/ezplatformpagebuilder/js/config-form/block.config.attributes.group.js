(function (global, doc) {
    const addNewGroupBtns = doc.querySelectorAll('.ez-btn--add-new-group');
    const attributesGroups = doc.querySelectorAll('.ez-block-attributes-group');
    const removeGroup = ({ currentTarget }) => {
        currentTarget.closest('.ez-block-attributes-group').remove();
    };

    addNewGroupBtns.forEach((addNewGroupBtn) => {
        addNewGroupBtn.addEventListener(
            'click',
            ({ currentTarget }) => {
                const groupsContainer = currentTarget
                    .closest('.ez-block-attributes-group-wrapper')
                    .querySelector('.ez-block-attributes-group-wrapper__container');
                const { nextGroupIndex } = groupsContainer.dataset;
                const template = groupsContainer.dataset.prototype.replaceAll('__name__', nextGroupIndex);
                const wrapper = doc.createElement('div');

                wrapper.insertAdjacentHTML('beforeend', template);

                const group = wrapper.querySelector('.ez-block-attributes-group');

                group.querySelector('.ez-btn--remove-group').addEventListener('click', removeGroup, false);

                groupsContainer.append(group);
                groupsContainer.dataset.nextGroupIndex = parseInt(nextGroupIndex, 10) + 1;

                doc.body.dispatchEvent(
                    new CustomEvent('ez-attributes-group-added', {
                        detail: {
                            container: group,
                        },
                    })
                );
            },
            false
        );
    });

    attributesGroups.forEach((attributesGroup) => {
        const removeGroupBtn = attributesGroup.querySelector('.ez-btn--remove-group');

        if (removeGroupBtn) {
            removeGroupBtn.addEventListener('click', removeGroup, false)
        }
    });
})(window, document);
