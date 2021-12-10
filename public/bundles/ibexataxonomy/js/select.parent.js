import SelectParentTree from './select.parent.tree';

(function(global, doc, React, ReactDOM, eZ) {
    const modal = doc.querySelector('#select-parent-modal');

    if (!modal) {
        return;
    }

    let selectedParent = null;
    const MODULE_ID = 'ibexa-select-parent';
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const userId = eZ.helpers.user.getId();
    const treeMountElement = modal.querySelector('#select-parent-modal-tree');
    const confirmBtn = modal.querySelector('.ibexa-btn--confirm');
    const selectParentWidget = new eZ.core.TagViewSelect({
        fieldContainer: doc.querySelector('.ibexa-taxonomy-select-parent'),
    });
    const updateSelected = (event) => {
        [selectedParent] = event.detail.items;
        confirmBtn.removeAttribute('disabled');
    };
    const saveValueToForm = () => {
        if (selectedParent) {
            const items = [{
                id: selectedParent.id,
                name: selectedParent.name,
            }];

            selectParentWidget.addItems(items, true);
        }
    };
    const initTree = () => {
        const tagElement = doc.querySelector('.ibexa-taxonomy-select-parent .ibexa-tag-view-select__selected-item-tag');
        const defaultSelectedParent = !tagElement ? null : {
            id: parseInt(tagElement.dataset.id, 10),
        };

        ReactDOM.render(
            React.createElement(SelectParentTree, {
                userId,
                moduleId: MODULE_ID,
                restInfo: { token, siteaccess },
                selectedItem: selectedParent ?? defaultSelectedParent,
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
})(window, window.document, window.React, window.ReactDOM, window.eZ);
