import TagsPopupMenu from './tags.popup.menu';
import ConfigPanel from '../config.panel';

const MAX_NUMBER_PRODUCTS_LIST_FILTER_TAGS = 5;
const doc = window.document;

class BaseFilterConfig {
    constructor(config) {
        this.previewNode = null;
        this.configPanel = null;
        this.configPanelNode = config.configPanelNode;
        this.productsListFilterNode = config.productsListFilterNode;
        this.relatedAvailablePopupItem = config.relatedAvailablePopupItem;
        this.configuredFiltersListNode = config.configuredFiltersListNode;
        this.filterPreviewTemplate = this.configuredFiltersListNode.dataset.filterPreviewTemplate;
        this.tagTemplate = this.productsListFilterNode.dataset.tagTemplate;
        this.filterId = this.configPanelNode.dataset.filterId;
        this.filterType = this.configPanelNode.dataset.filterType;
        this.filterLabel = this.configPanelNode.dataset.filterLabel;
        this.filterTagsTogglerBtn = this.productsListFilterNode.querySelector('.ibexa-pc-edit-catalog-list-filter__tags-toggler-btn');
        this.filterTagsPopupNode = this.productsListFilterNode.querySelector('.ibexa-pc-edit-catalog-tags-popup-menu');
        this.productListFilterTagsContainer = this.productsListFilterNode.querySelector('.ibexa-pc-edit-catalog-list-filter__tags');
        this.configPanelSaveBtns = this.configPanelNode.querySelectorAll('.ibexa-pc-config-panel__save-btn');
        this.configPanelCloseBtns = this.configPanelNode.querySelectorAll('.ibexa-btn--close-config-panel');
        this.removePreview = this.removePreview.bind(this);
        this.saveFilter = this.saveFilter.bind(this);
        this.discardFilter = this.discardFilter.bind(this);
        this.storeValue = this.storeValue.bind(this);

        if (this.filterTagsPopupNode) {
            this.tagsPopup = new TagsPopupMenu({
                triggerElement: this.filterTagsTogglerBtn,
                popupMenuElement: this.filterTagsPopupNode,
            });
        }
    }

    storeValue() {
        this.storedValue = this.getValue();
    }

    fitProductsListFilter() {
        const filterTagNodes = this.productListFilterTagsContainer.querySelectorAll('.ibexa-pc-edit-catalog-list-filter-tag');

        if (!filterTagNodes.length) {
            this.productsListFilterNode.classList.add('ibexa-pc-edit-catalog-list-filter--hidden');

            return;
        }

        let filterTagsOverContainerCount = 0;

        filterTagNodes.forEach((filterTagNode, tagIndex) => {
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
            .closest('.ibexa-pc-edit-catalog-filters__available-popup')
            .querySelectorAll('.ibexa-popup-menu__item:not(.ibexa-popup-menu__item--hidden)');
        const availableFiltersTriggerBtn = doc.querySelector('.ibexa-pc-edit-catalog-filters__available-popup-trigger');

        availableFiltersTriggerBtn.disabled = !availabelFilters.length;
    }

    addPreview(isTriggeredByUser) {
        const renderedFilterPreview = this.filterPreviewTemplate
            .replaceAll('{{ id }}', this.filterId)
            .replace('{{ type }}', this.filterType)
            .replace('{{ label }}', this.filterLabel);

        this.relatedAvailablePopupItem.classList.add('ibexa-popup-menu__item--hidden');
        this.configuredFiltersListNode.insertAdjacentHTML('beforeend', renderedFilterPreview);
        this.previewNode = doc.querySelector('.ibexa-pc-edit-catalog-filter-preview:last-of-type');

        this.setParametersForAvailableFiltersTriggerBtn();

        const openConfigPanelBtn = this.previewNode.querySelector('.ibexa-pc-edit-catalog-filter-preview__open-config-panel');

        this.configPanel = new ConfigPanel({
            wrapper: this.configPanelNode,
            trigger: openConfigPanelBtn,
        });

        this.configPanel.init();

        if (isTriggeredByUser) {
            this.configPanel.openPanel();
        }
    }

    removePreview() {
        this.fitProductsListFilter();
        this.relatedAvailablePopupItem.classList.remove('ibexa-popup-menu__item--hidden');
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

    saveFilter() {
        this.configPanel.closePanel();
        doc.body.dispatchEvent(new CustomEvent('ibexa-pc-filters:change'));
    }

    init() {
        this.toggleNoFiltersClass();
        this.fitProductsListFilter();
        this.setParametersForAvailableFiltersTriggerBtn();
        this.configPanelSaveBtns.forEach((configPanelSaveBtn) => {
            configPanelSaveBtn.addEventListener('click', this.saveFilter, false);
        });
    }
}

export default BaseFilterConfig;
