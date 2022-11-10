import BaseFilterConfig from './base.filter.config';

const { ibexa } = window;

class RadioFilterConfig extends BaseFilterConfig {
    constructor(config) {
        super(config);

        this.clearFilterBtn = this.configPanelNode.querySelector('.ibexa-pc-edit-config-radio-filter__action-clear-checked');
        this.radioItems = this.configPanelNode.querySelectorAll('.ibexa-pc-edit-config-radio-filter__source-input .ibexa-input--radio');
        this.clearFilter = this.clearFilter.bind(this);
        this.discardChanges = this.discardChanges.bind(this);
        this.getItems = this.getItems.bind(this);
        this.removeFilterTag = this.removeFilterTag.bind(this);
        this.getLabel = this.getLabel.bind(this);
        this.updateProductsListTags = this.updateProductsListTags.bind(this);
    }

    getLabel() {
        const checkedRadio = this.configPanelNode.querySelector(
            '.ibexa-pc-edit-config-radio-filter__source-input .ibexa-input--radio:checked:not([value=""])',
        );

        if (!checkedRadio) {
            return '';
        }

        const labelNode = this.configPanelNode.querySelector(
            `.ibexa-pc-edit-config-radio-filter__source-input .ibexa-label--checkbox-radio[for="${checkedRadio.id}"]`,
        );

        return labelNode.innerHTML;
    }

    getItems() {
        const checkedRadio = this.configPanelNode.querySelector(
            '.ibexa-pc-edit-config-radio-filter__source-input .ibexa-input--radio:checked:not([value=""])',
        );

        return checkedRadio ? [{ label: this.getLabel(), value: checkedRadio.value }] : [];
    }

    getRequestValue() {
        const filterValue = this.getItems()[0]?.value;

        return filterValue === '' ? undefined : filterValue;
    }

    getValuePreviewLabel() {
        let valuePreviewLabel = '';
        const checkedRadio = this.configPanelNode.querySelector(
            '.ibexa-pc-edit-config-radio-filter__source-input .ibexa-input--radio:checked:not([value=""])',
        );

        if (checkedRadio) {
            const labelNode = this.configPanelNode.querySelector(
                `.ibexa-pc-edit-config-radio-filter__source-input .ibexa-label--checkbox-radio[for="${checkedRadio.id}"]`,
            );

            valuePreviewLabel = labelNode.innerHTML;
        }

        return valuePreviewLabel;
    }

    removeFilterTag(tag) {
        this.clearFilter();

        super.removeFilterTag(tag);
    }

    discardChanges() {
        const radioItem = this.configPanelNode.querySelector(
            `.ibexa-pc-edit-config-radio-filter__source-input .ibexa-input--radio[value="${this.storedItems[0]?.value}"]`,
        );
        const currentlyCheckedItem = this.configPanelNode.querySelector(
            `.ibexa-pc-edit-config-radio-filter__source-input .ibexa-input--radio:checked`,
        );

        if (radioItem && !radioItem.isSameNode(currentlyCheckedItem)) {
            radioItem.checked = true;
            radioItem.dispatchEvent(new Event('change'));
        }

        this.storedItems = [];
    }

    removePreview() {
        this.clearFilter();

        super.removePreview();
    }

    clearFilter() {
        const emptyOption = this.configPanelNode.querySelector(
            '.ibexa-pc-edit-config-radio-filter__source-input .ibexa-input--radio[value=""]',
        );

        emptyOption.checked = true;
        emptyOption.dispatchEvent(new Event('change'));
    }

    updateProductsListTags(tags = []) {
        if (tags[0]?.value === '') {
            super.updateProductsListTags();
        } else {
            super.updateProductsListTags(tags);
        }
    }

    init() {
        super.init();

        this.clearFilterBtn.addEventListener('click', this.clearFilter, false);
    }
}

ibexa.addConfig('productCatalog.catalogs.filters.radio', RadioFilterConfig);

export default RadioFilterConfig;
