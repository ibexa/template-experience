import PreviewLoader from './preview.loader.class';
import { getAdminUiConfig } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/context.helper';

(function (global, doc, Popover, Routing) {
    const INIT_POPOVER_DELAY = 200;
    const SHOW_POPOVER_DELAY = 400;
    const CONTEXT_SITEACCESS_INPUT_SELECTOR = '.ibexa-change-siteaccess-context';
    const CONTENT_TREE_LIST_ITEM_SELECTOR = '.c-tb-list-item-single__element';
    const CONTENT_TREE_LIST_ITEM_LINK_SELECTOR = '.c-tb-list-item-single__link';
    const CONTENT_TREE_LIST_ITEM_LINK_REGEXP = /\/view\/content\/\d+\/full\/true\/(\d+)/;
    const previewTemplateNode = doc.querySelector('.ibexa-sc-tree-preview');
    const { focusMode } = getAdminUiConfig();
    let currentVisibleItem = null;
    let initPopoverTimeout = null;
    let showPopoverTimeout = null;
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
    const iframeLoadCallback = function (event, { isAccepted }) {
        if (isAccepted) {
            this.iframe.classList.add('ibexa-preview-popover-content__iframe--success');
        }

        const previewWrapper = this.iframeWrapper.closest('.ibexa-preview-popover-content');
        const documentHTML = this.iframe.contentWindow.document.documentElement;
        const documentBody = documentHTML.querySelector('body');
        const scaleValue = previewWrapper.offsetWidth / this.iframe.offsetWidth;

        documentHTML.style.transformOrigin = 'top';
        documentHTML.style.overflow = 'hidden';

        if (!isAccepted) {
            this.iframeWrapper.classList.add('ibexa-preview-popover-content__iframe-wrapper--full-width');
            documentBody.style.display = 'flex';
            documentBody.style.height = '100%';
        } else {
            documentHTML.style.scale = scaleValue;
        }

        this.blockPointerEvents();
    };
    const removeExistingPreviewPopovers = () => {
        const allPreviewPopovers = doc.querySelectorAll(`${CONTENT_TREE_LIST_ITEM_SELECTOR}[aria-describedby]`);

        allPreviewPopovers.forEach((previewPopover) => {
            const previewPopoverInstance = Popover.getInstance(previewPopover);

            previewPopoverInstance?.dispose();
        });
    };
    const createPreview = (locationId) => {
        const previewUrl = Routing.generate('ibexa.site_context.location_preview', { locationId });
        const previewTemplate = previewTemplateNode.content.cloneNode(true);
        const previewPopover = doc.createElement('div');

        previewPopover.appendChild(previewTemplate);

        const iframeWrapperNode = previewPopover.querySelector('.ibexa-preview-popover-content__iframe-wrapper');
        const loaderWrapperNode = previewPopover.querySelector('.ibexa-preview-popover-content__loader-wrapper');
        const previewLoaderInstance = new PreviewLoader({
            iframeWrapper: iframeWrapperNode,
            loaderWrapper: loaderWrapperNode,
            previewUrl,
            fallbackTheme: focusMode ? 'dark' : 'light',
            iframeLoadCallback,
        });

        previewLoaderInstance.init();

        return {
            previewInstance: previewLoaderInstance,
            previewElement: previewPopover,
        };
    };
    const initPreviewPopovers = () => {
        if (getSiteAccessContext() === '') {
            return;
        }

        doc.body.addEventListener('mouseover', (event) => {
            const contentTreeItem = event.target.classList.contains(CONTENT_TREE_LIST_ITEM_SELECTOR)
                ? event.target
                : event.target.closest(CONTENT_TREE_LIST_ITEM_SELECTOR);
            let popover = null;
            let currentPreviewInstance = null;

            if (!contentTreeItem || contentTreeItem === currentVisibleItem) {
                return;
            }

            currentVisibleItem = contentTreeItem;

            initPopoverTimeout = setTimeout(() => {
                const contentTreeItemLink = contentTreeItem.querySelector(CONTENT_TREE_LIST_ITEM_LINK_SELECTOR);

                if (!contentTreeItemLink) {
                    return;
                }

                const locationId = getLocationIdFromHref(contentTreeItemLink.href);

                if (locationId) {
                    removeExistingPreviewPopovers();

                    const { previewInstance, previewElement } = createPreview(locationId);

                    currentPreviewInstance = previewInstance;
                    popover = new Popover(contentTreeItem, {
                        placement: 'right',
                        fallbackPlacements: [],
                        offset: ({ popper }) => [popper.height / 2 - contentTreeItem.offsetHeight / 2 - 10, 16],
                        html: true,
                        sanitize: false,
                        trigger: 'manual',
                        content: () => previewElement,
                        customClass: 'ibexa-preview-popover ibexa-preview-popover--hidden',
                    });

                    popover.show();

                    showPopoverTimeout = setTimeout(() => {
                        popover?.tip?.classList.remove('ibexa-preview-popover--hidden');
                    }, SHOW_POPOVER_DELAY);
                }
            }, INIT_POPOVER_DELAY);

            contentTreeItem.addEventListener(
                'mouseleave',
                () => {
                    clearTimeout(showPopoverTimeout);
                    clearTimeout(initPopoverTimeout);
                    currentVisibleItem = null;
                    currentPreviewInstance?.remove();
                    popover?.dispose();
                },
                { once: true },
            );
        });
    };

    initPreviewPopovers();
})(window, window.document, window.bootstrap.Popover, window.Routing);
