import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import { createCssClassNames } from '../../../../../../../../../ibexa/admin-ui/src/bundle/ui-dev/src/modules/common/helpers/css.class.names';
import { getData, saveData } from '../../helpers/localStorage';
import { ResizableContext } from '../../tree.builder.module';

const CLASS_IS_TREE_RESIZING = 'ibexa-is-tree-resizing';
const CONTAINER_CONFIG_ID = 'width-container-state';
const MIN_CONTAINER_WIDTH = 200;
const FULL_WIDTH_PADDING = 5;

export const WidthContainerContext = createContext();
export const TreeFullWidthContext = createContext();
export const checkIsTreeCollapsed = (width) => width <= MIN_CONTAINER_WIDTH;

const WidthContainer = ({ children, moduleId, userId, dynamicallyLoadedChildren }) => {
    const alreadyScrolledToInitialPosition = useRef(false);
    const containerRef = useRef();
    const scrollRef = useRef();
    const { isResizable } = useContext(ResizableContext);
    const saveWidth = (value) => {
        const cookieName = `ibexa-tb-${moduleId}-container-width`;

        window.eZ.helpers.cookies.setCookie(cookieName, value);
    };
    const saveConfig = (id, value) => {
        const data = getData({ moduleId, dataId: CONTAINER_CONFIG_ID, userId }) ?? {};

        data[id] = value;

        saveData({ moduleId, dataId: CONTAINER_CONFIG_ID, userId, data });
    };

    const getConfig = (id) => {
        const data = getData({ moduleId, dataId: CONTAINER_CONFIG_ID, userId }) ?? {};

        return data[id];
    };
    const [containerData, setContainerData] = useState({ containerWidth: getConfig('width') });
    const [treeFullWidth, setTreeFullWidth] = useState(0);
    const { isResizing, containerWidth, resizedContainerWidth } = containerData;
    const width = isResizing ? resizedContainerWidth : containerWidth;
    const prevContainerWidthRef = useRef(width);
    const containerClassName = createCssClassNames({
        'c-tb-width-container': true,
        'c-tb-width-container--collapsed': checkIsTreeCollapsed(width),
    });
    const containerAttrs = { className: containerClassName, ref: containerRef };

    const clearDocumentResizingListeners = () => {
        window.document.removeEventListener('mousemove', changeContainerWidth);
        window.document.removeEventListener('mouseup', handleResizeEnd);
        window.document.body.classList.remove(CLASS_IS_TREE_RESIZING);
    };
    const handleResizeEnd = () => {
        clearDocumentResizingListeners();

        setContainerData((prevState) => {
            if (prevContainerWidthRef.current !== prevState.resizedContainerWidth) {
                setTreeFullWidth(0);
            }

            prevContainerWidthRef.current = prevState.resizedContainerWidth;

            return {
                resizeStartPositionX: 0,
                containerWidth: prevState.resizedContainerWidth,
                isResizing: false,
            };
        });
    };
    const changeContainerWidth = ({ clientX }) => {
        const currentPositionX = clientX;

        setContainerData((prevState) => ({
            ...prevState,
            resizedContainerWidth: prevState.containerWidth + (currentPositionX - prevState.resizeStartPositionX),
        }));
    };
    const addWidthChangeListener = ({ nativeEvent }) => {
        const resizeStartPositionX = nativeEvent.clientX;
        const currentContainerWidth = containerRef.current.getBoundingClientRect().width;

        window.document.addEventListener('mousemove', changeContainerWidth, false);
        window.document.addEventListener('mouseup', handleResizeEnd, false);
        window.document.body.classList.add(CLASS_IS_TREE_RESIZING);

        setContainerData({
            resizeStartPositionX,
            resizedContainerWidth: currentContainerWidth,
            containerWidth: currentContainerWidth,
            isResizing: true,
        });
    };
    const scrollToInitialPosition = () => {
        if (!alreadyScrolledToInitialPosition.current) {
            alreadyScrolledToInitialPosition.current = true;

            scrollRef.current.scrollTo(0, getConfig('scrollTop'));
        }
    };
    const saveTreeFullWidth = (widthDiff) => {
        setTreeFullWidth((prevState) => Math.max(prevState, widthDiff));
    };
    const expandTreeToFullWidth = () => {
        if (treeFullWidth > 0) {
            setContainerData((prevState) => ({
                ...prevState,
                containerWidth: prevState.containerWidth + treeFullWidth + FULL_WIDTH_PADDING,
            }));
            setTreeFullWidth(0);
        }
    };
    const scrollableWrapperClassName = createCssClassNames({
        'c-tb-width-container__scrollable-wrapper': true,
        'c-tb-width-container__scrollable-wrapper--active': isResizable,
    });

    useEffect(() => {
        saveConfig('width', containerWidth);
        saveWidth(containerWidth);

        document.body.dispatchEvent(new CustomEvent(`ibexa-width-container-resized:${moduleId}`));
    }, [containerWidth]);

    useEffect(() => {
        if (dynamicallyLoadedChildren) {
            if (scrollRef.current.childNodes[0]?.offsetHeight >= getConfig('scrollTop')) {
                scrollToInitialPosition();
            }
        }
    }, [children]);

    useEffect(() => {
        let scrollTimeout;
        const scrollListener = (event) => {
            window.clearTimeout(scrollTimeout);

            scrollTimeout = window.setTimeout(
                (scrollTop) => {
                    saveConfig('scrollTop', scrollTop);
                },
                50,
                event.currentTarget.scrollTop,
            );
        };

        if (!dynamicallyLoadedChildren) {
            scrollToInitialPosition();
        }

        scrollRef.current.addEventListener('scroll', scrollListener, false);

        return () => {
            clearDocumentResizingListeners();
            scrollRef.current.removeEventListener('scroll', scrollListener, false);
        };
    }, []);

    useEffect(() => {
        document.body.dispatchEvent(new CustomEvent(`ibexa-tb-rendered:${moduleId}`));
    }, []);

    if (width && isResizable) {
        containerAttrs.style = { width: `${width}px` };
    }

    return (
        <WidthContainerContext.Provider value={[containerData, setContainerData]}>
            <TreeFullWidthContext.Provider value={saveTreeFullWidth}>
                <div {...containerAttrs}>
                    <div
                        className={scrollableWrapperClassName}
                        ref={scrollRef}
                    >
                        {children}
                    </div>
                    {isResizable && (
                        <div
                            className="c-tb-width-container__resize-handler"
                            onMouseDown={addWidthChangeListener}
                            onDoubleClick={expandTreeToFullWidth}
                        />
                    )}
                </div>
            </TreeFullWidthContext.Provider>
        </WidthContainerContext.Provider>
    );
};

WidthContainer.propTypes = {
    children: PropTypes.node.isRequired,
    moduleId: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    isResizable: PropTypes.bool,
    dynamicallyLoadedChildren: PropTypes.bool,
};

WidthContainer.defaultProps = {
    isResizable: true,
    dynamicallyLoadedChildren: false,
};

export default WidthContainer;
