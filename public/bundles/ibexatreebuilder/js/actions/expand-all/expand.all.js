import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ActionItem from '../../components/action-list-item/action.list.item';
import { ExpandContext } from '../../components/local-storage-expand-connector/local.storage.expand.connector';
import { TreeContext, GetterContext } from '../../tree.builder.module';
import { STORED_ITEMS_ADD } from '../../hooks/useStoredItemsReducer';
import { getAllChildren } from '../../helpers/tree';
import { isItemEmpty } from '../../helpers/item';

const { Translator } = window;

const ExpandAll = ({ item, label, useIconAsLabel }) => {
    const { getSubitems } = useContext(GetterContext);
    const { dispatchExpandedData } = useContext(ExpandContext);
    const tree = useContext(TreeContext);
    const itemLabel = label || Translator.trans(/*@Desc("Expand all")*/ 'actions.expand_all', {}, 'tree_builder_ui');
    const data = isItemEmpty(item) ? tree : item;
    const canItemBeExpanded = (itemToExpand) => !!getSubitems(itemToExpand) && getSubitems(itemToExpand).length;
    const expandAllNodes = () => {
        const items = getAllChildren({ data, getSubitems, condition: canItemBeExpanded });

        dispatchExpandedData({ items, type: STORED_ITEMS_ADD });
    };

    return (
        <ActionItem
            label={itemLabel}
            labelIcon="caret-down"
            useIconAsLabel={useIconAsLabel}
            onClick={expandAllNodes}
        />
    );
};

ExpandAll.propTypes = {
    item: PropTypes.object,
    label: PropTypes.node,
    useIconAsLabel: PropTypes.bool,
};

ExpandAll.defaultProps = {
    item: {},
    label: null,
    useIconAsLabel: false,
};

export default ExpandAll;
