import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ActionItem from '../../components/action-list-item/action.list.item';
import { GetterContext, SelectedLimitContext } from '../../tree.builder.module';
import { SelectedContext } from '../../components/selected-provider/selected.provider';
import { STORED_ITEMS_ADD } from '../../hooks/useStoredItemsReducer';
import { getAllChildren } from '../../helpers/tree';
import { isItemEmpty } from '../../helpers/item';

const { Translator } = window;

const SelectAll = ({ item, label, useIconAsLabel }) => {
    const { getSubitems } = useContext(GetterContext);
    const { dispatchSelectedData } = useContext(SelectedContext);
    const selectedLimit = useContext(SelectedLimitContext);
    const itemLabel = label || Translator.trans(/*@Desc("Select all children")*/ 'actions.select.all', {}, 'tree_builder_ui');
    const isDisabled = isItemEmpty(item) || getSubitems(item).length === 0;
    const selectAll = () => {
        const allItems = getAllChildren({ data: item, getSubitems });
        const items = selectedLimit ? allItems.slice(0, selectedLimit) : allItems;

        dispatchSelectedData({ type: STORED_ITEMS_ADD, items });
    };

    return (
        <ActionItem
            label={itemLabel}
            labelIcon="checkmark"
            useIconAsLabel={useIconAsLabel}
            onClick={selectAll}
            isDisabled={isDisabled}
        />
    );
};

SelectAll.propTypes = {
    item: PropTypes.object,
    label: PropTypes.node,
    useIconAsLabel: PropTypes.bool,
};

SelectAll.defaultProps = {
    item: {},
    label: null,
    useIconAsLabel: false,
};

export default SelectAll;
