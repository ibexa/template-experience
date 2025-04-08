(function (doc, eZ) {
    const { BlockConfigEmbedFieldBase } = eZ;
    const embed = new BlockConfigEmbedFieldBase();

    embed.init();

    doc.body.addEventListener(
        'ez-attributes-group-added',
        ({ detail }) => {
            embed.init(detail.container);
        },
        false
    );
})(window.document, window.eZ);
