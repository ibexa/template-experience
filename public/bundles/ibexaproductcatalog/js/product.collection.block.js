(function (global, doc, ibexa, Translator) {
    const { escapeHTML } = ibexa.helpers.text;
    const { dangerouslyInsertAdjacentHTML } = ibexa.helpers.dom;
    const collections = doc.querySelectorAll('.ibexa-pb-product-collection');
    const FIRST_PRODUCT_ID = 0;
    const INIT_PRODUCTS_LIST_LENGTH = 0;
    const PRODUCTS_LIST_NO_ITEMS_CLASS = 'ibexa-pb-product-collection__list-wrapper--no-items';
    const ERROR_HIDDEN_CLASS = 'ibexa-pb-product-collection__error--hidden';

    class Collection {
        constructor(collection) {
            this.draggableInstance = null;
            this.collection = collection;
            this.isSingleProduct = collection.dataset.isSingleProduct === 'true';
            this.collectionListHeader = collection.querySelector('.ibexa-pb-product-collection__list-header');
            this.selectProductBtn = collection.querySelector('.ibexa-pb-product-collection__select-product-btn');
            this.addProductBtn = collection.querySelector('.ibexa-pb-product-collection__add-product-btn');
            this.collectionListWrapper = collection.querySelector('.ibexa-pb-product-collection__list-wrapper');
            this.collectionList = collection.querySelector('.ibexa-pb-product-collection__list');
            this.collectionListItems = this.collectionList.querySelectorAll('.ibexa-pb-product-collection-item');
            this.hiddenInputsList = collection.querySelector('.ibexa-pb-product-collection__hidden-inputs-list');
            this.productCodeInput = collection.querySelector('.ibexa-pb-product-collection__product-code-input');
            this.productsSelectorModuleRootNode = collection.querySelector('.ibexa-pc-product-selector__module-root');

            this.prepareRequest = this.prepareRequest.bind(this);
            this.fetchRequest = this.fetchRequest.bind(this);
            this.loadProduct = this.loadProduct.bind(this);
            this.loadLocationsList = this.loadLocationsList.bind(this);
            this.loadLocation = this.loadLocation.bind(this);
            this.updateListCounter = this.updateListCounter.bind(this);
            this.toggleError = this.toggleError.bind(this);
            this.checkIfProductExist = this.checkIfProductExist.bind(this);
            this.checkAndAddProduct = this.checkAndAddProduct.bind(this);
            this.attachListenersToProduct = this.attachListenersToProduct.bind(this);
            this.removeProduct = this.removeProduct.bind(this);
            this.addProduct = this.addProduct.bind(this);
            this.processAddProduct = this.processAddProduct.bind(this);
            this.sortInputs = this.sortInputs.bind(this);
            this.initProductCollection = this.initProductCollection.bind(this);
            this.isSelectBtnAvailable = this.isSelectBtnAvailable.bind(this);
        }

        prepareRequest(url, requestOptions) {
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
        }

        fetchRequest(request) {
            return fetch(request).then((response) => {
                if (response.ok) {
                    return response.json();
                }

                return Promise.reject(response);
            });
        }

        loadProduct(productCode) {
            const request = this.prepareRequest(`/api/ibexa/v2/product/catalog/products/${productCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/vnd.ibexa.api.ProductGet+json',
                    Accept: 'application/json',
                },
            });

            return this.fetchRequest(request);
        }

        loadLocationsList(contentId) {
            const request = this.prepareRequest(`/api/ibexa/v2/content/objects/${contentId}/locations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/vnd.ibexa.api.LocationList+json',
                    Accept: 'application/json',
                },
            });

            return this.fetchRequest(request);
        }

        loadLocation(url) {
            const request = this.prepareRequest(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/vnd.ibexa.api.Location+json',
                    Accept: 'application/json',
                },
            });

            return this.fetchRequest(request);
        }

        updateListCounter() {
            if (!this.collectionListHeader) {
                return;
            }

            const collectionLength = this.collectionList.children.length;
            const listTitle = Translator.trans(
                /*@Desc("Product list (%count%)")*/ 'product.collection.product_list',
                { count: collectionLength },
                'ibexa_page_builder_block',
            );

            this.collectionListHeader.innerText = listTitle;
        }

        toggleError(errorType) {
            const errors = this.collection.querySelectorAll('.ibexa-pb-product-collection__error');

            errors.forEach((error) => error.classList.add(ERROR_HIDDEN_CLASS));

            if (errorType) {
                const errorContainer = this.collection.querySelector(`.ibexa-pb-product-collection__error--${errorType}`);

                errorContainer.classList.remove(ERROR_HIDDEN_CLASS);
            }
        }

        checkIfProductExist(productCode) {
            const productInputs = [...this.hiddenInputsList.querySelectorAll('input.ibexa-pb-product-collection-item__input')];
            const isProductAdded = productInputs.some((input) => input.value === productCode);

            return isProductAdded;
        }

        checkAndAddProduct(productCode) {
            if (this.isSingleProduct && this.hiddenInputsList.children.length >= 1) {
                const existingProduct = this.collectionList.querySelector('.ibexa-pb-product-collection-item');
                const existingHiddenItem = this.hiddenInputsList.querySelector('.ibexa-pb-product-collection__item');

                if (existingProduct && existingHiddenItem) {
                    const { productCode: oldProductCode } = existingProduct.dataset;

                    if (oldProductCode === productCode) {
                        return;
                    }

                    existingProduct.remove();
                    existingHiddenItem.remove();

                    this.productsSelectorModuleRootNode.dispatchEvent(
                        new CustomEvent('ibexa-pc-product-selector:manually-removed-product', {
                            detail: { productCode: oldProductCode },
                        }),
                    );

                    return;
                }
            } else if (this.checkIfProductExist(productCode)) {
                return;
            }

            this.loadProduct(productCode)
                .then((result) => {
                    if (!result) {
                        return;
                    }

                    if (result.Product.isVariant) {
                        this.toggleError('cannot-add-variant');

                        return;
                    }

                    const {
                        Product: {
                            name,
                            ProductType: { identifier },
                            Content: { _id: contentId } = {},
                        },
                    } = result;

                    //for remote PIM scenario we don't have access to Content, thus contentId and locationId are not used anywhere
                    if (contentId === undefined) {
                        this.addProduct(productCode, name, identifier, '');

                        return;
                    }

                    this.loadLocationsList(contentId).then((locationList) => {
                        const {
                            LocationList: {
                                Location: [locationOptions],
                            },
                        } = locationList;

                        this.loadLocation(locationOptions._href).then((location) => {
                            const {
                                Location: { id },
                            } = location;

                            this.addProduct(productCode, name, identifier, contentId, id);
                        });
                    });
                })
                .catch((response) => {
                    if (response.status === 404) {
                        this.toggleError('not-found');
                    } else {
                        const error = new Error(response.statusText);

                        ibexa.helpers.notification.showErrorNotification(error);
                    }
                });
        }

        attachListenersToProduct(item, hiddenItem) {
            item.querySelector('.ibexa-btn--trash').addEventListener(
                'click',
                (event) => this.removeProduct(event, item, hiddenItem),
                false,
            );
        }

        removeProduct(event, product, hiddenItem) {
            event.preventDefault();

            const { productCode } = product.dataset;

            product.remove();
            hiddenItem.remove();
            this.updateListCounter();

            if (this.hiddenInputsList.children.length <= INIT_PRODUCTS_LIST_LENGTH) {
                this.collectionListWrapper.classList.add(PRODUCTS_LIST_NO_ITEMS_CLASS);
            }

            this.productsSelectorModuleRootNode.dispatchEvent(
                new CustomEvent('ibexa-pc-product-selector:manually-removed-product', {
                    detail: { productCode },
                }),
            );
        }

        addProduct(productCode, name, productType, contentId, locationId) {
            this.toggleError();

            const { productTemplate, nextIndexId } = this.collectionListWrapper.dataset;
            const index = parseInt(nextIndexId, 10) || FIRST_PRODUCT_ID;
            const filledProductTemplate = productTemplate.replaceAll('__name__', index);

            this.hiddenInputsList.insertAdjacentHTML('beforeend', filledProductTemplate);

            const hiddenProductItem = this.hiddenInputsList.lastElementChild;
            const hiddenProductInput = hiddenProductItem.querySelector('input');

            hiddenProductItem.dataset.id = index;
            hiddenProductInput.value = productCode;
            this.productCodeInput.value = '';
            this.addProductBtn.disabled = true;
            this.collectionListWrapper.dataset.nextIndexId = index + 1;

            const productNameHtmlEscaped = escapeHTML(name);
            const productCodeHtmlEscaped = escapeHTML(productCode);
            const productTypeHtmlEscaped = escapeHTML(productType);
            const { itemTemplate } = this.collectionList.dataset;
            const renderedItem = itemTemplate
                .replaceAll('__product_name__', productNameHtmlEscaped)
                .replaceAll('__product_code__', productCodeHtmlEscaped)
                .replaceAll('__product_type__', productTypeHtmlEscaped)
                .replaceAll('__location_id__', locationId)
                .replaceAll('__content_id__', contentId)
                .replaceAll('__id__', index);

            dangerouslyInsertAdjacentHTML(this.collectionList, 'beforeend', renderedItem);
            this.collectionListWrapper.classList.remove(PRODUCTS_LIST_NO_ITEMS_CLASS);

            const addedProductRow = this.collectionList.lastElementChild;

            this.attachListenersToProduct(addedProductRow, hiddenProductItem);

            if (!this.isSingleProduct && this.draggableInstance) {
                this.draggableInstance.reinit(addedProductRow);
            }

            ibexa.helpers.ellipsis.middle.parse(this.collectionList);

            const itemActionsMenuContainer = addedProductRow.querySelector('.ibexa-embedded-item-actions__menu');
            const itemActionsTriggerElement = addedProductRow.querySelector('.ibexa-embedded-item-actions__menu-trigger-btn');

            doc.body.dispatchEvent(
                new CustomEvent('ibexa-embedded-item:create-dynamic-menu', {
                    detail: {
                        contentId,
                        locationId,
                        productCode,
                        menuTriggerElement: itemActionsTriggerElement,
                        menuContainer: itemActionsMenuContainer,
                    },
                }),
            );

            this.updateListCounter();
        }

        processAddProduct() {
            const newProductCode = this.productCodeInput.value.trim();

            if (this.checkIfProductExist(newProductCode)) {
                this.toggleError('already-added');

                return;
            }

            this.productsSelectorModuleRootNode.dispatchEvent(
                new CustomEvent('ibexa-pc-product-selector:manually-added-product', {
                    detail: { productCode: newProductCode },
                }),
            );
        }

        sortInputs() {
            const listItems = [...this.collectionList.querySelectorAll('.ibexa-pb-product-collection-item')];
            const hiddenListItems = [...this.hiddenInputsList.querySelectorAll('.ibexa-pb-product-collection__item')];

            if (listItems.length === hiddenListItems.length) {
                const idOrder = listItems.map((item) => item.dataset.id);

                idOrder.forEach((id, index) => {
                    const hiddenInputsListItem = hiddenListItems.find((item) => item.dataset.id === id);

                    this.hiddenInputsList.insertBefore(hiddenInputsListItem, this.hiddenInputsList.childNodes[index]);
                });
            }
        }

        initProductCollection() {
            if (!this.isSingleProduct) {
                this.draggableInstance = new CollectionDraggable(
                    {
                        itemsContainer: this.collectionList,
                        selectorItem: '.ibexa-pb-product-collection-item',
                        selectorPlaceholder: '.ibexa-pb-product-collection-placeholder',
                    },
                    { sortInputs: this.sortInputs },
                );
            }

            this.collectionListItems.forEach((listItem) => {
                const productCode = listItem.dataset.id;
                const hiddenItem = [...this.hiddenInputsList.children].find((item) => item.dataset.id === productCode);

                this.attachListenersToProduct(listItem, hiddenItem);
            });

            if (!this.isSingleProduct && this.draggableInstance) {
                this.draggableInstance.init();
            }

            this.addProductBtn.addEventListener('click', this.processAddProduct, false);
            this.productCodeInput.addEventListener(
                'input',
                (event) => {
                    this.addProductBtn.disabled = event.target.value.trim() === '';
                },
                false,
            );

            this.addProductBtn.disabled = !this.productCodeInput.value;

            if (this.hiddenInputsList.children.length <= INIT_PRODUCTS_LIST_LENGTH) {
                this.collectionListWrapper.classList.add(PRODUCTS_LIST_NO_ITEMS_CLASS);
            }

            const handleProductSelection = ({ detail }) => {
                const { selectedProductsItems, type } = detail;

                if (type === 'deselected') {
                    return;
                }

                selectedProductsItems.forEach((selectedProduct) => {
                    this.checkAndAddProduct(selectedProduct.productCode);
                });
            };

            document.body.addEventListener('ibexa-pc-product-selector:selected-products-changed', handleProductSelection);
        }

        isSelectBtnAvailable() {
            return this.selectProductBtn !== null;
        }
    }

    class CollectionDraggable extends ibexa.core.Draggable {
        constructor(config, { sortInputs } = {}) {
            super(config);

            this.sortInputs = sortInputs;
        }

        onDrop() {
            super.onDrop();

            this.sortInputs();
        }

        reinit(renderedItem) {
            super.reinit();

            this.triggerHighlight(renderedItem);
        }
    }

    collections.forEach((collection) => {
        const collectionInstance = new Collection(collection);

        collectionInstance.initProductCollection();
    });
})(window, window.document, window.ibexa, window.Translator);
