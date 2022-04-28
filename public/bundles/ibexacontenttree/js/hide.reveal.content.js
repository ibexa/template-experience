(function (global, doc) {
    const hideRevealContent = (item, visible) => {
        const contentFormContainer = doc.querySelector('.ibexa-content-tree-content-form-container--visibility');
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
        hideRevealContent(event.detail.item, false);
    };
    const revealContent = (event) => {
        hideRevealContent(event.detail.item, true);
    };

    doc.body.addEventListener('ibexa-content-tree:hide', hideContent, false);
    doc.body.addEventListener('ibexa-content-tree:reveal', revealContent, false);
})(window, window.document);
