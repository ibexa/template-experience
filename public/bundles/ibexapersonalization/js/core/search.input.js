export class SearchInput {
    constructor(options = {}) {
        if (!options.customerId || !options.container) {
            console.error('Missing SearchInput options.');

            return;
        }

        this.customerId = options.customerId;
        this.onItemAdd = options.onItemAdd ?? (() => {});
        this.prepareItemsBeforeShow = options.prepareItemsBeforeShow ?? ((items) => items);

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
                const closestInputWrapper = event.target.closest('.ibexa-input-text-wrapper');
                const searchInputWrapper = this.input.closest('.ibexa-input-text-wrapper');
                const searchInputHasOrWillHaveFocus = closestInputWrapper === searchInputWrapper && this.input === document.activeElement;

                if (isMouseInsidePopup || searchInputHasOrWillHaveFocus) {
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
                this.clearSelection();
            },
            false,
        );
    }

    clearSelection() {
        this.input.value = '';
        this.selectItem(null);
        this.removeHints();
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

    removeHints() {
        this.popup.innerHTML = '';
    }

    renderHints(hints) {
        const fragment = document.createDocumentFragment();

        hints.forEach(({ id, value, typeId }) => {
            const container = document.createElement('ul');
            const renderedItem = this.popupItemTemplate
                .replace('{{ value }}', value)
                .replace('{{ type_id }}', typeId)
                .replace('{{ id }}', id);

            container.insertAdjacentHTML('beforeend', renderedItem);

            const listItemNode = container.querySelector('.ibexa-perso-search-input__popup-item');

            listItemNode.addEventListener('click', this.handleSelectPopupItem, false);

            fragment.append(listItemNode);
        });

        this.popup.append(fragment);
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
            const preparedHints = this.prepareItemsBeforeShow(hints);

            this.removeHints();
            this.renderHints(preparedHints);
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
        this.popup.removeAttribute('data-show');
        this.popperInstance.update();
    }

    handleSelectPopupItem(event) {
        const popupItem = event.currentTarget;
        const value = popupItem.innerText;
        const { itemId: id, itemTypeId: typeId } = popupItem.dataset;

        this.selectItem({
            value,
            id,
            typeId,
        });

        this.input.value = value;
        this.addBtn.focus();
        this.hidePopup();
    }

    selectItem(item) {
        this.selectedItem = item;
        this.updateAddBtn();
    }
}
