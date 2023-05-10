import { SearchInput } from './core/search.input';

(function (doc, ibexa) {
    const editorialModels = doc.querySelector('.ibexa-perso-editorial-models');

    if (!editorialModels) {
        return;
    }

    const { customerId } = doc.querySelector('.ibexa-perso-model-edit__form').dataset;
    const itemsContainer = editorialModels.querySelector('.ibexa-perso-editorial-models__items');
    const updateEditorialNoItemsContainer = () => {
        const hasAnyItem = editorialModels.querySelectorAll('.ibexa-perso-editorial-models__item').length > 0;
        const noItemsMessageNode = editorialModels.querySelector('.ibexa-perso-editorial-models__no-items');

        noItemsMessageNode.classList.toggle('d-none', hasAnyItem);
    };
    const removeTag = (event) => {
        const removeBtn = event.currentTarget;
        const tag = removeBtn.closest('.ibexa-perso-editorial-models__item');

        tag.remove();
        updateEditorialNoItemsContainer();
    };
    const addTag = ({ label, value, typeId }) => {
        const { template } = itemsContainer.dataset;
        const lastItemNode = itemsContainer.querySelector('.ibexa-perso-editorial-models__item:last-child');
        const lastItemNodeInput = lastItemNode?.querySelector('.ibexa-perso-editorial-models__input--id');
        const tagIndex = lastItemNodeInput ? parseInt(lastItemNodeInput.name.replace(/[^0-9]/g, ''), 10) + 1 : 0;

        itemsContainer.insertAdjacentHTML('beforeend', template.replace('{{ label }}', label).replaceAll('__name__', tagIndex));

        const insertedTag = itemsContainer.querySelector(`.ibexa-perso-editorial-models__item:last-child`);

        insertedTag.querySelector('.ibexa-perso-editorial-models__input--id').value = value;
        insertedTag.querySelector('.ibexa-perso-editorial-models__input--type').value = typeId;
        insertedTag.querySelector('.ibexa-tag__remove-btn').addEventListener('click', removeTag, false);
    };
    const handleAddItem = (item) => {
        const { value, id, typeId } = item;
        const valueEscaped = ibexa.helpers.text.escapeHTML(value.replace(/\$/g, '$$$$'));
        const isAlreadySelectedItem = itemsContainer.querySelector(
            `.ibexa-perso-editorial-models__input--id[value="${id.replace(/["\\]/g, '\\$&')}"]`,
        );

        if (isAlreadySelectedItem) {
            return;
        }

        addTag({
            label: valueEscaped,
            value: id,
            typeId,
        });
        updateEditorialNoItemsContainer();
    };

    const searchInputContainer = doc.querySelector('.ibexa-perso-editorial-models__search-input');

    const searchInput = new SearchInput({
        container: searchInputContainer,
        customerId,
        onItemAdd: handleAddItem,
    });

    searchInput.init();

    editorialModels.querySelectorAll('.ibexa-tag__remove-btn').forEach((button) => {
        button.addEventListener(
            'click',
            (event) => {
                removeTag(event);
                updateEditorialNoItemsContainer();
            },
            false,
        );
    });
})(window.document, window.ibexa);
