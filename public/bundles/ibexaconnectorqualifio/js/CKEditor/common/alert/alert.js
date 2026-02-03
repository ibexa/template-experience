import View from '@ckeditor/ckeditor5-ui/src/view';

import IbexaIconView from '@fieldtype-richtext/src/bundle/Resources/public/js/CKEditor/common/icon-view/icon-view';
import IbexaButtonView from '@fieldtype-richtext/src/bundle/Resources/public/js/CKEditor/common/button-view/button-view';

import { getIconPath } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/icon.helper';

const ICON_NAME_MAP = {
    info: 'about',
    warning: 'warning',
};

class IbexaAlertView extends View {
    constructor({ locale, type, title, hidden = false }) {
        super(locale);

        const bind = this.bindTemplate;

        this.locale = locale;
        this.set('title', title);
        this.set('hidden', hidden);

        const iconView = new IbexaIconView();
        const closeButtonView = new IbexaButtonView(locale);

        iconView.set({
            content: getIconPath(ICON_NAME_MAP[type]),
        });

        closeButtonView.set({
            icon: getIconPath('discard'),
            class: 'ibexa-ckeditor-alert__close-btn',
        });

        this.listenTo(closeButtonView, 'execute', () => {
            this.element.remove();
            this.fire('ibexa-ckeditor-update-balloon-position');
        });

        this.setTemplate({
            tag: 'div',
            attributes: {
                class: [`ibexa-ckeditor-alert ibexa-ckeditor-alert--${type}`, bind.if('hidden', 'ibexa-ckeditor-alert--hidden')],
            },
            children: [
                {
                    tag: 'div',
                    attributes: {
                        class: 'ibexa-ckeditor-alert__icon-wrapper',
                    },
                    children: [iconView],
                },
                {
                    tag: 'div',
                    attributes: {
                        class: 'ibexa-ckeditor-alert__content',
                    },
                    children: [
                        {
                            tag: 'div',
                            attributes: {
                                class: 'ibexa-ckeditor-alert__title',
                            },
                            children: [{ text: bind.to('title') }],
                        },
                    ],
                },
                closeButtonView,
            ],
        });
    }
}

export default IbexaAlertView;
