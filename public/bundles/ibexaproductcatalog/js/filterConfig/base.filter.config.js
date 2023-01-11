import TagsPopupMenu from './tags.popup.menu';
import ConfigPanel from '../config.panel';

const MAX_NUMBER_PRODUCTS_LIST_FILTER_TAGS = 5;
const doc = window.document;

class BaseFilterConfig {
    constructor(config) {
        this.storedItems = [];
        this.previewNode = null;
        this.configPanel = null;
        this.isDefault = config.isDefault ?? false;
        this.configPanelNode = config.configPanelNode;
        this.productsListFilterNode = config.productsListFilterNode;
        this.relatedAvailablePopupItem = config.relatedAvailablePopupItem;
        this.configuredFiltersListNode = config.configuredFiltersListNode;
        this.filterPreviewTemplate = this.configuredFiltersListNode.dataset.filterPreviewTemplate;
        this.tagTemplate = this.productsListFilterNode?.dataset.tagTemplate;
        this.filterName = this.configPanelNode.dataset.filterName;
        this.filterType = this.configPanelNode.dataset.filterType;
        this.filterLabel = this.configPanelNode.dataset.filterLabel;
        this.filterTagsTogglerBtn = this.productsListFilterNode?.querySelector('.ibexa-pc-edit-catalog-list-filter__tags-toggler-btn');
        this.filterTagsPopupNode = this.productsListFilterNode?.querySelector('.ibexa-pc-edit-catalog-tags-popup-menu');
        this.productListFilterTagsContainer = this.productsListFilterNode?.querySelector('.ibexa-pc-edit-catalog-list-filter__tags');
        this.addedFilterTags = this.productsListFilterNode?.querySelectorAll('.ibexa-pc-edit-catalog-list-filter-tag');
        this.tagsPopupMenuItems = this.productsListFilterNode?.querySelectorAll(
            '.ibexa-pc-edit-catalog-tags-popup-menu .ibexa-pc-edit-catalog-tags-popup-menu__item',
        );
        this.removePopupTag = this.removePopupTag.bind(this);
        this.configPanelSaveBtns = this.configPanelNode.querySelectorAll('.ibexa-pc-config-panel__save-btn');
        this.configPanelCloseBtns = this.configPanelNode.querySelectorAll('.ibexa-btn--close-config-panel');
        this.removePreview = this.removePreview.bind(this);
        this.saveFilter = this.saveFilter.bind(this);
        this.discardFilter = this.discardFilter.bind(this);
        this.storeItems = this.storeItems.bind(this);
        this.updateProductsListTags = this.updateProductsListTags.bind(this);
        this.updatePreviewValue = this.updatePreviewValue.bind(this);
        this.attachRemoveFilterTagEvents = this.attachRemoveFilterTagEvents.bind(this);
        this.removeFilterTag = this.removeFilterTag.bind(this);
        this.getItems = this.getItems.bind(this);
        this.getRequestValue = this.getRequestValue.bind(this);
        this.fitTagsPopupItems = this.fitTagsPopupItems.bind(this);

        if (!this.productsListFilterNode) {
            console.warn(`You have to provide block .ibexa-pc-edit-catalog-list-filter for ${this.filterName}.`);
        }

        if (this.filterTagsPopupNode) {
            this.tagsPopup = new TagsPopupMenu({
                triggerElement: this.filterTagsTogglerBtn,
                popupMenuElement: this.filterTagsPopupNode,
            });
        }
    }

    getItems() {
        return [];
    }

    getRequestValue() {
        return this.getItems();
    }

    getValuePreviewLabel() {
        return `(${this.getItems().length})`;
    }

    storeItems() {
        this.storedItems = this.getItems();
    }

    fitProductsListFilter() {
        if (!this.productsListFilterNode) {
            return;
        }

        if (!this.addedFilterTags.length) {
            this.productsListFilterNode.classList.add('ibexa-pc-edit-catalog-list-filter--hidden');

            return;
        }

        let filterTagsOverContainerCount = 0;

        this.addedFilterTags.forEach((filterTagNode, tagIndex) => {
            const isFilterTagOverContainer = tagIndex >= MAX_NUMBER_PRODUCTS_LIST_FILTER_TAGS;

            filterTagNode.classList.toggle('ibexa-pc-edit-catalog-list-filter-tag--hidden', isFilterTagOverContainer);

            if (isFilterTagOverContainer) {
                filterTagsOverContainerCount++;
            }
        });

        if (filterTagsOverContainerCount) {
            this.filterTagsTogglerBtn.innerHTML = `+${filterTagsOverContainerCount}`;
        }

        this.filterTagsTogglerBtn.classList.toggle(
            'ibexa-pc-edit-catalog-list-filter__tags-toggler-btn--hidden',
            !filterTagsOverContainerCount,
        );
        this.productsListFilterNode.classList.remove('ibexa-pc-edit-catalog-list-filter--hidden');
    }

