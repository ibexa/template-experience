import View from '@ckeditor/ckeditor5-ui/src/view';
import LabeledFieldView from '@ckeditor/ckeditor5-ui/src/labeledfield/labeledfieldview';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import { createLabeledDropdown } from '@ckeditor/ckeditor5-ui/src/labeledfield/utils';
import { addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import { createLabeledInputNumber } from '@fieldtype-richtext/src/bundle/Resources/public/js/CKEditor/common/input-number/utils';
import IbexaAlertView from '../alert/alert';

import { getTranslator } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/context.helper';

class IbexaMeasurementInputView extends View {
    constructor({ locale, config, name }) {
        super(locale);

        const alertDefinition = [];

        if (name === 'width') {
            const Translator = getTranslator();
            const alertTitle = Translator.trans(
                /*@Desc("If size fields are blank, the system sets default template values. Adjust them for better results.")*/ 'measurement_input.alert.title',
                {},
                'ck_editor',
            );
            const alertView = new IbexaAlertView({ locale, type: 'info', title: alertTitle });

            alertView.delegate('ibexa-ckeditor-update-balloon-position').to(this, 'ibexa-ckeditor-update-balloon-position');

            alertDefinition.push({
                tag: 'div',
                attributes: {
                    class: 'ibexa-ckeditor-measurement__alert',
                },
                children: [alertView],
            });
        }

        this.locale = locale;

        this.labeledInput = this.createInput(locale, config);
        this.labeledDropdown = this.createDropdown(locale, config);

        this.setTemplate({
            tag: 'div',
            attributes: {
                class: 'ibexa-ckeditor-measurement',
            },
            children: [
                ...alertDefinition,
                {
                    tag: 'div',
                    attributes: {
                        class: 'ibexa-ckeditor-measurement__inputs',
                    },
                    children: [this.labeledInput, this.labeledDropdown],
                },
            ],
        });
    }

    createInput(locale, config) {
        const labeledInput = new LabeledFieldView(locale, createLabeledInputNumber);

        labeledInput.label = config.label;

        labeledInput.fieldView.set({
            min: 0,
        });

        return labeledInput;
    }

    createDropdown(locale) {
        const labeledDropdown = new LabeledFieldView(locale, createLabeledDropdown);
        const itemsList = new Collection();
        const Translator = getTranslator();

        labeledDropdown.label = Translator.trans(/*@Desc("Unit")*/ 'measurement_input.unit.label', {}, 'ck_editor');

        itemsList.add({
            type: 'button',
            model: new Model({
                withText: true,
                label: 'px',
                value: 'px',
            }),
        });

        itemsList.add({
            type: 'button',
            model: new Model({
                withText: true,
                label: '%',
                value: '%',
            }),
        });

        addListToDropdown(labeledDropdown.fieldView, itemsList);

        this.listenTo(labeledDropdown.fieldView, 'execute', (event) => {
            labeledDropdown.fieldView.buttonView.set({
                label: event.source.value,
                withText: true,
            });

            labeledDropdown.fieldView.element.value = event.source.value;

            if (event.source.value) {
                labeledDropdown.set('isEmpty', false);
            }
        });

        return labeledDropdown;
    }
}

export default IbexaMeasurementInputView;
