(function (global, doc, ibexa, bootstrap, React, ReactDOM, Translator, Routing) {
    let movingAssetsIdentifiers = [];
    let movingAssetsNodes = [];
    let sourceCollectionNode = null;
    const CLASS_POPUP_MENU_HIDDEN = 'ibexa-popup-menu--hidden';
    const DRAGING_PLACEHOLDER_OFFSET = 10;
    const LOWER_DRAG_GHOST_PLACEHOLDER_OPACITY = '0.8';
    const dragGhostPlaceholderNode = doc.querySelector('.ibexa-pc-product-assets__drag-ghost-placeholder-container');
    const createAssetForm = doc.querySelector('form[name=asset_create]');
    const deleteAssetsForm = doc.querySelector('form[name=asset_bulk_delete]');
    const tagAssetsForm = doc.querySelector('form[name=asset_tag]');
    const token = document.querySelector('meta[name="CSRF-Token"]').content;
    const assetCreateUri = Routing.generate('ibexa.asset.upload_image');
    const assetToolbarActionBtns = doc.querySelectorAll('.ibexa-pc-product-asset__toolbar-actions-btn');
    const showMoreTagsBtn = doc.querySelectorAll('.ibexa-pc-product-assets-collection__hidden-tags-more-btn');
    const allAssetCheckedTogglerCheckbox = doc.querySelectorAll('.ibexa-pc-product-assets-collection__selection-toggler-checkbox');
    const assetsDropZones = doc.querySelectorAll('.ibexa-pc-product-assets-collection');
    const assetsFileInputs = doc.querySelectorAll('.ibexa-pc-product-assets-collection__file-input');
    const assetsAddBtns = doc.querySelectorAll('.ibexa-pc-product-assets-source__btn-add');
    const assetsImgs = doc.querySelectorAll('.ibexa-pc-product-asset img');
    const selectFromLibraryBtns = doc.querySelectorAll('.ibexa-pc-product-assets-source__select-from-library');
    const markAssetCheckboxes = doc.querySelectorAll('.ibexa-pc-product-asset__mark-checkbox');
    const deleteSelectdAssetsBtns = doc.querySelectorAll('.ibexa-pc-product-assets-collection__delete-selected-assets');
    const deleteCollectionBtns = doc.querySelectorAll('.ibexa-pc-product-assets-collection__remove-btn');
    const deleteSingleAssetBtns = doc.querySelectorAll('.ibexa-pc-product-asset__actions-popup-btn--delete');
    const createCollectionModalBtn = doc.querySelector('.ibexa-pc-product-assets__create-collection-modal-btn');
    const createCollectionModalNode = doc.querySelector('.ibexa-pc-product-assets__create-collection-modal');
    const createCollectionModalInstance = bootstrap.Modal.getOrCreateInstance(createCollectionModalNode);
    const createCollectionBtn = createCollectionModalNode.querySelector('.ibexa-pc-product-assets__create-collection-btn');
    const createCollectionModalSubtitleNode = createCollectionModalNode.querySelector(
        '.ibexa-pc-product-assets__create-collection-modal .ibexa-modal__subheader',
    );
    const assetsValidationStatusModalNode = doc.querySelector('#ibexa-pc-product-assets-validation-status-modal');
    const assetsValidationStatusModalInstance = bootstrap.Modal.getOrCreateInstance(assetsValidationStatusModalNode);
    const assetsValidationStatusListNode = assetsValidationStatusModalNode.querySelector(
        '.ibexa-pc-product-assets__validation-status-list',
    );
    const { validationStatusListItemTemplate } = assetsValidationStatusListNode.dataset;
    const assetsValidationStatusModalConfirmBtn = assetsValidationStatusModalNode.querySelector(
        '.ibexa-pc-product-assets__validation-status-confirm-btn',
    );
    const uploadAsset = (file) => {
        const form = new FormData();
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'X-CSRF-Token': token,
            },
            body: form,
            mode: 'same-origin',
            credentials: 'same-origin',
        };

        form.append('languageCode', ibexa.adminUiConfig.languages.priority[0]);
        form.append('file', file);

        return fetch(assetCreateUri, options)
            .then(ibexa.helpers.request.getJsonFromResponse)
            .then((response) => {
                return { ...response, fileName: file.name };
            })
            .catch(ibexa.helpers.notification.showErrorNotification);
    };
    const insertValidationStatusListItem = (asset) => {
        const extraClassess = asset.error ? 'ibexa-pc-product-assets__validation-status-list-item--invalid' : '';
        const iconName = asset.error ? 'warning-triangle' : 'checkmark';
        const msg =
            asset.error ??
            Translator.trans(/*@Desc("100% Uploaded")*/ 'product.view.assets.validation_status_modal.success', {}, 'product_catalog');
        const renderedValidationStatusListItem = validationStatusListItemTemplate
            .replace('{{ extra_classess }}', extraClassess)
            .replace('{{ file_name }}', asset.fileName)
            .replace('{{ icon_name }}', iconName)
            .replace('{{ msg }}', msg);

        assetsValidationStatusListNode.insertAdjacentHTML('beforeend', renderedValidationStatusListItem);
    };
    const saveNewAssets = (assets, tags = []) => {
        const urisInput = createAssetForm.querySelector('#asset_create_uris');
        const tagsInput = createAssetForm.querySelector('#asset_create_tags');
        const invalidAssets = assets.filter((asset) => !asset.destinationContent);
        const validAssets = assets.filter((asset) => asset.destinationContent);
        const uriInputValue = validAssets
            .map((asset) => asset.destinationContent && `ezcontent://${asset.destinationContent.id}`)
            .join(',');
        const tagsInputValue = tags.map((tag) => `${tag.attributeName}:${tag.attributeValue}`).join(',');

        urisInput.value = uriInputValue;
        tagsInput.value = tagsInputValue ?? '';
        assetsValidationStatusListNode.innerHTML = '';

        invalidAssets.forEach(insertValidationStatusListItem);
        validAssets.forEach(insertValidationStatusListItem);

        if (invalidAssets.length) {
            const modalSubheaderNode = assetsValidationStatusModalNode.querySelector('.ibexa-modal__subheader');
            const uploadedFilesCountMsg = Translator.trans(
                /*@Desc("Files not uploaded (%invalid_count%) Files successfuly uploaded (%valid_count%)")*/ 'product.view.assets.validation_status_modal.not_uploaded_count_msg',
                {
                    invalid_count: invalidAssets.length,
                    valid_count: validAssets.length,
                },
                'product_catalog',
            );

            modalSubheaderNode.innerHTML = uploadedFilesCountMsg;
            assetsValidationStatusModalInstance.show();

            return;
        }

        createAssetForm.submit();
    };
    const shoudlCancelCollectionAction = (targetCollectionNode) => {
        const isMovingAction = !!movingAssetsIdentifiers.length;
        const isTargetCollectionSourceCollection = targetCollectionNode.isEqualNode(sourceCollectionNode);

        return isMovingAction && isTargetCollectionSourceCollection;
    };
    const handleDropAsset = (event) => {
        const targetCollectionNode = event.currentTarget;

        if (shoudlCancelCollectionAction(targetCollectionNode)) {
            return;
        }

        targetCollectionNode.classList.remove('ibexa-pc-product-assets-collection--active');

        if (movingAssetsIdentifiers.length) {
            const tagsToAssign = getAssetsToAssign(targetCollectionNode);

            movingAssetsNodes.forEach((movingAssetNode) => movingAssetNode.remove());
            toggleLoaderVisibility(targetCollectionNode);
            assignAssetsToCollection(movingAssetsIdentifiers, tagsToAssign);
            hideDragGhostPlaceholder();
        } else {
            const { files } = event.dataTransfer;

            addAssets(event.currentTarget, files);
        }

        sourceCollectionNode = null;
    };
    const addAssets = (currentTarget, files) => {
        const collectionNode = currentTarget.closest('.ibexa-pc-product-assets-collection');
        const tagsToAssign = getAssetsToAssign(collectionNode);
        const filteredFiles = [...files].filter((file) => file.type.includes('image'));
        const uploadedAssets = filteredFiles.map(uploadAsset);

        toggleLoaderVisibility(collectionNode);

        Promise.all(uploadedAssets)
            .then((assets) => saveNewAssets(assets, tagsToAssign))
            .catch((error) => {
                toggleLoaderVisibility(collectionNode);
                ibexa.helpers.notification.showErrorNotification(error);
            });
    };
    const addAssetsByInput = ({ currentTarget }) => addAssets(currentTarget, currentTarget.files);
    const addAssetsByUDW = ({ currentTarget }) => {
        const collectionNode = currentTarget.closest('.ibexa-pc-product-assets-collection');
        const udwContainer = doc.getElementById('react-udw');
        const udwRoot = ReactDOM.createRoot(udwContainer);
        const config = JSON.parse(currentTarget.dataset.udwConfig);
        const title = Translator.trans(/*@Desc("Select Image Asset")*/ 'ezimageasset.title', {}, 'product_catalog');
        const closeUDW = () => udwRoot.unmount();
        const onConfirm = (assets) => {
            const urisInput = createAssetForm.querySelector('#asset_create_uris');
            const tagsInput = createAssetForm.querySelector('#asset_create_tags');
            const tagsToAssign = getAssetsToAssign(collectionNode);
            const uriInputValue = assets.map((asset) => `ezcontent://${asset.ContentInfo.Content._id}`).join(',');
            const tagsInputValue = tagsToAssign.map((tag) => `${tag.attributeName}:${tag.attributeValue}`).join(',');

            urisInput.value = uriInputValue;
            tagsInput.value = tagsInputValue ?? '';
            createAssetForm.submit();
            toggleLoaderVisibility(collectionNode);
            closeUDW();
        };

        udwRoot.render(
            React.createElement(ibexa.modules.UniversalDiscovery, {
                onConfirm,
                onCancel: closeUDW,
                title,
                ...config,
                multiple: true,
            }),
        );
    };
    const getAssetsToAssign = (collectionNode) => {
        const tagNodes = collectionNode.querySelectorAll(
            '.ibexa-pc-product-assets-collection__header .ibexa-pc-product-assets-collection__header-tag-content',
        );
        const tagsToAssign = [...tagNodes].map((tagNode) => {
            const { tagAttributeName, tagAttributeValue } = tagNode.dataset;

            return {
                attributeName: tagAttributeName,
                attributeValue: tagAttributeValue,
            };
        });

        return tagsToAssign;
    };
    const createDeleteAssetsInput = (assetValuesToDelete) => {
        const deleteAssetsContainer = doc.querySelector('.ibexa-pc-product-assets-delete__items');
        const { hiddenInputTemplate } = deleteAssetsContainer.dataset;

        deleteAssetsContainer.innerHTML = '';

        assetValuesToDelete.forEach((assetValue) => {
            const renderedHiddenInput = hiddenInputTemplate.replaceAll('__name__', assetValue);

            deleteAssetsContainer.insertAdjacentHTML('beforeend', renderedHiddenInput);

            const insertedInput = deleteAssetsContainer.querySelector('.ibexa-pc-product-assets-delete__item:last-child');

            insertedInput.value = assetValue;
        });
    };
    const deleteSelectedAssets = ({ currentTarget }) => {
        const assetsCollection = currentTarget.closest('.ibexa-pc-product-assets-collection');
        const collectionSelectedAssets = assetsCollection.querySelectorAll('.ibexa-pc-product-asset__mark-checkbox:checked');
        const collectionSelectedAssetValues = [...collectionSelectedAssets].map((selectedAsset) => selectedAsset.value);

        if (!collectionSelectedAssetValues.length) {
            return;
        }

        createDeleteAssetsInput(collectionSelectedAssetValues);
        deleteAssetsForm.submit();
    };
    const deleteAsset = ({ currentTarget }) => {
        const asset = currentTarget.closest('.ibexa-pc-product-asset');
        const assetCheckboxValue = asset.querySelector('.ibexa-pc-product-asset__mark-checkbox').value;

        createDeleteAssetsInput([assetCheckboxValue]);
        deleteAssetsForm.submit();
    };
    const deleteCollection = ({ currentTarget }) => {
        const assetsCollection = currentTarget.closest('.ibexa-pc-product-assets-collection');
        const assetsCollectionCheckboxes = assetsCollection.querySelectorAll('.ibexa-pc-product-asset__mark-checkbox');
        const assetsCollectionValues = [...assetsCollectionCheckboxes].map((assetCheckbox) => assetCheckbox.value);

        if (!assetsCollectionValues.length) {
            return;
        }

        createDeleteAssetsInput(assetsCollectionValues);
        deleteAssetsForm.submit();
    };
    const toggleAssetChecked = ({ currentTarget }) => {
        const currentAssetNode = currentTarget.closest('.ibexa-pc-product-asset');
        const assetsCollection = currentTarget.closest('.ibexa-pc-product-assets-collection');
        const assetsInCollection = assetsCollection.querySelectorAll('.ibexa-pc-product-asset');
        const deleteSelectedAssetsBtn = assetsCollection.querySelector('.ibexa-pc-product-assets-collection__delete-selected-assets');
        const toggleAllSelectionLabelNode = assetsCollection.querySelector('.ibexa-pc-product-assets-collection__selection-toggler-label');
        const toggleAllSelectionCheckbox = assetsCollection.querySelector(
            '.ibexa-pc-product-assets-collection__selection-toggler-checkbox',
        );
        const hasSomeAssetSelected = [...assetsInCollection].some((asset) => {
            const selectionCheckbox = asset.querySelector('.ibexa-pc-product-asset__mark-checkbox');

            return selectionCheckbox.checked;
        });
        const hasAllAssetsSelected = [...assetsInCollection].every((asset) => {
            const selectionCheckbox = asset.querySelector('.ibexa-pc-product-asset__mark-checkbox');

            return selectionCheckbox.checked;
        });
        const toggleAllSelectionDeselectAllLabel = Translator.trans(
            /*@Desc("Deselect All")*/ 'product.view.assets.create_collection.deselect_all',
            {},
            'product_catalog',
        );
        const toggleAllSelectionSelectAllLabel = Translator.trans(
            /*@Desc("Select All")*/ 'product.view.assets.create_collection.select_all',
            {},
            'product_catalog',
        );
        const toggleAllSelectionLabel = hasSomeAssetSelected ? toggleAllSelectionDeselectAllLabel : toggleAllSelectionSelectAllLabel;
        const selectedAssets = doc.querySelectorAll('.ibexa-pc-product-assets-collection .ibexa-pc-product-asset__mark-checkbox:checked');

        currentAssetNode.classList.toggle('ibexa-pc-product-asset--selected', currentTarget.checked);
        toggleAllSelectionLabelNode.innerHTML = toggleAllSelectionLabel;
        toggleAllSelectionCheckbox.checked = hasAllAssetsSelected;
        toggleAllSelectionCheckbox.classList.toggle(
            'ibexa-pc-product-assets-collection__selection-toggler-checkbox--some-selected',
            hasSomeAssetSelected && !hasAllAssetsSelected,
        );
        deleteSelectedAssetsBtn.toggleAttribute('disabled', !hasSomeAssetSelected);
        createCollectionModalBtn.toggleAttribute('disabled', !selectedAssets.length);
        createCollectionModalSubtitleNode.innerHTML = Translator.trans(
            /*@Desc("%count% image(s) selected")*/ 'product.view.assets.create_collection.sub_title',
            { count: selectedAssets.length },
            'product_catalog',
        );
    };
    const toggleAllAssestsChecked = ({ currentTarget }) => {
        const assetsCollection = currentTarget.closest('.ibexa-pc-product-assets-collection');
        const assetsInCollection = assetsCollection.querySelectorAll('.ibexa-pc-product-asset');
        const hasSomeAssetSelected = [...assetsInCollection].some((asset) => {
            const selectionCheckbox = asset.querySelector('.ibexa-pc-product-asset__mark-checkbox');

            return selectionCheckbox.checked;
        });

        assetsInCollection.forEach((asset) => {
            const selectionCheckbox = asset.querySelector('.ibexa-pc-product-asset__mark-checkbox');

            selectionCheckbox.checked = !hasSomeAssetSelected;
            selectionCheckbox.dispatchEvent(new Event('change'));
        });
    };
    const assignAssetsToCollection = (assets, tags = []) => {
        const tagAssetsInput = tagAssetsForm.querySelector('input[name="asset_tag[assets]"]');
        const tagAssetsInputValue = assets.join(',');

        tags.forEach(({ attributeName, attributeValue }) => {
            const attributeInput = tagAssetsForm.querySelector(`[name="asset_tag[attributes][${attributeName}][value]"]`);
            const { type } = attributeInput;

            if (type === 'checkbox') {
                attributeInput.checked = attributeValue;
            } else {
                attributeInput.value = attributeValue;
            }
        });

        tagAssetsInput.value = tagAssetsInputValue;
        tagAssetsForm.submit();
    };
    const createCollection = () => {
        const availableAssetSelected = doc.querySelectorAll(
            '.ibexa-pc-product-assets-collection .ibexa-pc-product-asset__mark-checkbox:checked',
        );
        const assetsToAssign = [...availableAssetSelected].map((asset) => asset.value);

        availableAssetSelected.forEach((asset) => {
            const collectionNode = asset.closest('.ibexa-pc-product-assets-collection');

            toggleLoaderVisibility(collectionNode);
        });
        createCollectionModalInstance.hide();
        assignAssetsToCollection(assetsToAssign);
    };
    const triggerFilesBrowser = ({ currentTarget }) => {
        const targetCollectionNode = currentTarget.closest('.ibexa-pc-product-assets-collection');
        const fileInput = targetCollectionNode.querySelector('.ibexa-pc-product-assets-collection__file-input');

        fileInput.click();
    };
    const toggleLoaderVisibility = (collectionNode) => {
        const collectionBodyNode = collectionNode.querySelector('.ibexa-pc-product-assets-collection__body');
        const collectionSpinnerNode = collectionNode.querySelector('.ibexa-pc-product-assets-collection__spinner');

        collectionBodyNode.classList.toggle('ibexa-pc-product-assets-collection__body--hidden');
        collectionSpinnerNode.classList.toggle('ibexa-pc-product-assets-collection__spinner--hidden');
    };
    const resetDefaultGhostImage = ({ dataTransfer }) => {
        const image = document.createElement('img');

        dataTransfer.setDragImage(image, 0, 0);
    };
    const fillDragGhostPlaceholder = () => {
        let top = 0;
        let right = 0;
        let zIndex = 5;

        movingAssetsNodes.forEach((movingNode) => {
            if (zIndex < 0) {
                return;
            }

            const copyNode = movingNode.cloneNode(true);

            copyNode.style.position = 'absolute';
            copyNode.style.top = `${top}px`;
            copyNode.style.right = `${right}px`;
            copyNode.style.zIndex = zIndex;
            copyNode.classList.add('ibexa-pc-product-asset--moving-placeholder');

            if (top !== 0) {
                copyNode.style.opacity = LOWER_DRAG_GHOST_PLACEHOLDER_OPACITY;
            }

            dragGhostPlaceholderNode.insertBefore(copyNode, dragGhostPlaceholderNode.firstChild);
            movingNode.classList.add('ibexa-pc-product-asset--moving');

            top = top + DRAGING_PLACEHOLDER_OFFSET;
            right = right + DRAGING_PLACEHOLDER_OFFSET;
            zIndex--;
        });
    };
    const showDragGhostPlaceholder = ({ clientX, clientY }) => {
        dragGhostPlaceholderNode.style.display = 'block';
        dragGhostPlaceholderNode.style.top = `${clientY + DRAGING_PLACEHOLDER_OFFSET}px`;
        dragGhostPlaceholderNode.style.left = `${clientX + DRAGING_PLACEHOLDER_OFFSET}px`;
    };
    const hideDragGhostPlaceholder = () => {
        dragGhostPlaceholderNode.style.display = 'none';
        dragGhostPlaceholderNode.style.left = '0px';
        dragGhostPlaceholderNode.style.top = '0px';
    };
    const handleDragEnd = () => {
        hideDragGhostPlaceholder();
        dragGhostPlaceholderNode.innerHTML = '';
        movingAssetsNodes.forEach((movingNode) => {
            movingNode.classList.remove('ibexa-pc-product-asset--moving');
        });
        movingAssetsNodes = [];
        movingAssetsIdentifiers = [];
    };
    const setMovingData = ({ target }) => {
        const draggingAsset = target.classList.contains('ibexa-pc-product-asset') ? target : target.closest('.ibexa-pc-product-asset');
        const selectedAssets = [...doc.querySelectorAll('.ibexa-pc-product-asset--selected')];

        sourceCollectionNode = draggingAsset.closest('.ibexa-pc-product-assets-collection');
        movingAssetsNodes = selectedAssets.length ? selectedAssets : [draggingAsset];
        movingAssetsIdentifiers = movingAssetsNodes.map(
            (movingAsset) => movingAsset.querySelector('.ibexa-pc-product-asset__mark-checkbox').value,
        );
    };
    const confirmInvalidAssetsMsg = () => {
        assetsValidationStatusModalInstance.hide();
        createAssetForm.submit();
    };

    class HiddenTagsPopupMenu extends ibexa.core.PopupMenu {
        constructor(config) {
            super(config);

            this.attachSearchChange();
            this.filterItems = this.filterItems.bind(this);
        }

        attachOnClickToItem() {}

        handleClickOutsidePopupMenu(event) {
            const isSearchClick = !!event.target.closest('.ibexa-input-text-wrapper--search');
            const isPopupMenuExpanded = !this.popupMenuElement.classList.contains(CLASS_POPUP_MENU_HIDDEN);
            const isClickInsideParentElement = this.triggerElement.contains(event.target);

            if (!isPopupMenuExpanded || isClickInsideParentElement || isSearchClick) {
                return;
            }

            this.popupMenuElement.classList.add(CLASS_POPUP_MENU_HIDDEN);
        }

        attachSearchChange() {
            const searchInput = this.popupMenuElement.querySelector('.ibexa-input--text');

            searchInput.addEventListener('change', (event) => this.filterItems(event), false);
            searchInput.addEventListener('keyup', (event) => this.filterItems(event), false);
        }

        filterItems({ currentTarget }) {
            const items = this.getItems();
            const searchFilterValueLowerCase = currentTarget.value.toLowerCase();

            items.forEach((item) => {
                const { filterValue } = item.dataset;
                const filterValueLowerCase = filterValue.toLowerCase();

                item.classList.toggle(
                    'ibexa-pc-product-assets-collection__hidden-tag--hidden',
                    !filterValueLowerCase.includes(searchFilterValueLowerCase),
                );
            });
        }
    }

    assetsDropZones.forEach((dropZone) => {
        dropZone.addEventListener(
            'dragstart',
            (event) => {
                event.dataTransfer.effectAllowed = 'move';
                setMovingData(event);

                if (!event.toElement) {
                    return;
                }

                resetDefaultGhostImage(event);
                fillDragGhostPlaceholder();
            },
            false,
        );
        dropZone.addEventListener('drag', showDragGhostPlaceholder, false);
        dropZone.addEventListener('dragend', handleDragEnd, false);
        dropZone.addEventListener('drop', handleDropAsset, false);
        dropZone.addEventListener('dragover', (event) => {
            const targetCollectionNode = event.currentTarget;

            if (shoudlCancelCollectionAction(targetCollectionNode)) {
                return;
            }

            targetCollectionNode.classList.add('ibexa-pc-product-assets-collection--active');
        });
        dropZone.addEventListener('dragleave', ({ currentTarget }) => {
            currentTarget.classList.remove('ibexa-pc-product-assets-collection--active');
        });
    });
    selectFromLibraryBtns.forEach((selectFromLibraryBtn) => selectFromLibraryBtn.addEventListener('click', addAssetsByUDW, false));
    assetsFileInputs.forEach((fileInput) => {
        fileInput.addEventListener('change', addAssetsByInput, false);
    });
    markAssetCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', toggleAssetChecked, false);
    });
    assetsAddBtns.forEach((assetAddBtn) => {
        assetAddBtn.addEventListener('click', triggerFilesBrowser, false);
    });
    assetToolbarActionBtns.forEach((assetToolbarActionBtn) => {
        const assetToolbarActions = assetToolbarActionBtn
            .closest('.ibexa-pc-product-asset')
            .querySelector('.ibexa-pc-product-asset__actions-popup');

        new ibexa.core.PopupMenu({
            popupMenuElement: assetToolbarActions,
            triggerElement: assetToolbarActionBtn,
            onItemClick: () => {},
        });
    });
    showMoreTagsBtn.forEach((hiddenTagsShowBtn) => {
        const hiddenTagsPopup = hiddenTagsShowBtn.nextElementSibling;

        new HiddenTagsPopupMenu({
            popupMenuElement: hiddenTagsPopup,
            triggerElement: hiddenTagsShowBtn,
        });
    });
    allAssetCheckedTogglerCheckbox.forEach((assetCheckedTogglerCheckbox) => {
        assetCheckedTogglerCheckbox.addEventListener('click', toggleAllAssestsChecked, false);
    });
    deleteSelectdAssetsBtns.forEach((deleteSelectdAssetsBtn) => {
        deleteSelectdAssetsBtn.addEventListener('click', deleteSelectedAssets, false);
    });
    deleteCollectionBtns.forEach((deleteCollectionBtn) => {
        deleteCollectionBtn.addEventListener('click', deleteCollection, false);
    });
    deleteSingleAssetBtns.forEach((deleteSingleAssetBtn) => {
        deleteSingleAssetBtn.addEventListener('click', deleteAsset, false);
    });
    createCollectionBtn.addEventListener('click', createCollection, false);
    assetsValidationStatusModalConfirmBtn.addEventListener('click', confirmInvalidAssetsMsg, false);
    global.addEventListener('dragover', (event) => event.preventDefault(), false);
    global.addEventListener('drop', (event) => event.preventDefault(), false);
    assetsImgs.forEach((assetImg) => assetImg.setAttribute('draggable', false));
})(window, window.document, window.ibexa, window.bootstrap, window.React, window.ReactDOM, window.Translator, window.Routing);
