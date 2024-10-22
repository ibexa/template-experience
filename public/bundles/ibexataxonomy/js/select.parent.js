import SelectIbexaTag from '../../../ui-dev/src/modules/select-ibexa-tag/select.ibexa.tag.module';

(function (global, doc, React, ReactDOM, ibexa, bootstrap) {
    const MODULE_ID = 'ibexa-select-parent';
    const taxonomyFields = doc.querySelectorAll(
        '.ibexa-field-edit--ibexa_taxonomy_entry, .ibexa-field-edit--ibexa_taxonomy_entry_assignment, .ibexa-attribute-taxonomy-location-list',
    );

    if (!taxonomyFields.length) {
        return;
    }

    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const languageCode = doc.querySelector('meta[name="LanguageCode"]').content;
    const userId = ibexa.helpers.user.getId();
    const taxonomyFieldInit = (taxonomyField) => {
        const openModalBtn = taxonomyField.querySelector('.ibexa-tag-view-select__btn-select-path');
        const modal = taxonomyField.querySelector('.ibexa-modal');

        if (!modal) {
            return;
        }

        let selectedParents = null;
        const modalRootElement = modal.parentElement;
        const treeMountElement = modal.querySelector('.ibexa-taxonomy-tree');
        const confirmBtn = modal.querySelector('.ibexa-btn--confirm');
        const cancelBtn = modal.querySelector('.ibexa-btn--cancel');
        const closeBtn = modal.querySelector('.modal-header .close');
        const selectParentWidget = new ibexa.core.TagViewSelect({
            fieldContainer: taxonomyField.querySelector('.ibexa-taxonomy-select-parent'),
        });
        let treeRoot = null;
        const closeModal = () => {
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);

            modalInstance.hide();
        };
        const openModal = () => {
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);

            modalInstance.show();
        };
        const updateSelected = (event) => {
            const { id, items } = event.detail;

            if (id !== MODULE_ID) {
                return;
            }

            selectedParents = items;
            confirmBtn.removeAttribute('disabled');
        };
        const saveValueToForm = () => {
            if (selectedParents) {
                const items = selectedParents.map((selectedParent) => ({
                    id: selectedParent.id,
                    name: selectedParent.internalItem.name,
                }));

                selectParentWidget.addItems(items, true);
            }

            closeModal();
        };
        const onCloseModal = () => {
            modalRootElement.appendChild(modal);

            treeRoot.unmount();

            doc.body.removeEventListener('ibexa-tb-update-selected', updateSelected, false);
        };

        const renderModalContent = (container = doc.body) => {
            container.appendChild(modal);

            const tagElements = taxonomyField.querySelectorAll('.ibexa-taxonomy-select-parent .ibexa-tag-view-select__selected-item-tag');
            const taxonomyForm = taxonomyField.closest('form');
            const selectedItems = [...tagElements].map((tagElement) => ({
                id: parseInt(tagElement.dataset.id, 10),
            }));
            const taxonomyName = selectParentWidget.inputField.dataset.taxonomy;
            const taxonomyEntryId = taxonomyForm ? parseInt(taxonomyForm.dataset.taxonomyEntryId, 10) : undefined;

            treeRoot = ReactDOM.createRoot(treeMountElement);
            treeRoot.render(
                React.createElement(SelectIbexaTag, {
                    userId,
                    moduleId: MODULE_ID,
                    restInfo: { token, siteaccess },
                    taxonomyName,
                    taxonomyEntryId,
                    languageCode,
                    selectedItems,
                    isMultiChoice: modalRootElement.dataset.multiple ?? false,
                    rootSelectionDisabled: !!modalRootElement.dataset.rootSelectionDisabled,
                }),
            );

            doc.body.addEventListener('ibexa-tb-update-selected', updateSelected, false);

            return modal;
        };

        confirmBtn.addEventListener('click', saveValueToForm, false);
        cancelBtn.addEventListener('click', closeModal, false);
        closeBtn.addEventListener('click', closeModal, false);
        openModalBtn.addEventListener(
            'click',
            () => {
                const isInsideIframe = window.frameElement !== null;

                if (isInsideIframe) {
                    doc.body.dispatchEvent(
                        new CustomEvent('ibexa-pb:extra-modal:render', {
                            detail: {
                                renderModal: renderModalContent,
                            },
                        }),
                    );

                    return;
                }

                renderModalContent();
                openModal();
            },
            false,
        );

        modal.addEventListener('hidden.bs.modal', onCloseModal, false);
    };

    taxonomyFields.forEach(taxonomyFieldInit);
})(window, window.document, window.React, window.ReactDOM, window.ibexa, window.bootstrap);
