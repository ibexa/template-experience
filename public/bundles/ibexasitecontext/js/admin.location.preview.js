(function (global, doc, Popover, Routing) {
    const CONTEXT_SITEACCESS_INPUT_SELECTOR = '.ibexa-change-siteaccess-context';
    const CONTENT_TREE_LIST_ITEM_SELECTOR = '.c-ct-list-item';
    const CONTENT_TREE_LIST_ITEM_LINK_SELECTOR = '.c-tb-list-item-single__label';
    const CONTENT_TREE_LIST_ITEM_LINK_REGEXP = /\/admin\/view\/content\/\d+\/full\/true\/(\d+)/;
    let currentVisibleItem = null;
    const getLocationIdFromHref = (href) => {
        return href.match(CONTENT_TREE_LIST_ITEM_LINK_REGEXP)[1];
    };
    const getSiteAccessContext = () => {
        const input = doc.querySelector(CONTEXT_SITEACCESS_INPUT_SELECTOR);

        if (input) {
            return input.value;
        }

        return '';
    };

    doc.addEventListener('mouseover', (event) => {
        if (getSiteAccessContext() === '') {
            return;
        }

        const contentTreeItem = event.target.closest(CONTENT_TREE_LIST_ITEM_SELECTOR);

        if (!contentTreeItem || contentTreeItem === currentVisibleItem) {
            return;
        }

        const contentTreeItemLink = contentTreeItem.querySelector(CONTENT_TREE_LIST_ITEM_LINK_SELECTOR);
        const locationId = getLocationIdFromHref(contentTreeItemLink.href);

        if (locationId) {
            const popover = new Popover(contentTreeItem, {
                position: 'right top',
                html: true,
                sanitize: false,
                trigger: 'hover',
                content: () => {
                    const previewWrapper = document.createElement('div');
                    const loader = document.createElement('div');
                    const iframe = doc.createElement('iframe');

                    previewWrapper.classList.add('ibexa-preview-popover__content');
                    loader.classList.add('ibexa-preview-popover__loader');

                    iframe.src = Routing.generate('ibexa.site_context.location_preview', { locationId });
                    iframe.addEventListener(
                        'load',
                        () => {
                            loader.remove();

                            const documentHTML = iframe.contentWindow.document.documentElement;
                            const scaleValue = previewWrapper.offsetWidth / iframe.offsetWidth;

                            documentHTML.style.pointerEvents = 'none';
                            documentHTML.style.transformOrigin = 'top';
                            documentHTML.style.scale = scaleValue;
                        },
                        false,
                    );

                    previewWrapper.appendChild(loader);
                    previewWrapper.appendChild(iframe);

                    return previewWrapper;
                },
                customClass: 'ibexa-preview-popover',
            });

            event.target.addEventListener(
                'mouseleave',
                () => {
                    popover.dispose();
                },
                { once: true },
            );

            currentVisibleItem = contentTreeItem;
        }
    });
})(window, window.document, window.bootstrap.Popover, window.Routing);
