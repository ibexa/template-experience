import InputTextView from '@ckeditor/ckeditor5-ui/src/inputtext/inputtextview';

import IbexaIconView from '@fieldtype-richtext/src/bundle/Resources/public/js/CKEditor/common/icon-view/icon-view';

import { getTranslator } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/context.helper';
import { getIconPath } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/icon.helper';

export default class DropdownFilterInputView extends InputTextView {
    constructor(locale) {
        super(locale);

        const Translator = getTranslator();
        const searchIconView = new IbexaIconView();
        const clearIconView = new IbexaIconView();

        searchIconView.set({
            content: getIconPath('search'),
        });
        clearIconView.set({
            content: getIconPath('discard'),
        });

        const { bindTemplate } = this;

        this.setTemplate({
            tag: 'div',
            attributes: {
                class: 'ibexa-ckeditor-campaign-filter-input',
            },
            children: [
                {
                    tag: 'input',
                    attributes: {
                        type: 'text',
                        class: [
                            'ck',
                            'ck-input',
                            'ck-input-text',
                            bindTemplate.if('isFocused', 'ck-input_focused'),
                            bindTemplate.if('isEmpty', 'ck-input-text_empty'),
                            bindTemplate.if('hasError', 'ck-error'),
                        ],
                        id: bindTemplate.to('id'),
                        placeholder: Translator.trans(/*@Desc("Search...")*/ 'dropdown.filter.placeholder', {}, 'ck_editor'),
                        readonly: bindTemplate.to('isReadOnly'),
                        'aria-invalid': bindTemplate.if('hasError', true),
                        'aria-describedby': bindTemplate.to('ariaDescribedById'),
                    },
                    on: {
                        input: bindTemplate.to('input'),
                        change: bindTemplate.to(this._updateIsEmpty.bind(this)),
                    },
                },
                {
                    tag: 'span',
                    attributes: {
                        class: ['ibexa-ckeditor-campaign-filter-input__clear-btn'],
                    },

                    children: [clearIconView],
                    on: {
                        click: bindTemplate.to(() => {
                            this.element.querySelector('input').value = '';
                            this.fire('input');
                        }),
                    },
                },
                {
                    tag: 'span',
                    attributes: {
                        class: ['ibexa-ckeditor-campaign-filter-input__icon-wrapper'],
                    },

                    children: [searchIconView],
                },
            ],
        });
    }
}