    setParametersForAvailableFiltersTriggerBtn() {
        const availabelFilters = this.relatedAvailablePopupItem
            .closest('.ibexa-dropdown__items-list')
            .querySelectorAll('.ibexa-dropdown__item:not(.ibexa-pc-edit-catalog-filters__dropdown-filter-item--hidden)');
        const availableFiltersTriggerBtn = doc.querySelector('.ibexa-pc-edit-catalog-filters__available-popup-trigger');

        availableFiltersTriggerBtn.disabled = !availabelFilters.length;
        doc.querySelector('.ibexa-pc-edit-catalog-filters__configured-header-actions .ibexa-dropdown').classList.toggle(
            'ibexa-dropdown--disabled',
            !availabelFilters.length,
        );
    }

    addPreview(isTriggeredByUser) {
        const renderedFilterPreview = this.filterPreviewTemplate
            .replaceAll('{{ name }}', this.filterName)
            .replace('{{ type }}', this.filterType)
            .replace('{{ label }}', this.filterLabel);

        this.relatedAvailablePopupItem.classList.add('ibexa-pc-edit-catalog-filters__dropdown-filter-item--hidden');
        this.configuredFiltersListNode.insertAdjacentHTML('beforeend', renderedFilterPreview);
        this.previewNode = doc.querySelector('.ibexa-pc-edit-catalog-filter-preview:last-of-type');
        this.filterPreviewNoValue = this.previewNode.querySelector('.ibexa-pc-edit-catalog-filter-preview__value-content--no-value');
        this.filterPreviewHasValue = this.previewNode.querySelector('.ibexa-pc-edit-catalog-filter-preview__value-content--has-value');

        if (this.isDefault) {
            this.previewNode.classList.add('ibexa-pc-edit-catalog-filter-preview--default-filter');
        }

        this.setParametersForAvailableFiltersTriggerBtn();

        const removePreviewBtn = this.previewNode.querySelector('.ibexa-pc-edit-catalog-filter-preview__remove-filter-preview');
        const openConfigPanelBtn = this.previewNode.querySelector('.ibexa-pc-edit-catalog-filter-preview__open-config-panel');

        this.configPanel = new ConfigPanel({
            wrapper: this.configPanelNode,
            trigger: openConfigPanelBtn,
        });

        this.configPanel.init();
        this.updatePreviewValue();
        this.fitTagsPopupItems();
        openConfigPanelBtn.addEventListener('click', this.storeItems, false);

        if (!this.isDefault) {
            removePreviewBtn.addEventListener('click', this.removePreview, false);
            removePreviewBtn.classList.remove('ibexa-pc-edit-catalog-filter-preview__remove-filter-preview--hidden');
        }

        if (isTriggeredByUser) {
            this.configPanel.openPanel();
        }
    }

    removePreview() {
        this.updateProductsListTags();
        this.fitProductsListFilter();
        this.fitTagsPopupItems();
        this.relatedAvailablePopupItem.classList.remove('ibexa-pc-edit-catalog-filters__dropdown-filter-item--hidden');
        this.previewNode.remove();
        this.previewNode = null;
        this.toggleNoFiltersClass();
        this.setParametersForAvailableFiltersTriggerBtn();

        doc.body.dispatchEvent(new CustomEvent('ibexa-pc-filters:change'));
    }

    toggleNoFiltersClass() {
        const addedPreviews = this.configuredFiltersListNode.querySelectorAll('.ibexa-pc-edit-catalog-filter-preview');
        const catalogFiltersNode = this.configuredFiltersListNode.closest('.ibexa-pc-edit-catalog-filters');

        catalogFiltersNode.classList.toggle('ibexa-pc-edit-catalog-filters--no-filters-preview', !addedPreviews.length);
    }

    updateProductsListTags(tags = []) {
        if (!this.productsListFilterNode) {
            return;
        }

        this.addedFilterTags.forEach((filterTag) => filterTag.remove());
        tags.forEach(({ label, value }) => {
            const renderedFilterTag = this.tagTemplate.replaceAll('{{ content }}', label);

            this.productListFilterTagsContainer.insertAdjacentHTML('beforeend', renderedFilterTag);

            const lastFilterTag = this.productListFilterTagsContainer.querySelector('.ibexa-pc-edit-catalog-list-filter-tag:last-of-type');

            lastFilterTag.dataset.value = value;
        });

        this.addedFilterTags = this.productsListFilterNode.querySelectorAll('.ibexa-pc-edit-catalog-list-filter-tag');
        this.attachRemoveFilterTagEvents();
        this.fitProductsListFilter();
        this.fitTagsPopupItems();
    }

