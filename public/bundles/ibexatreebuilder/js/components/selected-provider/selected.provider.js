import React, { createContext, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { ModuleIdContext, GetterContext } from '../../tree.builder.module';
import useStoredItemsReducer from '../../hooks/useStoredItemsReducer';
import { removeDuplicates } from '../../helpers/array';

export const SelectedContext = createContext();

const SelectedProvider = ({ children }) => {
    const prevSelectedDataRef = useRef([]);
    const moduleId = useContext(ModuleIdContext);
    const { getId } = useContext(GetterContext);
    const [selectedData, dispatchSelectedData] = useStoredItemsReducer();
    const selectedDataContextValues = {
        selectedData,
        dispatchSelectedData,
    };

    useEffect(() => {
        const prevSelectedData = prevSelectedDataRef.current;
        const nextSelectedData = removeDuplicates([...prevSelectedData, ...selectedData], { getId });
        const areSetsEqual =
            prevSelectedData.length === selectedData.length && nextSelectedData.length === prevSelectedData.length;

        if (!areSetsEqual) {
            document.body.dispatchEvent(
                new CustomEvent(`ibexa-tb-update-selected:${moduleId}`, { detail: { items: selectedData } }),
            );

            prevSelectedDataRef.current = selectedData;
        }
    });

    return <SelectedContext.Provider value={selectedDataContextValues}>{children}</SelectedContext.Provider>;
};

SelectedProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SelectedProvider;
