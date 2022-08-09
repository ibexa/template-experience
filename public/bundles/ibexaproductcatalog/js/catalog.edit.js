import DefaultFilterConfig from './filterConfig/default.filter.config';

const DOTS = '...';
const KEY_ENTER = 13;

(function (global, doc, ibexa, Translator, Routing) {
    const configuredFiltersNode = doc.querySelector('.ibexa-pc-edit-catalog-filters__configured');
    const configuredFiltersListTogglerBtns = doc.querySelectorAll('.ibexa-pc-edit-catalog-filters__configured-header-toggler');
    const configPanelsNode = doc.querySelectorAll('.ibexa-pc-edit-config-filter');
    const dropdownInstance = ibexa.helpers.objectInstances.getInstance(
        doc.querySelector('.ibexa-pc-edit-catalog-filters__configured-header-actions .ibexa-dropdown'),
    );
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
        const additionalInfo = previewPagination.querySelector('.ibexa-pagination__info');
        const additionalInfoTemplate = additionalInfo.dataset.template
            .replace('{{ viewing }}', currentCount)
            .replace('{{ total }}', totalCount);
        const navigation = previewPagination.querySelector('.ibexa-pagination__navigation');
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

            const filledListElemenet = container.innerHTML.replaceAll('{{ page }}', page);

            container.innerHTML = '';
            container.insertAdjacentHTML('beforeend', filledListElemenet);

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

        const prevButtonClassList = fragment.querySelector('.page-item:first-child').classList;
        const nextButtonClassList = fragment.querySelector('.page-item:last-child').classList;

        prevButtonClassList.add('prev');
        prevButtonClassList.toggle('disabled', currentPage === 1);
        nextButtonClassList.add('next');
        nextButtonClassList.toggle('disabled', currentPage === pagesCount);

        additionalInfo.innerHTML = additionalInfoTemplate;
        navigation.innerHTML = '';
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
    const changeFieldNameToQueryParamName = (fieldName) => {
        return fieldName.replace('catalog_create_criteria_', '').replace('catalog_update_criteria_', '');
    };
    const refreshProductsList = () => {
        searchInput.value = savedSearchValue;

        const queryParams = {
            page: currentPage,
            products_preview: {},
        };

        if (searchInput.value != '') {
            queryParams.products_preview.search = { query: searchInput.value };
        }

        const filters = {};

        Object.entries(filtersConfig).forEach(([filterConfigKey, filterConfig]) => {
            const queryParamName = changeFieldNameToQueryParamName(filterConfigKey);
            const queryParamValue = filterConfig.getRequestValue();

            if (queryParamValue !== undefined) {
                filters[queryParamName] = queryParamValue;
            }
        });

        if (Object.keys(filters).length) {
            queryParams.products_preview.filters = filters;
        }

        const catalogPreviewUrl = Routing.generate('ibexa.product_catalog.catalog.products.preview.list', queryParams);

        fetch(catalogPreviewUrl, { mode: 'same-origin', credentials: 'same-origin' })
            .then(ibexa.helpers.request.getJsonFromResponse)
            .then((response) => {
                const { rowTemplate } = previewProductsList.dataset;
                const tableBody = previewProductsList.querySelector('.ibexa-table__body');
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
                createPaginationWidget(response.products.length, response.pages_count, response.count);

                previewProductsWrapper.classList.toggle(
                    'ibexa-pc-edit-catalog-products__preview-wrapper--hidden',
                    response.products.length === 0,
                );
            })
            .catch(ibexa.helpers.notification.showErrorNotification);
    };

    configPanelsNode.forEach((configPanelNode) => {
        const { filterId, filterType } = configPanelNode.dataset;
        const productsListFilterNode = doc.querySelector(`.ibexa-pc-edit-catalog-list-filter[data-filter-id="${filterId}"]`);
        const relatedAvailablePopupItem = doc.querySelector(
            `.ibexa-pc-edit-catalog-filters__configured-header .ibexa-dropdown__item[data-value="${filterId}"]`,
        );
        const FiltersTypeClass = filtersConfigClassMap[filterType] ?? DefaultFilterConfig;

        filtersConfig[filterId] = new FiltersTypeClass({
            configPanelNode,
            productsListFilterNode,
            relatedAvailablePopupItem,
            configuredFiltersListNode,
        });

        filtersConfig[filterId].init();
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
                const filterId = option.dataset.value;

                filtersConfig[filterId].addPreview(true);
            },
            false,
        ),
    );

    createPaginationWidget(
        previewPagination.dataset.currentCount,
        parseInt(previewPagination.dataset.pagesCount, 10),
        previewPagination.dataset.totalCount,
    );

    doc.body.addEventListener('ibexa-pc-filters:change', triggerFilterChange, false);
})(window, window.document, window.ibexa, window.Translator, window.Routing);
