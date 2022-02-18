(function(global, doc) {
    const DROPDOWN_SELECTOR = '.ibexa-dropdown';
    const addItemButtons = doc.querySelectorAll('.ibexa-configuration-field-array .ibexa-btn--add-input');
    const removeItemButtons = doc.querySelectorAll('.ibexa-configuration-field-array .ibexa-btn--trash');
    const removeInputItem = (event) => {
        event.currentTarget.closest('.ibexa-configuration-field-array__item').remove();
    };
    const addInputItem = (event) => {
        const itemsWrapper = event.currentTarget
            .closest('.ibexa-configuration-field-array')
            .querySelector('.ibexa-configuration-field-array__items');
        const widget = itemsWrapper.dataset.prototype;
        const htmlWidget = doc.createRange().createContextualFragment(widget);

        itemsWrapper.append(htmlWidget);
        itemsWrapper
            .querySelector('.ibexa-configuration-field-array__item:last-child .ibexa-btn--trash')
            .addEventListener('click', removeInputItem, false);

        doc.querySelectorAll(DROPDOWN_SELECTOR).forEach((container) => {
            const dropdown = new ibexa.core.Dropdown({
                container,
                itemsContainer: container.querySelector('.ibexa-dropdown__items'),
                sourceInput: container.querySelector('.ibexa-dropdown__source-input'),
            });

            dropdown.init();
        });
    };

    addItemButtons.forEach((button) => button.addEventListener('click', addInputItem, false));
    removeItemButtons.forEach((button) => button.addEventListener('click', removeInputItem, false));
})(window, window.document);
