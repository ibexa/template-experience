(function (global, doc, ibexa) {
    new ibexa.modules.InfoBar();
    const removeLoadingSpinner = () => doc.body.classList.remove('ibexa-pb-app--is-preview-loading');
    const iframe = doc.querySelector('.ibexa-pb-app__preview');

    iframe.src = iframe.dataset.src;

    if (ibexa.pageBuilder.config.isMultihostSetup) {
        iframe.addEventListener('load', removeLoadingSpinner, false);
    } else {
        iframe.contentWindow.addEventListener('DOMContentLoaded', removeLoadingSpinner, false);
    }
})(window, window.document, window.ibexa);
