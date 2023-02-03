import addConfig from '../helpers/addConfig';

(function(global, doc) {
    let checkoutAlreadyDeclared = false;
    const getFlatFieldsHelper = (output, path, data) => {
        if (Array.isArray(data) && data.length > 0 && typeof data[0] !== 'object') {
            output[path] = data;
        } else {
            Object.entries(data).forEach(([key, value]) => {
                getFlatFieldsHelper(output, `${path}[${key}]`, value);
            });
        }
    };
    const getFlatFields = (data) => {
        const output = {};

        Object.entries(data).forEach(([key, value]) => {
            getFlatFieldsHelper(output, key, value);
        });

        return output;
    };
    const transformRequest = (response) => {
        if (!response.ok) {
            throw response;
        }

        return response.json();
    };
    class CheckoutPage {
        constructor(options = {}) {
            if (checkoutAlreadyDeclared) {
                throw new Error("You can't declare more than one Checkout class!");
            }

            checkoutAlreadyDeclared = true;

            this.getBasket = options.getBasket;

            this.currentStep = 'login';
            this.submitButtons = doc.querySelectorAll('.ibexa-commerce-js--button-next-step');
            this.steps = [...doc.querySelectorAll('.ibexa-commerce-js--step-wrapper')].map((step) => step.id);
            this.addressKeys = ['company', 'companySecond', 'street', 'addressSecond', 'zip', 'city', 'country', 'county', 'phone'];

            this.refreshBasketData = this.refreshBasketData.bind(this);
        }

        clearErrors(form) {
            const errorElement = form.querySelector('.ibexa-commerce-js--checkout-error-message');

            if (errorElement) {
                errorElement.innerHTML = '';
            }

            form.querySelectorAll('.ibexa-commerce-js--field-error').forEach((fieldError) => (fieldError.innerHTML = ''));
        }

        setErrors(form, errorMessage, formErrors) {
            const errorElement = form.querySelector('.ibexa-commerce-js--checkout-error-message');

            if (errorElement) {
                errorElement.innerHTML = errorMessage;
            }

            if (formErrors) {
                const errors = getFlatFields(formErrors);

                Object.entries(errors).forEach(([path, error]) => {
                    form
                        .querySelector(`[name="${path}"]`)
                        .closest('.ibexa-commerce-js--field-wrapper')
                        .querySelector('.ibexa-commerce-js--field-error').innerHTML = error.join('\n');
                });
            }
        }

        setCurrentStep(currentStep) {
            let addDoneClass = true;

            this.steps.forEach((step) => {
                const element = doc.querySelector(`#${step}`);

                element.classList.remove('ibexa-commerce-checkout__step--active');
                element.classList.remove('ibexa-commerce-checkout__step--done');

                if (step === currentStep) {
                    element.classList.add('ibexa-commerce-checkout__step--active');
                    addDoneClass = false;
                } else {
                    if (addDoneClass) {
                        element.classList.add('ibexa-commerce-checkout__step--done');
                    }
                }
            });

            this.currentStep = currentStep;

            this.changeRoute(currentStep);
        }

        fillSummarySidebar(response = {}) {
            if (!response.summary) {
                return;
            }

            const sidebarSummary = doc.querySelector('#sidebar_summary');

            sidebarSummary.innerHTML = sidebarSummary.dataset.template;

            const sidebarSummaryList = sidebarSummary.querySelector('.ibexa-commerce-sidebar-summary__list');
            const { template, additionalTemplate } = sidebarSummaryList.dataset;
            const fragment = doc.createDocumentFragment();

            response.summary.products.forEach((product) => {
                const container = doc.createElement('li');
                const renderedItem = template
                    .replace('{{ QUANTITY }}', product.quantity)
                    .replace('{{ NAME }}', product.name)
                    .replace('{{ PRICE }}', product.price);

                container.insertAdjacentHTML('beforeend', renderedItem);
                fragment.append(container.querySelector('li'));
            });

            if (response.current_step ==='summary') {
                response.summary.additional_lines.forEach((additional_line) => {
                    const container = doc.createElement('li');
                    const renderedItem = additionalTemplate
                        .replace('{{ NAME }}', additional_line.name)
                        .replace('{{ PRICE }}', additional_line.price);

                    container.insertAdjacentHTML('beforeend', renderedItem);
                    fragment.append(container.querySelector('li'));
                });
            }

            sidebarSummaryList.append(fragment);
        }

        fillAddressSidebar(sidebarSelector, data) {
            const sidebar = doc.querySelector(sidebarSelector);
            let template = sidebar.dataset.template;

            template = template
                .replace('{{ ADDRESS1 }}', data.name[0] || '')
                .replace('{{ ADDRESS2 }}', data.name[1] || '')
                .replace('{{ STREET1 }}', data.postal_address.street_name || '')
                .replace('{{ STREET2 }}', data.postal_address.additional_street_name || '')
                .replace('{{ NUMBER }}', data.postal_address.building_number || '')
                .replace('{{ ZIP }}', data.postal_address.postal_zone || '')
                .replace('{{ CITY }}', data.postal_address.city_name || '')
                .replace('{{ COUNTRY }}', data.postal_address.country || '')
                .replace('{{ MAIL }}', data.contact.electronic_mail || '')
                .replace('{{ PHONE }}', data.contact.telephone || '');

            sidebar.innerHTML = template;
        }

        fillInvoiceSidebar(response = {}) {
            if (!response.invoice) {
                return;
            }

            this.fillAddressSidebar('#sidebar_invoice', response.invoice);
        }

        fillDeliverySidebar(response = {}) {
            if (!response.delivery) {
                return;
            }

            this.fillAddressSidebar('#sidebar_delivery', response.delivery);
        }

        copyInvoiceToDelivery() {
            const invoiceForm = Object.fromEntries(new FormData(doc.querySelector('#invoice form')));

            this.addressKeys.forEach((key) => {
                doc.querySelector(`#delivery form [name="checkout_delivery_address[${key}]"]`).value =
                    invoiceForm[`checkout_invoice_address[${key}]`];
            });
        }

        showForceStop(response = {}) {
            if (response.force_step_hide === false) {
                doc.querySelector(`#${response.current_step} .ibexa-commerce-js--force-step`).hidden = false;
            }
        }

        bindDeliveryFormEvents() {
            doc.querySelectorAll('input[name="checkout_delivery_address[addressStatus]"]').forEach((input) =>
                input.addEventListener('change', (event) => {
                    doc.querySelector('.ibexa-commerce-existing-delivery-address').classList.remove(
                        'ibexa-commerce-existing-delivery-address--visible'
                    );

                    if (event.currentTarget.value === 'sameAsInvoice') {
                        this.copyInvoiceToDelivery();
                    } else if (event.currentTarget.value === 'existing') {
                        doc.querySelector('.ibexa-commerce-existing-delivery-address').classList.add(
                            'ibexa-commerce-existing-delivery-address--visible'
                        );
                    } else if (event.currentTarget.value === 'new') {
                        this.addressKeys.forEach((key) => {
                            doc.querySelector(`#delivery form [name="checkout_delivery_address[${key}]"]`).value = '';
                        });
                    }
                })
            );

            doc.querySelectorAll('.ibexa-commerce-js--address-button').forEach((button) =>
                button.addEventListener('click', (event) => {
                    const address = JSON.parse(event.currentTarget.closest('.ibexa-commerce-js--address-wrapper').dataset.address);

                    this.addressKeys.forEach((key) => {
                        doc.querySelector(`#delivery form [name="checkout_delivery_address[${key}]"]`).value = address[key] || '';
                    });
                })
            );
        }

        bindShowStepEvents() {
            doc.querySelectorAll('.ibexa-commerce-checkout__step-action--show').forEach((button) =>
                button.addEventListener('click', (event) => {
                    this.validateState(event.currentTarget.closest('.ibexa-commerce-js--step-wrapper').id);
                })
            );
        }

        changeRoute(currentStep) {
            const url = new URL(global.location);

            url.hash = currentStep;

            window.history.pushState({}, '', url);
        }

        bindSubmitEvents() {
            this.submitButtons.forEach((submitButton) => {
                const form = submitButton.closest('form');

                form.addEventListener('submit', (event) => {
                    event.preventDefault();

                    const request = new Request(form.dataset.requestUrl, {
                        method: 'post',
                        mode: 'same-origin',
                        credentials: 'same-origin',
                        body: new FormData(form),
                    });

                    fetch(request)
                        .then(transformRequest)
                        .then((response) => {
                            this.clearErrors(form);

                            if (response.status === 'error') {
                                this.setErrors(form, response.validation.message, response.validation.form_errors);

                                return;
                            }

                            if (response.redirect_url) {
                                window.location.href = response.redirect_url;

                                return;
                            }

                            this.setCurrentStep(response.current_step);
                            this.onStepEnter(response.current_step, { response });
                        });
                });
            });

            doc.querySelector('.ibexa-commerce-js--button-buy-as-guest').addEventListener('click', (event) => {
                event.preventDefault();

                const nextStep = 'invoice';

                this.setCurrentStep(nextStep);
                this.onStepEnter(nextStep);
            });
        }

        refreshBasketData() {
            this.getBasket().then((response) => {
                const basketContainer = doc.querySelector('.ibexa-commerce-basket-summary');
                const shippingLines = basketContainer.querySelectorAll('.ibexa-commerce-basket-summary__row--shipping');
                const { template } = basketContainer.dataset;
                const fragment = doc.createDocumentFragment();
                const totalLineValue = basketContainer.querySelector('.ibexa-commerce-basket-summary__row-value--total');

                shippingLines.forEach((shippingLine) => shippingLine.remove());

                response.basketData.shippingCosts.forEach((shippingLine) => {
                    const container = doc.createElement('div');
                    const renderedItem = template
                        .replace('{{ NAME }}', shippingLine.name)
                        .replace('{{ PRICE }}', shippingLine.price);

                    container.insertAdjacentHTML('beforeend', renderedItem);
                    container.querySelector('.ibexa-commerce-basket-summary__row').classList.add('ibexa-commerce-basket-summary__row--shipping');
                    fragment.append(container.querySelector('div'));
                });

                basketContainer.prepend(fragment);
                totalLineValue.innerHTML = response.basketData.totalPriceFormatted;
            })
        }

        onStepEnter(step, { response } = {}) {
            this.fillSummarySidebar(response);
            this.fillInvoiceSidebar(response);
            this.fillDeliverySidebar(response);
            this.showForceStop(response);
            this.refreshBasketData();


            if (step === 'delivery') {
                if (!new FormData(doc.querySelector('#delivery form')).get('checkout_delivery_address[addressStatus]')) {
                    this.copyInvoiceToDelivery();
                    doc.querySelector('input[name="checkout_delivery_address[addressStatus]"][value="sameAsInvoice"]').checked = true;
                }
            }
        }

        validateState(customCurrentStep) {
            const currentStep = customCurrentStep || global.location.hash.slice(1);
            let validateUrl = doc.querySelector('.ibexa-commerce-js--checkout-wrapper').dataset.validateUrl;

            if (currentStep) {
                validateUrl += `/${currentStep}`;
            }

            const request = new Request(validateUrl, {
                method: 'post',
                mode: 'same-origin',
                credentials: 'same-origin',
            });

            fetch(request)
                .then(transformRequest)
                .then((response) => {
                    this.setCurrentStep(response.current_step);
                    this.onStepEnter(response.current_step, { response });
                });
        }

        init() {
            this.bindSubmitEvents();
            this.bindDeliveryFormEvents();
            this.bindShowStepEvents();
        }
    }

    addConfig('eshop.widgets.CheckoutPage', CheckoutPage);
})(window, window.document);
