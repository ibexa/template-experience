import BaseFilterConfig from './base.filter.config';

const { ibexa } = window;

class DateRangeFilterConfig extends BaseFilterConfig {
    constructor(config) {
        super(config);

        this.sourceMinInput = this.configPanelNode.querySelector(
            '.ibexa-pc-edit-config-daterange-filter__field--min .ibexa-picker__form-input',
        );
        this.sourceMaxInput = this.configPanelNode.querySelector(
            '.ibexa-pc-edit-config-daterange-filter__field--max .ibexa-picker__form-input',
        );

        this.initDatePicker = this.initDatePicker.bind(this);
        this.discardChanges = this.discardChanges.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    getItems() {
        const minDate = this.sourceMinInput.value;
        const maxDate = this.sourceMaxInput.value;

        if (!minDate && !maxDate) {
            return [];
        }

        const minDateFormatted = ibexa.helpers.timezone.formatShortDateTime(
            new Date(minDate),
            null,
            ibexa.adminUiConfig.dateFormat.shortDate,
        );
        const maxDateFormatted = ibexa.helpers.timezone.formatShortDateTime(
            new Date(maxDate),
            null,
            ibexa.adminUiConfig.dateFormat.shortDate,
        );

        const label = `${minDate ? minDateFormatted : '...'} - ${maxDate ? maxDateFormatted : '...'}`;

        return [
            {
                minDate,
                maxDate,
                label,
                value: 'created',
            },
        ];
    }

    getRequestValue() {
        const [dateValue] = this.getItems();

        if (!dateValue) {
            return;
        }

        return {
            min: dateValue.minDate,
            max: dateValue.maxDate,
        };
    }

    getValuePreviewLabel() {
        const items = this.getItems();
        const valuePreviewLabel = items.length ? `(${items[0].label})` : '';

        return valuePreviewLabel;
    }

    removeFilterTag(tag) {
        this.clearField(this.sourceMinInput, this.minDatePickerInstance);
        this.clearField(this.sourceMaxInput, this.maxDatePickerInstance);

        super.removeFilterTag(tag);
    }

    discardChanges() {
        const { minDate, maxDate } = this.storedItems[0] ?? {};

        if (minDate && this.sourceMinInput.value !== minDate) {
            this.minDatePickerInstance.flatpickrInstance.setDate(new Date(minDate), true);
        }

        if (maxDate && this.sourceMaxInput.value !== maxDate) {
            this.maxDatePickerInstance.flatpickrInstance.setDate(new Date(maxDate), true);
        }

        this.storedItems = [];
    }

    removePreview() {
        this.clearField(this.sourceMinInput, this.minDatePickerInstance);
        this.clearField(this.sourceMaxInput, this.maxDatePickerInstance);

        super.removePreview();
    }

    clearField(input, pickerInstance) {
        if (input.value === '') {
            return;
        }

        pickerInstance.clear();
    }

    initDatePickers() {
        this.minDatePickerInstance = this.initDatePicker(this.sourceMinInput);
        this.maxDatePickerInstance = this.initDatePicker(this.sourceMaxInput);
    }

    initDatePicker(input) {
        const container = input.closest('.ibexa-pc-edit-config-daterange-filter__field');
        let defaultDate;

        if (input.value) {
            defaultDate = new Date(input.value);
        }

        const dateTimePickerWidget = new ibexa.core.DateTimePicker({
            container,
            onChange: (timestamps, { dates }) => {
                const date = ibexa.helpers.timezone.formatShortDateTime(dates[0], null, 'yyyy-MM-dd');

                input.value = date;
            },
            flatpickrConfig: {
                enableTime: false,
                formatDate: (date) => ibexa.helpers.timezone.formatShortDateTime(date, null, ibexa.adminUiConfig.dateFormat.shortDate),
                defaultDate,
            },
        });

        dateTimePickerWidget.clear = () => {
            dateTimePickerWidget.flatpickrInstance.clear();
            input.value = '';
            input.dispatchEvent(new Event('change'));
        };

        dateTimePickerWidget.init();

        return dateTimePickerWidget;
    }

    init() {
        this.initDatePickers();

        super.init();
    }
}

ibexa.addConfig('productCatalog.catalogs.filters.dateRange', DateRangeFilterConfig);

export default DateRangeFilterConfig;
