(function (global, doc, ibexa) {
    const openUdw = (config) => {
        const openUdwEvent = new CustomEvent('ibexa-open-udw', { detail: config });

        doc.body.dispatchEvent(openUdwEvent);
    };

    ibexa.addConfig('richText.alloyEditor.callbacks.selectContent', openUdw, true);

    const containers = doc.querySelectorAll('.ibexa-data-source__richtext');

    containers.forEach((container) => {
        const richtext = new global.ibexa.BaseRichText();

        richtext.init(container);
    });

    doc.body.addEventListener(
        'ibexa-attributes-group-added',
        ({ detail }) => {
            const addedRichtextContainer = detail.container.querySelector('.ibexa-data-source__richtext');
            const richtext = new global.eZ.BaseRichText();

            richtext.init(addedRichtextContainer);
        },
        false,
    );
})(window, document, window.ibexa);
