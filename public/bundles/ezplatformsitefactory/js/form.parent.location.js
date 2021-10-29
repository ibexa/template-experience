(function(global, doc, eZ, React, ReactDOM, Translator) {
    let selectParentLocationWidget = null;
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const designItems = doc.querySelectorAll('.ibexa-sf-design-layouts__item');
    const parentLocationIdInput = doc.querySelector('.ibexa-sf-parent-location input');
    const parentLocationWidgetContainer = doc.querySelector('.ibexa-sf-parent-location');
    const openUdwBtn = doc.querySelector('.ibexa-sf-parent-location__btn-select-path');
    const udwContainer = doc.querySelector('#react-udw');
    const openUDW = (event) => {
        event.preventDefault();

        const config = JSON.parse(event.currentTarget.dataset.udwConfig);
        const title = Translator.trans(/*@Desc("Choose Location")*/ 'select_location.label', {}, 'ezplatform_site_factory_ui');

        ReactDOM.render(
            React.createElement(eZ.modules.UniversalDiscovery, {
                onConfirm: selectPath,
                onCancel: cancelSelect,
                title,
                ...config,
            }),
            udwContainer,
        );
    };
    const closeUDW = () => ReactDOM.unmountComponentAtNode(udwContainer);
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
        const request = new Request('/api/ezp/v2/views', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.ez.api.View+json; version=1.1',
                'Content-Type': 'application/vnd.ez.api.ViewInput+json; version=1.1',
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
            'universal_discovery_widget',
        );

        fetch(request)
            .then(eZ.helpers.request.getJsonFromResponse)
            .then(callback)
            .catch(() => eZ.helpers.notification.showErrorNotification(errorMessage));
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
        selectParentLocationWidget = new eZ.core.TagViewSelect({
            fieldContainer: doc.querySelector('.ibexa-sf-parent-location'),
        });
    }
})(window, window.document, window.eZ, window.React, window.ReactDOM, window.Translator);
