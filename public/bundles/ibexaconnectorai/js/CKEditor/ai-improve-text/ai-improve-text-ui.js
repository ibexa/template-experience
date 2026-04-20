import { Plugin, ViewModel, createDropdown, addListToDropdown, Collection, plainTextToHtml } from 'ckeditor5';

import IbexaIconView from '@fieldtype-richtext/src/bundle/Resources/public/js/CKEditor/common/icon-view/icon-view';
import { getTranslator, getRestInfo } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/context.helper';
import {
    getJsonFromResponse,
    getRequestHeaders,
    getRequestMode,
} from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/request.helper';
import { showErrorNotification } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/notification.helper';

import DropdownFilterInputView from '../common/dropdown-filter-input/dropdown-filter-input';
import DropdownFooterView from './ui/dropdown-footer-view';
import PreviewView from './ui/preview-view';

const REQUEST_HEADERS = {
    Accept: 'application/vnd.ibexa.api.ai.RefineText+json',
    'Content-Type': 'application/vnd.ibexa.api.ai.RefineText+json',
};

class IbexaAIImproveTextUI extends Plugin {
    constructor(props) {
        super(props);

        this.configName = 'refine_text';

        this.balloon = this.editor.plugins.get('ContextualBalloon');
        this.previewView = this.createPreviewView();

        this.set('mainBtnEnabled', false);

        this.replaceText = this.replaceText.bind(this);
    }

    transformToModel(refinedText) {
        const rawHtml = plainTextToHtml(refinedText);
        const content = this.editor.data.htmlProcessor.toView(rawHtml);
        const model = this.editor.data.toModel(content);

        return model;
    }

    createPreviewView() {
        const previewView = new PreviewView({ locale: this.editor.locale });

        this.listenTo(previewView, 'ibexa:replace', () => {
            const model = this.transformToModel(previewView.refinedText);

            this.replaceText(model);
            this.hidePreview();
        });

        this.listenTo(previewView, 'ibexa:insert-below', () => {
            const model = this.transformToModel(previewView.refinedText);

            this.insertText(model);
            this.hidePreview();
        });

        this.listenTo(previewView, 'ibexa:regenerate', () => {
            this.previousRefinedText = previewView.refinedText;

            this.fetchData(previewView.actionId, previewView.originalText);
        });

        this.listenTo(previewView, 'ibexa:cancel', () => {
            this.cancelGenerating();
        });

        this.listenTo(previewView, 'ibexa:hide-form', () => {
            this.hidePreview();
        });

        return previewView;
    }

    getBalloonPositionData() {
        const { view } = this.editor.editing;
        const viewDocument = view.document;
        const range = viewDocument.selection.getFirstRange();

        return { target: view.domConverter.viewRangeToDom(range) };
    }

    showPreview(id, originalText) {
        const actionConfiguration = this.actionConfigurations.find(({ identifier }) => identifier === id);

        this.previousRefinedText = '';

        this.previewView.set('actionId', id);
        this.previewView.set('actionName', actionConfiguration.name);
        this.previewView.set('originalText', originalText);
        this.balloon.add({
            view: this.previewView,
            position: this.getBalloonPositionData(),
        });
        this.balloon.updatePosition(this.getBalloonPositionData());
        this.refreshMainBtnState();
    }

    hidePreview() {
        this.balloon.remove(this.previewView);
        this.editor.editing.view.focus();
        this.refreshMainBtnState();
    }

    insertText(refinedText, insertPosition) {
        this.editor.execute('ibexaInsertRefinedText', { refinedText, insertPosition });
    }

    replaceText(refinedText) {
        this.editor.execute('ibexaReplaceWithRefinedText', { refinedText });
    }

    cancelGenerating() {
        this.abortController.abort();
        this.previewView.set('refinedText', this.previousRefinedText);
        this.editor.editing.view.focus();
    }

