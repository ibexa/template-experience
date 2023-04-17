(function (global, doc, ibexa) {
    const { getJsonFromResponse } = ibexa.helpers.request;
    const { showErrorNotification } = ibexa.helpers.notification;
    const loadProductTypes = (callback) => {
        const productTypes = ibexa.adminUiConfig.contentTypes.product;

        if (!productTypes?.length) {
            return;
        }

        const requestBodyOperations = productTypes.reduce((total, { href }) => {
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
        const handleProductTypes = (response) => {
            const productTypesInfoMap = Object.entries(response.BulkOperationResponse.operations).reduce((total, [href, { content }]) => {
                total[href] = JSON.parse(content);

                return total;
            }, {});

            callback(productTypesInfoMap);
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

        fetch(request).then(getJsonFromResponse).then(handleProductTypes).catch(showErrorNotification);
    };

    ibexa.addConfig('adminUiConfig.universalDiscoveryWidget.contentTypesLoaders', [loadProductTypes], true);
})(window, window.document, window.ibexa);
