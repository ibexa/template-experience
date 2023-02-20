import addConfig from '../helpers/addConfig';

(function(global, doc, ibexa) {
    class ProductMulti extends ibexa.eshop.widgets.Product {
        setElements() {
            super.setElements();

            this.quantity = [...doc.querySelectorAll('.ezcommerce-js--quantity')];
            this.minQuantity = this.quantity.length ? parseInt(this.quantity[0].dataset.ezcommerceMinQuantity, 10) : 1;
        }

        checkDatasetExistance() {
            if (this.quantity[0].dataset.ezcommerceMinQuantity === undefined) {
                console.error('data-ezcommerce-min-quantity on .ezcommerce-js--quantity is not set!');
            }
        }

        checkQuantity() {
            const quantityTotal = this.quantity.reduce((total, current) => total + (current.value ? parseInt(current.value, 10) : 0), 0);

            return quantityTotal >= this.minQuantity;
        }

        checkWishlistState() {
            return this.checkQuantity() && !this.isAnonymous();
        }

        checkCompareState() {
            return this.checkQuantity();
        }

        appendFormData(formData) {
            const quantity = this.quantity;

            quantity.forEach((variant) => {
                const variantQuantity = variant.value;
                const variantCode = variant.dataset.ezcommerceVariantCode;
                const sku = doc.querySelector(`[name="ses_basket[${variantCode}][sku]"`).value;

                if (variantQuantity > 0) {
                    formData.append(`ses_basket[${variantCode}][sku]`, sku);
                    formData.append(`ses_basket[${variantCode}][quantity]`, variantQuantity);
                    formData.append(`ses_basket[${variantCode}][isVariant]`, 'isVariant');
                    formData.append(`ses_basket[${variantCode}][ses_variant_code]`, variantCode);
                }
            });
        }

        init() {
            this.setElements();
            this.checkDatasetExistance();
            this.toggleSubmitState();
            this.addButtonListeners();

            this.quantity.forEach((input) => input.addEventListener('change', this.toggleSubmitState.bind(this), false));
        }
    }

    addConfig('eshop.widgets.ProductMulti', ProductMulti);
})(window, window.document, window.ibexa);
