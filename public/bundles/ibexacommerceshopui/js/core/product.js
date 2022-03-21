import addConfig from '../helpers/addConfig';

(function(global, doc) {
    class Product {
        constructor(config = {}) {
            this.messageDelay = config.messageDelay || 4000;
            this.storedBasketMessageTimeout = null;
        }

        setElements() {
            this.userState = doc.querySelector('.ibexa-commerce-js--user-state');
            this.quantity = doc.querySelector('.ibexa-commerce-js--quantity');
            this.addBasketButton = doc.querySelector('.ibexa-commerce-js--btn-add-to-basket');
            this.addStoredBasketButton = doc.querySelector('.ibexa-commerce-js--btn-add-to-stored-basket');
            this.addWishlistButton = doc.querySelector('.ibexa-commerce-js--btn-add-to-wishlist');
            this.addCompareButton = doc.querySelector('.ibexa-commerce-js--btn-add-to-compare');
            this.confirmStoredBasketButton = doc.querySelector('.ibexa-commerce-js--btn-confirm-stored-basket');
            this.storedBasketsNode = doc.querySelector('.ibexa-commerce-product__stored-baskets');
            this.storedBasketsListNode = doc.querySelector('.ibexa-commerce-product__stored-baskets-list');
            this.storedBasketsListContainerNode = doc.querySelector('.ibexa-commerce-product__stored-baskets-list-container');
            this.storedBasketsInputContainerNode = doc.querySelector('.ibexa-commerce-product__stored-baskets-input-container');
            this.skuInput = doc.querySelector('.ibexa-commerce-js--sku');
            this.storedBasketInput = doc.querySelector('.ibexa-commerce-product__input--stored-basket');
            this.newStoredBasketInput = doc.querySelector('.ibexa-commerce-product__input--new-stored-basket');
            this.storedBasketMessageNode = doc.querySelector('.ibexa-commerce-product__stored-baskets-messages');
        }

        isAnonymous() {
            return !!parseInt(this.userState.dataset.isAnonymous, 10);
        }

        checkDatasetExistance() {
            if (this.quantity.dataset.ibexaCommerceMinQuantity === undefined) {
                console.error('data-ibexa-commerce-min-quantity on .ibexa-commerce-js--quantity is not set!');
            }
        }

        checkQuantity() {
            return parseInt(this.quantity.dataset.ibexaCommerceMinQuantity, 10) <= this.quantity.value;
        }

        checkSubmitState() {
            return this.checkQuantity();
        }

        checkStoredBasketState() {
            return this.checkQuantity() && !this.isAnonymous();
        }

        checkWishlistState() {
            return !this.isAnonymous();
        }

        checkCompareState() {
            return true;
        }

        toggleSubmitState() {
            this.addBasketButton.toggleAttribute('disabled', !this.checkSubmitState());
            this.addStoredBasketButton.toggleAttribute('disabled', !this.checkStoredBasketState());
            this.addWishlistButton.toggleAttribute('disabled', !this.checkWishlistState());
            this.addCompareButton.toggleAttribute('disabled', !this.checkCompareState());
        }

        onSubmit() {}

        transformRequest(response) {
            if (!response.ok) {
                throw response;
            }

            return response.json();
        }

        fetchStoredBasketsList() {
            if (this.addStoredBasketButton.classList.contains('ibexa-commerce-product__basket-button--expanded')) {
                this.storedBasketsNode.classList.remove('ibexa-commerce-product__stored-baskets--expanded');
                this.addStoredBasketButton.classList.remove('ibexa-commerce-product__basket-button--expanded');
                this.storedBasketsInputContainerNode.classList.remove('ibexa-commerce-product__stored-baskets-input-container--visible');
                this.storedBasketsListContainerNode.classList.remove('ibexa-commerce-product__stored-baskets-list-container--visible');
                this.storedBasketsListNode.innerHTML = '';

                return;
            }

            const { itemTemplate } = this.addStoredBasketButton.dataset;
            const request = new Request('/stored_baskets/list_data', {
                method: 'GET',
                mode: 'same-origin',
                credentials: 'same-origin',
            });

            fetch(request)
                .then(this.transformRequest)
                .then((response) => {
                    this.storedBasketsNode.classList.add('ibexa-commerce-product__stored-baskets--expanded');
                    this.addStoredBasketButton.classList.add('ibexa-commerce-product__basket-button--expanded');

                    if (response.messageType === 'error') {
                        this.showStoredBasketMessage({
                            message: response.message,
                            type: 'error',
                        });
                    } else {
                        this.storedBasketsInputContainerNode.classList.add('ibexa-commerce-product__stored-baskets-input-container--visible');
                        this.storedBasketsListContainerNode.classList.toggle(
                            'ibexa-commerce-product__stored-baskets-list-container--visible',
                            response.storedBasketsList.length
                        );
                        this.storedBasketsListNode.innerHTML = '';

                        response.storedBasketsList.forEach((storedBasket) => {
                            const renderedTemplate = itemTemplate.replaceAll('{{ stored_basket_name }}', storedBasket);

                            this.storedBasketsListNode.insertAdjacentHTML('beforeend', renderedTemplate);
                        });

                        doc.querySelectorAll('.ibexa-commerce-product__stored-baskets-list-item').forEach((listItem) => {
                            listItem.addEventListener('click', this.setExistingStoredBasket.bind(this), false);
                        });
                    }
                });
        }

        setExistingStoredBasket(event) {
            event.preventDefault();

            const { storedBasketName } = event.currentTarget.dataset;

            this.addToStoredBasket(storedBasketName).then(this.addToStoredBasketCallback.bind(this));
            this.newStoredBasketInput.value = '';
        }

        setNewStoredBasket(event) {
            event.preventDefault();

            if (this.newStoredBasketInput.value) {
                this.addToStoredBasket(this.newStoredBasketInput.value).then(this.addToStoredBasketCallback.bind(this));
            }
        }

        addToStoredBasketCallback(response) {
            if (response.messages.success || response.messages.notice) {
                this.fetchStoredBasketsList();
            }
        }

        addToStoredBasketRequestExec(request) {
            return fetch(request)
                .then(this.transformRequest)
                .then((response) => {
                    if (response.messages.success) {
                        this.showStoredBasketMessage({
                            message: response.messages.success,
                            type: 'success',
                        });
                    } else if (response.messages.notice) {
                        this.showStoredBasketMessage({
                            message: response.messages.notice,
                            type: 'notice',
                        });
                    } else {
                        this.showStoredBasketMessage({
                            message: response.messages.error,
                            type: 'error',
                        });
                    }

                    this.newStoredBasketInput.value = '';

                    return response;
                });
        }

        appendFormData(formData) {
            const sku = this.skuInput.value;
            const quantity = this.quantity.value;

            formData.append('ses_basket[0][sku]', sku);
            formData.append('ses_basket[0][quantity]', quantity);
        }

        addToStoredBasket(basketName, basketType = 'storedBasket') {
            const formData = new FormData();

            formData.append('basket_name', basketName);
            formData.append('basket_type', basketType);
            this.appendFormData(formData);

            const request = new Request('/basket/add_data', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                body: formData,
            });

            return this.addToStoredBasketRequestExec(request);
        }

        addToWishlist(event) {
            event.preventDefault();

            this.addToStoredBasket('', 'wishList');
        }

        addToCompare(event) {
            event.preventDefault();

            this.addToStoredBasket(this.addCompareButton.dataset.ibexaCommerceBasketName, 'comparison');
        }

        showStoredBasketMessage({ message, type }) {
            if (this.storedBasketMessageTimeout) {
                clearTimeout(this.storedBasketMessageTimeout);
            }

            this.storedBasketMessageNode.innerHTML = message;
            this.storedBasketMessageNode.classList.add(`ibexa-commerce-product__stored-baskets-messages--${type}`);
            this.storedBasketMessageTimeout = setTimeout(() => {
                this.storedBasketMessageNode.innerHTML = '';
                this.storedBasketMessageNode.classList = ['ibexa-commerce-product__stored-baskets-messages'];
            }, this.messageDelay);
        }

        addButtonListeners() {
            this.addBasketButton.addEventListener('click', this.onSubmit.bind(this), false);
            this.addStoredBasketButton.addEventListener('click', this.fetchStoredBasketsList.bind(this), false);
            this.addWishlistButton.addEventListener('click', this.addToWishlist.bind(this), false);
            this.addCompareButton.addEventListener('click', this.addToCompare.bind(this), false);
            this.confirmStoredBasketButton.addEventListener('click', this.setNewStoredBasket.bind(this), false);
        }

        init() {
            this.setElements();
            this.checkDatasetExistance();
            this.toggleSubmitState();
            this.addButtonListeners();

            this.quantity.addEventListener('change', this.toggleSubmitState.bind(this), false);
        }
    }

    addConfig('eshop.widgets.Product', Product);
})(window, window.document);
