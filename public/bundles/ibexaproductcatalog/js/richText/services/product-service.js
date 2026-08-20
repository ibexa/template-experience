export const findProduct = (code, callback) => {
    const request = new Request(`/api/ibexa/v2/product/catalog/products/${code}`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.ibexa.api.Product+json',
        },
        mode: 'same-origin',
        credentials: 'same-origin',
    });

    fetch(request)
        .then(window.ibexa.helpers.request.getJsonFromResponse)
        .then((response) => {
            if (response.Product) {
                callback(response.Product);
            }
        })
        .catch(window.ibexa.helpers.notification.showErrorNotification);
};
