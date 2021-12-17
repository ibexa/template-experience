import { useReducer, useContext } from 'react';

import { GetterContext } from '../tree.builder.module';
import { isItemStored } from '../helpers/item';
import { removeDuplicates } from '../helpers/array';

const initialState = [];

export const STORED_ITEMS_SET = 'STORED_ITEMS_SET';
export const STORED_ITEMS_ADD = 'STORED_ITEMS_ADD';
export const STORED_ITEMS_REMOVE = 'STORED_ITEMS_REMOVE';
export const STORED_ITEMS_TOGGLE = 'STORED_ITEMS_TOGGLE';
export const STORED_ITEMS_CLEAR = 'STORED_ITEMS_CLEAR';

const storedItemsReducer = (state, action) => {
    switch (action.type) {
        case STORED_ITEMS_SET: {
            const { getId, items } = action;
            const nextState = removeDuplicates(items, { getId });

            return nextState;
        }
        case STORED_ITEMS_ADD: {
            const { getId, items } = action;
            const itemsToAdd = items.filter((item) => !isItemStored(item, state, { getId }));
            const nextState = [...state, ...itemsToAdd];

            return nextState;
        }
        case STORED_ITEMS_REMOVE: {
            const { getId, items } = action;
            const nextState = state.filter((item) => !isItemStored(item, items, { getId }));

            return nextState;
        }
        case STORED_ITEMS_TOGGLE: {
            const { getId, items } = action;
            const oldItems = state.filter((item) => !isItemStored(item, items, { getId }));
            const newItems = items.filter((item) => !isItemStored(item, state, { getId }));
            const nextState = [...oldItems, ...newItems];

            return nextState;
        }
        case STORED_ITEMS_CLEAR: {
            return [];
        }
        default:
            throw new Error();
    }
};

export default (state = initialState) => {
    const { getId } = useContext(GetterContext);
    const [storedItems, dispatchStoredItemsAction] = useReducer(storedItemsReducer, state);
    const dispatchStoredItemsActionWrapper = (action, ...restArgs) => {
        return dispatchStoredItemsAction({ ...action, getId }, ...restArgs);
    };

    return [storedItems, dispatchStoredItemsActionWrapper];
};
