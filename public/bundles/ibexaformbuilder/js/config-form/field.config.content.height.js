(function (global, doc) {
    global.addEventListener('load', () => {
        const configElement = doc.querySelector('.ibexa-fb-form-field-config');
        const tabsElement = configElement.querySelector('.ibexa-fb-form-field-config__tabs');
        const contentElement = configElement.querySelector('.ibexa-fb-form-field-config__content');
        const actionsElement = configElement.querySelector('.ibexa-fb-form-field-config__actions');
        contentElement.style.height = `calc(100vh - ${tabsElement.offsetHeight + actionsElement.offsetHeight}px)`;
    });
})(window, document);
