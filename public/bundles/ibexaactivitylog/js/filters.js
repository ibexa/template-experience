(function (global, doc) {
    const searchForm = doc.querySelector('.ibexa-al-list-search-form');
    const filtersContainerNode = doc.querySelector('.ibexa-al-filters');
    const applyFiltersBtn = filtersContainerNode.querySelector('.ibexa-btn--apply');
    const clearFiltersBtn = filtersContainerNode.querySelector('.ibexa-btn--clear');
    const userFilterNode = doc.querySelector('.ibexa-al-filters__item--user');
    const actionFilterNode = doc.querySelector('.ibexa-al-filters__item--action');
    const objectClassFilterNode = doc.querySelector('.ibexa-al-filters__item--object-class');
    const timeFilterNode = doc.querySelector('.ibexa-al-filters__item--time');
    const isNodeTimeFilter = (filterNode) => {
        return filterNode.classList.contains('ibexa-al-filters__item--time');
    };
    const clearFilter = (filterNode) => {
        if (!filterNode) {
            return;
        }

        const sourceSelect = filterNode.querySelector('.ibexa-al-filters__item-content .ibexa-dropdown__source .ibexa-input--select');
        const sourceSelectOptions = sourceSelect?.querySelectorAll('option');
        const checkboxes = filterNode.querySelectorAll(
            '.ibexa-al-filters__item-content .ibexa-input--checkbox:not([name="dropdown-checkbox"])',
        );

        if (sourceSelect) {
            sourceSelectOptions.forEach((option) => (option.selected = false));

            if (isNodeTimeFilter(filterNode)) {
                sourceSelectOptions[0].selected = true;
            }
        } else if (checkboxes.length) {
            checkboxes.forEach((checkbox) => (checkbox.checked = false));
        }

        searchForm.submit();
    };
    const attachFilterEvent = (filterNode) => {
        if (!filterNode) {
            return;
        }

        const sourceSelect = filterNode.querySelector('.ibexa-al-filters__item-content .ibexa-dropdown__source .ibexa-input--select');
        const checkboxes = filterNode.querySelectorAll(
            '.ibexa-al-filters__item-content .ibexa-input--checkbox:not([name="dropdown-checkbox"])',
        );

        sourceSelect?.addEventListener('change', filterChange, false);
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', filterChange, false);
        });
    };
    const hasFilterValue = (filterNode) => {
        if (!filterNode) {
            return;
        }

        const select = filterNode.querySelector('.ibexa-dropdown__source .ibexa-input--select');
        const checkedCheckboxes = filterNode.querySelectorAll('.ibexa-input--checkbox:checked');

        if (isNodeTimeFilter(filterNode)) {
            return !!parseInt(select.value, 10);
        }

        return !!(select?.value || checkedCheckboxes?.length);
    };
    const isSomeFilterSet = () => {
        const hasUserFilterValue = hasFilterValue(userFilterNode);
        const hasActionFilterValue = hasFilterValue(actionFilterNode);
        const hasObjectClassFilterValue = hasFilterValue(objectClassFilterNode);
        const hasTimeFilterValue = hasFilterValue(timeFilterNode);

        return hasUserFilterValue || hasActionFilterValue || hasObjectClassFilterValue || hasTimeFilterValue;
    };
    const attachInitEvents = () => {
        attachFilterEvent(userFilterNode);
        attachFilterEvent(actionFilterNode);
        attachFilterEvent(objectClassFilterNode);
        attachFilterEvent(timeFilterNode);
    };
    const filterChange = () => {
        const hasFiltersSetValue = isSomeFilterSet();

        applyFiltersBtn.disabled = false;
        clearFiltersBtn.disabled = !hasFiltersSetValue;
    };
    const clearAllFilters = () => {
        clearFilter(userFilterNode);
        clearFilter(actionFilterNode);
        clearFilter(objectClassFilterNode);
        clearFilter(timeFilterNode);
    };

    attachInitEvents();

    clearFiltersBtn.addEventListener('click', clearAllFilters, false);
})(window, window.document);
