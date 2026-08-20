import initValidator from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/fieldType/validator/richtext-validator';

(function (global, doc, ibexa) {
    const SELECTOR_FIELD = '.ibexa-field-edit';
    const SELECTOR_INPUT = '.ibexa-data-source__richtext';
    const SELECTOR_LABEL = '.ibexa-label';
    const SELECTOR_ERROR_NODE = '.ibexa-form-error';
    const TOP_OFFSET = 59;
    const openUdw = (config) => {
        const openUdwEvent = new CustomEvent('ibexa-open-udw', { detail: config });

        doc.body.dispatchEvent(openUdwEvent);
    };

    ibexa.addConfig('richText.alloyEditor.callbacks.selectContent', openUdw, true);

    // We have to wait until the iframe is fully loaded and visible
    // because of Firefox getSelection() issue in hidden iframes
    // https://bugzilla.mozilla.org/show_bug.cgi?id=827585
    document.body.addEventListener('ibexa-iframe:page-visible', () => {
        const containers = doc.querySelectorAll('.ibexa-data-source__richtext');

        containers.forEach((container) => {
            const richtextEditor = new ibexa.BaseRichText({ viewportTopOffset: TOP_OFFSET });

            richtextEditor.init(container);

            initValidator(container, SELECTOR_FIELD, SELECTOR_ERROR_NODE, SELECTOR_INPUT, SELECTOR_LABEL, richtextEditor);
        });
    });

    doc.body.addEventListener(
        'ibexa-attributes-group-added',
        ({ detail }) => {
            const addedRichtextContainers = detail.container.querySelectorAll('.ibexa-data-source__richtext');

            if (!addedRichtextContainers.length) {
                return;
            }

            addedRichtextContainers.forEach((container) => {
                const richtextEditor = new ibexa.BaseRichText();

                richtextEditor.init(container);

                initValidator(container, SELECTOR_FIELD, SELECTOR_ERROR_NODE, SELECTOR_INPUT, SELECTOR_LABEL, richtextEditor);
            });
        },
        false,
    );
})(window, document, window.ibexa);
