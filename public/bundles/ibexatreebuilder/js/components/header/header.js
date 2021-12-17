import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { createCssClassNames } from '../../../../../../../../../ibexa/admin-ui/src/bundle/ui-dev/src/modules/common/helpers/css.class.names';
import Icon from '../../../../../../../../../ibexa/admin-ui/src/bundle/ui-dev/src/modules/common/icon/icon';

import ContextualMenu from '../contextual-menu/contextual.menu';
import { WidthContainerContext, checkIsTreeCollapsed } from '../width-container/width.container';
import { ResizableContext } from '../../tree.builder.module';

const COLLAPSED_WIDTH = 96;
const EXPANDED_WIDTH = 320;

const Header = ({ name, actionsVisible }) => {
    const { isResizable } = useContext(ResizableContext);
    const [widthContainer, setWidthContainer] = useContext(WidthContainerContext);
    const containerWidth = widthContainer.resizedContainerWidth ?? widthContainer.containerWidth;
    const isCollapsed = checkIsTreeCollapsed(containerWidth);
    const toggleWidthContainer = () => {
        setWidthContainer((prevState) => ({
            ...prevState,
            containerWidth: isCollapsed ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        }));
    };
    const renderCollapseButton = () => {
        if (!isResizable) {
            return null;
        }

        const iconName = isCollapsed ? 'caret-next' : 'caret-back';
        const btnClassName = createCssClassNames({
            'ibexa-btn btn ibexa-btn--no-text ibexa-btn--tertiary': true,
            'c-tb-header__expand-btn': isCollapsed,
        });

        return (
            <button
                type="button"
                className={btnClassName}
                onClick={toggleWidthContainer}
            >
                {isCollapsed && (
                    <Icon
                        name="content-tree"
                        extraClasses="ibexa-icon--medium"
                    />
                )}
                <Icon
                    name={iconName}
                    extraClasses="ibexa-icon--small"
                />
            </button>

        );
    };

    return (
        <div className="c-tb-header">
            {renderCollapseButton()}
            {!isCollapsed && (
                <>
                    <div className="c-tb-header__name">
                        <Icon
                            name="content-tree"
                            extraClasses="ibexa-icon--small"
                        />
                        {name}
                    </div>
                    <div className="c-tb-header__options">{actionsVisible && <ContextualMenu />}</div>
                </>
            )}
        </div>
    );
};

Header.propTypes = {
    name: PropTypes.string.isRequired,
    actionsVisible: PropTypes.bool,
};

Header.defaultProps = {
    actionsVisible: true,
};

export default Header;
