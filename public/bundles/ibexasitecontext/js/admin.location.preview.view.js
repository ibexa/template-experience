import PreviewLoader from './preview.loader.class';

(function (global, doc) {
    const previewFullNode = doc.querySelector('.ibexa-sc-location-full-preview');

    if (!previewFullNode) {
        return;
    }

    const previewIframeWrapperNode = previewFullNode.querySelector('.ibexa-sc-location-full-preview__iframe-wrapper');
    const loaderWrapperNode = previewFullNode.querySelector('.ibexa-sc-location-full-preview__loader-wrapper');
    const previewIframe = previewIframeWrapperNode.querySelector('.ibexa-sc-location-full-preview__iframe');
    const resizeIframe = () => {
        const currentPreviewWidth = previewIframeWrapperNode.offsetWidth;
        const currentIframeWidth = previewIframe.offsetWidth;
        const scaleValue = currentPreviewWidth / currentIframeWidth;
        const offsetTop = previewIframe.getBoundingClientRect().top;
        const windowHeight = global.innerHeight;
        const iframeHeight = (windowHeight - offsetTop) / scaleValue;

        previewIframe.style.scale = scaleValue;
        previewIframe.style.height = `${iframeHeight}px`;
    };
    const resizeObserver = new ResizeObserver(() => {
        resizeIframe();
    });
    const iframeLoadCallback = function (event, { isAccepted }) {
        if (isAccepted) {
            previewIframe.classList.add('ibexa-sc-location-full-preview__iframe--success');
            resizeIframe();
            resizeObserver.observe(previewIframeWrapperNode);
        }

        this.blockPointerEvents();
        previewFullNode.classList.add('ibexa-sc-location-full-preview--loaded');
    };

    const previewLoaderInstance = new PreviewLoader({
        iframeWrapper: previewIframeWrapperNode,
        loaderWrapper: loaderWrapperNode,
        previewUrl: previewIframeWrapperNode.dataset.previewUrl,
        iframeLoadCallback,
    });

    previewLoaderInstance.init();
})(window, window.document);
