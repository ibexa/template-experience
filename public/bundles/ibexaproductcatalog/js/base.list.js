(function (global, doc) {
    const removeButton = doc.querySelector('.ibexa-pc-data-grid__delete-button');
    const markRowCheckboxes = doc.querySelectorAll('.ibexa-pc-data-grid__mark-row-checkbox');
    const searchForm = doc.querySelector('.ibexa-pc-search__form');
    const searchSortOrderSelect = doc.querySelector('.ibexa-pc-search__form .ibexa-pc-search__sort-order-select');
    const dataGridSortOrderSelect = doc.querySelector('.ibexa-pc-data-grid__sort-order-select');
    const setRemoveButtonState = () => {
        const isAnyCheckboxSelected = [...markRowCheckboxes].some((checkbox) => checkbox.checked);

        removeButton.toggleAttribute('disabled', !isAnyCheckboxSelected);
    };
    const sortResults = ({ currentTarget }) => {
        const sortOrderValue = currentTarget.value;

        searchSortOrderSelect.value = sortOrderValue;
        searchForm.submit();
    };

    markRowCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', setRemoveButtonState, false));

    if (searchSortOrderSelect && dataGridSortOrderSelect) {
        dataGridSortOrderSelect.addEventListener('change', sortResults, false);
    }
})(window, window.document);
