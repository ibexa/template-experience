(function (global, doc) {
    const previewFullNode = doc.querySelector('.ibexa-sc-location-full-preview');

    if (!previewFullNode) {
        return;
    }

    const previewIframeWrapperNode = previewFullNode.querySelector('.ibexa-sc-location-full-preview__iframe-wrapper');
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
    const blockEventsInsideIframe = () => {
        const documentHTML = previewIframe.contentWindow.document.documentElement;

        documentHTML.style.pointerEvents = 'none';
    };
    const handleIframeLoad = () => {
        resizeIframe();
        blockEventsInsideIframe();
    };
    const resizeObserver = new ResizeObserver(() => {
        resizeIframe();
    });

    resizeObserver.observe(previewIframeWrapperNode);
    previewIframe.addEventListener('load', handleIframeLoad, false);
})(window, window.document);
