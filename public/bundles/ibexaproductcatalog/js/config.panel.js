const { document: doc, ibexa } = window;

class ConfigPanel {
    constructor(config) {
        this.wrapper = config.wrapper;
        this.trigger = config.trigger;
        this.closeBtns = this.wrapper.querySelectorAll('.ibexa-btn--close-config-panel');
        this.closePanel = this.closePanel.bind(this);
        this.openPanel = this.openPanel.bind(this);
        this.backdrop = new ibexa.core.Backdrop();
    }

    openPanel() {
        this.wrapper.classList.remove('ibexa-pc-config-panel--hidden');
        this.backdrop.show();
        doc.body.classList.add('ibexa-scroll-disabled');
    }

    closePanel() {
        this.wrapper.classList.add('ibexa-pc-config-panel--hidden');
        this.backdrop.hide();
        doc.body.classList.remove('ibexa-scroll-disabled');
    }

    init() {
        this.closeBtns.forEach((closeBtn) => {
            closeBtn.addEventListener('click', this.closePanel, false);
        });
        this.trigger.addEventListener('click', this.openPanel, false);
    }
}

export default ConfigPanel;
