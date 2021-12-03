import SelectParentTree from './select.parent.tree';

(function(global, doc, React, ReactDOM, eZ) {
    const modal = doc.querySelector('#select-parent-modal');

    if (!modal) {
        return;
    }

    let selectedParent = 0;
    const MODULE_ID = 'ibexa-select-parent';
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const userId = eZ.helpers.user.getId();
    const selectParentInput = doc.querySelector('.ibexa-tag-widget-wrapper .ibexa-data-source__input');
    const treeMountElement = modal.querySelector('#select-parent-modal-tree');
    const confirmBtn = modal.querySelector('.ibexa-btn--confirm');
    const updateSelected = (event) => {
        selectedParent = event.detail.items[0].id;
        confirmBtn.removeAttribute('disabled');
    };
    const saveValueToForm = () => {
        if (selectedParent) {
            selectParentInput.value = selectedParent;
        }
    };
    const initTree = () => {
        ReactDOM.render(
            React.createElement(SelectParentTree, {
                userId,
                moduleId: MODULE_ID,
                restInfo: { token, siteaccess },
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
