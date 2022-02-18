(function(doc, ibexa) {
    const { BlockConfigEmbedFieldBase } = ibexa;
    const video = new BlockConfigEmbedFieldBase({
        previewFieldTypeIdentifier: 'ezmedia',
        openUDWSelector: '[data-open-udw-video]'
    });

    video.init();
})(window.document, window.ibexa);
