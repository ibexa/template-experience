import BaseFilterConfig from './base.filter.config';

const { document, Translator } = window;

class ChoiceFilterConfig extends BaseFilterConfig {
    constructor(config) {
        super(config);

        this.storedValue = [];
        this.sourceFilterInput = this.configPanelNode.querySelector('.ibexa-pc-edit-config-choice-filter__source-input');
        this.checkboxItems = this.configPanelNode.querySelectorAll('.ibexa-pc-edit-config-choice-filter__list-item-checkbox');
        this.checkedCheckboxItems = this.configPanelNode.querySelectorAll(
            '.ibexa-pc-edit-config-choice-filter__list-item-checkbox:checked',
        );
        this.addedFilterTags = this.productsListFilterNode.querySelectorAll('.ibexa-pc-edit-catalog-list-filter-tag');
        this.toggleSelectionsBtn = this.configPanelNode.querySelector('.ibexa-pc-edit-config-choice-filter__action-toggle-selection');
        this.tagsPopupMenuItems = this.productsListFilterNode.querySelectorAll(
            '.ibexa-pc-edit-catalog-tags-popup-menu .ibexa-pc-edit-catalog-tags-popup-menu__item',
        );
        this.removePopupTag = this.removePopupTag.bind(this);
        this.choiceChange = this.choiceChange.bind(this);
        this.getValue = this.getValue.bind(this);
        this.attachRemoveFilterTagEvents = this.attachRemoveFilterTagEvents.bind(this);
    }

    toggleSelection(forcedCheckedValue) {
        const shouldCheckedItems = typeof forcedCheckedValue !== 'undefined' ? forcedCheckedValue : !this.checkedCheckboxItems.length;

        this.checkboxItems.forEach((checkboxItem) => {
            const shouldDispatchChangeEvent = checkboxItem.checked != shouldCheckedItems;

            checkboxItem.checked = shouldCheckedItems;

            if (shouldDispatchChangeEvent) {
                checkboxItem.dispatchEvent(new Event('change'));
            }
        });
    }

    getValue() {
        return [...this.sourceFilterInput.options].filter((option) => option.selected).map((option) => option.value);
    }

    discardFilter() {
        this.checkboxItems.forEach((checkboxItem) => {
            const isValueInStoredValues = this.storedValue.includes(checkboxItem.value);
            const shouldDispatchChangeEvent = checkboxItem.checked != isValueInStoredValues;

            checkboxItem.checked = isValueInStoredValues;

            if (shouldDispatchChangeEvent) {
                checkboxItem.dispatchEvent(new Event('change'));
            }
        });
    }

    choiceChange() {
        this.checkedItems = this.configPanelNode.querySelectorAll('.ibexa-pc-edit-config-choice-filter__list-item-checkbox:checked');
        this.checkedCheckboxItems = this.configPanelNode.querySelectorAll(
            '.ibexa-pc-edit-config-choice-filter__list-item-checkbox:checked',
        );
        this.toggleSelectionsBtn.innerHTML = this.checkedCheckboxItems.length
            ? Translator.trans(
                  /*@Desc("Clear all (%count%)")*/ 'catalog.edit.config_filter.clear_all_count',
                  { count: this.checkedCheckboxItems.length },
                  'product_catalog',
              )
            : Translator.trans(/*@Desc("Select All")*/ 'catalog.edit.config_filter.select_all', {}, 'product_catalog');

        this.updatePreviewValue();
        this.updateProductsListTags();
        this.updateValue();
        this.fitTagsPopupItems();
    }

