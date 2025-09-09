(function (global, doc) {
    const inputsTriggeringSubmitOnChange = doc.querySelectorAll('.ibexa-pc-search__input--trigger-submit-after-change');
    const removeBtn = doc.querySelector('.ibexa-pc-data-grid__delete-btn');
    const copyBtns = doc.querySelectorAll('.ibexa-pc-data-grid__copy-btn');
    const markRowCheckboxes = doc.querySelectorAll('.ibexa-pc-data-grid__mark-row-checkbox');
    const searchForm = doc.querySelector('.ibexa-pc-search__form');
    const searchSortOrderSelect = doc.querySelector('.ibexa-pc-search__sort-order-select');
    const dataGridSortOrderSelect = doc.querySelector('.ibexa-pc-data-grid__sort-order-select');
    const setRemoveBtnState = () => {
        const isAnyCheckboxSelected = [...markRowCheckboxes].some((checkbox) => checkbox.checked);

        removeBtn.toggleAttribute('disabled', !isAnyCheckboxSelected);
    };
    const sortResults = ({ currentTarget }) => {
        const sortOrderValue = currentTarget.value;

        searchSortOrderSelect.value = sortOrderValue;
        searchForm.submit();
    };
    const setSourceIdValue = ({ currentTarget }) => {
        const { copySourceId, targetInputSelector } = currentTarget.dataset;
        const targetInput = doc.querySelector(targetInputSelector);

        targetInput.value = copySourceId;
    };

    markRowCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', setRemoveBtnState, false));
    inputsTriggeringSubmitOnChange.forEach((input) => {
        input.addEventListener(
            'change',
            () => {
                searchForm.submit();
            },
            false,
        );
    });
    copyBtns.forEach((copyBtn) => {
        copyBtn.addEventListener('click', setSourceIdValue, false);
    });

    if (searchSortOrderSelect && dataGridSortOrderSelect) {
        dataGridSortOrderSelect.addEventListener('change', sortResults, false);
    }
})(window, window.document);
