import BaseFilterConfig from './base.filter.config';

const { ibexa } = window;

class NumberRangeFilterConfig extends BaseFilterConfig {
    constructor(config) {
        super(config);

        this.sourceMinInput = this.configPanelNode.querySelector('.ibexa-pc-edit-config-number-range-filter__field--min .ibexa-input');
        this.sourceMaxInput = this.configPanelNode.querySelector('.ibexa-pc-edit-config-number-range-filter__field--max .ibexa-input');

        this.clearValues = this.clearValues.bind(this);
        this.handleSourceValueBlur = this.handleSourceValueBlur.bind(this);
        this.attachHandleBlurInputsEvents = this.attachHandleBlurInputsEvents.bind(this);
        this.discardChanges = this.discardChanges.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    getItems() {
        const min = this.sourceMinInput.value;
        const max = this.sourceMaxInput.value;

        if (!min || !max) {
            return [];
        }

        const label = `${min} - ${max}`;

        return [
            {
                min,
                max,
                label,
                value: 'number',
            },
        ];
    }

    getRequestValue() {
        const [rangeItem] = this.getItems();

        if (!rangeItem) {
            return;
        }

        return {
            min: rangeItem.min,
            max: rangeItem.max,
        };
    }

    getValuePreviewLabel() {
        const items = this.getItems();
        const valuePreviewLabel = items.length ? `(${items[0].label})` : '';

        return valuePreviewLabel;
    }

    removeFilterTag(tag) {
        this.clearValues();

        super.removeFilterTag(tag);
    }

    discardChanges() {
        const { min, max } = this.storedItems[0] ?? {};

        if (this.sourceMinInput.value !== min) {
            this.sourceMinInput.value = min ?? '';
            this.sourceMinInput.dispatchEvent(new Event('change'));
        }

        if (this.sourceMaxInput.value !== max) {
            this.sourceMaxInput.value = max ?? '';
            this.sourceMaxInput.dispatchEvent(new Event('change'));
        }
    }

    removePreview() {
        this.clearValues();

        super.removePreview();
    }

    saveFilter() {
        let isError = false;

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
    }

    setErrorField(field, isError = true) {
        field.classList.toggle('is-invalid', isError);
        field
            .closest('.ibexa-pc-edit-config-number-range-filter__field')
            .querySelector('.ibexa-pc-edit-config-number-range-filter__empty-error')
            .toggleAttribute('hidden', !isError);
    }

    handleSourceValueBlur({ target }) {
        const isPriceValueEmpty = target.value === '';

        this.setErrorField(target, isPriceValueEmpty);
    }

    attachHandleBlurInputsEvents() {
        this.sourceMinInput.addEventListener('blur', this.handleSourceValueBlur, false);
        this.sourceMaxInput.addEventListener('blur', this.handleSourceValueBlur, false);
    }

    init() {
        super.init();

        this.attachHandleBlurInputsEvents();
    }
}

ibexa.addConfig('productCatalog.catalogs.filters.numberRange', NumberRangeFilterConfig);

export default NumberRangeFilterConfig;
