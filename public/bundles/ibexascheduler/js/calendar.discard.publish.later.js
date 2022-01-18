(function(global, doc, ibexa, bootstrap) {
    const SELECTOR_MODAL_DISCARD = '#discard-publish-later-modal';
    const modal = doc.querySelector(SELECTOR_MODAL_DISCARD);
    const token = document.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = document.querySelector('meta[name="SiteAccess"]').content;
    const confirmBtn = modal.querySelector('.ibexa-btn--confirm-discard-scheduling');
    const cancelBtn = modal.querySelector('.ibexa-btn--cancel-discard-scheduling');
    let selectedEvents = null;
    const setModalTableTitle = (title) => {
        const modalTableTitleNode = doc.querySelector(`${SELECTOR_MODAL_DISCARD} .ibexa-table-header__headline`);

        modalTableTitleNode.innerHTML = title;
    };
    const setModalTableBody = (events) => {
        const modal = doc.querySelector(SELECTOR_MODAL_DISCARD);
        const table = modal.querySelector('.ibexa-discard-publish-later-modal__table');
        const tableBody = table.querySelector('.ibexa-discard-publish-later-modal__table-body');
        const tableRowTemplate = table.dataset.tableRowTemplate;
        const fragment = doc.createDocumentFragment();

        Object.values(events).forEach(({ name, attributes, type }) => {
            const { contentTypeName, modifiedLanguage } = attributes;
            const { escapeHTML } = ibexa.helpers.text;
            const container = doc.createElement('tbody');
            const renderedItem = tableRowTemplate
                .replace('{{ content_type_identifier }}', contentTypeName.value)
                .replace('{{ content_name }}', escapeHTML(name))
                .replace('{{ event_name }}', ibexa.calendar.config.types[type].label)
                .replace('{{ language }}', modifiedLanguage.value);

            container.insertAdjacentHTML('beforeend', renderedItem);

            const tableRowNode = container.querySelector('tr');

            fragment.append(tableRowNode);
        });

        removeNodeChildren(tableBody);
        tableBody.append(fragment);
    };
    const removeNodeChildren = (node) => {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    };
    const showDiscardPublishLaterModal = (events) => {
        const tableTitle = Translator.trans(
            /*@Desc("Selected content (%eventsCount%)")*/ 'modal.discard.table.header',
            { eventsCount: Object.keys(selectedEvents).length },
            'ezplatform_calendar_events'
        );

        setModalTableBody(selectedEvents);
        setModalTableTitle(tableTitle);

        bootstrap.Modal.getOrCreateInstance(doc.querySelector(SELECTOR_MODAL_DISCARD)).show();
    };
    const handleUnscheduleEvents = ({ detail }) => {
        selectedEvents = detail.events;

        showDiscardPublishLaterModal();
    };
    const handleConfirm = () => {
        const errorMessage = Translator.trans(
            /*@Desc("Cannot cancel selected publication(s)")*/ 'unschedule.error.message',
            {},
            'ezplatform_calendar_events'
        );
        const body = {
            UnscheduleAction: {
                events: Object.keys(selectedEvents),
            },
        };
        const request = new Request('/api/ezp/v2/calendar/event/future_publication', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/vnd.ez.api.calendar.future_publication.UnscheduleAction+json',
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

    confirmBtn.addEventListener('click', handleConfirm, false);
    doc.body.addEventListener('future_publication:unschedule', handleUnscheduleEvents, false);
})(window, window.document, window.ibexa, window.bootstrap);
