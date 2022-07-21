import BaseFilterConfig from './base.filter.config';

const { ibexa } = window;

class PriceFilterConfig extends BaseFilterConfig {
    constructor(config) {
        super(config);

        this.sourceMinInput = this.configPanelNode.querySelector('.ibexa-pc-edit-config-price-filter__field--min .ibexa-input');
        this.sourceMaxInput = this.configPanelNode.querySelector('.ibexa-pc-edit-config-price-filter__field--max .ibexa-input');
        this.addedFilterTag = this.productsListFilterNode.querySelector('.ibexa-pc-edit-catalog-list-filter-tag');

        this.clearValues = this.clearValues.bind(this);
        this.handleSourceDropdownValueChange = this.handleSourceDropdownValueChange.bind(this);
        this.handleSourceValueBlur = this.handleSourceValueBlur.bind(this);
        this.attachHandleChangeInputsEvents = this.attachHandleChangeInputsEvents.bind(this);
        this.attachHandleBlurInputsEvents = this.attachHandleBlurInputsEvents.bind(this);
        this.discardChanges = this.discardChanges.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    getItems() {
        const currency = this.dropdownInstance.sourceInput.value;
        const minPrice = this.sourceMinInput.value;
        const maxPrice = this.sourceMaxInput.value;

        if (!currency || !minPrice || !maxPrice) {
            return [];
        }

        const label = `${minPrice} - ${maxPrice}${currency}`;

        return [
            {
                currency,
                minPrice,
                maxPrice,
                label,
                value: 'price',
            },
        ];
    }

    getRequestValue() {
        const [priceItem] = this.getItems();

        if (!priceItem) {
            return;
        }

        return {
            currency: priceItem.currency,
            min_price: priceItem.minPrice,
            max_price: priceItem.maxPrice,
        };
    }

    removeFilterTag(tag) {
        this.clearValues();

        super.removeFilterTag(tag);
    }

    discardChanges() {
        const { currency, minPrice, maxPrice } = this.storedItems[0] ?? {};

        if (this.sourceMinInput.value !== minPrice) {
            this.sourceMinInput.value = minPrice ?? '';
            this.sourceMinInput.dispatchEvent(new Event('change'));
        }

        if (this.sourceMaxInput.value !== maxPrice) {
            this.sourceMaxInput.value = maxPrice ?? '';
            this.sourceMaxInput.dispatchEvent(new Event('change'));
        }

        if (currency) {
            this.dropdownInstance.selectOption(currency);
        } else {
            this.dropdownInstance.clearCurrentSelection();
        }
    }

    removePreview() {
        this.clearValues();

        super.removePreview();
    }

    updatePreviewValue() {
        let previewValue = '';

        if (this.getItems()[0]) {
            previewValue = `(${this.getItems()[0]?.label})`;
        }

        this.filterPreviewValue.innerHTML = previewValue;
    }

    saveFilter() {
        let isError = false;

        if (this.dropdownInstance.sourceInput.value === '') {
            isError = true;

            this.setErrorField(this.dropdownInstance.container);
        }

        if (this.sourceMinInput.value === '') {
            isError = true;

            this.setErrorField(this.sourceMinInput);
        }

        if (this.sourceMaxInput.value === '') {
            isError = true;

            this.setErrorField(this.sourceMaxInput);
        }

        if (!isError) {
            super.saveFilter();
        }
    }

    clearValues() {
        this.sourceMinInput.value = '';
        this.sourceMinInput.dispatchEvent(new Event('change'));
        this.sourceMaxInput.value = '';
        this.sourceMaxInput.dispatchEvent(new Event('change'));
        this.dropdownInstance.clearCurrentSelection();
    }

    setErrorField(field, isError = true) {
        field.classList.toggle('is-invalid', isError);
        field
            .closest('.ibexa-pc-edit-config-price-filter__field')
            .querySelector('.ibexa-pc-edit-config-price-filter__empty-error')
            .toggleAttribute('hidden', !isError);
    }

    initializeDropdown() {
        const dropdownNode = this.configPanelNode.querySelector('.ibexa-dropdown');

        this.dropdownInstance = ibexa.helpers.objectInstances.getInstance(dropdownNode);
    }

    handleSourceDropdownValueChange() {
        if (!this.sourceMinInput.value && !this.sourceMaxInput.value) {
            return;
        }

        const isDropdownValueEmpty = this.dropdownInstance.sourceInput.value === '';

        this.setErrorField(this.dropdownInstance.container, isDropdownValueEmpty);
    }

    handleSourceValueBlur({ target }) {
        const isPriceValueEmpty = target.value === '';

        this.setErrorField(target, isPriceValueEmpty);
    }

    attachHandleChangeInputsEvents() {
        this.dropdownInstance.sourceInput.addEventListener('change', this.handleSourceDropdownValueChange, false);
    }

    attachHandleBlurInputsEvents() {
        this.sourceMinInput.addEventListener('blur', this.handleSourceValueBlur, false);
        this.sourceMaxInput.addEventListener('blur', this.handleSourceValueBlur, false);
    }

    init() {
        this.initializeDropdown();
        this.attachHandleChangeInputsEvents();
        this.attachHandleBlurInputsEvents();

        super.init();
    }
}

export default PriceFilterConfig;
