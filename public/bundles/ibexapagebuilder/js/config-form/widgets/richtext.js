(function (global, doc, ibexa) {
    const TOP_OFFSET = 59;
    const openUdw = (config) => {
        const openUdwEvent = new CustomEvent('ibexa-open-udw', { detail: config });

        doc.body.dispatchEvent(openUdwEvent);
    };

    ibexa.addConfig('richText.alloyEditor.callbacks.selectContent', openUdw, true);

    const containers = doc.querySelectorAll('.ibexa-data-source__richtext');

    containers.forEach((container) => {
        const richtext = new ibexa.BaseRichText({ viewportTopOffset: TOP_OFFSET });

        richtext.init(container);
    });

    doc.body.addEventListener(
        'ibexa-attributes-group-added',
        ({ detail }) => {
            const addedRichtextContainer = detail.container.querySelector('.ibexa-data-source__richtext');

            if (!addedRichtextContainer) {
                return;
            }

            const richtext = new ibexa.BaseRichText();

            richtext.init(addedRichtextContainer);
        },
        false,
    );
})(window, document, window.ibexa);
