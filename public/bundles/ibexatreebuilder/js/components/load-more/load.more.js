import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../../../../../../../ibexa/admin-ui/src/bundle/ui-dev/src/modules/common/icon/icon';
import { SubitemsLimitContext } from '../../tree.builder.module';

const { Translator } = window;

const LoadMore = ({ isExpanded, isLoading, subitems, loadMore, totalSubitemsCount }) => {
    const subitemsLimit = useContext(SubitemsLimitContext);
    const subitemsLimitReached = subitems.length >= subitemsLimit;
    const allSubitemsLoaded = subitems.length === totalSubitemsCount;

    if (!isExpanded || subitemsLimitReached || allSubitemsLoaded || !subitems.length) {
        return null;
    }

    const showMoreLabel = Translator.trans(/*@Desc("Show more")*/ 'show_more', {}, 'tree_builder_ui');
    const loadingMoreLabel = Translator.trans(/*@Desc("Loading more...")*/ 'loading_more', {}, 'tree_builder_ui');
    const btnLabel = isLoading ? loadingMoreLabel : showMoreLabel;
    let loadingSpinner = null;

    if (isLoading) {
        loadingSpinner = (
            <Icon
                name="spinner"
                extraClasses="ibexa-spin ibexa-icon--small c-tb-list-item__load-more-btn-spinner"
            />
        );
    }

    return (
        <div className="c-tb-list-item__row c-tb-list-item__row--no-checkbox">
            <button
                type="button"
                className="c-tb-list-item__load-more-btn btn ibexa-btn"
                onClick={loadMore}
            >
                {loadingSpinner} {btnLabel}
            </button>
        </div>
    );
};

LoadMore.propTypes = {
    isExpanded: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loadMore: PropTypes.func.isRequired,
    totalSubitemsCount: PropTypes.number.isRequired,
    subitems: PropTypes.array,
};

LoadMore.defaultProps = {
    subitems: [],
};

export default LoadMore;
