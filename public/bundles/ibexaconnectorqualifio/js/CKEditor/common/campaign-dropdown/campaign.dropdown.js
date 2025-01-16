import View from '@ckeditor/ckeditor5-ui/src/view';
import LabeledFieldView from '@ckeditor/ckeditor5-ui/src/labeledfield/labeledfieldview';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import { createLabeledDropdown } from '@ckeditor/ckeditor5-ui/src/labeledfield/utils';
import { addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import DropdownItemLabelView from './dropdown.item.label';
import DropdownFilterInputView from './dropdown.filter.input';
import IbexaAlertView from '../alert/alert';

const MIN_SEARCH_ITEMS = 5;

class CampaignDropdownView extends View {
    constructor({ locale, config }) {
        super(locale);

        this.locale = locale;
        this.filterInputView = null;
        this.campaignList = config.campaignList ?? {};
        this.labeledDropdown = this.createDropdown(locale, config);
        this.alertView = new IbexaAlertView({ locale, type: 'warning', hidden: true });

        this.setTemplate({
            tag: 'div',
            attributes: {
                class: 'ibexa-ckeditor-campaign',
            },
            children: [this.alertView, this.labeledDropdown],
        });
    }

    showWarning(message) {
        this.alertView.set({ title: message, hidden: false });
    }

    updateCampaignList(campaignList) {
        this.campaignList = campaignList;

        this.populateDropdown(this.labeledDropdown);
    }

    populateDropdown(labeledDropdown) {
        const itemsList = this.createDropdownList(this.campaignList);
        const shouldAddFilterInput = Object.values(this.campaignList).reduce((total, list) => total + list.length, 0) > MIN_SEARCH_ITEMS;

        if (shouldAddFilterInput && !this.filterInputView) {
            this.filterInputView = new DropdownFilterInputView(this.locale);

            labeledDropdown.fieldView.panelView.children.add(this.filterInputView);

            this.filterInputView.on('input', (event) => {
                const filteredItemsList = this.createDropdownList(this.campaignList, event.source.element.querySelector('input').value);
                const listIndex = labeledDropdown.fieldView.panelView.children.getIndex(labeledDropdown.fieldView.listView);

                labeledDropdown.fieldView.panelView.children.remove(listIndex);
                addListToDropdown(labeledDropdown.fieldView, filteredItemsList);
            });
        }

        addListToDropdown(labeledDropdown.fieldView, itemsList);
    }

    createDropdownList(campaignList, query = '') {
        const itemsList = new Collection();

        Object.entries(campaignList).forEach(([groupName, groupItems]) => {
            const shouldAddGroup = groupItems.some((groupItem) => groupItem.title.includes(query));

            if (!shouldAddGroup) {
                return;
            }

            const groupList = new Collection();

            groupItems.forEach((groupItem) => {
                const shouldAddItem = groupItem.title.includes(query);

                if (!shouldAddItem) {
                    return;
                }

                groupList.add({
                    type: 'button',
                    model: new Model({
                        withText: true,
                        label: groupItem.title,
                        value: groupItem.id,
                        labelView: new DropdownItemLabelView(groupItem),
                    }),
                });
            });

            itemsList.add({
                type: 'group',
                label: groupName,
                items: groupList,
            });
        });

        return itemsList;
    }

    createDropdown(locale, config) {
        const labeledDropdown = new LabeledFieldView(locale, createLabeledDropdown);

        labeledDropdown.label = config.label;

        this.listenTo(labeledDropdown.fieldView, 'execute', (event) => {
            labeledDropdown.fieldView.buttonView.set({
                label: event.source.label,
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

export default CampaignDropdownView;
