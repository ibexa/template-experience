import CategoryFilterTreeModule from '../../../ui-dev/src/modules/category-filter-tree/category.filter.tree.module';

(function (global, doc, React, ReactDOM, ibexa) {
    const taxonomyTreeContainer = doc.querySelector('.ibexa-taxonomy-tree-container');

    if (!taxonomyTreeContainer) {
        return;
    }

    const taxonomyTreeRootElement = doc.querySelector('.ibexa-taxonomy-tree-container__root');
    const {
        taxonomy: taxonomyName,
        moduleName,
        currentPath,
        categoryWithFormDataUrlTemplate,
        activeItemId,
    } = taxonomyTreeContainer.dataset;
    const userId = ibexa.helpers.user.getId();
    let taxonomyTreeRoot = null;
    const removeTaxonomyTreeContainerWidth = (event) => {
        if (event.detail.id !== 'ibexa-category-filter-tree') {
            return;
        }

        taxonomyTreeContainer.style.width = null;
    };

    const renderTree = () => {
        taxonomyTreeRoot = ReactDOM.createRoot(taxonomyTreeRootElement);
        taxonomyTreeRoot.render(
            React.createElement(CategoryFilterTreeModule, {
                userId,
                taxonomyName,
                moduleName,
                currentPath,
                categoryWithFormDataUrlTemplate,
                activeItemId: activeItemId !== '' ? parseInt(activeItemId, 10) : null,
            }),
        );
    };

    doc.body.addEventListener('ibexa-tb-rendered', removeTaxonomyTreeContainerWidth, false);
    renderTree();
})(window, window.document, window.React, window.ReactDOM, window.ibexa);
