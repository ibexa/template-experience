import BaseFilterConfig from '@ibexa-product-catalog/src/bundle/Resources/public/js/filterConfig/base.filter.config';

const { ibexa } = window;

class GroupFilterConfig extends BaseFilterConfig {
    constructor(config) {
        super(config);

        this.toggleMinSelectionBtn = this.configPanelNode.querySelector('.ibexa-edit-config-group-filter__field--min .ibexa-input--select');
        this.toggleMaxSelectionBtn = this.configPanelNode.querySelector('.ibexa-edit-config-group-filter__field--max .ibexa-input--select');
        this.sourceMinSelectInput = this.configPanelNode.querySelector('.ibexa-edit-config-group-filter__field--min .ibexa-dropdown');
        this.sourceMaxSelectInput = this.configPanelNode.querySelector('.ibexa-edit-config-group-filter__field--max .ibexa-dropdown');
        this.sourceMinNumberInput = this.configPanelNode.querySelector(
            '.ibexa-edit-config-group-filter__field--min .ibexa-input-text-wrapper--type-number .ibexa-input--text',
        );
        this.sourceMaxNumberInput = this.configPanelNode.querySelector(
            '.ibexa-edit-config-group-filter__field--max .ibexa-input-text-wrapper--type-number .ibexa-input--text',
        );
        this.groupType = this.configPanelNode.dataset.groupType === 'month' ? 'month' : 'quarter';

        this.clearValues = this.clearValues.bind(this);
        this.handleSourceValueBlur = this.handleSourceValueBlur.bind(this);
        this.attachHandleBlurInputsEvents = this.attachHandleBlurInputsEvents.bind(this);
        this.discardChanges = this.discardChanges.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    getItems() {
        const selectedMin = this.sourceMinSelectInput.querySelector('.ibexa-dropdown__selected-item').dataset.value;
        const selectedMax = this.sourceMaxSelectInput.querySelector('.ibexa-dropdown__selected-item').dataset.value;
        const options = [...this.toggleMinSelectionBtn.options];
        const selectedMinOption = options.find((item) => item.value === selectedMin)?.innerText ?? '';
        const selectedMaxOption = options.find((item) => item.value === selectedMax)?.innerText ?? '';
        const min = {
            [this.groupType]: selectedMin.length > 0 ? selectedMin : undefined,
            year: this.sourceMinNumberInput.value,
        };
        const max = {
            [this.groupType]: selectedMax.length > 0 ? selectedMax : undefined,
            year: this.sourceMaxNumberInput.value,
        };

        if (!min[this.groupType] || !max[this.groupType] || !min.year || !max.year) {
            return [];
        }

        const label = `${selectedMinOption} ${min.year} - ${selectedMaxOption} ${max.year}`;

        return [
            {
                min,
                max,
                label,
                value: 'group',
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

        if (!min || this.sourceMinNumberInput.value !== min.year) {
            this.sourceMinNumberInput.value = min?.year ?? '';
            this.sourceMinNumberInput.dispatchEvent(new Event('change'));
        }

        if (!max || this.sourceMaxNumberInput.value !== max.year) {
            this.sourceMaxNumberInput.value = max?.year ?? '';
            this.sourceMaxNumberInput.dispatchEvent(new Event('change'));
        }

        if (min && this.sourceMinSelectInput.querySelector('.ibexa-dropdown__selected-item').dataset.value !== min[this.groupType]) {
            this.dropdownInstance = ibexa.helpers.objectInstances.getInstance(this.sourceMinSelectInput);
            this.dropdownInstance.selectOption(min[this.groupType]);
        }

        if (max && this.sourceMaxSelectInput.querySelector('.ibexa-dropdown__selected-item').dataset.value !== max[this.groupType]) {
            this.dropdownInstance = ibexa.helpers.objectInstances.getInstance(this.sourceMaxSelectInput);
            this.dropdownInstance.selectOption(max[this.groupType]);
        }
    }

    removePreview() {
        this.clearValues();

        super.removePreview();
    }

    validateInput(numberInput, selectInput) {
        let isError = false;

        if (numberInput.value === '') {
            isError = true;

            this.setErrorField(numberInput);
            this.toggleInputError(numberInput);
        }

        if (!Number.isInteger(Number(numberInput.value))) {
            isError = true;

            this.setNotIntErrorField(numberInput);
            this.toggleInputError(numberInput);
        }

        if (selectInput.querySelector('.ibexa-dropdown__selected-item').dataset.value?.length === 0) {
            isError = true;

            this.setSelectErrorField(selectInput, true);
            this.toggleInputError(selectInput);
        }
        return isError;
    }

    saveFilter() {
        const hasMinInputError = this.validateInput(this.sourceMinNumberInput, this.sourceMinSelectInput);
        const hasMaxInputError = this.validateInput(this.sourceMaxNumberInput, this.sourceMaxSelectInput);

        if (!hasMinInputError && !hasMaxInputError) {
            super.saveFilter();
        }
    }

    clearSelection(input) {
        this.dropdownInstance = ibexa.helpers.objectInstances.getInstance(input);
        this.dropdownInstance.selectFirstOption();
        this.toggleMinSelectionBtn.dispatchEvent(new Event('change'));

        this.setSelectErrorField(input, false);
        this.toggleInputError(input, false);
    }

    clearInput(input) {
        const clearedValue = input.value;

        input.value = '';

        if (input.value !== clearedValue) {
            input.dispatchEvent(new Event('change'));
        }
    }

    clearValues() {
        this.clearInput(this.sourceMinNumberInput);
        this.clearInput(this.sourceMaxNumberInput);
        this.clearSelection(this.sourceMinSelectInput);
        this.clearSelection(this.sourceMaxSelectInput);
    }

    toggleInputError(field, isError = true) {
        field.classList.toggle('is-invalid', isError);
    }

    setErrorField(field, isError = true) {
        field
            .closest('.ibexa-datetime-attribute__grouped-filter')
            .querySelector('.ibexa-pc-edit-config-number-range-filter__empty-error')
            .toggleAttribute('hidden', !isError);
    }

    setSelectErrorField(field, isError = true) {
        field
            .closest('.ibexa-datetime-attribute__grouped-filter')
            .querySelector('.ibexa-pc-edit-config-select-filter__empty-error')
            .toggleAttribute('hidden', !isError);
    }

    setNotIntErrorField(field, isError = true) {
        field
            .closest('.ibexa-datetime-attribute__grouped-filter')
            .querySelector('.ibexa-pc-edit-config-number-range-filter__not-integer-error')
            .toggleAttribute('hidden', !isError);
    }

    handleSourceValueBlur({ target }) {
        const isNumberValueEmpty = target.value === '';
        const isValueNotInteger = !Number.isInteger(Number(target.value));

        this.setErrorField(target, isNumberValueEmpty);
        this.setNotIntErrorField(target, isValueNotInteger);
        this.toggleInputError(target, isNumberValueEmpty || isValueNotInteger);
    }

    attachHandleBlurInputsEvents() {
        this.sourceMinNumberInput.addEventListener('blur', this.handleSourceValueBlur, false);
        this.sourceMaxNumberInput.addEventListener('blur', this.handleSourceValueBlur, false);
    }

    toggleSelection(target) {
        const selectedOption = target.querySelector('.ibexa-dropdown__selected-item').dataset.value;
        const isSelectEmpty = !selectedOption || selectedOption.length === 0;

        this.setSelectErrorField(target, isSelectEmpty);
        this.toggleInputError(target, isSelectEmpty);
    }

    init() {
        super.init();

        this.toggleMinSelectionBtn.addEventListener('change', () => this.toggleSelection(this.sourceMinSelectInput), false);
        this.toggleMaxSelectionBtn.addEventListener('change', () => this.toggleSelection(this.sourceMaxSelectInput), false);
        this.attachHandleBlurInputsEvents();
    }
}

ibexa.addConfig('productCatalog.catalogs.filters.group', GroupFilterConfig);

export default GroupFilterConfig;
