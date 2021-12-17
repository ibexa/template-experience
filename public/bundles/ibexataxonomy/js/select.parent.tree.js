import React, { useState, useEffect } from 'react';

import { loadSubtree, loadTreeRoot } from './taxonomy-tree/services/taxonomy.tree.service';
import { getEntryId, getSubitems, getTotal } from './taxonomy-tree/helpers/getters';
import { extendItem, findItem } from './taxonomy-tree/helpers/tree';
import EmptyTree from './taxonomy-tree/components/empty-tree/empty.tree';

const { eZ, Translator } = window;
const TAXONOMY_NAME = 'tag';

const SelectParentTree = (props) => {
    const { moduleId, userId, selectedItem } = props;
    const [tree, setTree] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const setInitialItemsState = (location) => {
        setIsLoaded(true);
        setTree(location);
    };
    const loadTreeToState = () =>
        loadTreeRoot({ taxonomyName: TAXONOMY_NAME }).then((rootResponse) => {
            const [rootItem] = rootResponse;

            return loadSubtree({ taxonomyName: TAXONOMY_NAME, entryId: rootItem.id }).then((childrenResponse) => {
                rootItem.__children = childrenResponse;

                setInitialItemsState(rootItem);

                return rootItem;
            });
        });
    const renderLabel = (item) => {
        const { name, id } = item;

        return (
            <label
                htmlFor={`ibexa-tb-row-selected-${id}`}
                className="c-tt-list-item__link"
            >
                {name}
            </label>
        );
    };
    const loadMoreSubitems = (item) => {
        return loadSubtree({ taxonomyName: TAXONOMY_NAME, entryId: item.id }).then((childrenResponse) => {
            const treeItem = findItem([tree], item.path.split('/'));

            if (treeItem) {
                treeItem.__children = childrenResponse;

                setTree(tree);
            }

            return childrenResponse;
        });
    };
    const customItemClass = () => 'c-tt-list-item';
    const renderEmpty = () => {
        if (!isLoaded || tree?.id !== undefined) {
            return null;
        }

        return <EmptyTree />;
    };
    const moduleName = Translator.trans(/*@Desc("Taxonomy tree")*/ 'taxonomy.tree_name', {}, 'taxonomy_ui');

    useEffect(() => {
        loadTreeToState();
    }, []);

    return (
        <eZ.modules.TreeBuilder
            moduleId={moduleId}
            moduleName={moduleName}
            userId={userId}
            tree={tree}
            getSubitems={getSubitems}
            getLabel={renderLabel}
            getTotal={getTotal}
            getId={getEntryId}
            isActive={() => false}
            loadMoreSubitems={loadMoreSubitems}
            extendItem={extendItem}
            customItemClass={customItemClass}
            selectedLimit={1}
            dragDisabled={true}
            isResizable={false}
            headerVisible={false}
            actionsVisible={false}
            quickActionsVisible={false}
            initiallySelectedItemsIds={selectedItem ? [selectedItem.id] : []}
            initiallyExpandedItemsIds={tree ? [tree.id] : []}
        >
            {renderEmpty()}
        </eZ.modules.TreeBuilder>
    );
};

SelectParentTree.propTypes = {
    moduleId: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    restInfo: PropTypes.shape({
        token: PropTypes.string.isRequired,
        siteaccess: PropTypes.string.isRequired,
    }).isRequired,
    selectedItem: PropTypes.object,
};

SelectParentTree.defaultProps = {
    selectedItem: null,
}

export default SelectParentTree;
