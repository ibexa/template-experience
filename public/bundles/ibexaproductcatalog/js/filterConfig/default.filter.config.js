import BaseFilterConfig from './base.filter.config';

class DefaultFilterConfig extends BaseFilterConfig {
    constructor(config) {
        super(config);

        this.discardChanges = this.discardChanges.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    getItems() {
        return [];
    }

    discardChanges() {
        this.storedItems = [];
    }

    updatePreviewValue() {
        const filterPreviewValue = `(${this.getItems().length})`;

        this.filterPreviewValue.innerHTML = filterPreviewValue;
    }
}

export default DefaultFilterConfig;
