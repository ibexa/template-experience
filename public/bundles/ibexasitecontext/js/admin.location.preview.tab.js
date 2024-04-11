import PreviewLoader from './preview.loader.class';

(function (global, doc) {
    const previewNode = doc.querySelector('.ibexa-location-preview');

    if (!previewNode) {
        return;
    }

    const previewIframeWrapperNode = previewNode.querySelector('.ibexa-location-preview__iframe-wrapper');
    const loaderWrapperNode = previewNode.querySelector('.ibexa-location-preview__loader-wrapper');
    const previewIframe = previewIframeWrapperNode.querySelector('.ibexa-location-preview__iframe');
    const resizeIframe = () => {
        const currentPreviewWidth = previewIframeWrapperNode.offsetWidth;
        const currentIframeWidth = previewIframe.offsetWidth;
        const scaleValue = currentPreviewWidth / currentIframeWidth;

        previewIframe.style.scale = scaleValue;

        const newPreviewNodeHeight = previewIframe.getBoundingClientRect().height;

        previewIframeWrapperNode.style.height = `${newPreviewNodeHeight}px`;
    };
    const resizeObserver = new ResizeObserver(() => {
        resizeIframe();
    });
    const iframeLoadCallback = function (event, { isAccepted }) {
        if (isAccepted) {
            previewIframe.classList.add('ibexa-location-preview__iframe--success');
            resizeIframe();
            resizeObserver.observe(previewIframeWrapperNode);
        }

        this.blockPointerEvents();
    };

    const previewLoaderInstance = new PreviewLoader({
        iframeWrapper: previewIframeWrapperNode,
        loaderWrapper: loaderWrapperNode,
        previewUrl: previewIframeWrapperNode.dataset.previewUrl,
        iframeLoadCallback,
    });

    previewLoaderInstance.init();
})(window, window.document);
