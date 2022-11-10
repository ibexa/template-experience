(function (global, doc, ibexa, Translator) {
    const SELECTOR_COLLECTION = '.ibexa-pb-collection';
    const SELECTOR_COLLECTION_ITEMS = '.ibexa-pb-collection__items';
    const SELECTOR_ITEM = '.ibexa-pb-collection-item';
    const SELECTOR_UDW_BTN = '.ibexa-btn--select-content';
    const SELECTOR_BLOCK_CONFIGURATION_VIEW_SELECT = '.ibexa-block-configuration-view-select';
    const collections = doc.querySelectorAll(SELECTOR_COLLECTION);
    const openUdw = (itemsContainer, openUdwBtn, draggable, event) => {
        event.preventDefault();

        const { currentTarget } = event;
        const config = JSON.parse(currentTarget.dataset.udwConfig);
        const selectedView = doc.querySelector(SELECTOR_BLOCK_CONFIGURATION_VIEW_SELECT).value;
        const matchConfig = JSON.parse(doc.querySelector(`#${currentTarget.dataset.target}`).dataset.match);
        const configForView = Object.assign(config, { cotfAllowedContentTypes: matchConfig[selectedView] });
        const title = Translator.trans(/*@Desc("Select content")*/ 'config_form.widgets.collection.udw.title', {}, 'page_builder');
        const selectedLocations = [...itemsContainer.querySelectorAll(SELECTOR_ITEM)].map((item) => item.dataset.id);
        const openUdwEvent = new CustomEvent('ibexa-open-udw', {
            detail: {
                title,
                multiple: true,
                onConfirm: addItems.bind(this, itemsContainer, openUdwBtn, draggable),
                selectedLocations,
                ...configForView,
            },
        });

        doc.body.dispatchEvent(openUdwEvent);
    };
    const updateInputValue = (itemsContainer, openUdwBtn) => {
        const items = [...itemsContainer.querySelectorAll(SELECTOR_ITEM)];
        const input = doc.querySelector(`#${openUdwBtn.dataset.target}`);

        input.value = [...items.map((item) => item.dataset.id)].join();
    };
    const attachEventsToSelectedItem = (itemsContainer, openUdwBtn, item) =>
        item.querySelector('.ibexa-btn--trash').addEventListener('click', removeItem.bind(this, itemsContainer, openUdwBtn), false);
    const addItems = (itemsContainer, openUdwBtn, draggable, items) => {
        const fragment = doc.createDocumentFragment();
        const { template } = itemsContainer.dataset;

        items.forEach((item) => {
            const { escapeHTML } = ibexa.helpers.text;
            const contentTypeName = ibexa.helpers.contentType.getContentTypeName(item.ContentInfo.Content.ContentTypeInfo.identifier);
            const contentName = escapeHTML(item.ContentInfo.Content.TranslatedName);
            const itemId = escapeHTML(item.id);
            const container = doc.createElement('div');
            const renderedItem = template
                .replace('{{ content_name }}', contentName)
                .replace('{{ content_type_name }}', contentTypeName)
                .replace('{{ id }}', itemId);

            container.insertAdjacentHTML('beforeend', renderedItem);

            const listItem = container.querySelector(SELECTOR_ITEM);

            fragment.append(listItem);
        });

        itemsContainer.innerHTML = '';
        itemsContainer.append(fragment);

        updateInputValue(itemsContainer, openUdwBtn);
        draggable.reinit();
        ibexa.helpers.tooltips.parse(itemsContainer);
    };
    const removeItem = (itemsContainer, openUdwBtn, event) => {
        event.preventDefault();

        event.currentTarget.closest(SELECTOR_ITEM).remove();
        updateInputValue(itemsContainer, openUdwBtn);
    };
    const initCollection = (collection) => {
        const itemsContainer = collection.querySelector(SELECTOR_COLLECTION_ITEMS);
        const openUdwBtn = collection.querySelector(SELECTOR_UDW_BTN);
        const draggable = new CollectionDraggable({
            itemsContainer,
            openUdwBtn,
            selectorItem: SELECTOR_ITEM,
            selectorPlaceholder: '.ibexa-pb-collection-placeholder',
        });

        draggable.init();
        openUdwBtn.addEventListener('click', openUdw.bind(this, itemsContainer, openUdwBtn, draggable), false);
    };

    class CollectionDraggable extends global.ibexa.core.Draggable {
        constructor(config) {
            super(config);

            this.openUdwBtn = config.openUdwBtn;
        }

        attachEventHandlersToItem(item) {
            super.attachEventHandlersToItem(item);

            attachEventsToSelectedItem(this.itemsContainer, this.openUdwBtn, item);
        }

        onDrop() {
            super.onDrop();

            updateInputValue(this.itemsContainer, this.openUdwBtn);
        }
    }

    collections.forEach(initCollection);

    doc.body.addEventListener(
        'ibexa-attributes-group-added',
        ({ detail }) => {
            const addedCollections = detail.container.querySelectorAll(SELECTOR_COLLECTION);

            addedCollections.forEach(initCollection);
        },
        false,
    );
})(window, window.document, window.ibexa, window.Translator);
