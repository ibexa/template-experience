import AIImproveText from './ai-improve-text/ai-improve-text';

(function (global, doc, ibexa) {
    ibexa.addConfig('richText.CKEditor.extraPlugins', [AIImproveText], true);
})(window, document, window.ibexa);
