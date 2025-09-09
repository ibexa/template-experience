(function (global, doc, React, ReactDOMClient, ibexa) {
    const calendarContainer = doc.querySelector('.ibexa-calendar-container');
    const calendarRoot = ReactDOMClient.createRoot(calendarContainer);
    const siteaccess = document.querySelector('meta[name="SiteAccess"]').content;
    const token = document.querySelector('meta[name="CSRF-Token"]').content;

    calendarRoot.render(
        React.createElement(ibexa.modules.Calendar, {
            restInfo: { token, siteaccess },
            eventsConfig: ibexa.calendar.config.types,
        }),
    );
})(window, window.document, window.React, window.ReactDOMClient, window.ibexa);
