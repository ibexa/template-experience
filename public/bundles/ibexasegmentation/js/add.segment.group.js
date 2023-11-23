(function (global, doc) {
    const addSegmentTable = doc.querySelector('.ibexa-table--add-segments');

    if (!addSegmentTable) {
        return;
    }

    const addSegmentTableBody = addSegmentTable.querySelector('tbody');
    const addSegmentTableHead = addSegmentTable.querySelector('thead');
    const THEAD_HIDDEN_CLASS = 'ibexa-table__head--hidden';

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
        const trBody = tbodyFragment.querySelector('tr.ibexa-table__row');

        trBody.querySelector('.ibexa-input--checkbox').addEventListener(
            'change',
            () => {
                const isSomeCheckboxSelected = [...addSegmentTable.querySelectorAll('.ibexa-table__body .ibexa-input--checkbox')].some(
                    (checkbox) => checkbox.checked,
                );
                const methodName = isSomeCheckboxSelected ? 'removeAttribute' : 'setAttribute';

                removeButton[methodName]('disabled', 'disabled');
            },
            false,
        );

        addSegmentTableBody.appendChild(trBody);
        addSegmentTableHead.classList.remove(THEAD_HIDDEN_CLASS);

        refreshTableMainCheckbox();
    };
    const removeSegments = () => {
        const selectedSegments = addSegmentTable.querySelectorAll('.ibexa-table__body .ibexa-input--checkbox:checked');

        selectedSegments.forEach((selectedSegment) => selectedSegment.closest('tr').remove());
        refreshTableMainCheckbox();

        removeButton.setAttribute('disabled', 'disabled');

        if (!addSegmentTableBody.children.length) {
            addSegmentTableHead.classList.add(THEAD_HIDDEN_CLASS);
        }
    };
    const initTableHeader = () => {
        addSegmentTableHead.classList.add('ibexa-table__head');

        if (!addSegmentTableBody.children.length) {
            addSegmentTableHead.classList.add(THEAD_HIDDEN_CLASS);
        }
    };

    addButton.addEventListener('click', addSegment, false);
    removeButton.addEventListener('click', removeSegments, false);
    initTableHeader();
})(window, window.document);
