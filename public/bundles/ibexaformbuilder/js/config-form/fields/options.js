(function(global, doc, ibexa) {
    let draggable;
    const SELECTOR_ITEM = '.ibexa-fb-form-field-config-option';
    const SELECTOR_OPTIONS_WIDGET = '.ibexa-fb-form-field-config-fieldset__attribute--options';
    const SELECTOR_OPTIONS = '.ibexa-fb-form-field-config-options__body';
    const SELECTOR_BTN_REMOVE = '.ibexa-fb-form-field-config-option__remove-btn';
    const SELECTOR_BTN_ADD = '.ibexa-fb-form-field-config-options__add-btn';
    const SELECTOR_INPUT = '.ibexa-fb-form-field-config-fieldset__attribute-input';
    const SELECTOR_OPTION_INPUT = '.ibexa-fb-form-field-config-option__input';
    const optionsWidgets = doc.querySelectorAll(SELECTOR_OPTIONS_WIDGET);

    if (!optionsWidgets.length) {
        return;
    }

    const getItems = (container) => [...container.querySelectorAll(SELECTOR_ITEM)];
    const getItemValue = (item) => item.querySelector(SELECTOR_OPTION_INPUT).value.trim();
    const updateInputValue = (container) => {
        const input = container.querySelector(SELECTOR_INPUT);

        input.value = JSON.stringify([...getItems(container).map(getItemValue)]);
    };
    const attachEventsToSelectedItem = (container, item) => {
        const optionsWidget = container.closest(SELECTOR_OPTIONS_WIDGET);

        item.querySelector(SELECTOR_BTN_REMOVE).onclick = (event) => removeItem(container, event);
        item.querySelector(SELECTOR_OPTION_INPUT).onkeyup = () => updateInputValue(optionsWidget);
    };
    const toggleRemoveBtnsDisabledState = (container) => {
        const btns = container.querySelectorAll(SELECTOR_BTN_REMOVE);
        const methodName = btns.length > 1 ? 'removeAttribute' : 'setAttribute';

        btns.forEach((btn) => btn[methodName]('disabled', true));
    };
    const createItem = (template, value = '') => {
        const container = doc.createElement('div');

        container.innerHTML = template;
        doc.body.append(container);

        const [option] = container.children;

        option.querySelector(SELECTOR_OPTION_INPUT).value = value;

        doc.body.removeChild(container);

        return option;
    };
    const addItem = (container) => {
        const item = createItem(container.dataset.template);

        container.append(item);
        toggleRemoveBtnsDisabledState(container);
        draggable.reinit();
    };
    const addItems = (container, items) => {
        const optionsWidget = container.closest(SELECTOR_OPTIONS_WIDGET);
        const fragment = doc.createDocumentFragment();
        const { template } = container.dataset;

        items.forEach((item) => fragment.append(createItem(template, item)));

        container.append(fragment);

        updateInputValue(optionsWidget);
        draggable.reinit();

        toggleRemoveBtnsDisabledState(container);
    };
    const removeItem = (container, event) => {
        event.preventDefault();

        const optionsWidget = event.currentTarget.closest(SELECTOR_OPTIONS_WIDGET);

        event.currentTarget.closest(SELECTOR_ITEM).remove();
        updateInputValue(optionsWidget);
        toggleRemoveBtnsDisabledState(container);
    };

    class OptionsDraggable extends global.ibexa.core.Draggable {
        attachEventHandlersToItem(item) {
            super.attachEventHandlersToItem(item);

            attachEventsToSelectedItem(this.itemsContainer, item);
        }

        onDrop() {
            super.onDrop();

            const optionsWidget = this.itemsContainer.closest(SELECTOR_OPTIONS_WIDGET);

            updateInputValue(optionsWidget);
        }
    }

    optionsWidgets.forEach((optionsWidget) => {
        const itemsContainer = optionsWidget.querySelector(SELECTOR_OPTIONS);
        const addOptionBtn = optionsWidget.querySelector(SELECTOR_BTN_ADD);
        const input = optionsWidget.querySelector(SELECTOR_INPUT);
        const inputValue = input.value.trim();

        draggable = new OptionsDraggable({
            itemsContainer,
            selectorItem: SELECTOR_ITEM,
            selectorPlaceholder: '.ibexa-fb-form-field-config-option-placeholder',
        });

        draggable.init();

        addOptionBtn.addEventListener('click', () => addItem(itemsContainer), false);

        if (!inputValue.length) {
            return;
        }

        try {
            const items = JSON.parse(inputValue);

            if (items.length) {
                itemsContainer.innerHTML = '';
                addItems(itemsContainer, items);
            }
        } catch (error) {
            ibexa.helpers.notification.showErrorNotification('Issue occurred when parsing field value');
            console.error('Issue occurred when parsing field value', error);
        }
    });
})(window, window.document, window.ibexa);
