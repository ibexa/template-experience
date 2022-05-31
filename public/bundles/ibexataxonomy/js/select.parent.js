import SelectIbexaTag from '../../../ui-dev/src/modules/select-ibexa-tag/select.ibexa.tag.module';

(function (global, doc, React, ReactDOM, ibexa) {
    const MODULE_ID = 'ibexa-select-parent';
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const languageCode = doc.querySelector('meta[name="LanguageCode"]').content;
    const userId = ibexa.helpers.user.getId();
    const taxonomyFields = doc.querySelectorAll('.ibexa-field-edit--ibexa_taxonomy_entry');
    const taxonomyFieldInit = (taxonomyField) => {
        const modal = taxonomyField.querySelector('.ibexa-modal');

        if (!modal) {
            return;
        }

        let selectedParent = null;
        const modalRootElement = modal.parentElement;
        const treeMountElement = modal.querySelector('.ibexa-taxonomy-tree');
        const confirmBtn = modal.querySelector('.ibexa-btn--confirm');
        const selectParentWidget = new ibexa.core.TagViewSelect({
            fieldContainer: taxonomyField.querySelector('.ibexa-taxonomy-select-parent'),
        });
        const updateSelected = (event) => {
            const { id, items } = event.detail;

            if (id !== MODULE_ID) {
                return;
            }

            [selectedParent] = items;
            confirmBtn.removeAttribute('disabled');
        };
        const saveValueToForm = () => {
            if (selectedParent) {
                const items = [
                    {
                        id: selectedParent.id,
                        name: selectedParent.internalItem.name,
                    },
                ];

                selectParentWidget.addItems(items, true);
            }
        };
        const onOpenModal = () => {
            doc.body.appendChild(modal); // move element on top of everything to avoid being nested in absolute element
            const tagElement = taxonomyField.querySelector('.ibexa-taxonomy-select-parent .ibexa-tag-view-select__selected-item-tag');
            const defaultSelectedParent = !tagElement
                ? null
                : {
                      id: parseInt(tagElement.dataset.id, 10),
                  };
            const taxonomyName = selectParentWidget.inputField.dataset.taxonomy;
            const taxonomyEntryId = parseInt(selectParentWidget.selectBtn.dataset.entryId, 10);

            selectedParent = selectedParent ?? defaultSelectedParent;

            ReactDOM.render(
                React.createElement(SelectIbexaTag, {
                    userId,
                    moduleId: MODULE_ID,
                    restInfo: { token, siteaccess },
                    taxonomyName,
                    taxonomyEntryId,
                    languageCode,
                    selectedItems: selectedParent ? [selectedParent] : [],
                }),
                treeMountElement,
            );

            doc.body.addEventListener('ibexa-tb-update-selected', updateSelected, false);
        };
        const onCloseModal = () => {
            modalRootElement.appendChild(modal);

            ReactDOM.unmountComponentAtNode(treeMountElement);

            doc.body.removeEventListener('ibexa-tb-update-selected', updateSelected, false);
        };

        confirmBtn.addEventListener('click', saveValueToForm, false);
        modal.addEventListener('show.bs.modal', onOpenModal, false);
        modal.addEventListener('hidden.bs.modal', onCloseModal, false);
    };

    taxonomyFields.forEach(taxonomyFieldInit);
})(window, window.document, window.React, window.ReactDOM, window.ibexa);
