(function (global, doc, ibexa) {
    const filtersNode = doc.querySelector('.ibexa-pc-search--products-list');

    if (!filtersNode) {
        return;
    }

    const { getInstance } = ibexa.helpers.objectInstances;
    const createdDropdownInputNode = doc.querySelector('#product_search_created_at');
    const createdDateTimeRangeNode = filtersNode.querySelector('.ibexa-pc-product-list-filters__created-at-date-time-range');
    const createdDateTimeRange = getInstance(createdDateTimeRangeNode);
    const toggleDatesSelectVisibility = (event, dateTimeRange) => {
        const datesRangeNode = doc.querySelector('.ibexa-pc-product-list-filters__created-at-date-time-range');

        if (event.target.value !== 'custom_range') {
            dateTimeRange.toggleHidden(true);
            dateTimeRange.clearDates();
            doc.querySelector(datesRangeNode.dataset.periodSelector).value = event.target.value;

            return;
        }

        dateTimeRange.toggleHidden(false);
    };

    createdDropdownInputNode.addEventListener('change', (event) => toggleDatesSelectVisibility(event, createdDateTimeRange), false);
})(window, window.document, window.ibexa);
