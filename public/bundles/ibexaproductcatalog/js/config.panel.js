const doc = window.document;

class ConfigPanel {
    constructor(config) {
        this.wrapper = config.wrapper;
        this.trigger = config.trigger;
        this.closeBtns = this.wrapper.querySelectorAll('.ibexa-btn--close-config-panel');
        this.closePanel = this.closePanel.bind(this);
        this.openPanel = this.openPanel.bind(this);
        this.backdrop = null;
    }

    openPanel() {
        this.wrapper.classList.remove('ibexa-pc-config-panel--hidden');
        this.backdrop = doc.createElement('div');
        this.backdrop.classList.add('ibexa-backdrop');

        doc.body.appendChild(this.backdrop);
        doc.body.classList.add('ibexa-scroll-disabled');
    }

    closePanel() {
        this.wrapper.classList.add('ibexa-pc-config-panel--hidden');

        if (this.backdrop) {
            this.backdrop.remove();
            doc.body.classList.remove('ibexa-scroll-disabled');
        }
    }

    init() {
        this.closeBtns.forEach((closeBtn) => {
            closeBtn.addEventListener('click', this.closePanel, false);
        });
        this.trigger.addEventListener('click', this.openPanel, false);
    }
}

export default ConfigPanel;
