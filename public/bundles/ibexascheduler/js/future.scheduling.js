(function (global, doc, ibexa) {
    const confirmBtn = doc.querySelector('.ibexa-btn--confirm-schedule');
    const { convertDateToTimezone } = ibexa.helpers.timezone;
    const updateValue = ([timestamp]) => {
        confirmBtn.disabled = !timestamp;
    };
    const submitForm = () => {
        const { timestamp } = dateTimePickerWidget.inputField.dataset;

        doc.querySelector('[name="ezplatform_content_forms_content_edit[date_based_publisher][timestamp]"]').value = timestamp;
        doc.querySelector('[name="ezplatform_content_forms_content_edit[schedule_publish]"]').click();
    };

    if (!confirmBtn) {
        return;
    }

    const userTimezoneCurrentTime = convertDateToTimezone(new Date());
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const minDate = new Date(convertDateToTimezone(userTimezoneCurrentTime, browserTimezone, true));

    const dateTimePickerWidget = new ibexa.core.DateTimePicker({
        container: doc.querySelector('.ibexa-scheduler-publish-later'),
        onChange: updateValue,
        flatpickrConfig: {
            minDate,
            defaultHour: minDate.getHours(),
            defaultMinute: minDate.getMinutes(),
        },
    });

    dateTimePickerWidget.init();
    confirmBtn.addEventListener('click', submitForm, false);
})(window, document, window.ibexa);
