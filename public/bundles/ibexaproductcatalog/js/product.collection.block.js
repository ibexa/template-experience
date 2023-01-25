(function (global, doc, ibexa, Translator) {
    const collection = doc.querySelector('.ibexa-pb-product-collection');
    const collectionListHeader = collection.querySelector('.ibexa-pb-product-collection__list-header');
    const selectProductBtn = collection.querySelector('.ibexa-pb-product-collection__select-product-btn');
    const addProductBtn = collection.querySelector('.ibexa-pb-product-collection__add-product-btn');
    const collectionListWrapper = collection.querySelector('.ibexa-pb-product-collection__list-wrapper');
    const collectionList = collection.querySelector('.ibexa-pb-product-collection__list');
    const collectionListItems = collectionList.querySelectorAll('.ibexa-pb-product-collection-item');
    const hiddenInputsList = collection.querySelector('.ibexa-pb-product-collection__hidden-inputs-list');
    const productCodeInput = collection.querySelector('.ibexa-pb-product-collection__product-code-input');
    const FIRST_PRODUCT_ID = 0;
    const INIT_PRODUCTS_LIST_LENGTH = 0;
    const PRODUCTS_LIST_NO_ITEMS_CLASS = 'ibexa-pb-product-collection__list-wrapper--no-items';
    const ERROR_HIDDEN_CLASS = 'ibexa-pb-product-collection__error--hidden';
    const prepareRequest = (url, requestOptions) => {
        const token = document.querySelector('meta[name="CSRF-Token"]').content;
        const siteaccess = document.querySelector('meta[name="SiteAccess"]').content;

        return new Request(url, {
            mode: 'same-origin',
            credentials: 'same-origin',
            ...requestOptions,
            headers: {
                'X-Siteaccess': siteaccess,
                'X-CSRF-Token': token,
                ...requestOptions.headers,
            },
        });
    };
    const fetchRequest = (request) => {
        return fetch(request).then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        });
    };
    const loadProduct = (productCode) => {
        const request = prepareRequest(`/api/ibexa/v2/product/catalog/products/${productCode}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.ibexa.api.ProductGet+json',
                Accept: 'application/json',
            },
        });

        return fetchRequest(request);
    };
    const loadProductView = (productList) => {
        const request = prepareRequest(`/api/ibexa/v2/product/catalog/products/view`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.ibexa.api.ProductViewInput+json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                ViewInput: {
                    identifier: 'Default',
                    ProductQuery: {
                        limit: productList.length,
                        offset: 0,
                        Filter: {
                            ProductCodeCriterion: productList,
                            ProductAvailabilityCriterion: false,
                        },
                        SortClauses: {
                            ProductName: 'descending',
                        },
                    },
                },
            }),
        });

        return fetchRequest(request);
    };
    const loadLocationsList = (contentId) => {
        const request = prepareRequest(`/api/ibexa/v2/content/objects/${contentId}/locations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.ibexa.api.LocationList+json',
                Accept: 'application/json',
            },
        });

        return fetchRequest(request);
    };
    const loadLocation = (url) => {
        const request = prepareRequest(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.ibexa.api.Location+json',
                Accept: 'application/json',
            },
        });

        return fetchRequest(request);
    };
    const updateListCounter = () => {
        const collectionLength = collectionList.children.length;
        const listTitle = Translator.trans(
            /*@Desc("List (%count%)")*/ 'product.collection.list',
            { count: collectionLength },
            'page_builder_block',
        );

        collectionListHeader.innerHTML = listTitle;
    };
    const toggleError = (errorType) => {
        const errors = doc.querySelectorAll('.ibexa-pb-product-collection__error');

        errors.forEach((error) => error.classList.add(ERROR_HIDDEN_CLASS));

        if (errorType) {
            const errorContainer = collection.querySelector(`.ibexa-pb-product-collection__error--${errorType}`);

            errorContainer.classList.remove(ERROR_HIDDEN_CLASS);
        }
    };
    const checkIfProductExist = (productCode) => {
        const productInputs = [...hiddenInputsList.querySelectorAll('input.ibexa-pb-product-collection-item__input')];
        const isProductAdded = productInputs.some((input) => input.value === productCode);

        return isProductAdded;
    };
    const attachListenersToProduct = (item, hiddenItem) => {
        item.querySelector('.ibexa-btn--trash').addEventListener('click', (event) => removeProduct(event, item, hiddenItem), false);
    };
    const onUDWConfirm = (products, draggable) => {
        const productsObj = products.map((product) => {
            const productSpecification = product.ContentInfo.Content.CurrentVersion.Version.Fields.field.find(
                (field) => field.fieldTypeIdentifier === 'ibexa_product_specification',
            );

            return { locationId: product.id, code: productSpecification.fieldValue.code };
        });
        const productsCodes = productsObj.map((product) => product.code);

        loadProductView(productsCodes).then((result) => {
            const {
                ProductView: {
                    Result: {
                        ProductList: { Product: productList },
                    },
                },
            } = result;

            productList.forEach((product) => {
                const {
                    code,
                    name,
                    ProductType: { identifier },
                } = product;

                const location = productsObj.find((productObj) => productObj.code === code);

                if (checkIfProductExist(code)) {
                    return;
                }

                addProduct(code, name, identifier, location.locationId, draggable);
            });
        });
    };
    const openUdw = ({ currentTarget }, draggable) => {
        const config = JSON.parse(currentTarget.dataset.udwConfig);
        const title = Translator.trans(/*@Desc("Select products")*/ 'product.collection.select_products', {}, 'page_builder_block');
        const selectedLocations = [...collectionList.querySelectorAll('.ibexa-pb-product-collection-item')].map((item) =>
            parseInt(item.dataset.locationId, 10),
        );
        const openUdwEvent = new CustomEvent('ibexa-open-udw', {
            detail: {
                title,
                multiple: true,
                selectedLocations,
                onConfirm: (products) => onUDWConfirm(products, draggable),
                ...config,
            },
        });

        doc.body.dispatchEvent(openUdwEvent);
    };
    const removeProduct = (event, product, hiddenItem) => {
        event.preventDefault();

        product.remove();
        hiddenItem.remove();
        updateListCounter();

        if (hiddenInputsList.children.length <= INIT_PRODUCTS_LIST_LENGTH) {
            collectionListWrapper.classList.add(PRODUCTS_LIST_NO_ITEMS_CLASS);
        }
    };
    const checkProduct = (productCode, draggable) => {
        loadProduct(productCode)
            .then((result) => {
                if (!result) {
                    return;
                }

                if (result.Product.isVariant) {
                    toggleError('cannot-add-variant');

                    return;
                }

                if (checkIfProductExist(productCode)) {
                    toggleError('already-added');

                    return;
                }

                const {
                    Product: {
                        name,
                        ProductType: { identifier },
                        Content: { _id: contentId },
                    },
                } = result;

                loadLocationsList(contentId).then((locationList) => {
                    const {
                        LocationList: {
                            Location: [locationOptions],
                        },
                    } = locationList;

                    loadLocation(locationOptions._href).then((location) => {
                        const {
                            Location: { id },
                        } = location;

                        addProduct(productCode, name, identifier, id, draggable);
                    });
                });
            })
            .catch((response) => {
                if (response.status === 404) {
                    toggleError('not-found');
                } else {
                    const error = new Error(response.statusText);

                    ibexa.helpers.notification.showErrorNotification(error);
                }
            });
    };
    const addProduct = (productCode, name, productType, locationId, draggable) => {
        toggleError();

        const { productTemplate, nextIndexId } = collectionListWrapper.dataset;
        const index = parseInt(nextIndexId, 10) || FIRST_PRODUCT_ID;
        const filledProductTemplate = productTemplate.replaceAll('__name__', index);

        hiddenInputsList.insertAdjacentHTML('beforeend', filledProductTemplate);

        const hiddenProductItem = hiddenInputsList.lastElementChild;
        const hiddenProductInput = hiddenProductItem.querySelector('input');

        hiddenProductItem.dataset.id = index;
        hiddenProductInput.value = productCode;
        productCodeInput.value = '';
        collectionListWrapper.dataset.nextIndexId = index + 1;

        const { itemTemplate } = collectionList.dataset;
        const renderedItem = itemTemplate
            .replaceAll('__product_name__', name)
            .replaceAll('__product_code__', productCode)
            .replaceAll('__product_type__', productType)
            .replaceAll('__location_id__', locationId)
            .replaceAll('__id__', index);

        collectionList.insertAdjacentHTML('beforeend', renderedItem);
        collectionListWrapper.classList.remove(PRODUCTS_LIST_NO_ITEMS_CLASS);
        attachListenersToProduct(collectionList.lastElementChild, hiddenProductItem);
        draggable.reinit(collectionList.lastElementChild);
        updateListCounter();
    };
    const sortInputs = () => {
        const listItems = [...collectionList.querySelectorAll('.ibexa-pb-product-collection-item')];
        const hiddenListItems = [...hiddenInputsList.querySelectorAll('.ibexa-pb-product-collection__item')];

        if (listItems.length === hiddenListItems.length) {
            const idOrder = listItems.map((item) => item.dataset.id);

            idOrder.forEach((id, index) => {
                const hiddenInputsListItem = hiddenListItems.find((item) => item.dataset.id === id);

                hiddenInputsList.insertBefore(hiddenInputsListItem, hiddenInputsList.childNodes[index]);
            });
        }
    };
    const initProductCollection = () => {
        const draggable = new CollectionDraggable({
            itemsContainer: collectionList,
            openUdwBtn: selectProductBtn,
            selectorItem: '.ibexa-pb-product-collection-item',
            selectorPlaceholder: '.ibexa-pb-product-collection-placeholder',
        });

        collectionListItems.forEach((listItem) => {
            const productCode = listItem.dataset.id;
            const hiddenItem = [...hiddenInputsList.children].find((item) => item.dataset.id === productCode);

            attachListenersToProduct(listItem, hiddenItem);
        });

        draggable.init();
        selectProductBtn.addEventListener('click', (event) => openUdw(event, draggable), false);
        addProductBtn.addEventListener('click', () => checkProduct(productCodeInput.value.trim(), draggable), false);

        if (hiddenInputsList.children.length <= INIT_PRODUCTS_LIST_LENGTH) {
            collectionListWrapper.classList.add(PRODUCTS_LIST_NO_ITEMS_CLASS);
        }
    };

    class CollectionDraggable extends ibexa.core.Draggable {
        onDrop() {
            super.onDrop();

            sortInputs();
        }

        reinit(renderedItem) {
            super.reinit();

            this.triggerHighlight(renderedItem);
        }
    }

    initProductCollection();
})(window, window.document, window.ibexa, window.Translator);
