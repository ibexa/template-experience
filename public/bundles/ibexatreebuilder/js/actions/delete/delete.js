import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ActionItem from '../../components/action-list-item/action.list.item';
import { SelectedContext } from '../../components/selected-provider/selected.provider';
import { CallbackContext } from '../../tree.builder.module';
import { STORED_ITEMS_CLEAR } from '../../hooks/useStoredItemsReducer';
import { isItemEmpty } from '../../helpers/item';

const { Translator } = window;

const Delete = ({ item, label, useIconAsLabel }) => {
    const { selectedData: contextSelectedData, dispatchSelectedData } = useContext(SelectedContext);
    const { callbackDeleteElements } = useContext(CallbackContext);
    const itemLabel = label || Translator.trans(/*@Desc("Delete")*/ 'actions.delete', {}, 'tree_builder_ui');
    const selectedData = isItemEmpty(item) ? contextSelectedData : [item];
    const isDisabled = selectedData.size === 0;
    const deleteNodes = () => {
        callbackDeleteElements({ selectedData }).then(() => {
            dispatchSelectedData({ type: STORED_ITEMS_CLEAR });
        });
    };

    return (
        <ActionItem
            label={itemLabel}
            labelIcon="trash"
            useIconAsLabel={useIconAsLabel}
            onClick={deleteNodes}
            isDisabled={isDisabled}
        />
    );
};

Delete.propTypes = {
    item: PropTypes.object,
    label: PropTypes.node,
    useIconAsLabel: PropTypes.bool,
};

Delete.defaultProps = {
    item: {},
    label: null,
    useIconAsLabel: false,
};

export default Delete;
