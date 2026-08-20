import { setInstance } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/object.instances';
import { createDynamicRoot, removeDynamicRoot } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/react.helper';
import { getRootDOMElement } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/context.helper';

import AIAssistant from '@ibexa-connector-ai-modules/ai-assistant/ai.assistant.module';
import PopupAIActionsList from '@ibexa-connector-ai-modules/popup-ai-actions-list/popup.ai.actions.list.module';

const OFFSET_FROM_REFERENCE_ELEMENT = 8;

export default class BaseAIAssistantComponent {
    constructor(mainElement, { languageCode } = {}) {
        const { inputSelector, outputSelector, aiBtnsSelectors = '.ibexa-ai-component', aiConfig } = mainElement.dataset;

        this.mainElement = mainElement;
        this.container = this.getContainer();

        if (inputSelector) {
            this.inputElement = this.container.querySelector(inputSelector);
        }

        this.outputElement = this.container.querySelector(outputSelector);
        this.aiBtnsElements = window.document.querySelectorAll(aiBtnsSelectors);
        this.aiConfig = JSON.parse(aiConfig);
        this.languageCode = languageCode;
        this.isExpanded = false;

        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleAIDialogClose = this.handleAIDialogClose.bind(this);
        this.handleAIDialogConfirm = this.handleAIDialogConfirm.bind(this);
        this.setExpandedState = this.setExpandedState.bind(this);
        this.getExpandedState = this.getExpandedState.bind(this);

        setInstance(this.mainElement, this);
    }

    setExpandedState(isExpanded) {
        this.isExpanded = isExpanded;
    }

    getExpandedState() {
        return this.isExpanded;
    }

    getContainer() {
        if (this.mainElement.dataset?.containerSelector) {
            return this.mainElement.closest(this.mainElement.dataset.containerSelector);
        }

        return getRootDOMElement();
    }

    getInputValue() {}

    handleAIDialogClose() {
        removeDynamicRoot(this.dialogReactRoot);
        this.toggleAIBtns();
    }

    toggleAIBtns() {
        this.aiBtnsElements.forEach((aiBtn) => (aiBtn.disabled = !aiBtn.disabled));
    }

    getActions() {
        const items = [
            {
                id: 'default',
                key: 'default',
                items: this.aiConfig.actionConfigurations.map(({ name, identifier }) => ({
                    id: identifier,
                    value: identifier,
                    label: name,
                })),
            },
        ];

        return items;
    }

    aiDialogPositionOffset(reference) {
        const { width } = reference.getBoundingClientRect();

        return {
            x: width + OFFSET_FROM_REFERENCE_ELEMENT,
            y: 0,
        };
    }

    // eslint-disable-next-line no-unused-vars
    handleAIDialogConfirm(refinedText) {
        this.activeActionId = undefined;

        this.handleAIDialogClose();
    }

    // eslint-disable-next-line no-unused-vars
    getResponseValue(response) {}

    openAIDialog(item) {
        this.dialogReactRoot = createDynamicRoot({ id: 'ai-assistant-dialog' });
        this.activeActionId = item.id;

        const inputValue = this.getInputValue();

        this.toggleAIBtns();

        this.dialogReactRoot.render(
            window.React.createElement(AIAssistant, {
                referenceElement: this.mainElement,
                getRequestBody: this.getRequestBody,
                requestHeaders: this.requestHeaders,
                positionOffset: this.aiDialogPositionOffset,
                actionId: item.id,
                actionName: item.label,
                value: inputValue,
                onClose: this.handleAIDialogClose,
                onConfirm: this.handleAIDialogConfirm,
                getResponseValue: this.getResponseValue,
                OriginalField: this.originalField,
                ReplacedField: this.replacedField,
            }),
        );
    }

    handleCloseMenu() {
        removeDynamicRoot(this.menuReactRoot);
        this.setExpandedState(false);
    }

    handleOptionClick(item) {
        this.handleCloseMenu();
        this.openAIDialog(item);
    }

    menuPositionOffset(reference, direction) {
        if (direction === 'bottom') {
            const { height } = reference.getBoundingClientRect();

            return {
                x: 0,
                y: height + OFFSET_FROM_REFERENCE_ELEMENT,
            };
        }

        return {
            x: 0,
            y: -OFFSET_FROM_REFERENCE_ELEMENT,
        };
    }

    getActionsCount() {
        const items = this.getActions();

        return items.reduce((count, childItem) => count + childItem.items.length, 0);
    }

    initOptionsMenu() {
        const { scrollSelector } = this.mainElement.dataset;
        const scrollContainer = scrollSelector ? window.document.querySelector(scrollSelector) : window.document;

        this.mainElement.addEventListener(
            'click',
            () => {
                if (this.getExpandedState()) {
                    this.handleCloseMenu();
                } else {
                    const items = this.getActions();

                    this.menuReactRoot = createDynamicRoot({ id: 'ai-assistant-menu' });
                    this.menuReactRoot.render(
                        window.React.createElement(PopupAIActionsList, {
                            items,
                            onClose: this.handleCloseMenu,
                            onItemClick: this.handleOptionClick,
                            scrollContainer,
                            referenceElement: this.mainElement,
                            positionOffset: this.menuPositionOffset,
                        }),
                    );
                    this.setExpandedState(true);
                }
            },
            false,
        );
    }

    initMainElementBtn() {
        if (this.getActionsCount() === 1) {
            const items = this.getActions();

            this.mainElement.addEventListener('click', () => {
                this.openAIDialog(items[0].items[0]);
            });
        } else {
            this.initOptionsMenu();
        }
    }

    init() {
        this.initMainElementBtn();
    }
}
