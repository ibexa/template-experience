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
        this.isTimestamp = false;
        this.enableTime = false;

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

        const formatLabelDate = (date) => {
            const { dateFormat } = ibexa.adminUiConfig;
            const parsedDate = this.isTimestamp ? new Date(date * 1000).toString() : new Date(date);
            const displayedDateFormat = this.isTimestamp && this.enableTime ? dateFormat.shortDateTime : dateFormat.shortDate;

            return ibexa.helpers.timezone.formatShortDateTime(parsedDate, null, displayedDateFormat);
        };

        const minDateFormatted = formatLabelDate(minDate);
        const maxDateFormatted = formatLabelDate(maxDate);
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
        } else if (!minDate) {
            this.minDatePickerInstance.clear();
        }

        if (maxDate && this.sourceMaxInput.value !== maxDate) {
            this.maxDatePickerInstance.flatpickrInstance.setDate(new Date(maxDate), true);
        } else if (!maxDate) {
            this.maxDatePickerInstance.clear();
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
        const enableSeconds = input.dataset?.seconds === '1';
        const enableTime = !!input.dataset?.enabletime;
        let defaultDate;

        this.isTimestamp = !!input.dataset?.timestamp;
        this.enableTime = enableTime;

        if (input.value) {
            defaultDate = this.isTimestamp ? new Date(input.value * 1000) : new Date(input.value);
        }

        const dateTimePickerWidget = new ibexa.core.DateTimePicker({
            container,
            onChange: (timestamps, { dates }) => {
                const date = ibexa.helpers.timezone.formatShortDateTime(dates[0], null, 'yyyy-MM-dd');
                input.value = this.isTimestamp ? new Date(dates[0]).getTime() / 1000 : date;
            },
            flatpickrConfig: {
                enableTime,
                enableSeconds,
                time_24hr: enableTime,
                formatDate: (date) =>
                    ibexa.helpers.timezone.formatShortDateTime(
                        date,
                        null,
                        enableTime ? ibexa.adminUiConfig.dateFormat.shortDateTime : ibexa.adminUiConfig.dateFormat.shortDate,
                    ),
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