    fitTagsPopupItems() {
        if (!this.tagsPopupMenuItems || !this.tagsPopup) {
            return;
        }

        let shouldCloseItemsPopup = true;

        this.tagsPopupMenuItems.forEach((popupMenuItem) => {
            const { value } = popupMenuItem.dataset;
            const filterTag = this.productsListFilterNode.querySelector(`.ibexa-pc-edit-catalog-list-filter-tag[data-value="${value}"]`);
            const shouldShowTagInPopupMenu = filterTag && filterTag.classList.contains('ibexa-pc-edit-catalog-list-filter-tag--hidden');

            popupMenuItem.classList.toggle('ibexa-pc-edit-catalog-tags-popup-menu__item--hidden', !shouldShowTagInPopupMenu);

            if (shouldShowTagInPopupMenu) {
                shouldCloseItemsPopup = false;
            }
        });

        if (shouldCloseItemsPopup) {
            this.tagsPopup.closePopup();
        }
    }

    removeFilterTag(filterTagNode) {
        if (!this.productsListFilterNode) {
            return;
        }

        filterTagNode.remove();

        this.addedFilterTags = this.productsListFilterNode.querySelectorAll('.ibexa-pc-edit-catalog-list-filter-tag');

        this.updatePreviewValue();
        this.fitProductsListFilter();
        this.fitTagsPopupItems();
        document.body.dispatchEvent(new CustomEvent('ibexa-pc-filters:change'));
    }

    attachRemoveFilterTagEvents() {
        if (!this.productsListFilterNode) {
            return;
        }

        this.addedFilterTags.forEach((filterTagNode) => {
            const removeFilterTagBtn = filterTagNode.querySelector('.ibexa-tag__remove-btn');

            removeFilterTagBtn.addEventListener('click', () => this.removeFilterTag(filterTagNode), false);
        });
    }

    removePopupTag({ currentTarget }) {
        const removeBtnWrapper = currentTarget.closest('.ibexa-pc-edit-catalog-tags-popup-menu__item');
        const { value } = removeBtnWrapper.dataset;
        const filterTagNode = this.productsListFilterNode.querySelector(`.ibexa-pc-edit-catalog-list-filter-tag[data-value="${value}"]`);

        this.removeFilterTag(filterTagNode);
    }

    discardFilter() {
        this.discardChanges();

        const items = this.getItems();

        if (!items.length && !this.isDefault) {
            this.removePreview();
        }
    }

    saveFilter() {
        const items = this.getItems();

        this.updateProductsListTags(items);
        this.updatePreviewValue();
        this.fitTagsPopupItems();

        this.configPanel.closePanel();
        doc.body.dispatchEvent(new CustomEvent('ibexa-pc-filters:change'));
        this.storedItems = items;

        if (!items.length && !this.isDefault) {
            this.removePreview();
        }
    }

    updatePreviewValue() {
        const items = this.getItems();

        if (!items.length) {
            this.filterPreviewNoValue.classList.remove('ibexa-pc-edit-catalog-filter-preview__value-content--hidden');
            this.filterPreviewHasValue.classList.add('ibexa-pc-edit-catalog-filter-preview__value-content--hidden');

            return;
        }

        const valuePreviewLabel = this.getValuePreviewLabel();
        const valuePreviewTargetNode = this.filterPreviewHasValue.querySelector('.ibexa-middle-ellipsis__name-ellipsized');

        valuePreviewTargetNode.innerHTML = valuePreviewLabel;
        this.filterPreviewNoValue.classList.add('ibexa-pc-edit-catalog-filter-preview__value-content--hidden');
        this.filterPreviewHasValue.classList.remove('ibexa-pc-edit-catalog-filter-preview__value-content--hidden');
    }

    init() {
        this.toggleNoFiltersClass();
        this.fitProductsListFilter();
        this.fitTagsPopupItems();
        this.setParametersForAvailableFiltersTriggerBtn();
        this.configPanelSaveBtns.forEach((configPanelSaveBtn) => {
            configPanelSaveBtn.addEventListener('click', this.saveFilter, false);
        });
        this.configPanelCloseBtns.forEach((closeBtn) => {
            closeBtn.addEventListener('click', this.discardFilter, false);
        });
        this.tagsPopupMenuItems?.forEach((popupMenuItem) => {
            const removeBtn = popupMenuItem.querySelector('.ibexa-pc-edit-catalog-tags-popup-menu__item-remove-btn');

            removeBtn.addEventListener('click', this.removePopupTag, false);
        });

        if (this.getItems().length !== 0 || this.isDefault) {
            this.attachRemoveFilterTagEvents();
            this.addPreview();
        }
    }
}

export default BaseFilterConfig;
