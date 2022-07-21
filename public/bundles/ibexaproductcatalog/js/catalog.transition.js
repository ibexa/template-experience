(function (global, doc, Translator) {
    const transitionModal = doc.querySelector('.ibexa-modal--transition-confirmation');
    const transitionModalBody = transitionModal.querySelector('.modal-body');
    const confirmBtn = transitionModal.querySelector('.ibexa-btn--confirm');
    const transitionForm = doc.querySelector('.ibexa-pc-transition-form');
    const transitionSelect = transitionForm.querySelector('.ibexa-pc-transition-form__select');
    let selectedTransition;

    confirmBtn.addEventListener(
        'click',
        () => {
            transitionSelect.value = selectedTransition;

            transitionForm.submit();
        },
        false,
    );

    transitionModal.addEventListener(
        'show.bs.modal',
        ({ relatedTarget }) => {
            const transitionLabel = relatedTarget.querySelector('.ibexa-btn__label').innerHTML;

            transitionModalBody.innerHTML = Translator.trans(
                /*@Desc("Are you sure you want to transition Catalog to %transitionLabel%?")*/ 'catalog.view.modal.transition.body',
                { transitionLabel },
                'product_catalog',
            );

            selectedTransition = relatedTarget.dataset.transition;
        },
        false,
    );
})(window, window.document, window.Translator);
