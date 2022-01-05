(function(global, doc, ibexa) {
    const iframe = doc.querySelector('#page-builder-preview');
    const POST_MESSAGE_ID = 'ibexa-cross-origin-event';
    const POST_MESSAGE_TIMEOUT = 100;
    let updateLocationUrlTimeoutId = null;
    /**
     * Updates location URL
     *
     * @function updateLocationUrl
     */
    const updateLocationUrl = () => {
        doc.body.classList.add('ibexa-pb-app--is-preview-loading');
        iframe.removeEventListener('load', reloadPageBuilder);
        global.setTimeout(setPageBuilderUrl, 0);
    };
    /**
     * Updates location URL on form submission
     *
     * @function updateLocationUrlOnSubmit
     * @param {Event} event
     * @param {Window} target
     */
    const updateLocationUrlOnSubmit = ({ target }) => {
        target.removeEventListener('load', updateLocationUrlOnSubmit);
        updateLocationUrl();
    };
    /**
     * Handles in-iframe-form submissions events.
     *
     * @function handleInIframeFormSubmit
     * @param {Window} iframeWindow
     */
    const handleInIframeFormSubmit = (iframeWindow) => {
        iframeWindow.removeEventListener('unload', updateLocationUrl);
        iframeWindow.addEventListener('load', updateLocationUrlOnSubmit, false);
    };
    /**
     * Sets a new app URL in the browser address bar
     *
     * @function setPageBuilderUrl
     */
    const setPageBuilderUrl = () => {
        try {
            const url = iframe.contentWindow.location.href;

            if (url.includes('page_preview[reference_timestamp]')) {
                iframe.addEventListener('load', reloadPageBuilder, false);
                doc.body.classList.remove('ibexa-pb-app--is-preview-loading');
            } else {
                global.location = global.Routing.generate('ezplatform.page_builder.url_preview', { url }, true);
            }
        } catch (error) {
            const errorScreen = doc.querySelector('.ibexa-pb-app__error-screen');

            doc.body.classList.remove('ibexa-pb-app--is-preview-loading');
            doc.body.classList.add('ibexa-pb-app--has-error');

            errorScreen.classList.remove('ibexa-pb-app__error-screen--hidden');
            errorScreen.querySelector('.ibexa-error-screen__link').setAttribute('href', global.location.href);
        }
    };
    /**
     * Fires the post message
     *
     * @function firePostMessage
     */
    const firePostMessage = () => {
        doc.body.classList.add('ibexa-pb-app--is-preview-loading');
        iframe.contentWindow.postMessage({ id: POST_MESSAGE_ID }, ibexa.pageBuilder.config.host);
        updateLocationUrlTimeoutId = global.setTimeout(updateLocationUrl, POST_MESSAGE_TIMEOUT);
    };
    /**
     * Handles the post message
     *
     * @function handlePostMessage
     * @param {Event} event
     */
    const handlePostMessage = (event) => {
        if (event.data.id !== POST_MESSAGE_ID) {
            return;
        }

        if (updateLocationUrlTimeoutId) {
            global.clearTimeout(updateLocationUrlTimeoutId);
            updateLocationUrlTimeoutId = null;
        }

        const url = event.data.href;
        const generatedUrl = global.Routing.generate('ezplatform.page_builder.url_preview', { url }, true);

        if (url !== iframe.src) {
            global.location = generatedUrl;

            return;
        }

        doc.body.classList.remove('ibexa-pb-app--is-preview-loading');
    };
    /**
     * Updates Page Builder UI
     *
     * @function reloadPageBuilder
     * @param {Event} event
     */
    const reloadPageBuilder = (event) => {
        const newIframe = event.target;
        const iframeWindow = newIframe.contentWindow;

        doc.body.classList.remove('ibexa-pb-app--is-preview-loading');
        newIframe.contentDocument.addEventListener('submit', handleInIframeFormSubmit.bind(null, iframeWindow), false);
        iframeWindow.addEventListener('unload', updateLocationUrl, false);
    };

    if (ibexa.pageBuilder.config.isMultihostSetup) {
        iframe.addEventListener('load', firePostMessage, false);
        global.addEventListener('message', handlePostMessage, false);
    } else {
        iframe.addEventListener('load', reloadPageBuilder, false);
    }
})(window, window.document, window.ibexa);
