import loadCorporateAccountsContentTypes from './load.content_types';

(function (global, doc, ibexa) {
    ibexa.addConfig('adminUiConfig.universalDiscoveryWidget.contentTypesLoaders', [loadCorporateAccountsContentTypes], true);
})(window, window.document, window.ibexa);
