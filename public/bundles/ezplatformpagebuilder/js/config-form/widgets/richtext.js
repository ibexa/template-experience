(function (global, doc, eZ) {
    const openUdw = (config) => {
        const openUdwEvent = new CustomEvent('ez-open-udw', { detail: config });

        doc.body.dispatchEvent(openUdwEvent);
    };

    eZ.addConfig('richText.alloyEditor.callbacks.selectContent', openUdw, true);

    const containers = doc.querySelectorAll('.ez-data-source__richtext');

    containers.forEach((container) => {
        const richtext = new global.eZ.BaseRichText();
        const alloyEditor = richtext.init(container);
    });

    doc.body.addEventListener(
        'ez-attributes-group-added',
        ({ detail }) => {
            const addedRichtextContainer = detail.container.querySelector('.ez-data-source__richtext');

            if (!addedRichtextContainer) {
                return;
            }

            const richtext = new global.eZ.BaseRichText();
            const alloyEditor = richtext.init(addedRichtextContainer);
        },
        false
    );
})(window, document, window.eZ);
