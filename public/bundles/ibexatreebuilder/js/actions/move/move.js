import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ActionItem from '../../components/action-list-item/action.list.item';
import { CallbackContext, GetterContext } from '../../tree.builder.module';
import { SelectedContext } from '../../components/selected-provider/selected.provider';
import { IntermediateActionContext } from '../../components/intermediate-action-provider/intermediate.action.provider';
import { STORED_ITEMS_CLEAR } from '../../hooks/useStoredItemsReducer';
import { isItemDisabled, isItemEmpty } from '../../helpers/item';

export const MOVE_ID = 'MOVE';
const MOVED_INDICATOR_TIMEOUT = 1000;
const { Translator } = window;

const Move = ({ item, label, useIconAsLabel, canBeDestination }) => {
    const { getId } = useContext(GetterContext);
    const { selectedData: contextSelectedData, dispatchSelectedData } = useContext(SelectedContext);
    const { callbackMoveElements } = useContext(CallbackContext);
    const { setIntermediateAction } = useContext(IntermediateActionContext);
    const itemLabel = label || Translator.trans(/*@Desc("Move")*/ 'actions.move', {}, 'tree_builder_ui');
    const selectedData = isItemEmpty(item) ? contextSelectedData : [item];
    const isDisabled = selectedData.size === 0;
    const startMoving = () => {
        setIntermediateAction({
            isActive: true,
            listItems: selectedData,
            id: MOVE_ID,
            isItemDisabled: (itemToMove, extras) => {
                return isItemDisabled(itemToMove, { ...extras, selectedData, getId }) || !canBeDestination(itemToMove);
            },
            callback: (itemToMove) => {
                callbackMoveElements(itemToMove, { selectedData }).then(() => {
                    setIntermediateAction((prevState) => ({
                        ...prevState,
                        highlightDestination: true,
                    }));
                    dispatchSelectedData({ type: STORED_ITEMS_CLEAR });

                    setTimeout(() => {
                        setIntermediateAction({
                            isActive: false,
                            listItems: new Set(),
                        });
                    }, MOVED_INDICATOR_TIMEOUT);
                });
            },
        });
    };

    return (
        <ActionItem
            label={itemLabel}
            labelIcon="move"
            useIconAsLabel={useIconAsLabel}
            onClick={startMoving}
            isDisabled={isDisabled}
        />
    );
};

Move.propTypes = {
    item: PropTypes.object,
    label: PropTypes.node,
    useIconAsLabel: PropTypes.bool,
    canBeDestination: PropTypes.func,
};

Move.defaultProps = {
    item: {},
    label: null,
    useIconAsLabel: false,
    canBeDestination: () => true,
};

export default Move;
