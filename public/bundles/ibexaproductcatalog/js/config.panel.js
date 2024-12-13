const { document: doc, ibexa } = window;
const CONFIG_PANEL_FOOTER_WITH_SCROLL = 'ibexa-pc-config-panel__footer--slim';

// TODO: Move config panel logic to admin-ui. (Current implementation: page builder)
class ConfigPanel {
    constructor(config) {
        this.wrapper = config.wrapper;
        this.trigger = config.trigger;
        this.closeBtns = this.wrapper.querySelectorAll('.ibexa-btn--close-config-panel');
        this.panelBody = this.wrapper.querySelector('.ibexa-pc-config-panel__body');
        this.panelFooter = this.wrapper.querySelector('.ibexa-pc-config-panel__footer');
        this.closePanel = this.closePanel.bind(this);
        this.openPanel = this.openPanel.bind(this);
        this.backdrop = new ibexa.core.Backdrop();
        this.fitFooter = this.fitFooter.bind(this);
    }

    toggleFooterScrollClass(isScroll) {
        this.panelFooter.classList.toggle(CONFIG_PANEL_FOOTER_WITH_SCROLL, isScroll);
    }

    fitFooter() {
        const hasVerticalScrollbar = this.panelBody.scrollHeight > this.panelBody.clientHeight;

        this.toggleFooterScrollClass(hasVerticalScrollbar);
    }

    openPanel() {
        this.wrapper.classList.remove('ibexa-pc-config-panel--hidden');
        this.backdrop.show();
        this.fitFooter();
        doc.body.classList.add('ibexa-scroll-disabled');
        window.addEventListener('resize', this.fitFooter, false);
        doc.addEventListener('ibexa-tb-toggled-expand', this.fitFooter, false);
    }

    closePanel() {
        this.wrapper.classList.add('ibexa-pc-config-panel--hidden');
        this.backdrop.hide();
        doc.body.classList.remove('ibexa-scroll-disabled');
        window.removeEventListener('resize', this.fitFooter, false);
        doc.removeEventListener('ibexa-tb-toggled-expand', this.fitFooter, false);
    }

    init() {
        this.closeBtns.forEach((closeBtn) => {
            closeBtn.addEventListener('click', this.closePanel, false);
        });
        this.trigger.addEventListener('click', this.openPanel, false);
    }
}

export default ConfigPanel;
