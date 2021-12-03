import React, { createContext, useRef } from 'react';
import PropTypes from 'prop-types';

import PortalProvider from './components/portal-provider/portal.provider';
import WidthContainer from './components/width-container/width.container';
import LocalStorageExpandConnector from './components/local-storage-expand-connector/local.storage.expand.connector';
import SelectedProvider from './components/selected-provider/selected.provider';
import DndProvider from './components/dnd-provider/dnd.provider';
import IntermediateActionProvider from './components/intermediate-action-provider/intermediate.action.provider';
import Header from './components/header/header';
import List from './components/list/list';
import { PORTAL_CONTEXTUAL_MENU_ID } from './components/contextual-menu/contextual.menu';
import { PORTAL_ADD_ITEM_ID } from './components/list-item/list.item';

export const GetterContext = createContext();
export const CallbackContext = createContext();
export const ResizableContext = createContext();
export const ActiveContext = createContext();
export const CustomItemClassContext = createContext();
export const DraggableDisabledContext = createContext();
export const LoadMoreSubitemsContext = createContext();
export const SubitemsLimitContext = createContext();
export const SelectedLimitContext = createContext();
export const TreeDepthLimitContext = createContext();
export const UserIdContext = createContext();
export const ModuleIdContext = createContext();
export const TreeContext = createContext();

export const ACTION_TYPE = {
    LIST_MENU: 'LIST_MENU',
    CONTEXTUAL_MENU: 'CONTEXTUAL_MENU',
};

const TreeBuilderModule = ({
    actionsType,
    actionsVisible,
    callbackAddElement,
    callbackCopyElements,
    callbackDeleteElements,
    callbackMoveElements,
    callbackToggleExpanded,
    children,
    customItemClass,
    dragDisabled,
    extendItem,
    getHref,
    getId,
    getLabel,
    getMenuActions,
    getSubitems,
    getTotal,
    getHidden,
    headerVisible,
    initiallyExpandedNodes,
    isActive,
    isDisabled,
    isResizable,
    loadMoreSubitems,
    moduleId,
    moduleName,
    moveElement,
    onItemClick,
    quickActionsVisible,
    selectedLimit,
    subitemsLimit,
    tree,
    treeDepthLimit,
    userId,
}) => {
    const treeRef = useRef();
    const getterContextData = {
        extendItem,
        getHref,
        getId,
        getLabel,
        getMenuActions,
        getSubitems,
        getTotal,
        getHidden,
    };
    const callbackContextData = {
        callbackAddElement,
        callbackCopyElements,
        callbackDeleteElements,
        callbackMoveElements,
        callbackToggleExpanded,
    };

    return (
        <ResizableContext.Provider value={{ isResizable, treeRef }}>
            <WidthContainer
                moduleId={moduleId}
                userId={userId}
                dynamicallyLoadedChildren={true}
            >
                <ModuleIdContext.Provider value={moduleId}>
                    <UserIdContext.Provider value={userId}>
                        <IntermediateActionProvider>
                            <ActiveContext.Provider value={isActive}>
                                <CustomItemClassContext.Provider value={customItemClass}>
                                    <DraggableDisabledContext.Provider value={dragDisabled}>
                                        <LoadMoreSubitemsContext.Provider value={loadMoreSubitems}>
                                            <SubitemsLimitContext.Provider value={subitemsLimit}>
                                                <SelectedLimitContext.Provider value={selectedLimit}>
                                                    <TreeDepthLimitContext.Provider value={treeDepthLimit}>
                                                        <GetterContext.Provider value={getterContextData}>
                                                            <CallbackContext.Provider value={callbackContextData}>
                                                                <DndProvider moveElement={moveElement}>
                                                                    <TreeContext.Provider value={tree}>
                                                                        <LocalStorageExpandConnector initialValue={initiallyExpandedNodes}>
                                                                            <SelectedProvider>
                                                                                <PortalProvider
                                                                                    portals={[
                                                                                        PORTAL_CONTEXTUAL_MENU_ID,
                                                                                        PORTAL_ADD_ITEM_ID,
                                                                                    ]}
                                                                                >
                                                                                    <div
                                                                                        className="c-tb-tree"
                                                                                        ref={treeRef}
                                                                                    >
                                                                                        {headerVisible && (
                                                                                            <Header
                                                                                                name={moduleName}
                                                                                                actionsVisible={actionsVisible}
                                                                                            />
                                                                                        )}
                                                                                        <List
                                                                                            isExpanded={true}
                                                                                            subitems={tree ? [tree] : []}
                                                                                            depth={-1}
                                                                                            actionsType={actionsType}
                                                                                            actionsVisible={actionsVisible}
                                                                                            quickActionsVisible={quickActionsVisible}
                                                                                            isDisabled={isDisabled}
                                                                                            onItemClick={onItemClick}
                                                                                        />
                                                                                        {children}
                                                                                    </div>
                                                                                </PortalProvider>
                                                                            </SelectedProvider>
                                                                        </LocalStorageExpandConnector>
                                                                    </TreeContext.Provider>
                                                                </DndProvider>
                                                            </CallbackContext.Provider>
                                                        </GetterContext.Provider>
                                                    </TreeDepthLimitContext.Provider>
                                                </SelectedLimitContext.Provider>
                                            </SubitemsLimitContext.Provider>
                                        </LoadMoreSubitemsContext.Provider>
                                    </DraggableDisabledContext.Provider>
                                </CustomItemClassContext.Provider>
                            </ActiveContext.Provider>
                        </IntermediateActionProvider>
                    </UserIdContext.Provider>
                </ModuleIdContext.Provider>
            </WidthContainer>
        </ResizableContext.Provider>
    );
};

