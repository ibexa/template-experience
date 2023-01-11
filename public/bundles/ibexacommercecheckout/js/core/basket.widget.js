import addConfig from '../helpers/addConfig';

(function(global, doc) {
    class BasketWidget {
        constructor(config = {}) {
            this.afterUpdate = config.afterUpdate ? config.afterUpdate.bind(this) : () => {};
            this.container = config.container;

            if (!this.container) {
                console.error('No container delivered for BasketWidget!');

                return;
            }

            this.setElements();
        }

        setElements() {
            this.basketElement = this.container.classList.contains('ibexa-commerce-js--basket-widget')
                ? this.container
                : this.container.querySelector('.ibexa-commerce-js--basket-widget');
            this.basketValueElement = this.basketElement.querySelector('.ibexa-commerce-js--basket-value');
            this.basketCounterElement = this.basketElement.querySelector('.ibexa-commerce-js--basket-counter');
            this.basketTotalElement = this.basketElement.querySelector('.ibexa-commerce-js--basket-total');
            this.basketProductsElement = this.basketElement.querySelector('.ibexa-commerce-js--basket-products');
            this.basketShippingElement = this.basketElement.querySelector('.ibexa-commerce-js--basket-shipping');
            this.basketAdditionalElement = this.basketElement.querySelector('.ibexa-commerce-js--basket-additional');
            this.basketDiscountsElement = this.basketElement.querySelector('.ibexa-commerce-js--basket-discounts');
        }

        updateTotal(value) {
            if (parseInt(this.basketElement.dataset.productsInBasket, 10) === 0) {
                this.basketValueElement.innerHTML = '';
                this.basketTotalElement.innerHTML = '';

                return;
            }

            this.basketValueElement.innerHTML = value;
            this.basketTotalElement.innerHTML = value;
        }

        updateCounter(value) {
            this.basketElement.dataset.productsInBasket = value;
            this.basketCounterElement.innerHTML = value;
        }

        fillRowData(container, row) {
            const basketNameNode = container.querySelector('.ibexa-commerce-js--basket-name');

            container.querySelector('.ibexa-commerce-js--basket-row').dataset.id = row.sku;
    
            if (basketNameNode.tagName.toLowerCase() === 'a' && row.seoUrl) {
                basketNameNode.href = row.seoUrl;
            }
    
            const rowQuantity = row.quantity > 1 ? `${row.quantity}x ` : '';
            const rowVariantCode = row.variantCode ? ` (${row.variantCode})` : '';

            basketNameNode.innerHTML = `${rowQuantity}${row.name}${rowVariantCode}`;
            container.querySelector('.ibexa-commerce-js--basket-price').innerHTML = row.price;
        }

        updateCategory(rows, container, clear = true) {
            if (!container) {
                return;
            }

            if (clear) {
                container.innerHTML = '';
            }

            const tagName = container.tagName;
            const fragment = doc.createDocumentFragment();

            rows.forEach((row) => {
                const containerRow = doc.createElement(tagName);
                const renderedItem = container.dataset.template;

                containerRow.insertAdjacentHTML('beforeend', renderedItem);

                this.fillRowData(containerRow, row);

                const rowNode = containerRow.firstChild;

                fragment.append(rowNode);
            });

            container.append(fragment);
        }

        updateBasket(event) {
            const basketData = event.detail.basketData;
            const { totalPriceFormatted, products, shippingCosts, additionalCosts, discounts } = basketData;

            this.updateCounter(products.length);
            this.updateTotal(totalPriceFormatted);
            this.updateCategory(products, this.basketProductsElement);
            this.updateCategory(shippingCosts, this.basketShippingElement);
            this.updateCategory(additionalCosts, this.basketAdditionalElement);
            this.updateCategory(discounts, this.basketDiscountsElement);
            this.afterUpdate(event.detail);
        }

        bindBasketEvents() {
            doc.body.addEventListener('ibexa-basket:update-basket', this.updateBasket.bind(this), false);
        }

        init() {
            this.bindBasketEvents();
        }

        reinit() {
            this.setElements();
        }
    }

    addConfig('eshop.widgets.BasketWidget', BasketWidget);
})(window, window.document);