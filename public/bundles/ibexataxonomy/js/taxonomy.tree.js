import React, { useState, useEffect, useRef } from 'react';

import { getData, saveData } from '../../../../../../tree-builder/src/bundle/Resources/public/js/helpers/localStorage';

import { loadSubtree, loadTreeRoot, loadTree } from './taxonomy-tree/services/taxonomy.tree.service';
import { getLastElement } from './taxonomy-tree/helpers/array';
import { getContentLink, getEntryId, getSubitems, getTotal } from './taxonomy-tree/helpers/getters';
import { extendItem, findItem } from './taxonomy-tree/helpers/tree';
import EmptyTree from './taxonomy-tree/components/empty-tree/empty.tree';

const { eZ, Translator } = window;
const TAXONOMY_NAME = 'tag';
const MODULE_ID = 'ibexa-taxonomy-tree';
const SUBTREE_ID = 'subtree';

const TaxonomyTree = (props) => {
    const { userId } = props;
    const [tree, setTree] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const readSubtree = () => {
        return getData({ moduleId: MODULE_ID, dataId: SUBTREE_ID, userId }) ?? [];
    };
    const subtree = useRef(readSubtree());
    const setInitialItemsState = (location) => {
        setIsLoaded(true);
        setTree(location);
    };
    const saveSubtree = () => {
        saveData({ moduleId: MODULE_ID, dataId: SUBTREE_ID, userId, data: subtree.current });
    };
    const getLoadTreePromise = () => {
        if (subtree.current?.length) {
            const entryIds = subtree.current.map((entryPath) => getLastElement(entryPath.split('/')));

            return loadTree({ taxonomyName: TAXONOMY_NAME, entryIds });
        }
        return loadTreeRoot({ taxonomyName: TAXONOMY_NAME });

    };
    const loadTreeToState = () => {
        return getLoadTreePromise().then((rootResponse) => {
            const [rootItem] = rootResponse;

            setInitialItemsState(rootItem);

            return rootItem;
        });
    };
    const renderLabel = (item) => {
        const { name } = item;

        return (
            <span className="c-tt-list-item__link">
                {name}
            </span>
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
    const callbackToggleExpanded = (item, { isExpanded, loadMore }) => {
        const regexp = new RegExp(`/?${item.id}$`, 'g');
        const parentPath = item.path.replace(regexp, '');

        if (isExpanded) {
            subtree.current = subtree.current.filter((entryPath) => entryPath !== parentPath);
            subtree.current.push(item.path);

            loadMore();
        } else {
            subtree.current = subtree.current.filter((entryPath) => entryPath.indexOf(item.path) !== 0);

            if (parentPath) {
                subtree.current.push(parentPath);
            }
        }

        saveSubtree();
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
            moduleId={MODULE_ID}
            moduleName={moduleName}
            userId={userId}
            tree={tree}
            getSubitems={getSubitems}
            getLabel={renderLabel}
            getTotal={getTotal}
            getId={getEntryId}
            getHref={getContentLink}
            isActive={() => false}
            loadMoreSubitems={loadMoreSubitems}
            callbackToggleExpanded={callbackToggleExpanded}
            extendItem={extendItem}
            customItemClass={customItemClass}
            dragDisabled={true}
            actionsVisible={false}
            quickActionsVisible={false}
        >
            {renderEmpty()}
        </eZ.modules.TreeBuilder>
    );
};

TaxonomyTree.propTypes = {
    userId: PropTypes.number.isRequired,
    restInfo: PropTypes.shape({
        token: PropTypes.string.isRequired,
        siteaccess: PropTypes.string.isRequired,
    }).isRequired,
};

window.eZ.addConfig('modules.TaxonomyTree', TaxonomyTree);

export default TaxonomyTree;