    fitTagsPopupItems() {
        let shouldCloseItemsPopup = true;

        this.tagsPopupMenuItems.forEach((popupMenuItem) => {
            const { choiceValue } = popupMenuItem.dataset;
            const filterTag = this.productsListFilterNode.querySelector(
                `.ibexa-pc-edit-catalog-list-filter-tag[data-choice-value="${choiceValue}"]`,
            );
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

    updatePreviewValue() {
        const filterPreviewValueNode = this.previewNode.querySelector('.ibexa-pc-edit-catalog-filter-preview__value');
        const filterPreviewValue = `(${this.checkedCheckboxItems.length}/${this.checkboxItems.length})`;

        filterPreviewValueNode.innerHTML = filterPreviewValue;
    }

    updateProductsListTags() {
        this.addedFilterTags.forEach((filterTag) => filterTag.remove());
        this.checkboxItems.forEach((checkboxItem) => {
            const checkboxItemNameNode = checkboxItem
                .closest('.ibexa-pc-edit-config-choice-filter__list-item')
                .querySelector('.ibexa-pc-edit-config-choice-filter__list-item-label');
            const checkboxItemName = checkboxItemNameNode.innerHTML;
            const checkboxItemValue = checkboxItem.value;

            if (checkboxItem.checked) {
                const renderedFilterTag = this.tagTemplate.replaceAll('{{ content }}', checkboxItemName);

                this.productListFilterTagsContainer.insertAdjacentHTML('beforeend', renderedFilterTag);

                const lastFilterTag = this.productListFilterTagsContainer.querySelector(
                    '.ibexa-pc-edit-catalog-list-filter-tag:last-of-type',
                );

                lastFilterTag.dataset.choiceValue = checkboxItemValue;
            }
        });

        this.addedFilterTags = this.productsListFilterNode.querySelectorAll('.ibexa-pc-edit-catalog-list-filter-tag');
        this.attachRemoveFilterTagEvents(this.addedFilterTags);

        super.fitProductsListFilter();
    }

    updateValue() {
        this.checkboxItems.forEach((checkboxItem) => {
            const sourceOption = this.sourceFilterInput.querySelector(`option[value="${checkboxItem.value}"]`);

            sourceOption.toggleAttribute('selected', checkboxItem.checked);
        });
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
        this.toggleSelection(false);

        super.removePreview();
    }

    removeFilterTag(filterTagNode) {
        const { choiceValue } = filterTagNode.dataset;
        const releatedSelectionCheckbox = this.configPanelNode.querySelector(
            `.ibexa-pc-edit-config-choice-filter__list-item-checkbox[value="${choiceValue}"]`,
        );

        releatedSelectionCheckbox.checked = false;
        releatedSelectionCheckbox.dispatchEvent(new Event('change'));

        filterTagNode.remove();
        document.body.dispatchEvent(new CustomEvent('ibexa-pc-filters:change'));
    }

    removePopupTag({ currentTarget }) {
        const removeBtnWrapper = currentTarget.closest('.ibexa-pc-edit-catalog-tags-popup-menu__item');
        const { choiceValue } = removeBtnWrapper.dataset;
        const filterTagNode = this.productsListFilterNode.querySelector(
            `.ibexa-pc-edit-catalog-list-filter-tag[data-choice-value="${choiceValue}"]`,
        );

        this.removeFilterTag(filterTagNode);
    }

    attachRemoveFilterTagEvents(filterTagNodes) {
        filterTagNodes.forEach((filterTagNode) => {
            const removeFilterTagBtn = filterTagNode.querySelector('.ibexa-tag__remove-btn');

            removeFilterTagBtn.addEventListener('click', () => this.removeFilterTag(filterTagNode), false);
        });
    }

    init() {
        super.init();

        const filterTagNodes = this.productListFilterTagsContainer.querySelectorAll('.ibexa-pc-edit-catalog-list-filter-tag');
        const selectedOptions = [...this.sourceFilterInput.options].filter((option) => option.selected).map((option) => option.value);

        this.checkboxItems.forEach((checkboxItem) => checkboxItem.addEventListener('change', this.choiceChange, false));
        this.toggleSelectionsBtn.addEventListener('click', () => this.toggleSelection(), false);
        this.tagsPopupMenuItems.forEach((popupMenuItem) => {
            const removeBtn = popupMenuItem.querySelector('.ibexa-pc-edit-catalog-tags-popup-menu__item-remove-btn');

            removeBtn.addEventListener('click', this.removePopupTag, false);
        });
        this.configPanelCloseBtns.forEach((closeBtn) => {
            closeBtn.addEventListener('click', this.discardFilter, false);
        });
        this.attachRemoveFilterTagEvents(filterTagNodes);

        if (selectedOptions.length) {
            this.addPreview();
        }
    }
}

export default ChoiceFilterConfig;
