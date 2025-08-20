(function (global, doc, bootstrap, ibexa) {
    const scheduleHideNodes = doc.querySelectorAll('.ibexa-extra-actions--schedule-hide');

    scheduleHideNodes.forEach((scheduleHideNode) => {
        const confirmButton = scheduleHideNode.querySelector('.ibexa-btn--hide-confirm');
        const hideLaterRadio = scheduleHideNode.querySelector('#hide-later');
        const hideNowRadio = scheduleHideNode.querySelector('#hide-now');
        const pickerField = scheduleHideNode.querySelector('.ibexa-picker');
        const dateTimePickerWidget = ibexa.helpers.objectInstances.getInstance(pickerField);
        const form = scheduleHideNode.querySelector('form');

        const { convertDateToTimezone } = ibexa.helpers.timezone;
        const userTimezoneCurrentTime = convertDateToTimezone(new Date());
        const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const minDate = new Date(convertDateToTimezone(userTimezoneCurrentTime, browserTimezone, true));

        dateTimePickerWidget.flatpickrInstance.config.minDate = minDate;

        hideLaterRadio.addEventListener('change', () => {
            dateTimePickerWidget.inputField.removeAttribute('disabled');
            scheduleHideNode.classList.remove('ibexa-pb-schedule-hide--hidden-calendar');
            dateTimePickerWidget.flatpickrInstance.setDate(minDate.getTime(), true);
        });

        hideNowRadio.addEventListener('change', () => {
            dateTimePickerWidget.inputField.setAttribute('disabled', true);
            scheduleHideNode.classList.add('ibexa-pb-schedule-hide--hidden-calendar');
            dateTimePickerWidget.flatpickrInstance.setDate(null, true);
        });

        dateTimePickerWidget.inputField.disabled = !hideLaterRadio.hasAttribute('checked');

        confirmButton.addEventListener(
            'click',
            () => {
                const modal = scheduleHideNode.dataset.modalSelector ? doc.querySelector(scheduleHideNode.dataset.modalSelector) : null;

                if (modal) {
                    bootstrap.Modal.getOrCreateInstance(modal).show();

                    modal.querySelector('.ibexa-btn--confirm').addEventListener('click', () => {
                        form.submit();
                    });
                } else {
                    form.submit();
                }
            },
            false,
        );
    });
})(window, window.document, window.bootstrap, window.ibexa);
