import SelectIbexaTag from '../../../ui-dev/src/modules/select-ibexa-tag/select.ibexa.tag.module';

(function(global, doc, React, ReactDOM, ibexa) {
    const modal = doc.querySelector('#move-taxonomy-entry-modal');

    if (!modal) {
        return;
    }

    const MODULE_ID = 'ibexa-move-taxonomy-entry';
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const userId = ibexa.helpers.user.getId();
    const treeMountElement = modal.querySelector('#move-taxonomy-entry-modal-tree');
    const formNode = doc.querySelector('form[name="taxonomy_entry_move"]');
    const confirmBtn = modal.querySelector('.ibexa-btn--confirm');
    const updateSelected = (event) => {
        const [selectedEntry] = event.detail.items;

        confirmBtn.removeAttribute('disabled');
        formNode.querySelector('#taxonomy_entry_move_new_parent').value = selectedEntry.id;
    };
    const submitForm = () => {
        formNode.querySelector('#taxonomy_entry_move_move').click();
    };
    const getSelectedItems = () => {
        const newParent = formNode.querySelector('#taxonomy_entry_move_new_parent').value;

        if (newParent) {
            return [{
                id: parseInt(newParent, 10),
            }];
        } else if (formNode.dataset.currentParent && formNode.dataset.currentParent !== '') {
            return [{
                id: parseInt(formNode.dataset.currentParent, 10),
            }];
        }

        return null;
    };
    const initTree = () => {
        const taxonomyFormField = formNode.querySelector('#taxonomy_entry_move_new_parent');
        const taxonomyName = taxonomyFormField.dataset.taxonomy;

        ReactDOM.render(
            React.createElement(SelectIbexaTag, {
                userId,
                moduleId: MODULE_ID,
                restInfo: { token, siteaccess },
                taxonomyName,
                selectedItems: getSelectedItems(),
            }),
            treeMountElement,
        );

        doc.body.addEventListener(`ibexa-tb-update-selected:${MODULE_ID}`, updateSelected, false);
    };
    const unmountTree = () => {
        ReactDOM.unmountComponentAtNode(treeMountElement);

        doc.body.removeEventListener(`ibexa-tb-update-selected:${MODULE_ID}`, updateSelected, false);
    };

    confirmBtn.addEventListener('click', submitForm, false);
    modal.addEventListener('show.bs.modal', initTree, false);
    modal.addEventListener('hidden.bs.modal', unmountTree, false);
})(window, window.document, window.React, window.ReactDOM, window.ibexa);
