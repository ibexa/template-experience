(function(global, doc) {
    global.addEventListener('load', () => {
        const configElement = doc.querySelector('.ez-block-config');
        const tabsElement = configElement.querySelector('.ez-block-config__tabs');
        const contentElement = configElement.querySelector('.ez-block-config__content');
        const actionsElement = configElement.querySelector('.ez-block-config__actions');

        contentElement.style.height = `calc(100vh - ${tabsElement.offsetHeight + actionsElement.offsetHeight}px)`;
    });
})(window, document);
