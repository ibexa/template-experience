export const STATUS_GROUPS = {
    INFORMATIONAL: 'informational',
    SUCCESSFUL: 'successful',
    REDIRECTION: 'redirection',
    CLIENT_ERROR: 'client error',
    SERVER_ERROR: 'server error',
};

export default class PreviewLoader {
    constructor({ iframeWrapper, loaderWrapper, previewUrl, acceptableStatusGroups, iframeLoadCallback, fallbackTheme }) {
        this.iframeWrapper = iframeWrapper;
        this.iframe = iframeWrapper.querySelector('iframe');
        this.loaderWrapper = loaderWrapper;
        this.previewUrl = previewUrl;
        this.fallbackTheme = fallbackTheme ?? 'light';
        this.acceptableStatusGroups = acceptableStatusGroups ?? [STATUS_GROUPS.SUCCESSFUL];
        this.iframeLoadCallback = iframeLoadCallback ?? this.defaultIframeLoadCallback;
        this.abortController = new AbortController();

        this.checkPreviewStatusCode = this.checkPreviewStatusCode.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
        this.initIframe = this.initIframe.bind(this);
    }

    static getStatusRangeCodes(statusGroup) {
        switch (statusGroup) {
            case STATUS_GROUPS.INFORMATIONAL:
                return { start: 100, end: 199 };
            case STATUS_GROUPS.SUCCESSFUL:
                return { start: 200, end: 299 };
            case STATUS_GROUPS.REDIRECTION:
                return { start: 300, end: 399 };
            case STATUS_GROUPS.CLIENT_ERROR:
                return { start: 400, end: 499 };
            case STATUS_GROUPS.SERVER_ERROR:
                return { start: 500, end: 599 };
            default:
                throw Error(`status group not implemented: ${statusGroup}`);
        }
    }

    checkPreviewStatusCode(statusCode) {
        return this.acceptableStatusGroups.some((statusGroup) => {
            const { start, end } = PreviewLoader.getStatusRangeCodes(statusGroup);

            return statusCode >= start && statusCode <= end;
        });
    }

    getPreviewStatus() {
        const { signal } = this.abortController;

        return fetch(this.previewUrl, { method: 'HEAD', signal }).then(({ status }) => status);
    }

    hideLoader() {
        this.loaderWrapper.style.display = 'none';
    }

    blockPointerEvents() {
        const documentHTML = this.iframe.contentWindow.document.documentElement;

        documentHTML.style.pointerEvents = 'none';
    }

    defaultIframeLoadCallback() {
        this.blockPointerEvents();
    }

    initIframe(url, { isAccepted }) {
        this.iframe.src = url;

        this.iframe.addEventListener(
            'load',
            (event) => {
                this.iframeLoadCallback(event, { isAccepted });
                this.hideLoader();
            },
            false,
        );
    }

    remove() {
        this.abortController.abort();
    }

    init() {
        this.getPreviewStatus()
            .then(this.checkPreviewStatusCode)
            .then((isAccepted) => {
                const iframeUrl = isAccepted
                    ? this.previewUrl
                    : window.Routing.generate('ibexa.site_context.no_preview_available', { theme: this.fallbackTheme });

                this.initIframe(iframeUrl, { isAccepted });
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    return;
                }
            });
    }
}
