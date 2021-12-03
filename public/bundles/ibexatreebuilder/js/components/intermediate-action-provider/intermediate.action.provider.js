import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const IntermediateActionContext = createContext();

const IntermediateActionProvider = ({ children }) => {
    const [intermediateAction, setIntermediateAction] = useState({
        isActive: false,
        listItems: new Set(),
    });
    const intermediateActionDataContextValues = {
        intermediateAction,
        setIntermediateAction,
    };

    return <IntermediateActionContext.Provider value={intermediateActionDataContextValues}>{children}</IntermediateActionContext.Provider>;
};

IntermediateActionProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default IntermediateActionProvider;
