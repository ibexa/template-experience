import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';

import { createCssClassNames } from '../../../../../../../../../ibexa/admin-ui/src/bundle/ui-dev/src/modules/common/helpers/css.class.names';
import Icon from '../../../../../../../../../ibexa/admin-ui/src/bundle/ui-dev/src/modules/common/icon/icon';

import List from '../list/list';
import Expander from '../expander/expander';
import LoadMore from '../load-more/load.more';
import Limit from '../limit/limit';
import ContextualMenu from '../contextual-menu/contextual.menu';
import ListMenu from '../list-menu/list.menu';

import { ExpandContext } from '../local-storage-expand-connector/local.storage.expand.connector';
import { SelectedContext } from '../selected-provider/selected.provider';
import { DraggableContext } from '../dnd-provider/dnd.provider';
import { WidthContainerContext, TreeFullWidthContext } from '../width-container/width.container';
import { IntermediateActionContext } from '../intermediate-action-provider/intermediate.action.provider';
import { STORED_ITEMS_TOGGLE, STORED_ITEMS_ADD, STORED_ITEMS_REMOVE, STORED_ITEMS_SET } from '../../hooks/useStoredItemsReducer';
import useDidUpdateEffect from '../../hooks/useDidUpdateEffect';
import usePortal from '../../hooks/usePortal';
import { isItemStored } from '../../helpers/item';
import {
    ActiveContext,
    CustomItemClassContext,
    DraggableDisabledContext,
    LoadMoreSubitemsContext,
    GetterContext,
    CallbackContext,
    SelectedLimitContext,
    TreeDepthLimitContext,
    InitiallySelectedItemsIdsContext,
    ACTION_TYPE,
} from '../../tree.builder.module';

export const PORTAL_ADD_ITEM_ID = 'add-item';
const { Translator } = window;

const isSelectedLimitReached = (selectedLimit, selectedData) => {
    if (selectedLimit === null || selectedLimit === 1) {
        return false;
    }

    return selectedData.size >= selectedLimit;
};

