(function (global, doc, ibexa) {
    const secondsInDay = 86400;
    const MAIN_WRAPPER_SELECTOR = '.ibexa-time-range';
    const { convertDateToTimezone } = ibexa.helpers.timezone;
    const timePeriodNodes = doc.querySelectorAll(MAIN_WRAPPER_SELECTOR);
    const getUnixTimestampUTC = (dateObject) => {
        const date = new Date(Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate()));

        return Math.floor(date.getTime() / 1000);
    };
    const handleFlatPickrChange = (timestamps, { dates, inputField }) => {
        const timeRangeContainer = inputField.closest(MAIN_WRAPPER_SELECTOR);

        if (dates.length === 2) {
            const startDate = getUnixTimestampUTC(dates[0]);
            const endDate = getUnixTimestampUTC(dates[1]);
            const days = (endDate - startDate) / secondsInDay;

            setValues(timeRangeContainer, `P0Y0M${days}DT0H`, endDate);
            timeRangeContainer.querySelector('.ibexa-time-range__end-date').dispatchEvent(new Event('change'));
        } else if (dates.length === 0) {
            setValues(timeRangeContainer, '');
            timeRangeContainer.querySelector('.ibexa-time-range__end-date').dispatchEvent(new Event('change'));
        }
    };
    const handlePeriodListChange = (event) => {
        const { value } = event.target;
        const timeRangeContainer = event.target.closest(MAIN_WRAPPER_SELECTOR);
        const customTimeRangeContainer = timeRangeContainer.querySelector('.ibexa-time-range__custom-range-container');
        const method = value !== 'custom_range' ? 'add' : 'remove';

        customTimeRangeContainer.classList[method]('d-none');

        if (value !== 'custom_range') {
            setValues(timeRangeContainer, value);
            timeRangeContainer.querySelector('.ibexa-time-range__date-interval').dispatchEvent(new Event('change'));
        }
    };
    const setValues = (container, interval, endDate = '') => {
        container.querySelector('.ibexa-time-range__date-interval').setAttribute('value', interval);
        container.querySelector('.ibexa-time-range__end-date').setAttribute('value', endDate);
    };

    timePeriodNodes.forEach((node) => {
        const defaultDate = [];
        const periodListSelect = node.querySelector('select');
        const dateTimePickerField = node.querySelector('.ibexa-time-range__custom-date');
        const dateTimePickerInput = dateTimePickerField?.querySelector('.ibexa-date-time-picker__input');

        if (!dateTimePickerInput) {
            return;
        }

        if (dateTimePickerInput.dataset.start && dateTimePickerInput.dataset.end) {
            const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            defaultDate.push(
                new Date(convertDateToTimezone(dateTimePickerInput.dataset.start, browserTimezone, true)),
                new Date(convertDateToTimezone(dateTimePickerInput.dataset.end, browserTimezone, true)),
            );
        }

        const dateTimePickerWidget = new ibexa.core.DateTimePicker({
            container: dateTimePickerField,
            onChange: handleFlatPickrChange,
            flatpickrConfig: {
                mode: 'range',
                enableTime: false,
                formatDate: (date) => ibexa.helpers.timezone.formatFullDateTime(date, null, ibexa.adminUiConfig.dateFormat.shortDate),
                defaultDate,
            },
        });

        dateTimePickerWidget.init();

        periodListSelect.addEventListener('change', (event) => handlePeriodListChange(event), false);
    });
})(window, window.document, window.ibexa);
