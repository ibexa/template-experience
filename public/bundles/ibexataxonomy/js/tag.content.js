import SelectIbexaTag from '../../../ui-dev/src/modules/select-ibexa-tag/select.ibexa.tag.module';

(function (global, doc, React, ReactDOM, ibexa) {
    const modal = doc.querySelector('#taxonomy-tag-content');

    if (!modal) {
        return;
    }

    let selectedEntries = [];
    const MODULE_ID = 'ibexa-tag-content';
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const languageCode = doc.querySelector('meta[name="LanguageCode"]').content;
    const userId = ibexa.helpers.user.getId();
    const modalRootElement = modal.parentElement;
    const treeMountElement = modal.querySelector('#taxonomy-tag-content-tree');
    const confirmBtn = modal.querySelector('.ibexa-btn--confirm');
    const selectTagContent = new ibexa.core.TagViewSelect({
        fieldContainer: doc.querySelector('.ibexa-taxonomy-tag-content'),
    });
    let treeRoot = null;
    const updateSelected = (event) => {
        const { id, items } = event.detail;

        if (id !== MODULE_ID) {
            return;
        }

        selectedEntries = items;
        confirmBtn.removeAttribute('disabled');
    };
    const getSelectedItems = () => {
        const selectTagInputFieldValue = selectTagContent.inputField.value;

        if (!selectTagInputFieldValue.length) {
            return [];
        }

        const taxonomyEntriesIds = selectTagInputFieldValue.split(',');
        const selectedItems = taxonomyEntriesIds.map((entryId) => ({ id: parseInt(entryId, 10) }));

        return selectedItems;
    };
    const saveValueToForm = () => {
        const items = selectedEntries.map((entry) => ({
            id: entry.id,
            name: entry.internalItem.name,
        }));

        selectTagContent.addItems(items, true);
    };
    const onOpenModal = () => {
        doc.body.appendChild(modal); // move element on top of everything to avoid being nested in absolute element

        const selectedItems = getSelectedItems();
        const taxonomyName = selectTagContent.inputField.dataset.taxonomy;

        treeRoot = ReactDOM.createRoot(treeMountElement);
        treeRoot.render(
            React.createElement(SelectIbexaTag, {
                userId,
                moduleId: MODULE_ID,
                restInfo: { token, siteaccess },
                taxonomyName,
                languageCode,
                isMultiChoice: true,
                selectedItems,
            }),
        );

        doc.body.addEventListener('ibexa-tb-update-selected', updateSelected, false);
    };
    const onCloseModal = () => {
        modalRootElement.appendChild(modal);

        treeRoot.unmount();

        doc.body.removeEventListener('ibexa-tb-update-selected', updateSelected, false);
    };

    confirmBtn.addEventListener('click', saveValueToForm, false);
    modal.addEventListener('show.bs.modal', onOpenModal, false);
    modal.addEventListener('hidden.bs.modal', onCloseModal, false);
})(window, window.document, window.React, window.ReactDOM, window.ibexa);
