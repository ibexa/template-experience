import React, { createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getData, saveData, SAVE_ITEM_EVENT } from '../../helpers/localStorage';
import useStoredItemsReducer, { STORED_ITEMS_SET } from '../../hooks/useStoredItemsReducer';
import { ModuleIdContext, UserIdContext } from '../../tree.builder.module';

export const ExpandContext = createContext();

const EXPAND_ID = 'expanded-nodes';

const LocalStorageExpandConnector = ({ children, initialValue }) => {
    const moduleId = useContext(ModuleIdContext);
    const userId = useContext(UserIdContext);
    const localStorageData = getData({ moduleId, dataId: EXPAND_ID, userId }) || [];
    const [expandedData, dispatchExpandedData] = useStoredItemsReducer([...initialValue, ...localStorageData]);
    const expandDataContextValues = {
        expandedData,
        dispatchExpandedData,
    };
    const setExpandedNodes = (event) => {
        dispatchExpandedData({ items: event.detail.items, type: STORED_ITEMS_SET });
    };

    useEffect(() => {
        saveData({ moduleId, dataId: EXPAND_ID, userId, data: [...expandedData] }, false);
    }, [expandedData]);

    useEffect(() => {
        const synchronizeData = () => {
            dispatchExpandedData({ items: getData({ moduleId, dataId: EXPAND_ID, userId }) || [], type: STORED_ITEMS_SET });
        };

        window.document.addEventListener(SAVE_ITEM_EVENT, synchronizeData, false);
        window.document.addEventListener(`ibexa-tree-builder:${moduleId}:set-expanded-nodes`, setExpandedNodes, false);

        return () => {
            window.document.removeEventListener(SAVE_ITEM_EVENT, synchronizeData, false);
            window.document.removeEventListener(`ibexa-tree-builder:${moduleId}:set-expanded-nodes`, setExpandedNodes, false);
        };
    }, []);

    return <ExpandContext.Provider value={expandDataContextValues}>{children}</ExpandContext.Provider>;
};

LocalStorageExpandConnector.propTypes = {
    children: PropTypes.node.isRequired,
    initialValue: PropTypes.array,
};

LocalStorageExpandConnector.defaultProps = {
    initialValue: [],
};

export default LocalStorageExpandConnector;
