(function (global, doc, ibexa, bootstrap, flatpickr, Translator) {
    const SELECTOR_MODAL_RESCHEDULE = '#reschedule-publish-later-modal';
    const token = document.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = document.querySelector('meta[name="SiteAccess"]').content;
    const modal = doc.querySelector(SELECTOR_MODAL_RESCHEDULE);
    const flatpickrInput = modal.querySelector('.flatpickr-date-input');
    const btnClear = doc.querySelector('.ibexa-reschedule-publish-later-modal__clear-input');
    const confirmBtn = modal.querySelector('.ibexa-btn--confirm-reschedule');
    const { convertDateToTimezone, formatShortDateTime } = ibexa.helpers.timezone;
    let selectedEvents = null;
    let selectedDate = null;
    const updateValue = (dates) => {
        const isDateSelected = !!dates[0];

        if (!isDateSelected) {
            confirmBtn.disabled = true;
            selectedDate = null;

            return;
        }

        const selectedDateWithUserTimezone = convertDateToTimezone(dates[0], undefined, true);
        const timestamp = Math.floor(selectedDateWithUserTimezone.valueOf() / 1000);

        selectedDate = timestamp;
        confirmBtn.disabled = false;
    };
    const showReschedulePublishLaterModal = () => {
        bootstrap.Modal.getOrCreateInstance(doc.querySelector(SELECTOR_MODAL_RESCHEDULE)).show();
    };
    const handleConfirm = () => {
        const errorMessage = Translator.trans(/*@Desc("Cannot reschedule")*/ 'reschedule.error.message', {}, 'ezplatform_calendar_events');
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
            .catch(() => window.ibexa.helpers.notification.showErrorNotification(errorMessage));
    };
    const handleRescheduleEvents = ({ detail }) => {
        selectedEvents = detail.events;

        showReschedulePublishLaterModal();
    };
    const onClearBtnClick = (flatpickrInstance, event) => {
        event.preventDefault();

        flatpickrInstance.setDate(null, true);
    };

    if (!confirmBtn) {
        return;
    }

    const flatpickrInstance = flatpickr(flatpickrInput, {
        enableTime: true,
        time_24hr: true,
        formatDate: (date) => formatShortDateTime(date, null),
        minDate: Date.now(),
        onChange: updateValue,
        inline: true,
    });

    btnClear.addEventListener('click', onClearBtnClick.bind(null, flatpickrInstance), false);
    confirmBtn.addEventListener('click', handleConfirm, false);
    doc.body.addEventListener('future_publication:reschedule', handleRescheduleEvents, false);
})(window, window.document, window.ibexa, window.bootstrap, window.flatpickr, window.Translator);
