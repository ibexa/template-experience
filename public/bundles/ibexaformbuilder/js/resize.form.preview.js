(function (global, doc) {
    const formPreviewIframe = doc.querySelector('[name="form-preview"]');
    const viewContentTab = doc.querySelector('#ibexa-tab-label-location-view-content');
    let tabEventAttached = false;

    if (!formPreviewIframe) {
        return;
    }

    const resizePreviewIframeToFitContent = () => {
        if (
            !formPreviewIframe ||
            !formPreviewIframe.contentWindow ||
            !formPreviewIframe.contentWindow.document ||
            !formPreviewIframe.contentWindow.document.body
        ) {
            return;
        }

        const bodyScrollHeight = formPreviewIframe.contentWindow.document.body.scrollHeight;

        formPreviewIframe.height = bodyScrollHeight;

        if (!bodyScrollHeight && !tabEventAttached) {
            const locationTab = doc.querySelector('#ibexa-tab-label-location-view');

            if (locationTab) {
                locationTab.addEventListener('shown.bs.tab', resizePreviewIframeToFitContent);
            }

            tabEventAttached = true;
        }
    };
    if (viewContentTab) {
        viewContentTab.addEventListener('shown.bs.tab', resizePreviewIframeToFitContent);
    }
    formPreviewIframe.addEventListener('load', resizePreviewIframeToFitContent, false);
    resizePreviewIframeToFitContent();
})(window, window.document);
