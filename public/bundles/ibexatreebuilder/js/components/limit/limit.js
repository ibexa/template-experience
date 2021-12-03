import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { SubitemsLimitContext } from '../../tree.builder.module';

const { Translator } = window;

const Limit = ({ isExpanded, subitems }) => {
    const subitemsLimit = useContext(SubitemsLimitContext);
    const subitemsLimitReached = subitems.length >= subitemsLimit;

    if (subitemsLimit === null || !isExpanded || !subitemsLimitReached) {
        return null;
    }

    const message = Translator.trans(/*@Desc("Loading limit reached")*/ 'show_more.limit_reached', {}, 'tree_builder_ui');

    return (
        <div className="c-tb-list-item__row c-tb-list-item__row--no-checkbox">
            <div className="c-tb-list-item__load-more-limit-info">{message}</div>
        </div>
    );
};

Limit.propTypes = {
    isExpanded: PropTypes.bool.isRequired,
    subitems: PropTypes.array,
};

Limit.defaultProps = {
    subitems: [],
};

export default Limit;
