(function (global, doc) {
    const addSegmentTable = doc.querySelector('.ibexa-table--add-segments');

    if (!addSegmentTable) {
        return;
    }

    let lastIndex = 0;
    const addButton = doc.querySelector('.ibexa-table-header--add-segments .ibexa-btn--add');
    const removeButton = doc.querySelector('.ibexa-table-header--add-segments .ibexa-btn--remove');
    const refreshTableMainCheckbox = () => {
        const refreshEvent = new CustomEvent('ibexa-refresh-main-table-checkbox');

        addSegmentTable.dispatchEvent(refreshEvent);
    };
    const addSegment = () => {
        const index = lastIndex++;
        const { template } = addSegmentTable.dataset;
        const tbodyFragment = doc.createElement('tbody');
        const renderedTemplate = template.replace(/__name__/g, index);

        tbodyFragment.insertAdjacentHTML('beforeend', renderedTemplate);

        const tr = tbodyFragment.querySelector('tr');

        tr.querySelector('.ibexa-input--checkbox').addEventListener(
            'change',
            () => {
                const isCheckboxSelected = [...addSegmentTable.querySelectorAll('.ibexa-input--checkbox')].some(
                    (checkbox) => checkbox.checked,
                );
                const methodName = isCheckboxSelected ? 'removeAttribute' : 'setAttribute';

                removeButton[methodName]('disabled', 'disabled');
            },
            false,
        );

        addSegmentTable.querySelector('tbody').appendChild(tr);
        refreshTableMainCheckbox();
    };
    const removeSegments = () => {
        const selectedSegments = addSegmentTable.querySelectorAll('.ibexa-table__body .ibexa-input--checkbox:checked');

        selectedSegments.forEach((selectedSegment) => selectedSegment.closest('tr').remove());
        refreshTableMainCheckbox();

        removeButton.setAttribute('disabled', 'disabled');
    };

    addButton.addEventListener('click', addSegment, false);
    removeButton.addEventListener('click', removeSegments, false);
})(window, window.document);
