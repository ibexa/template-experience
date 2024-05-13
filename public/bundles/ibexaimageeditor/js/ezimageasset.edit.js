(function (global, doc, ibexa, React, ReactDOM, Routing) {
    const imageEditorContainer = doc.querySelector('.ibexa-image-editor');
    const editImageButtons = doc.querySelectorAll('.ibexa-field-edit--ezimageasset .ibexa-field-edit-preview__action--edit');
    const imagePreviews = doc.querySelectorAll('.ibexa-field-edit--ezimageasset .ibexa-field-edit-preview__media');
    let imageEditorRoot = null;
    const toggleDisableStateAllPreviews = () => {
        imagePreviews.forEach((imagePreview) => {
            toggleDisableStateForElement(imagePreview);
        });
    };
    const toggleDisableState = (event) => {
        toggleDisableStateForElement(event.currentTarget);
    };
    const toggleDisableStateForElement = (imagePreview) => {
        const container = imagePreview.closest('.ibexa-field-edit--ezimageasset');
        const destinationSourceIdInput = container.querySelector('.ibexa-data-source__destination-source-id');
        const editImageButton = container.querySelector('.ibexa-field-edit-preview__action--edit');
        const methodName = destinationSourceIdInput.value ? 'setAttribute' : 'removeAttribute';

        editImageButton[methodName]('disabled', 'disabled');
    };
    const closeImageEditor = () => imageEditorRoot.unmount();
    const openImageEditor = (event) => {
        const imageNode = event.currentTarget
            .closest('.ibexa-field-edit-preview__media-wrapper')
            .querySelector('.ibexa-field-edit-preview__media');
        const imageName = event.currentTarget
            .closest('.ibexa-field-edit-preview')
            .querySelector('.ibexa-field-edit-preview__file-name').innerHTML;
        const contentId = event.currentTarget
            .closest('.ibexa-field-edit--ezimageasset')
            .querySelector('.ibexa-data-source__destination-content-id').value;
        const { languageCode } = event.currentTarget.closest('.ibexa-field-edit--ezimageasset').querySelector('input[type="file"]').dataset;
        const previewActionPreview = event.currentTarget
            .closest('.ibexa-field-edit--ezimageasset')
            .querySelector('.ibexa-field-edit-preview__action--preview');
        const assetNameContainer = event.currentTarget
            .closest('.ibexa-field-edit--ezimageasset')
            .querySelector('.ibexa-field-edit-preview__file-name');
        const inputDestinationContentId = event.currentTarget
            .closest('.ibexa-field-edit--ezimageasset')
            .querySelector('.ibexa-data-source__destination-content-id');
        const previewVisual = event.currentTarget
            .closest('.ibexa-field-edit--ezimageasset')
            .querySelector('.ibexa-field-edit-preview__visual');
        const setNewImage = (image, additionalData, saveAsNew, closeEditorAfterSave) => {
            const route = saveAsNew
                ? Routing.generate('ibexa.image_editor.create_from_image_asset', { fromContentId: contentId, languageCode })
                : Routing.generate('ibexa.image_editor.update_image_asset', { contentId, languageCode });
            const token = doc.querySelector('meta[name="CSRF-Token"]').content;
            const method = saveAsNew ? 'POST' : 'PUT';
            const request = new Request(route, {
                method,
                headers: {
                    'X-CSRF-Token': token,
                },
                body: JSON.stringify({
                    value: {
                        base64: image.src.split(',')[1],
                        additionalData,
                    },
                }),
                mode: 'same-origin',
                credentials: 'same-origin',
            });

            if (closeEditorAfterSave) {
                closeImageEditor();
            }

            fetch(request)
                .then(ibexa.helpers.request.getJsonFromResponse)
                .then((response) => {
                    if (saveAsNew) {
                        const destinationLocationUrl = Routing.generate('ibexa.content.view', {
                            contentId: response.contentId,
                            locationId: response.locationId,
                        });

                        previewActionPreview.setAttribute('href', destinationLocationUrl);
                        assetNameContainer.innerHTML = response.translatedName;
                        assetNameContainer.setAttribute('href', destinationLocationUrl);
                        inputDestinationContentId.value = response.contentId;
                    }

                    previewVisual.dataset.additionalData = JSON.stringify(additionalData);
                    imageNode.src = image.src;
                })
                .catch(ibexa.helpers.notification.showErrorNotification);
        };
        const fieldIdentifier = ibexa.adminUiConfig.imageAssetMapping.contentFieldIdentifier;
        const url = Routing.generate('ibexa.image_editor.get_base_64', { contentId, fieldIdentifier });
        const token = doc.querySelector('meta[name="CSRF-Token"]').content;
        const request = new Request(url, {
            headers: {
                'X-CSRF-Token': token,
                Accept: 'application/json',
            },
            mode: 'same-origin',
            credentials: 'same-origin',
        });

        fetch(request)
            .then(ibexa.helpers.request.getJsonFromResponse)
            .then((response) => {
                imageEditorRoot = ReactDOM.createRoot(imageEditorContainer);
                imageEditorRoot.render(
                    React.createElement(ibexa.modules.ImageEditorModule, {
                        onCancel: closeImageEditor,
                        onConfirm: setNewImage,
                        imageUrl: response.base64,
                        imageName,
                        saveAsNewPossible: true,
                        additionalData: JSON.parse(previewVisual.dataset.additionalData),
                    }),
                );
            })
            .catch(ibexa.helpers.notification.showErrorNotification);
    };

    editImageButtons.forEach((editImageButton) => editImageButton.addEventListener('click', openImageEditor, false));
    imagePreviews.forEach((imagePreview) => imagePreview.addEventListener('load', toggleDisableState, false));
    document.addEventListener('DOMContentLoaded', toggleDisableStateAllPreviews, false);
})(window, window.document, window.ibexa, window.React, window.ReactDOM, window.Routing);
