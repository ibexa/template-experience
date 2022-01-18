import SelectIbexaTag from '../../../ui-dev/src/modules/select-ibexa-tag/select.ibexa.tag.module';

(function(global, doc, React, ReactDOM, ibexa) {
    const modal = doc.querySelector('#taxonomy-tag-content');

    if (!modal) {
        return;
    }

    let selectedEntries = [];
    const MODULE_ID = 'ibexa-select-parent';
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const userId = ibexa.helpers.user.getId();
    const treeMountElement = modal.querySelector('#taxonomy-tag-content-tree');
    const confirmBtn = modal.querySelector('.ibexa-btn--confirm');
    const selectParentWidget = new ibexa.core.TagViewSelect({
        fieldContainer: doc.querySelector('.ibexa-taxonomy-tag-content'),
    });
    const updateSelected = (event) => {
        selectedEntries = event.detail.items;
        confirmBtn.removeAttribute('disabled');
    };
    const getSelectedItems = () => {
        const taxonomyEntriesIds = selectParentWidget.inputField.value.split(',');
        const selectedItems = taxonomyEntriesIds.map((entryId) => ({ id: parseInt(entryId, 10) }));

        return selectedItems;
    };
    const saveValueToForm = () => {
        const items = selectedEntries.map((entry) => ({
            id: entry.id,
            name: entry.internalItem.name,
        }));

        selectParentWidget.addItems(items, true);
    };
    const initTree = () => {
        const selectedItems = getSelectedItems();
        const taxonomyName = 'tags'; // TODO: fetch value from tag element

        ReactDOM.render(
            React.createElement(SelectIbexaTag, {
                userId,
                moduleId: MODULE_ID,
                restInfo: { token, siteaccess },
                taxonomyName,
                isMultiChoice: true,
                selectedItems,
            }),
            treeMountElement,
        );

        doc.body.addEventListener(`ibexa-tb-update-selected:${MODULE_ID}`, updateSelected, false);
    };
    const unmountTree = () => {
        ReactDOM.unmountComponentAtNode(treeMountElement);

        doc.body.removeEventListener(`ibexa-tb-update-selected:${MODULE_ID}`, updateSelected, false);
    };

    confirmBtn.addEventListener('click', saveValueToForm, false);
    modal.addEventListener('show.bs.modal', initTree, false);
    modal.addEventListener('hidden.bs.modal', unmountTree, false);
})(window, window.document, window.React, window.ReactDOM, window.ibexa);
