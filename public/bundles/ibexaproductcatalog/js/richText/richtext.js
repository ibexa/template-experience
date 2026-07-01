import IbexaProductEmbed from './embed/embed.js';

(function (global, doc, ibexa) {
    ibexa.addConfig('richText.CKEditor.extraPlugins', [IbexaProductEmbed], true);
})(window, document, window.ibexa);
