(function (global, doc, bootstrap) {
    const scheduleHideWidget = doc.querySelector('.ibexa-extra-actions--schedule-hide');

    if (!scheduleHideWidget) {
        return;
    }

    const confirmButton = doc.querySelector('.ibexa-btn--hide-confirm');
    const modal = doc.querySelector('#hide-content-modal');
    const hideLaterRadio = scheduleHideWidget.querySelector('#hide-later');
    const hideNowRadio = scheduleHideWidget.querySelector('#hide-now');
    const pickerInput = scheduleHideWidget.querySelector('.ibexa-picker__input');
    const flatpickrInstance = pickerInput._flatpickr;
    const form = doc.querySelector('form[name="date_based_hide"]');

    flatpickrInstance.config.minDate = Date.now();

    hideLaterRadio.addEventListener('change', () => {
        pickerInput.removeAttribute('disabled');
        scheduleHideWidget.classList.remove('ibexa-pb-schedule-hide--hidden-calendar');
    });

    hideNowRadio.addEventListener('change', () => {
        pickerInput.setAttribute('disabled', true);
        scheduleHideWidget.classList.add('ibexa-pb-schedule-hide--hidden-calendar');
        flatpickrInstance.setDate(null, true);
    });

    if (modal) {
        modal.querySelector('.ibexa-btn--confirm').addEventListener('click', () => {
            form.submit();
        });
    }

    if (hideLaterRadio.hasAttribute('checked')) {
        pickerInput.removeAttribute('disabled');
    }

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
})(window, window.document, window.bootstrap);
