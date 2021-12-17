(function (global, doc, React, ReactDOM, eZ) {
    const calendarContainer = doc.querySelector('.ibexa-calendar-container');
    const siteaccess = document.querySelector('meta[name="SiteAccess"]').content;
    const token = document.querySelector('meta[name="CSRF-Token"]').content;

    ReactDOM.render(
        React.createElement(eZ.modules.Calendar, {
            restInfo: { token, siteaccess },
            eventsConfig: eZ.calendar.config.types,
        }),
        calendarContainer
    );
})(window, window.document, window.React, window.ReactDOM, window.eZ);
