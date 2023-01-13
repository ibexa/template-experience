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
    const errorContainer = collection.querySelector('.ibexa-pb-product-collection__error-container');
    const FIRST_PRODUCT_ID = 0;
    const INIT_PRODUCTS_LIST_LENGTH = 0;
    const PRODUCTS_LIST_NO_ITEMS_CLASS = 'ibexa-pb-product-collection__list-wrapper--no-items';
    const ERROR_HIDDEN_CLASS = 'ibexa-pb-product-collection__error-container--hidden';
    const updateListCounter = () => {
        const collectionLength = collectionList.children.length;
        const listTitle = Translator.trans(
            /*@Desc("List (%count%)")*/ 'product.collection.list',
            { count: collectionLength },
            'page_builder_block',
        );

        collectionListHeader.innerHTML = listTitle;
    };
    const toggleError = (showError) => {
        errorContainer.classList.toggle(ERROR_HIDDEN_CLASS, !showError);
    };
    const attachListenersToProduct = (item, hiddenItem) => {
        item.querySelector('.ibexa-btn--trash').addEventListener('click', (event) => removeProduct(event, item, hiddenItem), false);
    };
    const openUdw = ({ currentTarget }, draggable) => {
        const config = JSON.parse(currentTarget.dataset.udwConfig);
        const title = Translator.trans(/*@Desc("Select product")*/ 'product.collection.select_product', {}, 'page_builder_block');
        // TODO
        // const selectedLocations = [
        //     ...collectionList.querySelectorAll('.ibexa-pb-product-collection-item .ibexa-pb-product-collection-item__label--product-code'),
        // ].map((item) => parseInt(item.textContent, 10));
        const openUdwEvent = new CustomEvent('ibexa-open-udw', {
            detail: {
                title,
                multiple: true,
                onConfirm: (products) => {
                    products.forEach((product) => {
                        const productCode = product.ContentInfo.Content.CurrentVersion.Version.Fields.field.find(
                            (field) => field.fieldDefinitionIdentifier === 'product_specification',
                        );
                        const productName = product.ContentInfo.Content.CurrentVersion.Version.Fields.field.find(
                            (field) => field.fieldDefinitionIdentifier === 'name',
                        );

                        if (productCode !== 'undefined' && productName !== 'undefined') {
                            addProduct(productCode.fieldValue.code, productName.fieldValue, null, draggable);
                        }
                    });
                },
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
    const checkIfProductExist = (productCode) => {
        const productInputs = [...hiddenInputsList.querySelectorAll('input.ibexa-pb-product-collection-item__input')];
        const isProductAdded = productInputs.some((input) => input.value === productCode);

        return isProductAdded;
    };
    const checkProduct = (productCode, draggable) => {
        const productVariantUrl = '/api/ibexa/v2/product/catalog/product_variant';
        const getProductVariantRequest = new Request(`${productVariantUrl}/${productCode}`, {
            method: 'GET',
            mode: 'same-origin',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/vnd.ibexa.api.ProductGet+json',
                Accept: 'application/json',
            },
        });
        const productUrl = '/api/ibexa/v2/product/catalog/products';
        const getProductRequest = new Request(`${productUrl}/${productCode}`, {
            method: 'GET',
            mode: 'same-origin',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/vnd.ibexa.api.ProductGet+json',
                Accept: 'application/json',
            },
        });

        Promise.all([fetch(getProductVariantRequest), fetch(getProductRequest)])
            .then((results) => {
                const result = results.filter((resultStatus) => resultStatus.ok);

                if (result.length !== 1) {
                    toggleError(true);
                } else {
                    return result[0].json();
                }
            })
            .then((result) => {
                if (!result) {
                    return;
                }
                const {
                    Product: {
                        name,
                        ProductType: { identifier },
                    },
                } = result;

                addProduct(productCode, name, identifier, draggable);
            });
    };
    const addProduct = (productCode, name, productType, draggable) => {
        if (checkIfProductExist(productCode)) {
            return;
        }

        const { productTemplate, nextIndexId } = collectionListWrapper.dataset;
        const index = parseInt(nextIndexId, 10) || FIRST_PRODUCT_ID;
        const filledProductTemplate = productTemplate.replaceAll('__name__', index);

        toggleError(false);
        hiddenInputsList.insertAdjacentHTML('beforeend', filledProductTemplate);

        const hiddenProductItem = hiddenInputsList.lastElementChild;
        const hiddenProductInput = hiddenProductItem.querySelector('input');

        hiddenProductItem.dataset.id = index;
        hiddenProductInput.value = productCode;
        productCodeInput.value = '';
        collectionListWrapper.dataset.nextIndexId = index + 1;

        const { itemTemplate } = collectionList.dataset;
        const renderedItem = itemTemplate
            .replace('__product_name__', name)
            .replaceAll('__product_code__', productCode)
            .replace('__product_type__', productType)
            .replaceAll('__id__', index);

        collectionList.insertAdjacentHTML('beforeend', renderedItem);
        collectionListWrapper.classList.remove(PRODUCTS_LIST_NO_ITEMS_CLASS);
        attachListenersToProduct(collectionList.lastElementChild, hiddenProductItem);
        draggable.reinit();
        updateListCounter();
    };
    const initProductCollection = () => {
        const draggable = new ibexa.core.Draggable({
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
        addProductBtn.addEventListener('click', () => checkProduct(productCodeInput.value, draggable), false);

        if (hiddenInputsList.children.length <= INIT_PRODUCTS_LIST_LENGTH) {
            collectionListWrapper.classList.add(PRODUCTS_LIST_NO_ITEMS_CLASS);
        }
    };

    initProductCollection();
})(window, window.document, window.ibexa, window.Translator);
