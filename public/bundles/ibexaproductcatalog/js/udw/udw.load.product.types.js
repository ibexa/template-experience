import {
    getJsonFromResponse,
    getRequestHeaders,
    getRequestMode,
} from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/request.helper';
import { showErrorNotification } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/notification.helper';
import { getAdminUiConfig, getRestInfo } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/context.helper';

const loadProductTypes = (callback) => {
    const { token, siteaccess, accessToken, instanceUrl } = getRestInfo();
    const adminUiConfig = getAdminUiConfig();
    const productTypes = adminUiConfig.contentTypes.product;

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
            mode: getRequestMode({ instanceUrl }),
            credentials: 'include',
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
    const request = new Request(`${instanceUrl}/api/ibexa/v2/bulk`, {
        method: 'POST',
        headers: getRequestHeaders({
            token,
            siteaccess,
            accessToken,
            extraHeaders: {
                Accept: 'application/vnd.ibexa.api.BulkOperationResponse+json',
                'Content-Type': 'application/vnd.ibexa.api.BulkOperation+json',
            },
        }),
        body: JSON.stringify({
            bulkOperations: {
                operations: requestBodyOperations,
            },
        }),
        mode: getRequestMode({ instanceUrl }),
        credentials: 'include',
    });

    fetch(request).then(getJsonFromResponse).then(handleProductTypes).catch(showErrorNotification);
};

export default loadProductTypes;
