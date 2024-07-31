import loadProductTypes from './udw.load.product.types';

(function (global, doc, ibexa) {
    ibexa.addConfig('adminUiConfig.universalDiscoveryWidget.contentTypesLoaders', [loadProductTypes], true);
})(window, window.document, window.ibexa);
