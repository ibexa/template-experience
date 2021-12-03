import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';

import ListItem from '../list-item/list.item';
import Placeholder from '../placeholder/placeholder';
import { DraggableContext } from '../dnd-provider/dnd.provider';
import { WidthContainerContext, checkIsTreeCollapsed } from '../width-container/width.container';
import { GetterContext } from '../../tree.builder.module';

const List = ({
    parents,
    isExpanded,
    subitems,
    depth,
    actionsType,
    actionsVisible,
    quickActionsVisible,
    isDisabled,
    lastItemRef,
    setParentIndentHeight,
    onItemClick,
}) => {
    const { getId } = useContext(GetterContext);
    const { draggedData } = useContext(DraggableContext);
    const [widthContainer] = useContext(WidthContainerContext);
    const containerWidth = widthContainer.resizedContainerWidth ?? widthContainer.containerWidth;
    const isCollapsed = checkIsTreeCollapsed(containerWidth);
    const childrenDepth = depth + 1;
    let placeholderIndex = null;

    if (!subitems || !isExpanded || isCollapsed) {
        return null;
    }

    if (draggedData.nextParent && parents && getId(draggedData.nextParent) === getId(parents[parents.length - 1])) {
        placeholderIndex = draggedData.nextIndex;
    }

    return (
        <ul className="c-tb-list">
            {placeholderIndex === 0 && <Placeholder />}
            {subitems.map((subitem, index) => (
                <Fragment key={getId(subitem) ?? `def-${index}`}>
                    <ListItem
                        parents={parents}
                        item={subitem}
                        index={index}
                        itemDepth={childrenDepth}
                        isRoot={childrenDepth === 0}
                        actionsType={actionsType}
                        actionsVisible={actionsVisible}
                        quickActionsVisible={quickActionsVisible}
                        isDisabled={isDisabled}
                        onItemClick={onItemClick}
                        lastItemParentRef={index === subitems.length - 1 ? lastItemRef : undefined}
                        setParentIndentHeight={setParentIndentHeight}
                    />
                    {placeholderIndex === index + 1 && <Placeholder />}
                </Fragment>
            ))}
        </ul>
    );
};

List.propTypes = {
    isExpanded: PropTypes.bool.isRequired,
    actionsType: PropTypes.string,
    actionsVisible: PropTypes.bool,
    depth: PropTypes.number,
    isDisabled: PropTypes.func,
    onItemClick: PropTypes.func,
    parents: PropTypes.array,
    quickActionsVisible: PropTypes.bool,
    subitems: PropTypes.array,
    lastItemRef: PropTypes.object,
    setParentIndentHeight: PropTypes.func,
};

List.defaultProps = {
    actionsType: null,
    actionsVisible: true,
    depth: 0,
    isDisabled: () => false,
    onItemClick: () => {},
    parents: [],
    quickActionsVisible: true,
    subitems: [],
    lastItemRef: {},
    setParentIndentHeight: () => {},
};

export default List;
