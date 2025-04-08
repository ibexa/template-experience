(function (doc, eZ) {
    const { BlockConfigSelectFieldBase } = eZ;
    const contentListSelect = new BlockConfigSelectFieldBase();

    contentListSelect.init();

    doc.body.addEventListener(
        'ez-attributes-group-added',
        ({ detail }) => {
            contentListSelect.init(detail.container);
        },
        false
    );
})(window.document, window.eZ);
