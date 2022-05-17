(function (global, doc, ibexa) {
    const languagesDraggable = [];
    const initLanguagesWidget = (publicAccessDomainNode) => {
        const languageWidget = publicAccessDomainNode.querySelector('.ibexa-sf-edit-widget--public-access-languages');
        const languagePopupMenuElement = languageWidget.querySelector('.ibexa-popup-menu');
        const languagePopupMenuToggleBtn = languageWidget.querySelector('.ibexa-sf-form-languages__language-popup-trigger');
        const dragabbleWidgetContainer = publicAccessDomainNode.querySelector('.ibexa-sf-form-languages');

        new ibexa.core.PopupMenu({
            popupMenuElement: languagePopupMenuElement,
            triggerElement: languagePopupMenuToggleBtn,
            onItemClick: addNewLanguage,
        });

        initDraggable(dragabbleWidgetContainer);
    };
    const initDraggable = (widgetContainer) => {
        const itemsContainer = widgetContainer.querySelector('.ibexa-sf-form-languages__items');
        const draggable = new CollectionDraggable({
            widgetContainer,
            itemsContainer,
            selectorItem: '.ibexa-sf-form-languages-item',
            selectorPlaceholder: '.ibexa-sf-form-languages-item-placeholder',
        });

        languagesDraggable.push(draggable);
        draggable.init();
    };
    const recreateInput = (widget) => {
        const input = widget.querySelector('.ibexa-sf-form-languages__input');
        const items = widget.querySelectorAll('.ibexa-sf-form-languages-item');
        const inputValue = [...items].map((item) => item.dataset.languageCode).join(', ');

        input.value = inputValue;
    };
    const deleteLanguage = (event) => {
        const languageWidget = event.currentTarget.closest('.ibexa-sf-form-languages');
        const languageItem = event.currentTarget.closest('.ibexa-sf-form-languages-item');

        languageItem.remove();
        recreateInput(languageWidget);
        updateBtnsLanguagePopup(languageWidget);
    };
    const addNewLanguage = (event) => {
        const languageWidget = event.currentTarget.closest('.ibexa-sf-form-languages');
        const { languageCode } = event.currentTarget.dataset;
        const languageName = event.currentTarget.textContent.trim();
        const languagesListContainer = languageWidget.querySelector('.ibexa-sf-form-languages__items');
        let languageItemTemplate = languagesListContainer.dataset.template;

        languageItemTemplate = languageItemTemplate.replace(/__language_name__/g, languageName).replace(/__language_code__/g, languageCode);

        const range = doc.createRange();
        const languageItemHtml = range.createContextualFragment(languageItemTemplate);
        const deleteBtn = languageItemHtml.querySelector('.ibexa-sf-form-languages__delete-language-btn');

        deleteBtn.addEventListener('click', deleteLanguage, false);
        languagesListContainer.append(languageItemHtml);
        languagesDraggable.forEach((draggable) => draggable.reinit());
        recreateInput(languageWidget);
        updateBtnsLanguagePopup(languageWidget);
    };
    const updateBtnsLanguagePopup = (languageWidget) => {
        const languageItems = languageWidget.querySelector('.ibexa-sf-form-languages__items');
        const langaugesPopupMenuBtns = languageWidget.querySelectorAll('.ibexa-popup-menu .ibexa-popup-menu__item-content');
        const triggerPopupBtn = languageWidget.querySelector('.ibexa-sf-form-languages__language-popup-trigger');

        langaugesPopupMenuBtns.forEach((btn) => {
            const { languageCode } = btn.dataset;
            const existsLanguageInList = !!languageItems.querySelector(`[data-language-code="${languageCode}"]`);
            const btnContainer = btn.closest('.ibexa-popup-menu__item');

            btn.toggleAttribute('disabled', existsLanguageInList);
            btnContainer.classList.toggle('ibexa-popup-menu__item--hidden', existsLanguageInList);
        });

        const areAllLanguagesAdded = [...langaugesPopupMenuBtns].every((btn) => {
            const btnContainer = btn.parentNode;

            return btnContainer.classList.contains('ibexa-popup-menu__item--hidden');
        });

        triggerPopupBtn.toggleAttribute('disabled', areAllLanguagesAdded);
    };

    class CollectionDraggable extends ibexa.core.Draggable {
        constructor(config) {
            super(config);

            this.widgetContainer = config.widgetContainer;
        }

        onDrop() {
            super.onDrop();

            recreateInput(this.widgetContainer);
        }
    }

    doc.body.addEventListener('ibexa.sf.added-public-access', (event) => {
        initLanguagesWidget(event.detail.widget);
    });
    doc.querySelectorAll('.ibexa-sf-form-languages__delete-language-btn').forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', deleteLanguage, false);
    });
    doc.querySelectorAll('.ibexa-sf-public-access__list-item').forEach(initLanguagesWidget);
})(window, window.document, window.ibexa);
