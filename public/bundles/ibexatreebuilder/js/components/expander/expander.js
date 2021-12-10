import React from 'react';
import PropTypes from 'prop-types';

import { createCssClassNames } from '../../../../../../../../../ibexa/admin-ui/src/bundle/ui-dev/src/modules/common/helpers/css.class.names';

const Expander = ({ isExpanded, onClick, totalSubitemsCount }) => {
    const togglerAttrs = {
        className: createCssClassNames({
            'c-tb-toggler': true,
            'c-tb-toggler--light': isExpanded,
        }),
        tabIndex: -1,
    };

    if (totalSubitemsCount > 0) {
        togglerAttrs.onClick = onClick;
    }

    return <div {...togglerAttrs} />;
};

Expander.propTypes = {
    isExpanded: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    totalSubitemsCount: PropTypes.number.isRequired,
};

export default Expander;
