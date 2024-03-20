(function (global, doc) {
    const deleteBtn = doc.querySelector('.ibexa-ca-bulk-delete__delete-btn');

    if (!deleteBtn) {
        return;
    }

    const deleteCheckboxes = doc.querySelectorAll('.ibexa-ca-bulk-delete__checkbox');
    const setRemoveButtonState = () => {
        const isAnyCheckboxSelected = [...deleteCheckboxes].some((checkbox) => checkbox.checked);

        deleteBtn.disabled = !isAnyCheckboxSelected;
    };

    deleteCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', setRemoveButtonState, false));
    setRemoveButtonState();
})(window, window.document);
