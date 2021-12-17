import React from 'react';
import PropTypes from 'prop-types';

import ActionList from '../action-list/action.list';

const ListMenu = ({ item }) => {
    return (
        <div className="c-tb-list-menu">
            <ActionList
                item={item}
                useIconAsLabel={true}
            />
        </div>
    );
};

ListMenu.propTypes = {
    item: PropTypes.object,
};

ListMenu.defaultProps = {
    item: {},
};

export default ListMenu;
