import {
    getJsonFromResponse,
    getRequestHeaders,
    getRequestMode,
} from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/request.helper';
import { showErrorNotification } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/notification.helper';
import { getTranslator, getRestInfo } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/context.helper';
import { parse as parseTooltips } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/tooltips.helper';
import { setInstance } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/object.instances';

/**
 * @deprecated will be deleted in version 5.0. Use BaseAIAssistantComponent instead.
 */
export default class BaseAIComponent {
    constructor(mainElement, config) {
        const Translator = getTranslator();
        const { btnSelector, optionsSelector, inputSelector, outputSelector, cancelWrapperSelector, extraConfig, savePrevValue } =
            mainElement.dataset;

        this.mainElement = mainElement;
        this.container = this.getContainer();
        this.btnElement = this.container.querySelector(btnSelector);
        this.optionsElements = this.container.querySelector(optionsSelector);
        this.inputElement = this.container.querySelector(inputSelector);
        this.outputElement = this.container.querySelector(outputSelector);
        this.cancelWrapperElement = this.container.querySelector(cancelWrapperSelector) ?? this.outputElement;
        this.config = JSON.parse(extraConfig ?? '{}');
        this.languageCode = config?.languageCode;
        this.savePrevValue = !!savePrevValue;
        this.generatingMsg =
            this.config.generatingMsg ??
            Translator.trans(/*@Desc("AI is generating...")*/ 'ibexa_connector_ai.generating_msg', {}, 'ibexa_connector_ai');
        this.endpointURL = '/api/ibexa/v2/ai/action/execute/{{ID}}';

        this.abortFetch = this.abortFetch.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleOptionClick = this.handleOptionClick.bind(this);

        setInstance(this.mainElement, this);
    }

    getContainer() {
        if (this.mainElement.dataset?.containerSelector) {
            return this.mainElement.closest(this.mainElement.dataset.containerSelector);
        }

        return window.document.body;
    }

    toggle(forceEnabled) {
        this.btnElement.disabled = !forceEnabled ?? !this.btnElement.disabled;
        this.mainElement.classList.toggle('ibexa-ai-component--disabled', !forceEnabled);
    }

    beforeFetchData() {
        this.toggle(false);
        this.injectCancelBtn();
    }

    afterFetchData() {
        this.toggle(true);
        this.removeCancelBtn();
    }

    getRequestBody() {}

    processError(error) {
        showErrorNotification(error);
    }

    getEndpointURL(requestArguments) {
        return this.endpointURL.replace('{{ID}}', requestArguments.id);
    }

    fetchData(requestArguments) {
        this.beforeFetchData(requestArguments);

        this.abortController = new AbortController();

        const endpointURL = this.getEndpointURL(requestArguments);
        const body = this.getRequestBody(requestArguments);
        const { token, siteaccess, accessToken } = getRestInfo();
        const { signal } = this.abortController;

        const request = new Request(endpointURL, {
            method: 'POST',
            headers: getRequestHeaders({
                token,
                siteaccess,
                accessToken,
                extraHeaders: this.requestHeaders,
            }),
            body,
            mode: getRequestMode({ instanceUrl: this.endpointURL }),
        });

        return fetch(request, { signal })
            .then(getJsonFromResponse)
            .then((response) => {
                this.afterFetchData(response, requestArguments);
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    return;
                }

                this.afterFetchData(null, requestArguments);
                this.processError(error);
            });
    }

    abortFetch() {
        this.abortController.abort();
        this.toggle(true);
        this.removeCancelBtn();
    }

    injectCancelBtn() {
        const cancelBtnTemplate = this.mainElement.querySelector('.ibexa-ai-component__cancel-btn-template');
        const clonedCancelBtnTemplate = cancelBtnTemplate.content.cloneNode(true);

        this.cancelWrapperElement.append(clonedCancelBtnTemplate);

        this.cancelBtn = this.cancelWrapperElement.querySelector('.ibexa-ai-component__cancel-btn');

        parseTooltips(this.cancelBtn);

        this.cancelBtn.addEventListener('click', this.abortFetch, false);
    }

    removeCancelBtn() {
        this.cancelBtn.remove();
    }

    handleOptionClick(event) {
        const { id } = event.currentTarget.dataset;

        this.fetchData({ id });
        this.optionsMenu.closeMenu();
    }

    initOptionsMenu() {
        this.optionsMenu = new window.ibexa.core.MultilevelPopupMenu({
            container: this.optionsElements,
            triggerElement: this.btnElement,
            initialBranchPlacement: 'bottom-end',
            initialBranchFallbackPlacements: ['top-end'],
            processItemOnInitAfter: (element) => {
                const btn = element.querySelector('[data-id]');

                btn.addEventListener('click', this.handleOptionClick, false);
            },
        });

        this.optionsMenu.init();
    }

    init() {
        this.initOptionsMenu();
    }
}
