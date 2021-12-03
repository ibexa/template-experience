import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { ModuleIdContext, GetterContext } from '../../tree.builder.module';

const ActionList = ({ item, extraClasses, useIconAsLabel }) => {
    const moduleId = useContext(ModuleIdContext);
    const { getMenuActions } = useContext(GetterContext);
    const actions = window.ibexa?.treeBuilder?.[moduleId]?.menuActions || [];
    const getSortedActions = (menu) => [...menu].sort((actionA, actionB) => actionA.priority - actionB.priority);
    const renderSubmenu = (menu) =>
        getSortedActions(menu).map((menuItem) => {
            const { subitems, component, id } = menuItem;

            if (subitems) {
                return <ul className="c-tb-action-list__list">{renderSubmenu(subitems)}</ul>;
            }

            const Component = component;

            return (
                <Component
                    key={id}
                    item={item}
                    useIconAsLabel={useIconAsLabel}
                    {...menuItem}
                />
            );
        });
    const menu = useMemo(() => renderSubmenu(getMenuActions(actions)), [actions, getMenuActions]);

    return (
        <div className={`c-tb-action-list ${extraClasses}`}>
            <ul className="c-tb-action-list__list">{menu}</ul>
        </div>
    );
};

ActionList.propTypes = {
    extraClasses: PropTypes.string,
    item: PropTypes.object,
    useIconAsLabel: PropTypes.bool,
};

ActionList.defaultProps = {
    extraClasses: '',
    item: {},
    useIconAsLabel: false,
};

export default ActionList;
