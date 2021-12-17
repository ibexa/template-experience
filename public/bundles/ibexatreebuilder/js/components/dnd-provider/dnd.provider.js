import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { DraggableDisabledContext, GetterContext } from '../../tree.builder.module';
import { IntermediateActionContext } from '../intermediate-action-provider/intermediate.action.provider';
import { isItemDisabled } from '../../helpers/item';

export const DraggableContext = createContext();
export const DRAG_ID = 'DRAG';

const DndProvider = ({ children, moveElement }) => {
    const dragDisabled = useContext(DraggableDisabledContext);
    const { setIntermediateAction } = useContext(IntermediateActionContext);
    const { getId } = useContext(GetterContext);
    const [draggedData, setDraggedData] = useState({});
    const getInsertIndexAndParent = ({ event, index, isExpanded, parent, item }) => {
        const { currentTarget, clientY } = event;
        const { top, height } = currentTarget.getBoundingClientRect();
        const relativeMousePosition = clientY - top;
        const shouldInsertAfter = relativeMousePosition > height / 2;
        let insertIndex = index;
        let insertParent = parent;

        if (shouldInsertAfter && isExpanded) {
            insertIndex = 0;
            insertParent = item;
        } else if (shouldInsertAfter) {
            insertIndex = index + 1;
        }

        return { nextIndex: insertIndex, nextParent: insertParent };
    };
    const startDragging = (event, { item, parent, index, target }) => {
        if (dragDisabled) {
            return;
        }

        const selectedData = new Set([item.locationId]);

        event.dataTransfer.setData('text/html', target);
        setDraggedData((prevState) => ({
            ...prevState,
            item,
            prevParent: parent,
            prevIndex: index,
        }));
        setIntermediateAction({
            isActive: true,
            id: DRAG_ID,
            isItemDisabled: (itemToDisable, extras) => isItemDisabled(itemToDisable, { ...extras, selectedData, getId }),
            listItems: selectedData,
        });
    };
    const isDirectSibling = (nextIndex) => {
        return nextIndex >= draggedData.prevIndex && nextIndex <= draggedData.prevIndex + 1;
    };
    const dragging = (event, { item, parent, index, isExpanded, isItemDisabled: isDraggedItemDisabled }) => {
        if (dragDisabled) {
            return;
        }

        if (isDraggedItemDisabled) {
            setDraggedData((prevState) => ({
                item: prevState.item,
                prevParent: prevState.prevParent,
                prevIndex: prevState.prevIndex,
            }));

            return;
        }

        const { nextIndex, nextParent } = getInsertIndexAndParent({ event, index, item, parent, isExpanded });
        const isSameAsPrev =
            draggedData.nextParent && getId(nextParent) === getId(draggedData.nextParent) && nextIndex === draggedData.nextIndex;
        const isSameAsDraggingNodePosition =
            nextParent && getId(nextParent) === getId(draggedData.prevParent) && isDirectSibling(nextIndex);

        if (isSameAsDraggingNodePosition) {
            setDraggedData((prevState) => ({
                item: prevState.item,
                prevParent: prevState.prevParent,
                prevIndex: prevState.prevIndex,
            }));

            return;
        }

        if (isSameAsPrev) {
            return;
        }

        setDraggedData((prevState) => ({
            ...prevState,
            nextParent,
            nextIndex,
        }));
    };

    const stopDragging = (event) => {
        if (dragDisabled) {
            return;
        }

        event.preventDefault();

        if (!draggedData.nextParent || draggedData.nextIndex === undefined) {
            setIntermediateAction({
                isActive: false,
            });
            setDraggedData({});

            return;
        }

        moveElement({ item: draggedData.item, parent: draggedData.nextParent, insertIndex: draggedData.nextIndex }).then(() => {
            setIntermediateAction({
                isActive: false,
            });
            setDraggedData({});
        });
    };

    return <DraggableContext.Provider value={{ draggedData, startDragging, dragging, stopDragging }}>{children}</DraggableContext.Provider>;
};

DndProvider.propTypes = {
    children: PropTypes.node.isRequired,
    moveElement: PropTypes.func,
};

DndProvider.defaultProps = {
    moveElement: () => Promise.resolve(),
};

export default DndProvider;
