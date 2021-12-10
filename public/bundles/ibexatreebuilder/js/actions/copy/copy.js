import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ActionItem from '../../components/action-list-item/action.list.item';
import { CallbackContext, GetterContext } from '../../tree.builder.module';
import { SelectedContext } from '../../components/selected-provider/selected.provider';
import { IntermediateActionContext } from '../../components/intermediate-action-provider/intermediate.action.provider';
import { STORED_ITEMS_CLEAR } from '../../hooks/useStoredItemsReducer';
import { isItemDisabled, isItemEmpty } from '../../helpers/item';

export const COPY_ID = 'COPY';
const { Translator } = window;

const Copy = ({ item, label, useIconAsLabel, canBeDestination }) => {
    const { getId } = useContext(GetterContext);
    const { selectedData: contextSelectedData, dispatchSelectedData } = useContext(SelectedContext);
    const { callbackCopyElements } = useContext(CallbackContext);
    const { setIntermediateAction } = useContext(IntermediateActionContext);
    const itemLabel = label || Translator.trans(/*@Desc("Copy")*/ 'actions.copy', {}, 'tree_builder_ui');
    const selectedData = isItemEmpty(item) ? contextSelectedData : [item];
    const isDisabled = selectedData.size === 0;
    const startCopying = () => {
        setIntermediateAction({
            isActive: true,
            listItems: selectedData,
            id: COPY_ID,
            isItemDisabled: (itemToCopy, extras) => {
                return isItemDisabled(itemToCopy, { ...extras, selectedData, getId }) || !canBeDestination(itemToCopy);
            },
            callback: (itemToCopy) => {
                callbackCopyElements(itemToCopy, { selectedData }).then(() => {
                    setIntermediateAction({
                        isActive: false,
                        listItems: new Set(),
                    });
                    dispatchSelectedData({ type: STORED_ITEMS_CLEAR });
                });
            },
        });
    };

    return (
        <ActionItem
            label={itemLabel}
            labelIcon="copy"
            useIconAsLabel={useIconAsLabel}
            onClick={startCopying}
            isDisabled={isDisabled}
        />
    );
};

Copy.propTypes = {
    item: PropTypes.object,
    label: PropTypes.node,
    useIconAsLabel: PropTypes.bool,
    canBeDestination: PropTypes.func,
};

Copy.defaultProps = {
    item: {},
    label: null,
    useIconAsLabel: false,
    canBeDestination: () => true,
};

export default Copy;
