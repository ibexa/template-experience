(function (doc) {
    const SELECTOR_CHECKBOX = '.ibexa-pb-block-checkbox-field__item input[type="checkbox"]';
    const SELECTOR_LABEL = '.ibexa-pb-block-checkbox-field__label';
    const CLASS_IS_CHECKED = 'is-checked';
    const checkboxes = doc.querySelectorAll(SELECTOR_CHECKBOX);
    const updateCheckboxState = ({ currentTarget }) => {
        currentTarget.closest(SELECTOR_LABEL).classList.toggle(CLASS_IS_CHECKED, currentTarget.checked);
    };
    const attachEvents = (checkbox) => checkbox.addEventListener('change', updateCheckboxState, false);

    checkboxes.forEach(attachEvents);

    doc.body.addEventListener(
        'ibexa-attributes-group-added',
        ({ detail }) => {
            const addedCheckboxes = detail.container.querySelectorAll(SELECTOR_CHECKBOX);

            addedCheckboxes.forEach(attachEvents);
        },
        false,
    );
})(window.document);