const ListItem = (props) => {
    const {
        item: basicItem,
        itemDepth,
        index,
        isRoot,
        parents,
        actionsType,
        actionsVisible,
        quickActionsVisible,
        isDisabled,
        onItemClick,
        lastItemParentRef,
        setParentIndentHeight,
    } = props;
    const isActive = useContext(ActiveContext);
    const customItemClass = useContext(CustomItemClassContext);
    const { startDragging, dragging, stopDragging } = useContext(DraggableContext);
    const dragDisabled = useContext(DraggableDisabledContext);
    const loadMoreSubitems = useContext(LoadMoreSubitemsContext);
    const { getId, getSubitems, getLabel, getTotal, getHidden, getHref, extendItem } = useContext(GetterContext);
    const { callbackToggleExpanded, callbackAddElement } = useContext(CallbackContext);
    const selectedLimit = useContext(SelectedLimitContext);
    const treeDepthLimit = useContext(TreeDepthLimitContext);
    const { expandedData, dispatchExpandedData, initiallyExpandedItemsIds } = useContext(ExpandContext);
    const { selectedData, dispatchSelectedData } = useContext(SelectedContext);
    const [widthContainerData] = useContext(WidthContainerContext);
    const saveTreeFullWidth = useContext(TreeFullWidthContext);
    const { intermediateAction } = useContext(IntermediateActionContext);
    const initiallySelectedItemsIds = useContext(InitiallySelectedItemsIdsContext);
    const { renderPortal } = usePortal(PORTAL_ADD_ITEM_ID);
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [indentHeight, setIndentHeight] = useState(0);
    const wrapperRef = useRef(null);
    const lastItemRef = useRef(null);
    const labelRef = useRef(null);
    const quickAddRef = useRef(null);
    const labelTruncatedRef = useCallback((node) => {
        if (node) {
            if (node.scrollWidth <= node.offsetWidth) {
                if (node.title) {
                    node.dataset.originalTitle = node.title;
                    node.title = '';
                } else if (node.dataset.bsOriginalTitle) {
                    node.dataset.originalTitle = node.dataset.bsOriginalTitle;
                    node.dataset.bsOriginalTitle = '';
                }
            } else {
                if (node.dataset.originalTitle) {
                    node.title = node.dataset.originalTitle;
                }
                saveTreeFullWidth(node.scrollWidth - node.offsetWidth);
            }

            window.eZ.helpers.tooltips.parse(node);
        }
    }, [widthContainerData.containerWidth]);
    const item = extendItem(basicItem, props);
    const isExpanded = isItemStored(item, expandedData, { getId });
    const isSelected = isItemStored(item, selectedData, { getId });
    const subitems = getSubitems(item);
    const total = getTotal(item);
    const areActionsDisabled = intermediateAction.isActive;
    const isCheckboxDisabled = !isSelected && (areActionsDisabled || isSelectedLimitReached(selectedLimit, selectedData));
    const isItemDisabled = intermediateAction.isItemDisabled?.(item, { parents }) || isDisabled(item, { intermediateAction });
    const parent = parents[parents.length - 1];
    const inputType = selectedLimit === 1 ? 'radio' : 'checkbox';
    const itemAttrs = {};
    const setIndentHeightWrapper = () => {
        setParentIndentHeight();

        if (lastItemRef.current) {
            setIndentHeight(lastItemRef.current.offsetTop);
        }
    };
    const getCheckboxTooltip = () => {
        if (!isSelectedLimitReached(selectedLimit, selectedData)) {
            return null;
        }

        return Translator.trans(
            /*@Desc("You cannot select more than %selectedLimit% items.")*/ 'checkbox.limit.message',
            { selectedLimit },
            'tree_builder_ui',
        );
    };
    const loadMore = () => {
        setIsLoading(true);

        return loadMoreSubitems(item).then((response) => {
            setIsLoading(false);

            return response;
        });
    };
    const afterToggleExpanded = (nextIsExpanded) => {
        if (callbackToggleExpanded) {
            callbackToggleExpanded(item, { isExpanded: nextIsExpanded, loadMore });
        } else {
            loadMore();
        }
    };
    const toggleExpanded = () => {
        if (treeDepthLimit !== null && itemDepth >= treeDepthLimit) {
            const notificationMessage = Translator.trans(
                /*@Desc("Cannot load sub-items for this Location because you reached max tree depth.")*/ 'expand_item.limit.message',
                {},
                'tree_builder_ui',
            );

            window.eZ.helpers.notification.showWarningNotification(notificationMessage);

            return;
        }

        dispatchExpandedData({ items: [item], type: STORED_ITEMS_TOGGLE });
    };
    const toggleCheckbox = () => {
        const actionType = selectedLimit === 1 ? STORED_ITEMS_SET : STORED_ITEMS_TOGGLE;

        dispatchSelectedData({ items: [item], type: actionType });
    };
    const startDraggingItem = (event) => {
        dispatchExpandedData({ items: [item], type: STORED_ITEMS_REMOVE });
        startDragging(event, { item, parent, index, target: wrapperRef.current });
    };
    const stopDraggingItem = (event) => stopDragging(event);
    const onDraggingItem = (event) => dragging(event, { item, parent, index, isExpanded, isItemDisabled });
    const onLabelClick = (event) => {
        if (isItemDisabled) {
            event.preventDefault();

            return;
        }

        if (intermediateAction.isActive) {
            event.preventDefault();

            intermediateAction.callback(item);

            return;
        }

        onItemClick(item);
    };
    const renderActions = () => {
        switch (actionsType) {
            case ACTION_TYPE.LIST_MENU:
                return (
                    <ListMenu
                        item={item}
                        isDisabled={areActionsDisabled}
                    />
                );
            case ACTION_TYPE.CONTEXTUAL_MENU:
                return (
                    <ContextualMenu
                        item={item}
                        isDisabled={areActionsDisabled}
                    />
                );
            default:
                return null;
        }
    };
    const renderLabel = () => {
        const labelClassName = 'c-tb-list-item__label';
        const href = getHref(item);
        const labelProps = {
            class: labelClassName,
            draggable: dragDisabled ? 'false' : 'true',
            onDragStart: startDraggingItem,
            onDragEnd: stopDraggingItem,
            onDragOver: onDraggingItem,
            onClick: onLabelClick,
        };

        if (!href) {
            return <div {...labelProps}>{getLabel(item, { isLoading })}</div>;
        }

        return (
            <a
                {...labelProps}
                href={href}
            >
                {getLabel(item, { isLoading, labelTruncatedRef })}
            </a>
        );
    };
    const getQuickAddPosition = () => {
        const { y, right } = wrapperRef.current.getBoundingClientRect();

        return { x: right, y: y + window.document.documentElement.scrollTop };
    };
    const hoverOut = (event) => {
        const { relatedTarget } = event;

        if (relatedTarget !== window && (relatedTarget.isSameNode(quickAddRef.current) || relatedTarget.isSameNode(labelRef.current))) {
            return;
        }

        setIsHovered(false);
    };
    const renderQuickAdd = () => {
        return (
            <div
                className="c-tb-quick-add"
                ref={quickAddRef}
                onMouseLeave={hoverOut}
                onClick={() => callbackAddElement(item)}
            >
                <Icon
                    name="circle-create"
                    extraClasses="ibexa-icon--medium ibexa-icon--primary"
                />
            </div>
        );
    };
    const isEqualItem = (itemToCompare) => getId(itemToCompare) === getId(item);

    useDidUpdateEffect(() => {
        afterToggleExpanded(isExpanded);
    }, [isExpanded]);

    useEffect(() => {
        if (subitems?.length === 0 && isExpanded) {
            dispatchExpandedData({ items: [item], type: STORED_ITEMS_REMOVE });
        }
    }, []);

    useEffect(() => {
        if (initiallySelectedItemsIds.includes(getId(item))) {
            dispatchSelectedData({ items: [item], type: STORED_ITEMS_ADD });
        }
    }, [initiallySelectedItemsIds]);

    useEffect(() => {
        if (initiallyExpandedItemsIds.includes(getId(item))) {
            dispatchExpandedData({ items: [item], type: STORED_ITEMS_ADD });
        }
    }, [initiallyExpandedItemsIds]);

    useEffect(() => {
        lastItemParentRef.current = wrapperRef.current;

        setIndentHeightWrapper();
    });

    if (!item) {
        return null;
    }

    const dragIconClass = createCssClassNames({
        'c-tb-list-item__drag-icon': true,
        'c-tb-list-item__drag-icon--hidden': dragDisabled,
    });

    const indentationClass = createCssClassNames({
        'c-tb-list-item__indentation-line': true,
        'c-tb-list-item__indentation-line--vertical': true,
        'c-tb-list-item__indentation-line--hidden': isRoot,
        'c-tb-list-item__indentation-line--no-sub-items': total === 0,
    });

    itemAttrs.class = createCssClassNames({
        'c-tb-list-item': true,
        'c-tb-list-item--has-sub-items': total,
        'c-tb-list-item--hovered': isHovered,
        'c-tb-list-item--disabled': isItemDisabled,
        'c-tb-list-item--expanded': isExpanded,
        'c-tb-list-item--active': isActive(item),
        'c-tb-list-item--hidden': getHidden(item),
        'c-tb-list-item--source':
            intermediateAction.isActive && !intermediateAction.highlightDestination && intermediateAction.listItems.some(isEqualItem),
        'c-tb-list-item--destination':
            intermediateAction.isActive && intermediateAction.highlightDestination && intermediateAction.listItems.some(isEqualItem),
    });

    const customClassName = customItemClass(item);

    if (customClassName) {
        itemAttrs.class += ` ${customClassName}`;
    }

    return (
        <li
            {...itemAttrs}
            ref={wrapperRef}
        >
            {isExpanded && (
                <div
                    className="c-tb-list-item__indentation-line c-tb-list-item__indentation-line--horizontal"
                    style={{ '--indent': itemDepth, height: `${indentHeight}px` }}
                />
            )}
            <div
                className="c-tb-list-item__row"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={hoverOut}
                ref={labelRef}
            >
                <Icon
                    name="drag"
                    extraClasses={dragIconClass}
                />
                <input
                    type={inputType}
                    id={`ibexa-tb-row-selected-${getId(item)}`}
                    className={`ibexa-input ibexa-input--${inputType}`}
                    onChange={toggleCheckbox}
                    checked={isSelected}
                    disabled={isCheckboxDisabled}
                    title={getCheckboxTooltip()}
                />
                <div
                    className="c-tb-list-item__indentation"
                    style={{ '--indent': itemDepth }}
                >
                    <div
                        className={indentationClass}
                        style={{ '--indent': itemDepth }}
                    />
                </div>
                <Expander
                    isExpanded={isExpanded}
                    onClick={toggleExpanded}
                    totalSubitemsCount={total}
                />
                {renderLabel()}
                {actionsVisible && <div className="c-tb-list-item__actions">{renderActions()}</div>}
                {quickActionsVisible && isHovered && !areActionsDisabled && renderPortal(renderQuickAdd(), getQuickAddPosition)}
            </div>
            <List
                parents={[...parents, item]}
                isExpanded={isExpanded}
                subitems={subitems}
                depth={itemDepth}
                actionsType={actionsType}
                actionsVisible={actionsVisible}
                quickActionsVisible={quickActionsVisible}
                isDisabled={isDisabled}
                onItemClick={onItemClick}
                lastItemRef={lastItemRef}
                setParentIndentHeight={setIndentHeightWrapper}
            />
            <LoadMore
                isExpanded={isExpanded}
                isLoading={isLoading}
                loadMore={loadMore}
                subitems={subitems}
                totalSubitemsCount={total}
            />
            <Limit
                isExpanded={isExpanded}
                subitems={subitems}
            />
        </li>
    );
};

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    actionsType: PropTypes.string,
    actionsVisible: PropTypes.bool,
    isDisabled: PropTypes.func,
    isRoot: PropTypes.bool,
    itemDepth: PropTypes.number,
    onItemClick: PropTypes.func,
    parents: PropTypes.array,
    quickActionsVisible: PropTypes.bool,
    setParentIndentHeight: PropTypes.func,
    lastItemParentRef: PropTypes.object,
};

ListItem.defaultProps = {
    actionsType: null,
    actionsVisible: true,
    isDisabled: () => false,
    isRoot: false,
    itemDepth: 0,
    onItemClick: () => {},
    parents: [],
    quickActionsVisible: true,
    setParentIndentHeight: () => {},
    lastItemParentRef: {},
};

export default ListItem;
