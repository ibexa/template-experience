(function (global, doc) {
    doc.body.addEventListener('ibexa-pb-app-iframe-loaded', () => {
        const iframe = doc.getElementById('page-builder-preview');
        const iframeBody = iframe.contentWindow.document.body;
        let updatedBlocksDetails = [];

        iframeBody.addEventListener('ibexa-post-update-blocks-preview', ({ detail }) => {
            const { blockIds, blocksMap } = detail;

            updatedBlocksDetails = blockIds.map((id) => blocksMap[id]);
        });

        iframeBody.addEventListener('ibexa-active-block-clicked', () => {
            if (!updatedBlocksDetails.length) {
                return;
            }

            updatedBlocksDetails.forEach((updatedBlockDetails) => {
                const reactBlocks = [...iframeBody.querySelectorAll('.ibexa-react-block')];
                const reactBlock = reactBlocks.find((block) => updatedBlockDetails.config.component === block.dataset.componentName);

                if (!reactBlock) {
                    return;
                }

                const { componentName, props: componentProps } = reactBlock.dataset;
                const props = JSON.parse(componentProps).attributes;
                const { getReactComponent, renderReactComponent } = iframe.contentWindow;
                let ReactComponent = null;

                try {
                    ReactComponent = getReactComponent(componentName);
                } catch (err) {
                    console.error(err.message);
                }

                if (!ReactComponent) {
                    return;
                }

                renderReactComponent(reactBlock, ReactComponent, props);
            });
        });
    });
})(window, window.document);
