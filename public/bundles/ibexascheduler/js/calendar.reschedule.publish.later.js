(function (global, doc, ibexa, bootstrap, flatpickr, Translator) {
    const SELECTOR_MODAL_RESCHEDULE = '#reschedule-publish-later-modal';
    const token = document.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = document.querySelector('meta[name="SiteAccess"]').content;
    const modal = doc.querySelector(SELECTOR_MODAL_RESCHEDULE);
    const confirmBtn = modal.querySelector('.ibexa-btn--confirm-reschedule');
    let selectedEvents = null;
    let selectedDate = null;
    const updateValue = ([timestamp]) => {
        confirmBtn.disabled = !timestamp;
        selectedDate = timestamp;
    };
    const showReschedulePublishLaterModal = () => {
        bootstrap.Modal.getOrCreateInstance(doc.querySelector(SELECTOR_MODAL_RESCHEDULE)).show();
    };
    const handleConfirm = () => {
        const errorMessage = Translator.trans(/*@Desc("Cannot reschedule")*/ 'reschedule.error.message', {}, 'ibexa_calendar_events');
        const body = {
            RescheduleAction: {
                events: Object.keys(selectedEvents),
                dateTime: selectedDate,
            },
        };
        const request = new Request('/api/ibexa/v2/calendar/event/future_publication', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/vnd.ibexa.api.calendar.future_publication.RescheduleAction+json',
                'X-CSRF-Token': token,
                'X-Siteaccess': siteaccess,
            },
            body: JSON.stringify(body),
            mode: 'same-origin',
            credentials: 'same-origin',
        });

        fetch(request)
            .then((response) => {
                if (response.ok) {
                    doc.body.dispatchEvent(new CustomEvent('ibexa-calendar-reload-data'));
                    doc.body.dispatchEvent(new CustomEvent('ibexa-calendar-clear-selection'));
                }
            })
            .catch(() => ibexa.helpers.notification.showErrorNotification(errorMessage));
    };
    const handleRescheduleEvents = ({ detail }) => {
        selectedEvents = detail.events;

        showReschedulePublishLaterModal();
    };

    if (!confirmBtn) {
        return;
    }

    const dateTimePickerWidget = new ibexa.core.DateTimePicker({
        container: modal.querySelector('.ibexa-reschedule-publish-later-modal__widget'),
        onChange: updateValue,
        flatpickrConfig: {
            minDate: Date.now(),
        },
    });

    dateTimePickerWidget.init();
    confirmBtn.addEventListener('click', handleConfirm, false);
    doc.body.addEventListener('future_publication:reschedule', handleRescheduleEvents, false);
})(window, window.document, window.ibexa, window.bootstrap, window.flatpickr, window.Translator);
