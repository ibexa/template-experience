import DefaultFilterConfig from './filterConfig/default.filter.config';

const DOTS = '...';
const KEY_ENTER = 13;

(function (global, doc, ibexa, Translator, Routing) {
    const configuredFiltersNode = doc.querySelector('.ibexa-pc-edit-catalog-filters__configured');
    const configuredFiltersListTogglerBtns = doc.querySelectorAll('.ibexa-pc-edit-catalog-filters__configured-header-toggler');
    const dropdownInstance = ibexa.helpers.objectInstances.getInstance(
        doc.querySelector('.ibexa-pc-edit-catalog-filters__configured-header-actions .ibexa-dropdown'),
    );
    const sortedDefaultFiltersOptions = [...dropdownInstance.sourceInput.querySelectorAll('option[default]')].sort((optionA, optionB) => {
        return optionA.dataset.priority - optionB.dataset.priority;
    });
    const defaultFilters = sortedDefaultFiltersOptions.map((option) => option.value);
    const standardFilters = [...dropdownInstance.sourceInput.querySelectorAll('option:not([default])')].map((option) => option.value);
    const filterNames = [...defaultFilters, ...standardFilters];
    const configuredFiltersListNode = doc.querySelector('.ibexa-pc-edit-catalog-filters__configured-list');
    const previewProductsWrapper = doc.querySelector('.ibexa-pc-edit-catalog-products__preview-wrapper');
    const previewProductsList = previewProductsWrapper.querySelector('.ibexa-pc-edit-catalog-products__list');
    const previewPagination = previewProductsWrapper.querySelector('.ibexa-pc-edit-catalog-products__pagination');
    const searchWidget = doc.querySelector('.ibexa-pc-edit-catalog-products__search');
    const searchInput = searchWidget.querySelector('.ibexa-input--text');
    const searchClearBtn = searchWidget.querySelector('.ibexa-input-text-wrapper__action-btn--clear');
    const searchBtn = searchWidget.querySelector('.ibexa-input-text-wrapper__action-btn--search');
    const filtersConfig = [];
    const filtersConfigClassMap = ibexa?.productCatalog?.catalogs?.filters ?? {};
    let currentPage = 1;
    let savedSearchValue = '';
    const triggerSearch = () => {
        savedSearchValue = searchInput.value;
        currentPage = 1;

        refreshProductsList();
    };
    const goToPage = (pageNumber) => {
        currentPage = pageNumber;

        refreshProductsList();
    };
    const triggerFilterChange = () => {
        currentPage = 1;

        refreshProductsList();
    };
    const createPaginationWidget = (
        currentCount,
        pagesCount = parseInt(previewPagination.dataset.pagesCount, 10),
        totalCount = previewPagination.dataset.totalCount,
    ) => {
        const navigation = previewPagination.querySelector('.ibexa-pagination__navigation');
        const additionalInfo = previewPagination.querySelector('.ibexa-pagination__info');

        navigation.innerHTML = '';
        additionalInfo.innerHTML = '';

        if (pagesCount === 1) {
            return;
        }

        const additionalInfoTemplate = additionalInfo.dataset.template
            .replace('{{ viewing }}', currentCount)
            .replace('{{ total }}', totalCount);
        const listElementNavigationTemplate = navigation.dataset.template;
        const pages = ibexa.helpers.pagination.computePages({
            activePageIndex: currentPage,
            pagesCount,
            separator: DOTS,
        });
        const fragment = doc.createDocumentFragment();

        // add prev and next buttons
        pages.unshift('');
        pages.push('');

        pages.forEach((page, key) => {
            const container = doc.createElement('ul');

            container.insertAdjacentHTML('beforeend', listElementNavigationTemplate);

            const filledListElement = container.innerHTML.replaceAll('{{ page }}', page);

            container.innerHTML = '';
            container.insertAdjacentHTML('beforeend', filledListElement);

            const listItemNode = container.querySelector('li');

            if (page === DOTS) {
                listItemNode.classList.add('disabled');
            } else {
                let nextPage = page;

                if (key === 0) {
                    nextPage = currentPage - 1;
                } else if (key === pages.length - 1) {
                    nextPage = currentPage + 1;
                }

                listItemNode.addEventListener('click', () => goToPage(nextPage));
            }

            if (page === currentPage) {
                listItemNode.classList.add('active');
            }

            fragment.append(listItemNode);
        });

        const pageItems = fragment.querySelectorAll('.page-item');
        const prevButtonClassList = pageItems.item(0).classList;
        const nextButtonClassList = pageItems.item(pageItems.length - 1).classList;

        prevButtonClassList.add('prev');
        prevButtonClassList.toggle('disabled', currentPage === 1);
        nextButtonClassList.add('next');
        nextButtonClassList.toggle('disabled', currentPage === pagesCount);

        additionalInfo.innerHTML = additionalInfoTemplate;
        navigation.append(fragment);
    };
    const toggleFilterList = ({ currentTarget }) => {
        const showLabel = Translator.trans(/*@Desc("Show")*/ 'catalog.edit.filters.toggler.show', {}, 'product_catalog');
        const hideLabel = Translator.trans(/*@Desc("Hide")*/ 'catalog.edit.filters.toggler.hide', {}, 'product_catalog');

        currentTarget.classList.toggle('ibexa-pc-edit-catalog-filters__configured-header-toggler--list-rolled-up');
        configuredFiltersNode.classList.toggle('ibexa-pc-edit-catalog-filters__configured--list-rolled-up');

        const isListRolledUp = configuredFiltersNode.classList.contains('ibexa-pc-edit-catalog-filters__configured--list-rolled-up');

        currentTarget.innerHTML = isListRolledUp ? showLabel : hideLabel;
    };
    const changeFieldNameToRequestName = (fieldName) => {
        return fieldName.replace('catalog_create_criteria_', '').replace('catalog_update_criteria_', '');
    };
    const refreshProductsList = () => {
        const requestBody = new FormData();

        requestBody.append('page', currentPage);
        searchInput.value = savedSearchValue;

        if (searchInput.value != '') {
            requestBody.append('products_preview[search][query]', searchInput.value);
        }

        Object.entries(filtersConfig).forEach(([filterConfigKey, filterConfig]) => {
            const requestFilterName = changeFieldNameToRequestName(filterConfigKey);
            const requestFilterValue = filterConfig.getRequestValue();

            if (Array.isArray(requestFilterValue)) {
                requestFilterValue.forEach((value) => {
                    requestBody.append(`products_preview[filters][${requestFilterName}][]`, value);
                });

                return;
            }

            if (typeof requestFilterValue === 'object') {
                Object.entries(requestFilterValue).forEach(([key, value]) => {
                    requestBody.append(`products_preview[filters][${requestFilterName}][${key}]`, value);
                });

                return;
            }

            if (requestFilterValue !== undefined) {
                requestBody.append(`products_preview[filters][${requestFilterName}]`, requestFilterValue);
            }
        });

        const paginationContainer = doc.querySelector('.ibexa-pc-edit-catalog-products__pagination');
        const catalogPreviewUrl = Routing.generate('ibexa.product_catalog.catalog.products.preview.list');
        const tableBody = previewProductsList.querySelector('.ibexa-table__body');
        const tableHeadRow = previewProductsList.querySelector('.ibexa-table__head-row');
        const { rowTemplate, tableSpinnerRowTemplate, emptyTableBodyRowTemplate } = previewProductsList.dataset;
        const catalogPreviewRequest = new Request(catalogPreviewUrl, {
            method: 'POST',
            mode: 'same-origin',
            credentials: 'same-origin',
            body: requestBody,
        });

        tableBody.innerHTML = tableSpinnerRowTemplate;
        tableHeadRow.classList.add('ibexa-table__head-row--hidden');
        paginationContainer.classList.add('ibexa-pc-edit-catalog-products__pagination--hidden');

        fetch(catalogPreviewRequest)
            .then(ibexa.helpers.request.getJsonFromResponse)
            .then((response) => {
                const fragment = doc.createDocumentFragment();

                response.products.forEach((product) => {
                    const container = doc.createElement('tbody');

                    container.insertAdjacentHTML('beforeend', rowTemplate);

                    const filledRow = container.innerHTML
                        .replaceAll('{{ PRODUCT_NAME }}', product.name)
                        .replace('{{ PRODUCT_URL }}', product.view_url)
                        .replace('{{ PRODUCT_IMG }}', product.thumbnail)
                        .replace('{{ PRODUCT_CODE }}', product.code)
                        .replace('{{ PRODUCT_TYPE }}', product.type)
                        .replace('{{ PRODUCT_CREATED_DATE }}', product.created_at)
                        .replace('{{ PRODUCT_STATUS }}', !product.is_available ? 'ibexa-pc-availability-dot--not-available' : '');

                    container.innerHTML = '';
                    container.insertAdjacentHTML('beforeend', filledRow);

                    const tableItemNode = container.querySelector('tr');

                    fragment.append(tableItemNode);
                });

                tableBody.innerHTML = '';
                tableBody.append(fragment);
                paginationContainer.classList.remove('ibexa-pc-edit-catalog-products__pagination--hidden');
                createPaginationWidget(response.products.length, response.pages_count, response.count);

                if (response.products.length) {
                    tableHeadRow.classList.remove('ibexa-table__head-row--hidden');
                } else {
                    tableBody.insertAdjacentHTML('beforeend', emptyTableBodyRowTemplate);
                }
            })
            .catch(ibexa.helpers.notification.showErrorNotification);
    };
    const createFilterInstance = (configPanelNode) => {
        const { filterName, filterType } = configPanelNode.dataset;
        const isDefault = defaultFilters.includes(filterName);
        const productsListFilterNode = doc.querySelector(`.ibexa-pc-edit-catalog-list-filter[data-filter-name="${filterName}"]`);
        const relatedAvailablePopupItem = doc.querySelector(
            `.ibexa-pc-edit-catalog-filters__configured-header .ibexa-dropdown__item[data-value="${filterName}"]`,
        );
        const FiltersTypeClass = filtersConfigClassMap[filterType] ?? DefaultFilterConfig;

        filtersConfig[filterName] = new FiltersTypeClass({
            configPanelNode,
            productsListFilterNode,
            relatedAvailablePopupItem,
            configuredFiltersListNode,
            isDefault,
        });

        filtersConfig[filterName].init();
    };

    filterNames.forEach((filterName) => {
        const configPanelNode = doc.querySelector(`[data-filter-name="${filterName}"]`);

        createFilterInstance(configPanelNode);
    });
    configuredFiltersListTogglerBtns.forEach((configuredFiltersListTogglerBtn) => {
        configuredFiltersListTogglerBtn.addEventListener('click', toggleFilterList, false);
    });
    searchBtn.addEventListener('click', triggerSearch, false);
    searchClearBtn.addEventListener('click', triggerSearch, false);
    searchInput.addEventListener(
        'keypress',
        (event) => {
            if (event.keyCode == KEY_ENTER) {
                event.preventDefault();

                triggerSearch();

                return false;
            }
        },
        false,
    );
    dropdownInstance.itemsListContainer.querySelectorAll('.ibexa-dropdown__item:not([disabled])').forEach((option) =>
        option.addEventListener(
            'click',
            () => {
                const filterName = option.dataset.value;

                filtersConfig[filterName].addPreview(true);
            },
            false,
        ),
    );

    createPaginationWidget(
        previewPagination.dataset.currentCount,
        parseInt(previewPagination.dataset.pagesCount, 10),
        previewPagination.dataset.totalCount,
    );

    refreshProductsList();
    doc.body.addEventListener('ibexa-pc-filters:change', triggerFilterChange, false);
})(window, window.document, window.ibexa, window.Translator, window.Routing);
