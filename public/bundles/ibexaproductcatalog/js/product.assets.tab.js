(function (global, doc, ibexa, React, ReactDOM, Translator, Routing) {
    const createAssetForm = doc.querySelector('form[name=asset_create]');
    const deleteAssetsForm = doc.querySelector('form[name=asset_bulk_delete]');
    const tagAssetsForm = doc.querySelector('form[name=asset_tag]');
    const token = document.querySelector('meta[name="CSRF-Token"]').content;
    const assetCreateUri = Routing.generate('ibexa.asset.upload_image');
    const assetToolbarActionBtns = doc.querySelectorAll('.ibexa-pc-product-asset__toolbar-actions-btn');
    const allAssetCheckedTogglerCheckbox = doc.querySelectorAll('.ibexa-pc-product-assets-collection__selection-toggler-checkbox');
    const assetsDropZones = doc.querySelectorAll('.ibexa-pc-product-assets-collection');
    const assetsFileInputs = doc.querySelectorAll('.ibexa-pc-product-assets-collection__file-input');
    const assetsAddBtns = doc.querySelectorAll('.ibexa-pc-product-assets-source__btn-add');
    const selectFromLibraryBtns = doc.querySelectorAll('.ibexa-pc-product-assets-source__select-from-library');
    const markAssetCheckboxes = doc.querySelectorAll('.ibexa-pc-product-asset__mark-checkbox');
    const deleteSelectdAssetsBtns = doc.querySelectorAll('.ibexa-pc-product-assets-collection__delete-selected-assets');
    const deleteCollectionBtns = doc.querySelectorAll('.ibexa-pc-product-assets-collection__remove-btn');
    const deleteSingleAssetBtns = doc.querySelectorAll('.ibexa-pc-product-asset__actions-popup-btn--delete');
    const createCollectionBtn = doc.querySelector('.ibexa-pc-product-assets__create-collection-btn');
    const createCollectionModalBtn = doc.querySelector('.ibexa-pc-product-assets__create-collection-modal-btn');
    const createCollectionModalSubtitleNode = doc.querySelector(
        '.ibexa-pc-product-assets__create-collection-modal .ibexa-modal__subheader',
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
            .then(ibexa.helpers.request.handleRequest)
            .catch(ibexa.helpers.notification.showErrorNotification);
    };
    const saveAssets = (assets, tags) => {
        if (!assets.length) {
            return;
        }

        const uriInputValue = assets.map((asset) => `ezcontent://${asset.destinationContent.id}`).join(',');
        const uriInput = createAssetForm.querySelector('#asset_create_uris');

        tags.forEach((tag) => {
            const optionNode = createAssetForm.querySelector(`option[value="${tag.attributeValue}"]`);

            optionNode.selected = true;
        });

        uriInput.value = uriInputValue;
        createAssetForm.submit();
    };
    const addAssets = (currentTarget, files) => {
        const collectionNode = currentTarget.closest('.ibexa-pc-product-assets-collection');
        const tagsToAssign = getAssetsToAssign(collectionNode);
        const filteredFiles = [...files].filter((file) => file.type.includes('image'));
        const uploadedAssets = filteredFiles.map(uploadAsset);

        Promise.all(uploadedAssets)
            .then((assets) => saveAssets(assets, tagsToAssign))
            .catch(ibexa.helpers.notification.showErrorNotification);
    };
    const addAssetsByDraging = ({ dataTransfer, currentTarget }) => addAssets(currentTarget, dataTransfer.files);
    const addAssetsByInput = ({ currentTarget }) => addAssets(currentTarget, currentTarget.files);
    const addAssetsByUDW = ({ currentTarget }) => {
        const collectionNode = currentTarget.closest('.ibexa-pc-product-assets-collection');
        const udwContainer = doc.getElementById('react-udw');
        const udwRoot = ReactDOM.createRoot(udwContainer);
        const config = JSON.parse(currentTarget.dataset.udwConfig);
        const title = Translator.trans(/*@Desc("Select Image Asset")*/ 'ezimageasset.title', {}, 'product_catalog');
        const closeUDW = () => udwRoot.unmount();
        const onConfirm = (assets) => {
            const uriInput = createAssetForm.querySelector('#asset_create_uris');
            const tagsToAssign = getAssetsToAssign(collectionNode);
            const uriInputValue = assets.map((asset) => `ezcontent://${asset.ContentInfo.Content._id}`).join(',');

            tagsToAssign.forEach((tag) => {
                const optionNode = createAssetForm.querySelector(`option[value="${tag.attributeValue}"]`);

                optionNode.selected = true;
            });

            uriInput.value = uriInputValue;
            createAssetForm.submit();
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
        const tagNodes = collectionNode.querySelectorAll('.ibexa-pc-product-assets-collection__header .ibexa-tag');
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
    const createCollection = () => {
        const availableAssetSelected = doc.querySelectorAll(
            '.ibexa-pc-product-assets-collection .ibexa-pc-product-asset__mark-checkbox:checked',
        );
        const inputValue = [...availableAssetSelected].map((asset) => asset.value).join(',');
        const tagAssetsInput = tagAssetsForm.querySelector('input[name="asset_tag[assets]"]');

        tagAssetsInput.value = inputValue;
        tagAssetsForm.submit();
    };
    const triggerFilesBrowser = ({ currentTarget }) => {
        const targetCollectionNode = currentTarget.closest('.ibexa-pc-product-assets-collection');
        const fileInput = targetCollectionNode.querySelector('.ibexa-pc-product-assets-collection__file-input');

        fileInput.click();
    };

    assetsDropZones.forEach((dropZone) => dropZone.addEventListener('drop', addAssetsByDraging, false));
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
    global.addEventListener('dragover', (event) => event.preventDefault(), false);
    global.addEventListener('drop', (event) => event.preventDefault(), false);
})(window, window.document, window.ibexa, window.React, window.ReactDOM, window.Translator, window.Routing);
