(function (global, doc, React, ReactDOM, ibexa) {
    const contentTreeContainer = doc.querySelector('.ibexa-content-tree-container');

    if (!contentTreeContainer) {
        return;
    }

    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const contentTreeRootElement = doc.querySelector('.ibexa-content-tree-container__root');
    const { currentLocationPath, treeRootLocationId } = contentTreeContainer.dataset;
    const userId = window.ibexa.helpers.user.getId();
    const removeContentTreeContainerWidth = () => {
        contentTreeContainer.style.width = null;
    }
    const renderTree = () => {
        ReactDOM.render(
            React.createElement(ibexa.modules.ContentTree, {
                userId,
                currentLocationPath,
                rootLocationId: parseInt(treeRootLocationId, 10),
                restInfo: { token, siteaccess },
            }),
            contentTreeRootElement
        );
    }

    doc.body.addEventListener('ibexa-tb-rendered:ibexa-content-tree', removeContentTreeContainerWidth);

    renderTree();
})(window, window.document, window.React, window.ReactDOM, window.ibexa);