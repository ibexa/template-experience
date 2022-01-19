export class SearchInput {
    constructor(options = {}) {
        if (!options.customerId || !options.container) {
            console.error('Missing SearchInput options.');

            return;
        }

        this.customerId = options.customerId;
        this.onItemAdd = options.onItemAdd ?? (() => {});

        this.container = options.container;
        this.input = this.container.querySelector('.ibexa-perso-search-input__input');
        this.popup = this.container.querySelector('.ibexa-perso-search-input__popup');
        this.addBtn = this.container.querySelector('.ibexa-btn--add-search-item');

        this.selectedItem = null;

        this.popupItemTemplate = this.container.dataset.popupItemTemplate;

        this.showPopup = this.showPopup.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.updateHints = this.updateHints.bind(this);
        this.handleSelectPopupItem = this.handleSelectPopupItem.bind(this);
    }

    init() {
        this.popperInstance = window.Popper.createPopper(this.input, this.popup, {
            placement: 'bottom',
            container: 'body',
        });

        this.input.addEventListener('focusin', this.showPopup, false);
        this.input.addEventListener(
            'input',
            () => {
                this.selectItem(null);
                this.updateHints();
            },
            false,
        );

        this.isMouseInsidePopup = false;
        this.popup.addEventListener('mouseover', () => (this.isMouseInsidePopup = true), false);
        this.popup.addEventListener('mouseout', () => (this.isMouseInsidePopup = false), false);

        document.addEventListener(
            'click',
            (event) => {
                const closestSearchPopup = event.target.closest('.ibexa-perso-search-input__popup');
                const isMouseInsidePopup = closestSearchPopup === this.popup;
                const closestSearchInput = event.target.closest('.ibexa-perso-search-input__input');
                const searchInputHasFocus = closestSearchInput === this.input && closestSearchInput === document.activeElement;

                if (isMouseInsidePopup || searchInputHasFocus) {
                    return;
                }

                this.hidePopup();
            },
            false,
        );

        this.addBtn.addEventListener(
            'click',
            () => {
                this.onItemAdd(this.selectedItem);
            },
            false,
        );
    }

    getHints(inputValue) {
        const searchUrl = window.Routing.generate('ibexa.personalization.search.attributes', {
            customerId: this.customerId,
            phrase: inputValue,
        });
        const abortController = new AbortController();

        return {
            abortController,
            data: fetch(searchUrl, {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
                mode: 'same-origin',
                credentials: 'same-origin',
                signal: abortController.signal,
            })
                .then(window.ibexa.helpers.request.getJsonFromResponse)
                .then(({ searchHits }) => searchHits),
        };
    }

    updateHints() {
        if (this.cancelLastHintsRequest) {
            this.cancelLastHintsRequest();
            this.cancelLastHintsRequest = null;
        }

        const inputValue = this.input.value;
        const isInputValueSameAsSelectedItem = this.selectedItem && inputValue === this.selectedItem.value;

        if (!inputValue || isInputValueSameAsSelectedItem) {
            return;
        }

        const { abortController, data } = this.getHints(inputValue);

        this.cancelLastHintsRequest = () => {
            abortController.abort();
        };

        data.then((hints) => {
            const fragment = document.createDocumentFragment();

            hints.forEach(({ id, value }) => {
                const container = document.createElement('ul');
                const renderedItem = this.popupItemTemplate.replace('{{ value }}', value).replace('{{ id }}', id);

                container.insertAdjacentHTML('beforeend', renderedItem);

                const listItemNode = container.querySelector('.ibexa-perso-search-input__popup-item');

                listItemNode.addEventListener('click', this.handleSelectPopupItem, false);

                fragment.append(listItemNode);
            });

            this.popup.innerHTML = '';
            this.popup.append(fragment);
        }).catch((error) => {
            const isAbortError = error.name === 'AbortError';

            if (isAbortError) {
                return;
            }

            window.ibexa.helpers.notification.showErrorNotification(error);
        });
    }

    updateAddBtn() {
        const isAnythingSelected = !!this.selectedItem;

        this.addBtn.disabled = !isAnythingSelected;
    }

    showPopup() {
        this.popup.setAttribute('data-show', '');
        this.popperInstance.update();
    }

    hidePopup() {
        if (this.isMouseInsidePopup) {
            return;
        }

        this.popup.removeAttribute('data-show');
        this.popperInstance.update();
    }

    handleSelectPopupItem(event) {
        const popupItem = event.currentTarget;
        const value = popupItem.innerText;
        const { itemId: id } = popupItem.dataset;

        this.selectItem({
            value,
            id,
        });

        this.input.value = value;
        this.input.focus();
        this.updateHints();
    }

    selectItem(item) {
        this.selectedItem = item;
        this.updateAddBtn();
    }
}
