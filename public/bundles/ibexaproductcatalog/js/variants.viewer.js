(function (global, doc, React, ReactDOMClient, ibexa) {
    const variantsViewerContainers = doc.querySelectorAll('.ibexa-pc-variants-viewer');

    variantsViewerContainers.forEach((variantsViewerContainer) => {
        const { baseProductCode, productVariants: productVariantsString, itemsPerPage } = variantsViewerContainer.dataset;
        const productVariants = JSON.parse(productVariantsString);
        const moduleRootContainer = variantsViewerContainer.querySelector('.ibexa-pc-variants-viewer__module-root');
        const showBtn = variantsViewerContainer.querySelector('.ibexa-pc-variants-viewer__show-variants-btn');
        let variantsViewerModuleRoot = null;
        const openVariantsViewer = () => {
            variantsViewerModuleRoot = ReactDOMClient.createRoot(moduleRootContainer);
            variantsViewerModuleRoot.render(
                React.createElement(ibexa.modules.VariantsViewer, {
                    productVariants,
                    baseProductCode,
                    onClose,
                    itemsPerPage,
                }),
            );
        };
        const onClose = () => {
            variantsViewerModuleRoot.unmount();
        };

        if (showBtn) {
            showBtn.addEventListener('click', openVariantsViewer, false);
        }
    });
})(window, window.document, window.React, window.ReactDOMClient, window.ibexa);
