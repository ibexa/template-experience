import BaseFilterConfig from './base.filter.config';

class TaggifyFilterConfig extends BaseFilterConfig {
    constructor(config) {
        super(config);

        this.taggifyTags = [];
        this.taggifyWrapper = this.configPanelNode.querySelector('.ibexa-pc-taggify__widget');
        this.sourceInput = this.configPanelNode.querySelector('.ibexa-pc-taggify__source-input');
        this.addedFilterTags = this.productsListFilterNode.querySelectorAll('.ibexa-pc-edit-catalog-list-filter-tag');
        this.tagsPopupMenuItems = this.productsListFilterNode.querySelectorAll(
            '.ibexa-pc-edit-catalog-tags-popup-menu .ibexa-pc-edit-catalog-tags-popup-menu__item',
        );
        this.storedValue = this.sourceInput.value;
        this.tagPopupTemplate = this.filterTagsPopupNode.dataset.tagPopupTemplate;
        this.sourceValueChange = this.sourceValueChange.bind(this);
        this.getValue = this.getValue.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.initTaggify = this.initTaggify.bind(this);
        this.removeTagByText = this.removeTagByText.bind(this);
        this.attachRemoveFilterTagEvents = this.attachRemoveFilterTagEvents.bind(this);
    }

    sourceValueChange() {
        this.taggifyTags = this.configPanelNode.querySelectorAll('.taggify__tag');

        this.updatePreviewValue();
        this.updateProductsListTags();
        this.fitTagsPopupItems();
    }

    getValue() {
        return this.sourceInput.value;
    }

    discardFilter() {
        this.sourceInput.value = this.storedValue;
        this.initTaggify();
        this.updateTaggifyTagsFromInput();
    }

    updateTaggifyTagsFromInput() {
        if (this.sourceInput.value.length) {
            this.taggify.updateTags(
                this.sourceInput.value.split(',').map((item) => ({
                    id: item.replace(/[^a-zA-Z0-9]/g, '_'),
                    label: item,
                })),
            );
        }
    }

    updateValue(event) {
        this.sourceInput.value = event.detail.tags.map((tag) => tag.label).join();
        this.sourceInput.dispatchEvent(new Event('change'));
    }

    updatePreviewValue() {
        this.taggifyTags = this.configPanelNode.querySelectorAll('.taggify__tag');

        const filterPreviewValueNode = this.previewNode.querySelector('.ibexa-pc-edit-catalog-filter-preview__value');
        const filterPreviewValue = `(${this.taggifyTags.length})`;

        filterPreviewValueNode.innerHTML = filterPreviewValue;
    }

    updateProductsListTags() {
        this.addedFilterTags.forEach((filterTag) => filterTag.remove());
        this.taggifyTags.forEach((taggifyTag) => {
            const { tagText, tagId } = taggifyTag.dataset;
            const renderedFilterTag = this.tagTemplate.replaceAll('{{ content }}', tagText);

            this.productListFilterTagsContainer.insertAdjacentHTML('beforeend', renderedFilterTag);

            const lastFilterTag = this.productListFilterTagsContainer.querySelector('.ibexa-pc-edit-catalog-list-filter-tag:last-of-type');

            lastFilterTag.dataset.tagId = tagId;
            lastFilterTag.dataset.tagText = tagText;
        });

        this.addedFilterTags = this.productsListFilterNode.querySelectorAll('.ibexa-pc-edit-catalog-list-filter-tag');
        this.attachRemoveFilterTagEvents(this.addedFilterTags);

        super.fitProductsListFilter();
    }

    removeTagByText(tagText) {
        const arrayValues = this.sourceInput.value.split(',');
        const tagTextIndex = arrayValues.indexOf(tagText);

        if (tagTextIndex !== -1) {
            arrayValues.splice(tagTextIndex, 1);
        }

        const valueAsString = arrayValues.join(',');

        this.sourceInput.value = valueAsString;
        this.initTaggify();
        this.updateTaggifyTagsFromInput();
        this.updatePreviewValue();
        this.updateProductsListTags();
    }

    removeFilterTag(filterTagNode) {
        const { tagText } = filterTagNode.dataset;

        this.removeTagByText(tagText);
    }

