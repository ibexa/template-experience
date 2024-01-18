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
        const contentTreeItemPopoverAnchor = contentTreeItem.querySelector('.c-tb-list-item-single__element');

        if (locationId) {
            const popover = new Popover(contentTreeItemPopoverAnchor, {
                position: 'right top',
                html: true,
                sanitize: false,
                trigger: 'hover',
                content: () => {
                    const previewWrapper = document.createElement('div');
                    const loaderWrapper = document.createElement('div');
                    const loader = document.createElement('div');
                    const iframe = doc.createElement('iframe');

                    previewWrapper.classList.add('ibexa-preview-popover__content');
                    loaderWrapper.classList.add('ibexa-preview-popover__loader-wrapper');
                    loader.classList.add('ibexa-preview-popover__loader');
                    iframe.classList.add('ibexa-preview-popover__iframe');

                    iframe.src = Routing.generate('ibexa.site_context.location_preview', { locationId });
                    iframe.addEventListener(
                        'load',
                        () => {
                            const documentHTML = iframe.contentWindow.document.documentElement;
                            const scaleValue = previewWrapper.offsetWidth / iframe.offsetWidth;

                            documentHTML.style.pointerEvents = 'none';
                            documentHTML.style.transformOrigin = 'top';
                            documentHTML.style.overflow = 'hidden';
                            documentHTML.style.scale = scaleValue;

                            loaderWrapper.remove();
                        },
                        false,
                    );

                    loaderWrapper.appendChild(loader);
                    previewWrapper.appendChild(loaderWrapper);
                    previewWrapper.appendChild(iframe);

                    return previewWrapper;
                },
                customClass: 'ibexa-preview-popover',
            });

            event.target.addEventListener(
                'mouseleave',
                () => {
                    currentVisibleItem = null;

                    popover.dispose();
                },
                { once: true },
            );

            currentVisibleItem = contentTreeItem;
        }
    });
})(window, window.document, window.bootstrap.Popover, window.Routing);
