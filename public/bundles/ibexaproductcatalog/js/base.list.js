(function(global, doc) {
    const removeButton = doc.querySelector('.ibexa-pc-data-grid__delete-button');
    const markRowCheckboxes = doc.querySelectorAll('.ibexa-pc-data-grid__mark-row-checkbox');
    const setRemoveButtonState = () => {
        const isAnyCheckboxSelected = [...markRowCheckboxes].some((checkbox) => checkbox.checked);

        removeButton.toggleAttribute('disabled', !isAnyCheckboxSelected);
    };

    markRowCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', setRemoveButtonState, false));
})(window, window.document);
