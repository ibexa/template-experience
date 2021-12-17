import { useReducer } from 'react';

const initialState = {};

export const INTERACTIONS_DISABLE = 'INTERACTIONS_DISABLE';
export const INTERACTIONS_DISABLE_ALL = 'INTERACTIONS_DISABLE_ALL';
export const INTERACTIONS_ENABLE = 'INTERACTIONS_ENABLE';
export const INTERACTIONS_ENABLE_ALL = 'INTERACTIONS_ENABLE_ALL';
export const INTERACTIONS_ALL = 'INTERACTIONS_ALL';

const disabledInteractionsReducer = (state, action) => {
    switch (action.type) {
        case INTERACTIONS_DISABLE: {
            const nextState = { ...state };

            if (!nextState[action.interaction]) {
                nextState[action.interaction] = new Set();
            }

            action.ids.forEach((id) => nextState[action.interaction].add(id));

            return nextState;
        }
        case INTERACTIONS_DISABLE_ALL: {
            const nextState = { ...state };

            nextState[action.interaction] = new Set([INTERACTIONS_ALL]);

            return nextState;
        }
        case INTERACTIONS_ENABLE: {
            const nextState = { ...state };

            if (!nextState[action.interaction]) {
                nextState[action.interaction] = new Set();
            }

            action.ids.forEach((id) => nextState[action.interaction].delete(id));

            return nextState;
        }
        case INTERACTIONS_ENABLE_ALL: {
            const nextState = { ...state };

            nextState[action.interaction] = new Set();

            return nextState;
        }
        default:
            throw new Error();
    }
};

export default (state = initialState) => {
    const [disabledInteractions, dispatchDisabledInteractionsAction] = useReducer(disabledInteractionsReducer, state);

    return [disabledInteractions, dispatchDisabledInteractionsAction];
};
