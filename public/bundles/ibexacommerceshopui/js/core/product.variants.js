import addConfig from '../helpers/addConfig';

(function(global, doc, ibexa) {
    class ProductVariants extends ibexa.eshop.widgets.Product {
        constructor(config = {}) {
            super(config);

            this.sku = config.sku;
        }

        setElements() {
            super.setElements();

            this.characteristics = [...doc.querySelectorAll('.ibexa-commerce-js--characteristics')];
            this.characteristicButtons = [...doc.querySelectorAll('.ibexa-commerce-js--characteristic')];
            this.priceWrapper = doc.querySelector('.ibexa-commerce-js--price-wrapper');
            this.identifier = doc.querySelector('.ibexa-commerce-js--identifier');
            this.variantCode = doc.querySelector('.ibexa-commerce-js--variant-code');
        }

        checkDatasetExistance() {
            super.checkDatasetExistance();

            if (this.characteristics.some((element) => element.dataset.ibexaCommerceVariantGroup === undefined)) {
                console.error('data-ibexa-commerce-variant-group on .ibexa-commerce-js--characteristics is not set!');
            }
            if (this.characteristicButtons.some((element) => element.dataset.ibexaCommerceValue === undefined)) {
                console.error('data-ibexa-commerce-value on .ibexa-commerce-js--characteristic is not set!');
            }
        }

        getRequest(body) {
            const formData = new FormData();

            formData.append('ses_request', JSON.stringify(body));

            return new Request('/_ajax_/phalanx', {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
                mode: 'same-origin',
                credentials: 'same-origin',
            });
        }

        transformRequest(response) {
            if (!response.ok) {
                throw response;
            }

            return response.json();
        }

        getVariant(variantsData) {
            const body = {
                get_variantsData: [
                    {
                        variants: variantsData,
                        sku: this.sku,
                        type: 'variant',
                    },
                ],
            };
            const request = this.getRequest(body);

            fetch(request)
                .then(this.transformRequest)
                .then((response) => {
                    this.variantCode.value = response.get_variantsData.variantCode;
                    this.variantCode.dispatchEvent(new Event('change'));

                    const buttons = doc.querySelectorAll('.ibexa-commerce-js--characteristics .ibexa-commerce-js--characteristic');

                    buttons.forEach((button) => {
                        button.setAttribute('disabled', 'disabled');
                    });

                    Object.entries(response.get_variantsData.availableVariantCodes).forEach(([key, variants]) => {
                        Object.keys(variants).forEach((variant) => {
                            const variantEscaped = variant.replaceAll(/([^a-zA-Z0-9-_])/g, '\\$1');
                            const button = doc.querySelector(
                                `.ibexa-commerce-js--characteristics[data-ibexa-commerce-variant-group="${key}"] .ibexa-commerce-js--characteristic[data-ibexa-commerce-value="${variantEscaped}"]`
                            );

                            button.removeAttribute('disabled');
                        });
                    });

                    return response;
                })
                .catch(console.error);
        }

        updateContainer(args) {
            console.warn("updateContainer method in class ProductVariants hasn't been overwritten!");

            return args;
        }

        updatePrice() {
            const body = {
                get_ProductInformation: [
                    {
                        identifier: this.identifier.value,
                        variantCode: this.variantCode.value ? this.variantCode.value : undefined,
                        priceEngineContextId: 'product_detail',
                        type: 'catalog',
                    },
                ],
            };
            const request = this.getRequest(body);

            fetch(request)
                .then(this.transformRequest)
                .then((response) =>
                    this.updateContainer({
                        container: this.priceWrapper,
                        response,
                    })
                )
                .catch(console.error);
        }

        checkVariantField() {
            return this.variantCode.value !== undefined && this.variantCode.value !== '';
        }

        checkSubmitState() {
            return this.checkQuantity() && this.checkVariantField();
        }

        checkStoredBasketState() {
            return this.checkQuantity() && this.checkVariantField() && !this.isAnonymous();
        }

        checkWishlistState() {
            return this.checkVariantField() && !this.isAnonymous();
        }

        checkCompareState() {
            return this.checkVariantField();
        }

        bindCharacteristicEvents(containers) {
            containers.forEach((container) => {
                container.querySelectorAll('.ibexa-commerce-js--characteristic').forEach((button) =>
                    button.addEventListener('click', (event) => {
                        if (event.target.classList.contains('ibexa-commerce-js--selected')) {
                            event.target.classList.remove('ibexa-commerce-js--selected');
                        } else {
                            const selected = container.querySelector('.ibexa-commerce-js--characteristic.ibexa-commerce-js--selected');

                            if (selected) {
                                selected.classList.remove('ibexa-commerce-js--selected');
                            }

                            event.target.classList.add('ibexa-commerce-js--selected');
                        }

                        const bodyRequest = {};

                        containers.forEach((containerSelected) => {
                            const selectedElement = containerSelected.querySelector('.ibexa-commerce-js--selected');

                            if (selectedElement) {
                                bodyRequest[containerSelected.dataset.ibexaCommerceVariantGroup] = selectedElement.dataset.ibexaCommerceValue;
                            }
                        });

                        this.getVariant(bodyRequest);
                    })
                );
            });
        }

        appendFormData(formData) {
            const sku = this.skuInput.value;
            const quantity = this.quantity.value;
            const variantCode = this.variantCode.value;

            formData.append('ses_basket[0][sku]', sku);
            formData.append('ses_basket[0][quantity]', quantity);
            formData.append('ses_basket[0][isVariant]', 'isVariant');
            formData.append('ses_basket[0][ses_variant_code]', variantCode);
        }

        init() {
            super.init();

            this.variantCode.addEventListener('change', this.updatePrice.bind(this), false);
            this.variantCode.addEventListener('change', this.toggleSubmitState.bind(this), false);

            this.bindCharacteristicEvents(this.characteristics);
        }
    }

    addConfig('eshop.widgets.ProductVariants', ProductVariants);
})(window, window.document, window.ibexa);
