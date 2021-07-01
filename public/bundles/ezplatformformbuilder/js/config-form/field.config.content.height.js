(function(global, doc) {
    global.addEventListener('load', () => {
        const configElement = doc.querySelector('.ez-field-config');
        const tabsElement = configElement.querySelector('.ez-field-config__tabs');
        const contentElement = configElement.querySelector('.ez-field-config__content');
        const actionsElement = configElement.querySelector('.ez-field-config__actions');

        contentElement.style.height = `calc(100vh - ${tabsElement.offsetHeight + actionsElement.offsetHeight}px)`;
    });
})(window, document);
