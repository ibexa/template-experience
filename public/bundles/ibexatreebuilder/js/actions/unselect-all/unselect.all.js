import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ActionItem from '../../components/action-list-item/action.list.item';
import { GetterContext } from '../../tree.builder.module';
import { SelectedContext } from '../../components/selected-provider/selected.provider';
import { STORED_ITEMS_REMOVE } from '../../hooks/useStoredItemsReducer';
import { getAllChildren } from '../../helpers/tree';
import { isItemEmpty } from '../../helpers/item';

const { Translator } = window;

const UnselectAll = ({ item, label, useIconAsLabel }) => {
    const { getSubitems } = useContext(GetterContext);
    const { dispatchSelectedData } = useContext(SelectedContext);
    const itemLabel = label || Translator.trans(/*@Desc("Unselect all children")*/ 'actions.unselect.all', {}, 'tree_builder_ui');
    const isDisabled = isItemEmpty(item) || getSubitems(item).length === 0;
    const unselectAll = () => {
        const items = getAllChildren({ data: item, getSubitems });

        dispatchSelectedData({ type: STORED_ITEMS_REMOVE, items });
    };

    return (
        <ActionItem
            label={itemLabel}
            labelIcon="checkmark"
            useIconAsLabel={useIconAsLabel}
            onClick={unselectAll}
            isDisabled={isDisabled}
        />
    );
};

UnselectAll.propTypes = {
    item: PropTypes.object,
    label: PropTypes.node,
    useIconAsLabel: PropTypes.bool,
};

UnselectAll.defaultProps = {
    item: {},
    label: null,
    useIconAsLabel: false,
};

export default UnselectAll;
