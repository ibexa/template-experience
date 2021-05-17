import addConfig from '../helpers/addConfig';

(function(global, doc) {
    class Product {
        constructor(messageDelay = 4000) {
            this.messageDelay = messageDelay;
            this.storedBasketMessageTimeout = null;
        }

        setElements() {
            this.quantity = doc.querySelector('.ezcommerce-js--quantity');
            this.addBasketButton = doc.querySelector('.ezcommerce-js--btn-add-to-basket');
            this.addStoredBasketButton = doc.querySelector('.ezcommerce-js--btn-add-to-stored-basket');
            this.confirmStoredBasketButton = doc.querySelector('.ezcommerce-js--btn-confirm-stored-basket');
            this.storedBasketsNode = doc.querySelector('.ezcommerce-product__stored-baskets');
            this.storedBasketsListNode = doc.querySelector('.ezcommerce-product__stored-baskets-list');
            this.storedBasketsListContainerNode = doc.querySelector('.ezcommerce-product__stored-baskets-list-container');
            this.storedBasketsInputContainerNode = doc.querySelector('.ezcommerce-product__stored-baskets-input-container');
            this.skuInput = doc.querySelector('.ezcommerce-js--sku');
            this.storedBasketInput = doc.querySelector('.ezcommerce-product__input--stored-basket');
            this.newStoredBasketInput = doc.querySelector('.ezcommerce-product__input--new-stored-basket');
            this.storedBasketMessageNode = doc.querySelector('.ezcommerce-product__stored-basekts-messages');
        }

        checkDatasetExistance() {
            if (this.quantity.dataset.ezcommerceMinQuantity === undefined) {
                console.error('data-ezcommerce-min-quantity on .ezcommerce-js--quantity is not set!');
            }
        }

        checkQuantity() {
            return parseInt(this.quantity.dataset.ezcommerceMinQuantity, 10) <= this.quantity.value;
        }

        checkSubmitState() {
            return this.checkQuantity();
        }

        toggleSubmitState() {
            this.addBasketButton.toggleAttribute('disabled', !this.checkSubmitState());
            this.addStoredBasketButton.toggleAttribute('disabled', !this.checkSubmitState());
        }

        onSubmit() {}

        transformRequest(response) {
            if (!response.ok) {
                throw response;
            }

            return response.json();
        }

        fetchStoredBasketsList() {
            const { itemTemplate } = this.addStoredBasketButton.dataset;
            const request = new Request('/stored_baskets/list_data', {
                method: 'GET',
                mode: 'same-origin',
                credentials: 'same-origin',
            });

            fetch(request).then(this.transformRequest).then((response) => {
                this.storedBasketsNode.classList.add('ezcommerce-product__stored-baskets--expanded');

                if (response.messageType === 'error') {
                    this.showStoredBasketMessage({
                        message: response.message,
                        type: 'error',
                    });
                } else {
                    this.storedBasketsInputContainerNode.classList.add('ezcommerce-product__stored-baskets-input-container--visible');
                    this.storedBasketsListContainerNode.classList.toggle(
                        'ezcommerce-product__stored-baskets-list-container--visible',
                        response.storedBasketsList.length
                    );
                    this.storedBasketsListNode.innerHTML = '';

                    response.storedBasketsList.forEach((storedBasket) => {
                        const renderedTemplate = itemTemplate.replaceAll('{{ stored_basket_name }}', storedBasket);

                        this.storedBasketsListNode.insertAdjacentHTML('beforeend', renderedTemplate);
                    });

                    doc.querySelectorAll('.ezcommerce-product__stored-baskets-list-item').forEach((listItem) => {
                        listItem.addEventListener('click', this.setExistingStoredBasket.bind(this), false);
                    });
                }
            });
        }

        setExistingStoredBasket(event) {
            event.preventDefault();

            const { storedBasketName } = event.currentTarget.dataset;

            this.addToStoredBasket(storedBasketName);
            this.newStoredBasketInput.value = '';
        }

        setNewStoredBasket(event) {
            event.preventDefault();

            if (this.newStoredBasketInput.value) {
                this.addToStoredBasket(this.newStoredBasketInput.value);
            }
        }

        addToStoredBasket(basketName) {
            const sku = this.skuInput.value;
            const quantity = this.quantity.value;
            const formData = new FormData();

            formData.append('basket_name', basketName);
            formData.append('basket_type', 'storedBasket');
            formData.append('ses_basket[0][sku]', sku);
            formData.append('ses_basket[0][quantity]', quantity);

            const request = new Request('/basket/add_data', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                body: formData,
            });

            fetch(request).then(this.transformRequest).then((response) => {
                if (response.messages.success) {
                    this.fetchStoredBasketsList();
                    this.showStoredBasketMessage({
                        message: response.messages.success,
                        type: 'success',
                    });
                } else if (response.message.notice) {
                    this.fetchStoredBasketsList();
                    this.showStoredBasketMessage({
                        message: response.messages.notice,
                        type: 'notice',
                    });
                } else {
                    this.showStoredBasketMessage({
                        message: esponse.messages.error,
                        type: 'error',
                    });
                }

                this.newStoredBasketInput.value = '';
            });
        }

        showStoredBasketMessage({ message, type }) {
            if (this.storedBasketMessageTimeout) {
                clearTimeout(this.storedBasketMessageTimeout);
            }

            this.storedBasketMessageNode.innerHTML = message;
            this.storedBasketMessageNode.classList.add(`ezcommerce-product__stored-basekts-messages--${type}`);
            this.storedBasketMessageTimeout = setTimeout(() => {
                this.storedBasketMessageNode.innerHTML = '';
                this.storedBasketMessageNode.classList = ['ezcommerce-product__stored-basekts-messages'];
            }, this.messageDelay);
        }

        init() {
            this.setElements();
            this.checkDatasetExistance();
            this.toggleSubmitState();

            this.quantity.addEventListener('change', this.toggleSubmitState.bind(this), false);
            this.addBasketButton.addEventListener('click', this.onSubmit.bind(this), false);
            this.addStoredBasketButton.addEventListener('click', this.fetchStoredBasketsList.bind(this), false);
            this.confirmStoredBasketButton.addEventListener('click', this.setNewStoredBasket.bind(this), false);
        }
    }

    addConfig('eshop.widgets.Product', Product);
})(window, window.document);
