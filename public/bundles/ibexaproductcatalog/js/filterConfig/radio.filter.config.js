import BaseFilterConfig from './base.filter.config';

class RadioFilterConfig extends BaseFilterConfig {
    constructor(config) {
        super(config);

        this.storedValue = null;
        this.clearFilterBtn = this.configPanelNode.querySelector('.ibexa-pc-edit-config-radio-filter__action-clear-checked');
        this.radioItems = this.configPanelNode.querySelectorAll('.ibexa-pc-edit-config-radio-filter__radio');
        this.addedFilterTag = this.productsListFilterNode.querySelector('.ibexa-pc-edit-catalog-list-filter-tag');
        this.clearFilter = this.clearFilter.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.updatePreviewValue = this.updatePreviewValue.bind(this);
        this.updateProductsListTags = this.updateProductsListTags.bind(this);
        this.attachRemoveFilterTagEvents = this.attachRemoveFilterTagEvents.bind(this);
        this.getValue = this.getValue.bind(this);
        this.removeFilterTag = this.removeFilterTag.bind(this);
    }

    attachRemoveFilterTagEvents() {
        if (!this.addedFilterTag) {
            return;
        }

        const removeTagBtn = this.addedFilterTag.querySelector('.ibexa-tag__remove-btn');

        removeTagBtn.addEventListener('click', this.removeFilterTag, false);
    }

    updatePreviewValue() {
        if (!this.previewNode) {
            return;
        }

        const filterPreviewValueNode = this.previewNode.querySelector('.ibexa-pc-edit-catalog-filter-preview__value');
        const checkedRadio = this.configPanelNode.querySelector('.ibexa-pc-edit-config-radio-filter__radio:checked');
        const filterPreviewValue = checkedRadio?.dataset.previewValueLabel ?? '';

        filterPreviewValueNode.innerHTML = filterPreviewValue;
    }

    updateProductsListTags() {
        const checkedRadio = this.configPanelNode.querySelector('.ibexa-pc-edit-config-radio-filter__radio:checked');

        this.addedFilterTag?.remove();

        if (checkedRadio) {
            const { previewValueLabel } = checkedRadio.dataset;
            const renderedFilterTag = this.tagTemplate.replaceAll('{{ content }}', previewValueLabel);

            this.productListFilterTagsContainer.insertAdjacentHTML('beforeend', renderedFilterTag);
        }

        this.productsListFilterNode.classList.toggle('ibexa-pc-edit-catalog-list-filter--hidden', !checkedRadio);
        this.addedFilterTag = this.productsListFilterNode.querySelector('.ibexa-pc-edit-catalog-list-filter-tag');
        this.attachRemoveFilterTagEvents();
    }

    valueChange() {
        this.updatePreviewValue();
        this.updateProductsListTags();
    }

    clearFilter() {
        this.radioItems.forEach((radioItem) => {
            if (radioItem.checked) {
                radioItem.checked = false;
                radioItem.dispatchEvent(new Event('change'));
            }
        });
    }

    discardFilter() {
        this.radioItems.forEach((radioItem) => {
            const currCheckedValue = radioItem.checked;

            radioItem.checked = radioItem.value === this.storedValue;

            if (currCheckedValue !== radioItem.checked) {
                radioItem.dispatchEvent(new Event('change'));
            }
        });
    }

    addPreview(isTriggeredByUser) {
        super.addPreview(isTriggeredByUser);

        const removePreviewBtn = this.previewNode.querySelector('.ibexa-pc-edit-catalog-filter-preview__remove-filter-preview');
        const openConfigPanelBtn = this.previewNode.querySelector('.ibexa-pc-edit-catalog-filter-preview__open-config-panel');

        openConfigPanelBtn.addEventListener('click', this.storeValue, false);
        removePreviewBtn.addEventListener('click', this.removePreview, false);

        this.updatePreviewValue();
    }

    removePreview() {
        super.removePreview();
        this.removeFilterTag();
    }

    removeFilterTag() {
        this.clearFilter();
        document.body.dispatchEvent(new CustomEvent('ibexa-pc-filters:change'));
    }

    getValue() {
        const checkedRadio = this.configPanelNode.querySelector('.ibexa-pc-edit-config-radio-filter__radio:checked');

        return checkedRadio?.value;
    }

    init() {
        super.init();

        const checkedRadio = this.configPanelNode.querySelector('.ibexa-pc-edit-config-radio-filter__radio:checked');

        this.clearFilterBtn.addEventListener('click', this.clearFilter, false);
        this.radioItems.forEach((radioItem) => radioItem.addEventListener('change', this.valueChange, false));
        this.configPanelCloseBtns.forEach((closeBtn) => {
            closeBtn.addEventListener('click', this.discardFilter, false);
        });

        if (checkedRadio) {
            this.addPreview();
            this.attachRemoveFilterTagEvents();
        }
    }
}

export default RadioFilterConfig;
