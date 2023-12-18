(function (global, doc, bootstrap, ibexa) {
    const scheduleHideWidget = doc.querySelector('.ibexa-extra-actions--schedule-hide');

    if (!scheduleHideWidget) {
        return;
    }

    const confirmButton = doc.querySelector('.ibexa-btn--hide-confirm');
    const modal = doc.querySelector('#hide-content-modal');
    const hideLaterRadio = scheduleHideWidget.querySelector('#hide-later');
    const hideNowRadio = scheduleHideWidget.querySelector('#hide-now');
    const pickerField = scheduleHideWidget.querySelector('.ibexa-picker');
    const dateTimePickerWidget = ibexa.helpers.objectInstances.getInstance(pickerField);
    const form = doc.querySelector('form[name="date_based_hide"]');

    dateTimePickerWidget.flatpickrInstance.config.minDate = Date.now();

    hideLaterRadio.addEventListener('change', () => {
        dateTimePickerWidget.inputField.removeAttribute('disabled');
        scheduleHideWidget.classList.remove('ibexa-pb-schedule-hide--hidden-calendar');
        dateTimePickerWidget.flatpickrInstance.setDate(Date.now(), true);
    });

    hideNowRadio.addEventListener('change', () => {
        dateTimePickerWidget.inputField.setAttribute('disabled', true);
        scheduleHideWidget.classList.add('ibexa-pb-schedule-hide--hidden-calendar');
        dateTimePickerWidget.flatpickrInstance.setDate(null, true);
    });

    if (modal) {
        modal.querySelector('.ibexa-btn--confirm').addEventListener('click', () => {
            form.submit();
        });
    }

    dateTimePickerWidget.inputField.disabled = !hideLaterRadio.hasAttribute('checked');

    confirmButton.addEventListener(
        'click',
        () => {
            if (modal) {
                bootstrap.Modal.getOrCreateInstance(modal).show();
            } else {
                form.submit();
            }
        },
        false,
    );
})(window, window.document, window.bootstrap, window.ibexa);
