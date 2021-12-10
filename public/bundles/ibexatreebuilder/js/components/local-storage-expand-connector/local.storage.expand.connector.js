import React, { createContext, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { getData, saveData } from '../../helpers/localStorage';
import useStoredItemsReducer from '../../hooks/useStoredItemsReducer';
import { ModuleIdContext, UserIdContext, GetterContext } from '../../tree.builder.module';

export const ExpandContext = createContext();

const EXPAND_ID = 'expanded-nodes';

const LocalStorageExpandConnector = ({ children, initialValue }) => {
    const moduleId = useContext(ModuleIdContext);
    const userId = useContext(UserIdContext);
    const { getId } = useContext(GetterContext);
    const localStorageData = getData({ moduleId, dataId: EXPAND_ID, userId }) || [];
    const getInitialValues = () => {
        if (initialValue.length > 0) {
            return initialValue;
        }

        return localStorageData;
    };
    const initiallyExpandedItemsIds = useRef(getInitialValues());
    const [expandedData, dispatchExpandedData] = useStoredItemsReducer([]);
    const expandDataContextValues = {
        initiallyExpandedItemsIds: initiallyExpandedItemsIds.current,
        expandedData,
        dispatchExpandedData,
    };

    useEffect(() => {
        const expandedItemsIds = expandedData.map(getId);

        saveData({ moduleId, dataId: EXPAND_ID, userId, data: expandedItemsIds }, false);
    }, [expandedData]);

    return <ExpandContext.Provider value={expandDataContextValues}>{children}</ExpandContext.Provider>;
};

LocalStorageExpandConnector.propTypes = {
    children: PropTypes.node.isRequired,
    initialValue: PropTypes.array.isRequired,
};

export default LocalStorageExpandConnector;
