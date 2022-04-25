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
})(window, document, window.ibexa);
