import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { createCssClassNames } from '../../../../../../../../../ibexa/admin-ui/src/bundle/ui-dev/src/modules/common/helpers/css.class.names';
import Icon from '../../../../../../../../../ibexa/admin-ui/src/bundle/ui-dev/src/modules/common/icon/icon';
import ActionList from '../action-list/action.list';
import usePortal from '../../hooks/usePortal';

export const PORTAL_CONTEXTUAL_MENU_ID = 'contextual-menu';

const ContextualMenu = ({ item, isDisabled }) => {
    const menuRef = useRef();
    const { renderPortal } = usePortal(PORTAL_CONTEXTUAL_MENU_ID);
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleMenu = useCallback(() => {
        if (isDisabled) {
            return;
        }

        setIsExpanded((prevState) => !prevState);
    }, [isDisabled]);
    const wrapperClassName = createCssClassNames({
        'c-tb-contextual-menu': true,
        'c-tb-contextual-menu--burger': true,
        'c-tb-contextual-menu--expanded': isExpanded,
    });
    const iconClassName = createCssClassNames({
        'ibexa-icon--tiny-small': true,
        'ibexa-icon--primary': !isDisabled && isExpanded,
    });
    const togglerClassName = createCssClassNames({
        'c-tb-contextual-menu__toggler': true,
        'c-tb-contextual-menu__toggler--disabled': isDisabled,
    });
    const getPosition = () => menuRef.current.getBoundingClientRect();

    useEffect(() => {
        if (isExpanded) {
            window.document.addEventListener('click', toggleMenu, false);
        } else {
            window.document.removeEventListener('click', toggleMenu, false);
        }

        return () => {
            window.document.removeEventListener('click', toggleMenu, false);
        };
    }, [isExpanded]);

    return (
        <div
            className={wrapperClassName}
            ref={menuRef}
        >
            <div
                className={togglerClassName}
                onClick={toggleMenu}
            >
                <Icon
                    name="options"
                    extraClasses={iconClassName}
                />
            </div>
            {isExpanded &&
                renderPortal((
                    <ActionList
                        item={item}
                        extraClasses="c-tb-contextual-menu c-tb-contextual-menu--portal"
                    />
                ), getPosition)}
        </div>
    );
};

ContextualMenu.propTypes = {
    item: PropTypes.object,
    isDisabled: PropTypes.bool,
};

ContextualMenu.defaultProps = {
    item: {},
    isDisabled: false,
};

export default ContextualMenu;
