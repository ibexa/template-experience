(function (doc, ibexa) {
    const { BlockConfigEmbedFieldBase } = ibexa;
    const embed = new BlockConfigEmbedFieldBase();

    embed.init();

    doc.body.addEventListener(
        'ibexa-attributes-group-added',
        ({ detail }) => {
            embed.init(detail.container);
        },
        false,
    );
})(window.document, window.ibexa);
