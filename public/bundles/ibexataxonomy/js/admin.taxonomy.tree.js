(function(global, doc, React, ReactDOM, eZ) {
    const taxonomyTreeContainer = doc.querySelector('.ibexa-taxonomy-tree-container');

    if (!taxonomyTreeContainer) {
        return;
    }

    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const taxonomyTreeRootElement = doc.querySelector('.ibexa-taxonomy-tree-container__root');
    const userId = eZ.helpers.user.getId();
    const removeTaxonomyTreeContainerWidth = () => {
        taxonomyTreeContainer.style.width = null;
    };
    const renderTree = () => {
        ReactDOM.render(
            React.createElement(eZ.modules.TaxonomyTree, {
                userId,
                restInfo: { token, siteaccess },
            }),
            taxonomyTreeRootElement,
        );
    };

    doc.body.addEventListener('ibexa-tb-rendered:ibexa-taxonomy-tree', removeTaxonomyTreeContainerWidth, false);
    renderTree();
})(window, window.document, window.React, window.ReactDOM, window.eZ);