    fitTagsPopupItems() {
        let shouldCloseItemsPopup = true;
        const popupTags = this.filterTagsPopupNode.querySelectorAll('.ibexa-pc-edit-catalog-tags-popup-menu__item');
        const popupTagsListContainer = this.filterTagsPopupNode.querySelector('.ibexa-pc-edit-catalog-tags-popup-menu__list');

        popupTags.forEach((popupTag) => popupTag.remove());
        this.addedFilterTags.forEach((filterTag) => {
            if (filterTag.classList.contains('ibexa-pc-edit-catalog-list-filter-tag--hidden')) {
                const { tagText } = filterTag.dataset;
                const renderedPopupTag = this.tagPopupTemplate.replace('{{ label }}', tagText);

                popupTagsListContainer.insertAdjacentHTML('beforeend', renderedPopupTag);

                const lastPopupTag = this.filterTagsPopupNode.querySelector('.ibexa-pc-edit-catalog-tags-popup-menu__item:last-of-type');
                const removeBtn = lastPopupTag.querySelector('.ibexa-pc-edit-catalog-tags-popup-menu__item-remove-btn');

                lastPopupTag.dataset.tagText = tagText;
                shouldCloseItemsPopup = false;
                removeBtn.addEventListener('click', (event) => this.removePopupTag(event), false);
            }
        });

        if (shouldCloseItemsPopup) {
            this.tagsPopup.closePopup();
        }
    }

    removePopupTag({ currentTarget }) {
        const popupTagWrapper = currentTarget.closest('.ibexa-pc-edit-catalog-tags-popup-menu__item');
        const { tagText } = popupTagWrapper.dataset;

        this.removeTagByText(tagText);
    }

    addPreview(isTriggeredByUser) {
        super.addPreview(isTriggeredByUser);

        const removePreviewBtn = this.previewNode.querySelector('.ibexa-pc-edit-catalog-filter-preview__remove-filter-preview');
        const openConfigPanelBtn = this.previewNode.querySelector('.ibexa-pc-edit-catalog-filter-preview__open-config-panel');

        openConfigPanelBtn.addEventListener('click', this.storeValue, false);
        removePreviewBtn.addEventListener('click', this.removePreview, false);

        this.updatePreviewValue();
        this.fitTagsPopupItems();
    }

    removePreview() {
        this.sourceInput.value = '';
        this.initTaggify();
        this.sourceInput.dispatchEvent(new Event('change'));

        super.removePreview();
    }

    initTaggify() {
        this.taggify = new window.Taggify({
            containerNode: this.taggifyWrapper,
            displayLabel: false,
            displayInputValues: false,
        });
        const taggifyInput = this.taggifyWrapper.querySelector('.taggify__input');

        taggifyInput.addEventListener(
            'keydown',
            (event) => {
                if (event.keyCode == 13) {
                    event.preventDefault();

                    return false;
                }
            },
            false,
        );
    }

    attachRemoveFilterTagEvents(filterTagNodes) {
        filterTagNodes.forEach((filterTagNode) => {
            const removeFilterTagBtn = filterTagNode.querySelector('.ibexa-tag__remove-btn');

            removeFilterTagBtn.addEventListener('click', () => this.removeFilterTag(filterTagNode), false);
        });
    }

    init() {
        super.init();

        this.initTaggify();
        this.updateTaggifyTagsFromInput();

        const filterTagNodes = this.productListFilterTagsContainer.querySelectorAll('.ibexa-pc-edit-catalog-list-filter-tag');

        this.taggifyWrapper.addEventListener('tagsCreated', this.updateValue, false);
        this.taggifyWrapper.addEventListener('tagRemoved', this.updateValue, false);
        this.sourceInput.addEventListener('change', this.sourceValueChange, false);
        this.tagsPopupMenuItems.forEach((popupMenuItem) => {
            const removeBtn = popupMenuItem.querySelector('.ibexa-pc-edit-catalog-tags-popup-menu__item-remove-btn');

            removeBtn.addEventListener('click', this.removePopupTag, false);
        });
        this.configPanelCloseBtns.forEach((closeBtn) => {
            closeBtn.addEventListener('click', this.discardFilter, false);
        });

        if (this.sourceInput.value) {
            this.addPreview();
            this.attachRemoveFilterTagEvents(filterTagNodes);
        }
    }
}

export default TaggifyFilterConfig;
