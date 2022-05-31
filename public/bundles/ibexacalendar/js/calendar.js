(function (global, doc, React, ReactDOM, ibexa) {
    const calendarContainer = doc.querySelector('.ibexa-calendar-container');
    const siteaccess = document.querySelector('meta[name="SiteAccess"]').content;
    const token = document.querySelector('meta[name="CSRF-Token"]').content;

    ReactDOM.render(
        React.createElement(ibexa.modules.Calendar, {
            restInfo: { token, siteaccess },
            eventsConfig: ibexa.calendar.config.types,
        }),
        calendarContainer,
    );
})(window, window.document, window.React, window.ReactDOM, window.ibexa);
