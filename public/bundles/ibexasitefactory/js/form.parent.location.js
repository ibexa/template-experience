(function (global, doc, ibexa, React, ReactDOM, Translator) {
    let selectParentLocationWidget = null;
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const designItems = doc.querySelectorAll('.ibexa-sf-design-layouts__item');
    const parentLocationIdInput = doc.querySelector('.ibexa-sf-parent-location input');
    const parentLocationWidgetContainer = doc.querySelector('.ibexa-sf-parent-location');
    const openUdwBtn = doc.querySelector('.ibexa-sf-parent-location__btn-select-path');
    const udwContainer = doc.querySelector('#react-udw');
    let udwRoot = null;
    const openUDW = (event) => {
        event.preventDefault();

        const config = JSON.parse(event.currentTarget.dataset.udwConfig);
        const title = Translator.trans(/*@Desc("Choose Location")*/ 'select_location.label', {}, 'ibexa_site_factory_ui');

        udwRoot = ReactDOM.createRoot(udwContainer);
        udwRoot.render(
            React.createElement(ibexa.modules.UniversalDiscovery, {
                onConfirm: selectPath,
                onCancel: cancelSelect,
                title,
                ...config,
            }),
        );
    };
    const closeUDW = () => udwRoot.unmount();
    const cancelSelect = () => closeUDW();
    const selectPath = (items) => {
        const [{ id: locationId, pathString }] = items;

        findLocationsByIdList(removeRootFromPathString(pathString), (data) => {
            const item = {
                id: locationId,
                name: buildBreadcrumbsString(data),
            };

            selectParentLocationWidget.addItems([item], true);
        });

        closeUDW();
    };
    const findLocationsByIdList = (idList, callback) => {
        const body = JSON.stringify({
            ViewInput: {
                identifier: `udw-locations-by-path-string-${idList.join('-')}`,
                public: false,
                LocationQuery: {
                    FacetBuilders: {},
                    SortClauses: { SectionIdentifier: 'ascending' },
                    Filter: { LocationIdCriterion: idList.join(',') },
                    limit: 50,
                    offset: 0,
                },
            },
        });
        const request = new Request('/api/ibexa/v2/views', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.ibexa.api.View+json; version=1.1',
                'Content-Type': 'application/vnd.ibexa.api.ViewInput+json; version=1.1',
                'X-Requested-With': 'XMLHttpRequest',
                'X-Siteaccess': siteaccess,
                'X-CSRF-Token': token,
            },
            body,
            mode: 'same-origin',
            credentials: 'same-origin',
        });
        const errorMessage = Translator.trans(
            /*@Desc("Cannot find children Locations with ID %idList%")*/ 'select_location.error',
            { idList: idList.join(',') },
            'ibexa_universal_discovery_widget',
        );

        fetch(request)
            .then(ibexa.helpers.request.getJsonFromResponse)
            .then(callback)
            .catch(() => ibexa.helpers.notification.showErrorNotification(errorMessage));
    };
    const removeRootFromPathString = (pathString) => {
        const pathArray = pathString.split('/').filter((id) => id);

        return pathArray.splice(1, pathArray.length - 1);
    };
    const buildBreadcrumbsString = (viewData) => {
        const searchHitList = viewData.View.Result.searchHits.searchHit;

        return searchHitList.map((searchHit) => searchHit.value.Location.ContentInfo.Content.TranslatedName).join(' / ');
    };
    const changeParentLocationIdByDesign = (event) => {
        if (!parentLocationWidgetContainer) {
            return;
        }

        const { parentLocationId } = event.currentTarget.dataset;

        if (!parentLocationId) {
            return;
        }

        const { parentLocationBreadcrumbs } = doc.querySelector(`option[data-parent-location="${parentLocationId}"]`).dataset;
        const itemsToAdd = [];

        if (parentLocationId && parentLocationBreadcrumbs) {
            itemsToAdd.push({
                id: parentLocationId,
                name: parentLocationBreadcrumbs,
            });
        }

        if (parentLocationIdInput) {
            selectParentLocationWidget.addItems(itemsToAdd, true);
        }
    };

    designItems.forEach((design) => design.addEventListener('click', changeParentLocationIdByDesign, false));

    if (openUdwBtn) {
        openUdwBtn.addEventListener('click', openUDW, false);
    }

    if (parentLocationWidgetContainer) {
        selectParentLocationWidget = new ibexa.core.TagViewSelect({
            fieldContainer: doc.querySelector('.ibexa-sf-parent-location'),
        });
    }
})(window, window.document, window.ibexa, window.React, window.ReactDOM, window.Translator);
