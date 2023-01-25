(function (global, doc, ibexa) {
    const { getJsonFromResponse } = ibexa.helpers.request;
    const { showErrorNotification } = ibexa.helpers.notification;
    const loadCorporateAccountsContentTypes = (callback) => {
        const contentTypes = ibexa.adminUiConfig.contentTypes.corporate_account;
        const requestBodyOperations = contentTypes.reduce((total, { href }) => {
            total[href] = {
                uri: href,
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.ibexa.api.ContentType+json',
                },
                mode: 'same-origin',
                credentials: 'same-origin',
            };

            return total;
        }, {});
        const handleContentTypes = (response) => {
            const contentTypesInfoMap = Object.entries(response.BulkOperationResponse.operations).reduce((total, [href, { content }]) => {
                total[href] = JSON.parse(content);

                return total;
            }, {});

            callback(contentTypesInfoMap);
        };
        const request = new Request('/api/ibexa/v2/bulk', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.ibexa.api.BulkOperationResponse+json',
                'Content-Type': 'application/vnd.ibexa.api.BulkOperation+json',
                'X-Siteaccess': doc.querySelector('meta[name="SiteAccess"]').content,
                'X-CSRF-Token': doc.querySelector('meta[name="CSRF-Token"]').content,
            },
            body: JSON.stringify({
                bulkOperations: {
                    operations: requestBodyOperations,
                },
            }),
            mode: 'same-origin',
            credentials: 'same-origin',
        });

        fetch(request).then(getJsonFromResponse).then(handleContentTypes).catch(showErrorNotification);
    };

    ibexa.addConfig('adminUiConfig.universalDiscoveryWidget.contentTypesLoaders', [loadCorporateAccountsContentTypes], true);
})(window, window.document, window.ibexa);
