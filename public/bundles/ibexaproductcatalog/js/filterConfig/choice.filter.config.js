import BaseFilterConfig from './base.filter.config';

const { Translator, ibexa } = window;

class ChoiceFilterConfig extends BaseFilterConfig {
    constructor(config) {
        super(config);

        this.checkboxItems = this.configPanelNode.querySelectorAll(
            '.ibexa-pc-edit-config-choice-filter__source-input .ibexa-input--checkbox',
        );
        this.searchInput = this.configPanelNode.querySelector('.ibexa-pc-edit-config-choice-filter__search-input');
        this.toggleSelectionBtn = this.configPanelNode.querySelector('.ibexa-pc-edit-config-choice-filter__action-toggle-selection');
        this.discardChanges = this.discardChanges.bind(this);
        this.getItems = this.getItems.bind(this);
        this.removeFilterTag = this.removeFilterTag.bind(this);
        this.removePreview = this.removePreview.bind(this);
        this.toggleSelection = this.toggleSelection.bind(this);
        this.searchItems = this.searchItems.bind(this);
    }

    getItems() {
        return [...this.checkboxItems]
            .filter((item) => item.checked)
            .map((item) => ({
                label: this.configPanelNode.querySelector(`[for="${item.id}"]`).innerHTML,
                value: item.value,
            }));
    }

    getRequestValue() {
        return this.getItems().map(({ value }) => value);
    }

    getValuePreviewLabel() {
        const items = this.getItems();
        let valuePreviewLabel = items[0]?.label ?? '';

        if (items.length > 1) {
            valuePreviewLabel += ` (+${items.length - 1})`;
        }

        return valuePreviewLabel;
    }

    removeFilterTag(tag) {
        const checkboxItem = this.configPanelNode.querySelector(
            `.ibexa-pc-edit-config-choice-filter__source-input .ibexa-input--checkbox[value="${tag.dataset.value}"]`,
        );

        checkboxItem.checked = false;
        checkboxItem.dispatchEvent(new Event('change'));

        super.removeFilterTag(tag);
    }

    discardChanges() {
        this.checkboxItems.forEach((checkboxItem) => {
            const isValueInStoredItems = this.storedItems.some((storedItem) => storedItem.value === checkboxItem.value);
            const shouldDispatchChangeEvent = checkboxItem.checked != isValueInStoredItems;

            checkboxItem.checked = isValueInStoredItems;

            if (shouldDispatchChangeEvent) {
                checkboxItem.dispatchEvent(new Event('change'));
            }
        });

        this.storedItems = [];
    }

    removePreview() {
        const checkboxSelectedItem = this.configPanelNode.querySelectorAll(
            `.ibexa-pc-edit-config-choice-filter__source-input .ibexa-input--checkbox:checked`,
        );

        checkboxSelectedItem.forEach((checkboxItem) => {
            checkboxItem.checked = false;
            checkboxItem.dispatchEvent(new Event('change'));
        });

        super.removePreview();
    }

    checkboxToggled() {
        const checkboxSelectedItem = this.configPanelNode.querySelectorAll(
            `.ibexa-pc-edit-config-choice-filter__source-input .ibexa-input--checkbox:checked`,
        );

        this.toggleSelectionBtn.innerHTML = checkboxSelectedItem.length
            ? Translator.trans(
                  /*@Desc("Clear all (%count%)")*/ 'catalog.edit.config_filter.clear_all_count',
                  { count: checkboxSelectedItem.length },
                  'ibexa_product_catalog',
              )
            : Translator.trans(/*@Desc("Select All")*/ 'catalog.edit.config_filter.select_all', {}, 'ibexa_product_catalog');
    }

    toggleSelection() {
        const checkboxSelectedItems = this.configPanelNode.querySelectorAll(
            `.ibexa-pc-edit-config-choice-filter__source-input .ibexa-input--checkbox:checked`,
        );

        if (checkboxSelectedItems.length) {
            checkboxSelectedItems.forEach((checkboxItem) => {
                checkboxItem.checked = false;
                checkboxItem.dispatchEvent(new Event('change'));
            });
        } else {
            const checkboxItems = this.configPanelNode.querySelectorAll(
                `.ibexa-pc-edit-config-choice-filter__source-input .ibexa-input--checkbox`,
            );

            checkboxItems.forEach((checkboxItem) => {
                checkboxItem.checked = true;
                checkboxItem.dispatchEvent(new Event('change'));
            });
        }
    }

    searchItems({ currentTarget }) {
        const itemFilterQueryLowerCase = currentTarget.value.toLowerCase();

        this.checkboxItems.forEach((checkboxItem) => {
            const checkboxItemWrapper = checkboxItem.closest('.ibexa-pc-edit-config-choice-filter__list-item');
            const checkboxItemNameNode = checkboxItemWrapper.querySelector('.ibexa-label');
            const checkboxItemNameLowerCase = checkboxItemNameNode.innerText.toLowerCase();
            const shouldHideCheckboxItem = !checkboxItemNameLowerCase.includes(itemFilterQueryLowerCase);

            checkboxItemWrapper.classList.toggle('ibexa-pc-edit-config-choice-filter__list-item--hidden', shouldHideCheckboxItem);
        });
    }

    init() {
        super.init();

        this.toggleSelectionBtn.addEventListener('click', () => this.toggleSelection(), false);
        this.checkboxItems.forEach((checkboxItem) => checkboxItem.addEventListener('change', () => this.checkboxToggled(), false));
        this.searchInput.addEventListener('input', this.searchItems, false);
    }
}

ibexa.addConfig('productCatalog.catalogs.filters.choice', ChoiceFilterConfig);

export default ChoiceFilterConfig;
