(function (global, doc, React, ReactDOM, ibexa) {
    const taxonomyTreeContainer = doc.querySelector('.ibexa-taxonomy-tree-container');

    if (!taxonomyTreeContainer) {
        return;
    }

    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const taxonomyTreeRootElement = doc.querySelector('.ibexa-taxonomy-tree-container__root');
    const { taxonomy: taxonomyName, currentPath } = taxonomyTreeContainer.dataset;
    const userId = ibexa.helpers.user.getId();
    let taxonomyTreeRoot = null;
    const removeTaxonomyTreeContainerWidth = (event) => {
        if (event.detail.id !== 'ibexa-taxonomy-tree') {
            return;
        }

        taxonomyTreeContainer.style.width = null;
    };
    const renderTree = () => {
        taxonomyTreeRoot = ReactDOM.createRoot(taxonomyTreeRootElement);
        taxonomyTreeRoot.render(
            React.createElement(ibexa.modules.TaxonomyTree, {
                userId,
                taxonomyName,
                currentPath,
                restInfo: { token, siteaccess },
            }),
        );
    };

    doc.body.addEventListener('ibexa-tb-rendered', removeTaxonomyTreeContainerWidth, false);
    renderTree();
})(window, window.document, window.React, window.ReactDOM, window.ibexa);
