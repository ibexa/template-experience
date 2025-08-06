import View from '@ckeditor/ckeditor5-ui/src/view';

import IbexaIconView from '@fieldtype-richtext/src/bundle/Resources/public/js/CKEditor/common/icon-view/icon-view';
import { getRouting, getTranslator } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/context.helper';

class DropdownFooterView extends View {
    constructor(props) {
        super(props);

        this.locale = props.locale;

        const Translator = getTranslator();
        const Routing = getRouting();

        this.setTemplate({
            tag: 'div',
            attributes: {
                class: 'ibexa-ckeditor-ai-component__options-footer ck-reset_all-excluded',
            },
            children: [
                {
                    tag: 'div',
                    attributes: {
                        class: 'ibexa-ckeditor-ai-component__options-footer-title',
                    },
                    children: [Translator.trans(/*@Desc("Go to AI actions")*/ 'ck_editor.go_to_ai_actions.label', {}, 'ck_editor')],
                },
                {
                    tag: 'div',
                    attributes: {
                        class: 'ibexa-ckeditor-ai-component__options-footer-action',
                    },
                    children: [
                        {
                            tag: 'a',
                            attributes: {
                                href: Routing.generate('ibexa.connector_ai.action_configuration.list'),
                                target: '_blank',
                            },
                            children: [this.createGoToActionsIcon()],
                        },
                    ],
                },
            ],
        });
    }

    createGoToActionsIcon() {
        const iconView = new IbexaIconView();

        iconView.content = window.ibexa.helpers.icon.getIconPath('open-newtab');

        return iconView;
    }
}

export default DropdownFooterView;
