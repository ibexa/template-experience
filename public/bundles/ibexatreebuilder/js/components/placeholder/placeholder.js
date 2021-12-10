import React, { useContext } from 'react';

import { DraggableContext } from '../dnd-provider/dnd.provider';

const Placeholder = () => {
    const { stopDragging } = useContext(DraggableContext);

    return (
        <li
            className="c-tb-list-item c-tb-list-placeholder"
            onDragEnd={(event) => stopDragging(event)}
        >
            <div className="c-tb-list-placeholder__checkbox">&nbsp;</div>
            <div className="c-tb-list-item__label">
                <div className="c-tb-list-placeholder__content">&nbsp;</div>
            </div>
        </li>
    );
};

export default Placeholder;
