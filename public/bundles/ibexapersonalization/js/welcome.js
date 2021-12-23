(function(global, doc, bootstrap) {
    const CLASS_ACTIVE_ITEM_LIST = 'ibexa-modal__table-of-contents-list-item--active';
    const termsContentContainer = doc.querySelector('.ibexa-modal__content-terms');
    const termsListContainer = doc.querySelector('.ibexa-modal__table-of-contents-list');
    const openModalButton = doc.querySelector('.ibexa-welcome-content__show-modal-button');
    const acceptTermsButton = doc.querySelector('.ibexa-modal__accept-terms-and-conditions-button');
    const scrollTerms = (event) => {
        event.preventDefault();

        const listLink = event.currentTarget;
        const { scrollTo } = listLink.dataset;
        const activedListItem = termsListContainer.querySelector(`.${CLASS_ACTIVE_ITEM_LIST}`);
        const itemListToActive = listLink.closest('.ibexa-modal__table-of-contents-list-item');

        if (activedListItem) {
            activedListItem.classList.remove(CLASS_ACTIVE_ITEM_LIST);
        }

        if (scrollTo) {
            itemListToActive.classList.add(CLASS_ACTIVE_ITEM_LIST);
            termsContentContainer.querySelector(`#${scrollTo}`).scrollIntoView();
        }
    };

    if (openModalButton) {
        openModalButton.addEventListener(
            'click',
            (event) => {
                event.preventDefault();

                bootstrap.Modal.getOrCreateInstance(doc.querySelector('#terms-and-contions-modal')).show();
            },
            false,
        );
    }

    if (acceptTermsButton) {
        acceptTermsButton.addEventListener(
            'click',
            () => {
                doc.querySelector('.ibexa-welcome-content__accept-terms-checkbox').checked = true;
            },
            false,
        );
    }

    doc.querySelectorAll('.ibexa-modal__table-of-contents-list-link').forEach((listLink) => {
        listLink.addEventListener('click', scrollTerms, false);
    });
})(window, window.document, window.bootstrap);
