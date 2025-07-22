import { View, ButtonView, TextareaView } from 'ckeditor5';

import IbexaButtonView from '@fieldtype-richtext/src/bundle/Resources/public/js/CKEditor/common/button-view/button-view';
import { getTranslator } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/context.helper';

class PreviewView extends View {
    constructor(props) {
        super(props);

        const Translator = getTranslator();
        const bind = this.bindTemplate;

        this.locale = props.locale;

        this.set('actionName', '');
        this.set('originalText', '');
        this.set('refinedText', null);
        this.set('isGenerating', true);
        this.set('isSubmitDisabled', true);

        this.bind('isGenerating').to(this, 'refinedText', (value) => value === null);
        this.bind('isSubmitDisabled').to(this, 'refinedText', (value) => value === null || value === '');

        this.refinedTextareaView = this.createRefinedTextareaView();
        this.replaceBtn = this.createButton(
            Translator.trans(/*@Desc("Replace")*/ 'ck_editor.richtext.preview.action.replace', {}, 'ck_editor'),
            'ck-button-save',
            'ibexa:replace',
        );
        this.insertBelowBtn = this.createButton(
            Translator.trans(/*@Desc("Insert below")*/ 'ck_editor.richtext.preview.action.insert_below', {}, 'ck_editor'),
            '',
            'ibexa:insert-below',
        );
        this.regenerateBtn = this.createButton(
            Translator.trans(/*@Desc("Try again")*/ 'ck_editor.richtext.preview.action.try_again', {}, 'ck_editor'),
            '',
            'ibexa:regenerate',
        );
        this.cancelBtn = this.createButton(
            Translator.trans(/*@Desc("Stop")*/ 'ck_editor.richtext.preview.action.cancel', {}, 'ck_editor'),
            '',
            'ibexa:cancel',
        );

        this.replaceBtn.extendTemplate({
            attributes: {
                disabled: bind.to('isSubmitDisabled'),
            },
        });
        this.insertBelowBtn.extendTemplate({
            attributes: {
                disabled: bind.to('isSubmitDisabled'),
            },
        });
        this.regenerateBtn.extendTemplate({
            attributes: {
                disabled: bind.to('isGenerating'),
            },
        });
        this.cancelBtn.extendTemplate({
            attributes: {
                disabled: bind.to('isGenerating', (value) => !value),
            },
        });

        this.setTemplate({
            tag: 'div',
            attributes: {
                class: 'ck-reset_all-excluded ibexa-ckeditor-balloon-form ibexa-ckeditor-ai-component-preview',
            },
            children: [
                {
                    tag: 'form',
                    attributes: {
                        tabindex: '-1',
                    },
                    children: [
                        {
                            tag: 'div',
                            attributes: {
                                class: 'ibexa-ckeditor-balloon-form__header',
                            },
                            children: [
                                {
                                    text: bind.to('actionName', (actionName) => {
                                        return Translator.trans(
                                            /*@Desc("AI Assistant: %name%")*/ 'ck_editor.richtext.preview.header',
                                            { name: actionName },
                                            'ck_editor',
                                        );
                                    }),
                                },
                                this.createCloseBtn(),
                            ],
                        },
                        {
                            tag: 'div',
                            attributes: {
                                class: 'ibexa-ckeditor-balloon-form__fields',
                            },
                            children: [
                                {
                                    tag: 'div',
                                    attributes: {
                                        class: 'ibexa-ckeditor-ai-component-preview__input-wrapper',
                                    },
                                    children: [
                                        this.refinedTextareaView,
                                        {
                                            tag: 'div',
                                            attributes: {
                                                class: [
                                                    'ibexa-ckeditor-ai-component-preview__spinner-wrapper',
                                                    bind.if(
                                                        'isGenerating',
                                                        'ibexa-ckeditor-ai-component-preview__spinner-wrapper--visible',
                                                    ),
                                                ],
                                            },
                                            children: [
                                                {
                                                    tag: 'div',
                                                    attributes: {
                                                        class: 'ibexa-ckeditor-ai-component-preview__spinner',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            tag: 'div',
                            attributes: {
                                class: 'ibexa-ckeditor-balloon-form__actions',
                            },
                            children: [this.replaceBtn, this.insertBelowBtn, this.regenerateBtn, this.cancelBtn],
                        },
                    ],
                },
            ],
        });
    }

    createRefinedTextareaView() {
        const Translator = getTranslator();
        const textareaView = new TextareaView();
        const bind = this.bindTemplate;

        textareaView.set({
            maxRows: 10,
            minRows: 10,
        });
        textareaView.extendTemplate({
            attributes: {
                class: [
                    'ibexa-ckeditor-ai-component-preview__input',
                    bind.if('isGenerating', 'ibexa-ckeditor-ai-component-preview__input--generating'),
                ],
            },
        });
        textareaView.bind('value').to(this, 'isGenerating', (value) => {
            if (value) {
                return Translator.trans(/*@Desc("AI is generating...")*/ 'ck_editor.richtext.generating_msg', {}, 'ck_editor');
            }

            return this.refinedText;
        });
        textareaView.bind('isReadOnly').to(this, 'isGenerating');
        textareaView.on('input', (event) => {
            this.set('refinedText', event.source.element.value);
        });

        return textareaView;
    }

    createButton(label, className, eventName) {
        const button = new ButtonView(this.locale);

        button.set({
            label,
            withText: true,
        });
        button.extendTemplate({
            attributes: {
                class: className,
            },
        });

        if (eventName) {
            button.delegate('execute').to(this, eventName);
        }

        return button;
    }

    createCloseBtn() {
        const buttonView = new IbexaButtonView(this.locale);

        buttonView.set({
            class: 'ibexa-ckeditor-balloon-form__close-btn',
            icon: window.ibexa.helpers.icon.getIconPath('discard'),
        });

        buttonView.delegate('execute').to(this, 'ibexa:hide-form');

        return buttonView;
    }
}

export default PreviewView;
