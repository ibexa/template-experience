import ButtonLabelView from '@ckeditor/ckeditor5-ui/src/button/buttonlabelview';

import IbexaIconView from '@fieldtype-richtext/src/bundle/Resources/public/js/CKEditor/common/icon-view/icon-view';

import { getIconPath } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/icon.helper';

export default class DropdownItemLabelView extends ButtonLabelView {
    constructor(config) {
        super();

        const bind = this.bindTemplate;
        const iconView = new IbexaIconView();
        const shortDateFormat = window.ibexa.adminUiConfig.dateFormat.shortDate;
        const startDate = window.ibexa.helpers.timezone.formatShortDateTime(config.startDate, null, shortDateFormat);
        const endDate = window.ibexa.helpers.timezone.formatShortDateTime(config.endDate, null, shortDateFormat);

        iconView.set({
            content: getIconPath('date'),
        });

        this.setTemplate({
            tag: 'span',
            attributes: {
                class: ['ck', 'ck-button__label'],
                style: bind.to('style'),
                id: bind.to('id'),
            },
            children: [
                {
                    tag: 'span',
                    attributes: {
                        class: ['ibexa-ckeditor-campaign__label-text'],
                    },
                    children: [
                        {
                            text: config.title,
                        },
                    ],
                },
                {
                    tag: 'div',
                    attributes: {
                        class: ['ibexa-ckeditor-campaign__item-date-wrapper'],
                    },
                    children: [
                        {
                            tag: 'span',
                            attributes: {
                                class: ['ibexa-ckeditor-campaign__item-date-icon'],
                            },
                            children: [iconView],
                        },
                        {
                            tag: 'span',
                            attributes: {
                                class: ['ibexa-ckeditor-campaign__item-date'],
                            },
                            children: [
                                {
                                    text: `${startDate} - ${endDate}`,
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    }
}