TreeBuilderModule.propTypes = {
    getId: PropTypes.func.isRequired,
    getLabel: PropTypes.func.isRequired,
    getSubitems: PropTypes.func.isRequired,
    getTotal: PropTypes.func.isRequired,
    isActive: PropTypes.func.isRequired,
    loadMoreSubitems: PropTypes.func.isRequired,
    moduleId: PropTypes.string.isRequired,
    moduleName: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    callbackAddElement: PropTypes.func,
    callbackCopyElements: PropTypes.func,
    callbackDeleteElements: PropTypes.func,
    callbackMoveElements: PropTypes.func,
    callbackToggleExpanded: PropTypes.func,
    actionsType: PropTypes.string,
    actionsVisible: PropTypes.bool,
    children: PropTypes.node,
    customItemClass: PropTypes.func,
    dragDisabled: PropTypes.bool,
    extendItem: PropTypes.func,
    getHidden: PropTypes.func,
    getHref: PropTypes.func,
    getMenuActions: PropTypes.func,
    headerVisible: PropTypes.bool,
    initiallyExpandedNodes: PropTypes.array,
    isDisabled: PropTypes.func,
    isResizable: PropTypes.bool,
    moveElement: PropTypes.func,
    onItemClick: PropTypes.func,
    quickActionsVisible: PropTypes.bool,
    selectedLimit: PropTypes.number,
    subitemsLimit: PropTypes.number,
    treeDepthLimit: PropTypes.number,
    tree: PropTypes.object,
};

TreeBuilderModule.defaultProps = {
    actionsType: null,
    actionsVisible: true,
    children: null,
    callbackAddElement: () => {},
    callbackCopyElements: () => Promise.resolve(),
    callbackDeleteElements: () => Promise.resolve(),
    callbackMoveElements: () => Promise.resolve(),
    callbackToggleExpanded: null,
    customItemClass: () => '',
    dragDisabled: false,
    extendItem: (item) => item,
    getHidden: () => {},
    getHref: () => null,
    getMenuActions: (actions) => actions,
    headerVisible: true,
    initiallyExpandedNodes: [],
    isDisabled: () => false,
    isResizable: true,
    moveElement: () => Promise.resolve(),
    onItemClick: () => {},
    quickActionsVisible: true,
    selectedLimit: null,
    subitemsLimit: null,
    treeDepthLimit: null,
    tree: null,
};

window.eZ.addConfig('modules.TreeBuilder', TreeBuilderModule);
