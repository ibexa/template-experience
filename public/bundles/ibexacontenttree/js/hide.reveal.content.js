(function (global, doc, bootstrap) {
    const contentFormContainer = doc.querySelector('.ibexa-content-tree-content-form-container--visibility');
    const hideRevealContent = (item, visible) => {
        const form = contentFormContainer.querySelector('form');
        const contentInput = contentFormContainer.querySelector('[name="content_tree_content_visibility[contentInfo]"]');
        const locationInput = contentFormContainer.querySelector('[name="content_tree_content_visibility[location]"]');
        const visibilityInput = contentFormContainer.querySelector('[name="content_tree_content_visibility[visible]"]');

        contentInput.value = item.internalItem.contentId;
        locationInput.value = item.internalItem.locationId;
        visibilityInput.value = visible ? 1 : 0;

        form.submit();
    };
    const hideContent = (event) => {
        if (event.detail.item.internalItem.reverseRelationsCount) {
            const handleConfirm = () => hideRevealContent(event.detail.item, false);
            const modal = contentFormContainer.querySelector('#content-tree-hide-content-modal');
            const confirmBtn = modal.querySelector('.ibexa-btn--confirm');

            doc.body.appendChild(modal); // move element on top of everything to avoid being nested in absolute element
            bootstrap.Modal.getOrCreateInstance(modal).show();
            confirmBtn.addEventListener('click', handleConfirm, false);
            modal.addEventListener('hidden.bs.modal', () => {
                contentFormContainer.append(modal);
                confirmBtn.removeEventListener('click', handleConfirm, false);
            });
        } else {
            hideRevealContent(event.detail.item, false);
        }
    };
    const revealContent = (event) => {
        hideRevealContent(event.detail.item, true);
    };

    doc.body.addEventListener('ibexa-content-tree:hide', hideContent, false);
    doc.body.addEventListener('ibexa-content-tree:reveal', revealContent, false);
})(window, window.document, window.bootstrap);