    fetchData(id, originalText) {
        this.abortController = new AbortController();

        const endpointURL = `/api/ibexa/v2/ai/actions/${id}/execute`;
        const { token, siteaccess, accessToken } = getRestInfo();
        const body = JSON.stringify({
            RefineText: {
                Text: {
                    text: originalText,
                },
                RuntimeContext: {
                    languageCode: this.aiConfig.languageCode,
                },
            },
        });
        const { signal } = this.abortController;

        const request = new Request(endpointURL, {
            method: 'POST',
            headers: getRequestHeaders({
                token,
                siteaccess,
                accessToken,
                extraHeaders: REQUEST_HEADERS,
            }),
            body,
            mode: getRequestMode({ instanceUrl: endpointURL }),
        });

        this.previewView.set('refinedText', null);
        this.editor.editing.view.focus();

        return fetch(request, { signal })
            .then(getJsonFromResponse)
            .then((response) => {
                const refinedText = response.RefineText.Text.text[0];

                this.previewView.set('refinedText', refinedText);
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    return;
                }

                showErrorNotification(error);
            });
    }

    shouldShowItem(itemFilterValue, searchedTerm) {
        const itemFilterValueLowerCase = itemFilterValue.toLowerCase();
        const searchedTermLowerCase = searchedTerm.toLowerCase();

        return itemFilterValueLowerCase.includes(searchedTermLowerCase);
    }

    createDropdownList(actionConfigurations, query = '') {
        const itemsList = new Collection();

        actionConfigurations.forEach((actionConfiguration) => {
            if (!this.shouldShowItem(actionConfiguration.name, query)) {
                return;
            }

            const itemList = {
                type: 'button',
                model: new ViewModel({
                    label: actionConfiguration.name,
                    id: actionConfiguration.identifier,
                    withText: true,
                }),
            };

            itemsList.add(itemList);
        });

        return itemsList;
    }

    createDropdownView(locale) {
        const Translator = getTranslator();
        const dropdownView = createDropdown(locale);
        const itemsList = this.createDropdownList(this.actionConfigurations);
        const filterInputView = new DropdownFilterInputView(locale);
        const footerView = new DropdownFooterView({ locale });

        dropdownView.extendTemplate({
            attributes: {
                class: 'ibexa-ckeditor-ai-component',
            },
        });
        dropdownView.footerView = footerView;

        dropdownView.buttonView.iconView = new IbexaIconView();

        dropdownView.buttonView.iconView.bind('content').to(dropdownView.buttonView, 'icon');
        dropdownView.buttonView.set({
            label: Translator.trans(/*@Desc("Improve text")*/ 'ck_editor.richtext.toolbar_btn', {}, 'ck_editor'),
            tooltip: true,
            icon: window.ibexa.helpers.icon.getIconPath('ai'),
        });

        dropdownView.panelView.children.add(filterInputView);
        dropdownView.panelView.extendTemplate({
            attributes: {
                class: 'ck-reset_all-excluded',
            },
        });
        dropdownView.filterInputView = filterInputView;

        addListToDropdown(dropdownView, itemsList);

        dropdownView.once(
            'change:isOpen',
            () => {
                dropdownView.panelView.children.add(footerView);
            },
            { priority: 'highest' },
        );

        return dropdownView;
    }

    getSelectedText() {
        const range = this.editor.model.document.selection.getFirstRange();
        let requestText = '';

        for (const item of range.getItems()) {
            requestText += `${item.data ?? ''} `;
        }

        return requestText;
    }

    moveFooterViewToBottom(dropdownView) {
        const footerIndex = dropdownView.panelView.children.getIndex(dropdownView.footerView);

        dropdownView.panelView.children.remove(footerIndex);
        dropdownView.panelView.children.add(dropdownView.footerView);
    }

    refreshDropdownContent(dropdownView, query) {
        const filteredItemsList = this.createDropdownList(this.actionConfigurations, query);
        const listIndex = dropdownView.panelView.children.getIndex(dropdownView.listView);

        dropdownView.panelView.children.remove(listIndex);
        addListToDropdown(dropdownView, filteredItemsList);

        if (dropdownView.isOpen) {
            this.moveFooterViewToBottom(dropdownView);
        } else {
            dropdownView.once(
                'change:isOpen',
                () => {
                    this.moveFooterViewToBottom(dropdownView);
                },
                { priority: 'highest' },
            );
        }
    }

    bindDropdownEvents(dropdownView) {
        dropdownView.on(
            'change:isOpen',
            (event, name, isOpen) => {
                if (!isOpen) {
                    dropdownView.filterInputView.clearInput();
                }
            },
            { priority: 'highest' },
        );
        dropdownView.on('execute', (eventInfo) => {
            const { id } = eventInfo.source;
            const requestText = this.getSelectedText();

            this.showPreview(id, requestText, true);
            this.fetchData(id, requestText);
        });

        dropdownView.bind('isEnabled').to(this, 'mainBtnEnabled');
    }

    bindSearchEvents(dropdownView) {
        dropdownView.filterInputView.on('input', (event) => {
            this.refreshDropdownContent(dropdownView, event.source.element.querySelector('input').value);
        });
    }

    getMainBtnState() {
        const selection = this.getSelectedText();
        const hasSelection = selection !== '';
        const isPreviewVisible = this.balloon.hasView(this.previewView);

        return hasSelection && !isPreviewVisible;
    }

    refreshMainBtnState() {
        this.set('mainBtnEnabled', this.getMainBtnState());
    }

    init() {
        const aiConfigElement = document.querySelector(`[data-ai-config-name="${this.configName}"]`);

        this.aiConfig = JSON.parse(aiConfigElement.dataset.aiConfig);
        this.actionConfigurations = this.aiConfig.actionConfigurations;

        this.editor.ui.componentFactory.add('ibexaAIImproveText', (locale) => {
            const dropdownView = this.createDropdownView(locale);

            this.bindDropdownEvents(dropdownView);
            this.bindSearchEvents(dropdownView);

            this.editor.model.document.selection.on('change:range', () => {
                this.refreshMainBtnState();
            });

            return dropdownView;
        });
    }
}

export default IbexaAIImproveTextUI;
