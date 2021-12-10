(function(doc, eZ, Translator, React, ReactDOM) {
    const udwContainer = doc.getElementById('react-udw');
    const openUdwBtn = doc.querySelector('.ibexa-btn--add-items-udw');
    const SELECTOR_EDITORIAL_ITEM = '.ibexa-perso-editorial-models__item';
    const editorialModels = doc.querySelector('.ibexa-perso-editorial-models');

    if (!editorialModels) {
        return;
    }

    const updateEditorialNoItemsContainer = () => {
        const hasAnyItems = doc.querySelectorAll(SELECTOR_EDITORIAL_ITEM).length > 0;
        const noItemsMessageNode = doc.querySelector('.ibexa-perso-editorial-models__no-items');

        noItemsMessageNode.classList.toggle('d-none', hasAnyItems);
    };
    const removeTag = (event) => {
        const removeBtn = event.currentTarget;
        const tag = removeBtn.closest('.ibexa-perso-editorial-models__item');

        tag.remove();
    };
    const onConfirm = (event, items) => {
        closeUDW();

        const editorialModelsContainer = doc.querySelector('.ibexa-perso-editorial-models__items');
        const { template } = editorialModelsContainer.dataset;

        items.forEach((item) => {
            let tagIndex = 0;
            const contentName = eZ.helpers.text.escapeHTML(item.ContentInfo.Content.Name);
            const contentId = item.ContentInfo.Content._id;
            const contentTypeId = item.ContentInfo.Content.ContentTypeInfo.id;
            const alreadySelectedItem = doc.querySelector(`.ibexa-perso-editorial-models__input--id[value="${contentId}"]`);
            const lastItemNode = editorialModelsContainer.querySelector(`${SELECTOR_EDITORIAL_ITEM}:last-child`);

            if (!alreadySelectedItem) {
                if (lastItemNode) {
                    const input = lastItemNode.querySelector('.ibexa-perso-editorial-models__input--id');

                    tagIndex = parseInt(input.name.replace(/[^0-9]/g, ''), 10) + 1;
                }

                editorialModelsContainer.insertAdjacentHTML(
                    'beforeend',
                    template.replace('__label_name__', contentName).replaceAll('__name__', tagIndex),
                );

                const lastItemNodeAfterInsert = editorialModelsContainer.querySelector(`${SELECTOR_EDITORIAL_ITEM}:last-child`);

                lastItemNodeAfterInsert.querySelector('.ibexa-perso-editorial-models__input--id').value = contentId;
                lastItemNodeAfterInsert.querySelector('.ibexa-perso-editorial-models__input--type').value = contentTypeId;
                lastItemNodeAfterInsert.querySelector('.ibexa-tag__remove-btn').addEventListener('click', removeTag, false);
            }
        });

        updateEditorialNoItemsContainer();
    };
    const onCancel = () => closeUDW();
    const closeUDW = () => ReactDOM.unmountComponentAtNode(udwContainer);
    const openUDW = (event) => {
        const config = JSON.parse(event.currentTarget.dataset.udwConfig);
        const title = Translator.trans(/*@Desc("Select items")*/ 'models.udw_title', {}, 'ibexa_personalization');

        ReactDOM.render(
            React.createElement(eZ.modules.UniversalDiscovery, {
                onConfirm: onConfirm.bind(null, event.currentTarget),
                onCancel,
                title,
                ...config,
            }),
            udwContainer,
        );
    };

    openUdwBtn.addEventListener('click', openUDW, false);

    editorialModels.querySelectorAll('.ibexa-tag__remove-btn').forEach((button) => {
        button.addEventListener('click', removeTag, false);
    });
})(window.document, window.eZ, window.Translator, window.React, window.ReactDOM);
