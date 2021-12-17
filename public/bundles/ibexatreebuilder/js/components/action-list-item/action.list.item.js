import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { createCssClassNames } from '../../../../../../../../../ibexa/admin-ui/src/bundle/ui-dev/src/modules/common/helpers/css.class.names';
import Icon from '../../../../../../../../../ibexa/admin-ui/src/bundle/ui-dev/src/modules/common/icon/icon';

import { IntermediateActionContext } from '../intermediate-action-provider/intermediate.action.provider';

const ActionItem = ({ label, labelIcon, useIconAsLabel, isDisabled, extraClasses, onClick }) => {
    const { intermediateAction } = useContext(IntermediateActionContext);
    const getLabel = () => {
        if (useIconAsLabel && labelIcon) {
            return (
                <span title={label}>
                    <Icon
                        name={labelIcon}
                        extraClasses="ibexa-icon ibexa-icon--small"
                    />
                </span>
            );
        }

        return label;
    };
    const className = createCssClassNames({
        'c-tb-action-list__item': true,
        'c-tb-action-list__item--disabled': isDisabled || intermediateAction.isActive,
        [extraClasses]: extraClasses !== '',
    });

    return (
        <li
            className={className}
            onClick={onClick}
        >
            {getLabel()}
        </li>
    );
};

ActionItem.propTypes = {
    label: PropTypes.node.isRequired,
    extraClasses: PropTypes.string,
    isDisabled: PropTypes.bool,
    labelIcon: PropTypes.string,
    onClick: PropTypes.func,
    useIconAsLabel: PropTypes.bool,
};

ActionItem.defaultProps = {
    extraClasses: '',
    isDisabled: false,
    labelIcon: null,
    onClick: () => {},
    useIconAsLabel: false,
};

export default ActionItem;
