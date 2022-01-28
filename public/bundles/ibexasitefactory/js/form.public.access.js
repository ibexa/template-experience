(function(global, doc) {
    const SELECTOR_CHECKBOX = '.ibexa-sf-sections__public-access-checkbox';
    const createBtn = doc.querySelector('.ibexa-btn--create-public-access');
    const deleteBtn = doc.querySelector('.ibexa-btn--delete-public-access');
    const toggleDeleteBtnDisabledState = () => {
        const checkboxes = doc.querySelectorAll(`${SELECTOR_CHECKBOX}:checked`);

        deleteBtn.toggleAttribute('disabled', !checkboxes.length);
    };
    const createPublicAccess = () => {
        const list = doc.querySelector('.ibexa-sf-public-access__list');
        let counter = list.dataset.widgetCounter;
        let newWidget = list.dataset.prototype;

        newWidget = newWidget.replace(/__name__/g, counter);
        counter++;

        const htmlWidget = doc.createRange().createContextualFragment(newWidget);

        htmlWidget.querySelector(SELECTOR_CHECKBOX).addEventListener('change', toggleDeleteBtnDisabledState, false);
        doc.body.dispatchEvent(
            new CustomEvent('ibexa.sf.added-public-access', {
                detail: { widget: htmlWidget },
            }),
        );

        list.dataset.widgetCounter = counter;
        list.prepend(htmlWidget);
    };
    const deletePublicAccess = () => {
        const checkboxes = doc.querySelectorAll(`${SELECTOR_CHECKBOX}:checked`);

        checkboxes.forEach((checkbox) => checkbox.closest('.ibexa-sf-public-access__list-item').remove());
        deleteBtn.setAttribute('disabled', true);
    };
    const updateDomainName = (event) => {
        const domainName = event.currentTarget.value;
        const labelNode = event.currentTarget
            .closest('.ibexa-sf-public-access__list-item')
            .querySelector('.ibexa-collapse__header-label');

        labelNode.innerHTML = domainName;
    };

    createBtn.addEventListener('click', createPublicAccess, false);
    deleteBtn.addEventListener('click', deletePublicAccess, false);

    doc.querySelectorAll(SELECTOR_CHECKBOX).forEach((checkbox) => {
        checkbox.addEventListener('change', toggleDeleteBtnDisabledState, false);
    });
    doc.querySelectorAll('.ibexa-input--domain-name').forEach((domainNameInput) => {
        domainNameInput.addEventListener('keyup', updateDomainName, false);
    });

    doc.body.addEventListener('ibexa.sf.added-public-access', (event) => {
        const domainNameInput = event.detail.widget.querySelector('.ibexa-input--domain-name');

        domainNameInput.addEventListener('keyup', updateDomainName, false);
    });
})(window, window.document);
