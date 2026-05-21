import BaseFilterConfig from './base.filter.config';

const { ibexa } = window;

class TaggifyFilterConfig extends BaseFilterConfig {
    constructor(config) {
        super(config);

        this.taggifyTags = [];
        this.taggifyWrapper = this.configPanelNode.querySelector('.ibexa-pc-taggify__widget');
        this.ibexaTaggifyNode = this.taggifyWrapper.querySelector('.ibexa-taggify');
        this.sourceInput = this.configPanelNode.querySelector('.ibexa-pc-taggify__source-input');
        this.initTaggify = this.initTaggify.bind(this);
        this.updateTaggifyTagsFromInput = this.updateTaggifyTagsFromInput.bind(this);
        this.getTags = this.getTags.bind(this);
        this.getItems = this.getItems.bind(this);
        this.discardChanges = this.discardChanges.bind(this);
    }

    getTags() {
        return this.sourceInput.value.split(',').filter((tag) => tag !== '');
    }

    getItems() {
        return this.getTags().map((tag) => ({ label: tag, value: tag }));
    }

    getRequestValue() {
        return this.sourceInput.value === '' ? undefined : this.sourceInput.value;
    }

    getValuePreviewLabel() {
        const items = this.getItems();
        let valuePreviewLabel = items[0]?.label ?? '';

        if (items.length > 1) {
            valuePreviewLabel += ` (+${items.length - 1})`;
        }

        return valuePreviewLabel;
    }

    removeFilterTag(tag) {
        this.taggify.removeTagWithValue(tag);

        super.removeFilterTag(tag);
    }

    discardChanges() {
        const oldTagsValue = this.storedItems.map(({ value }) => value).join(',');
        const haveTagsChanged = oldTagsValue !== this.sourceInput.value;

        if (haveTagsChanged) {
            this.taggify.removeAllTags();
            this.sourceInput.value = oldTagsValue;
            this.updateTaggifyTagsFromInput();
            this.sourceInput.dispatchEvent(new Event('change'));
        }

        this.storedItems = [];
    }

    removePreview() {
        this.taggify.removeAllTags();

        super.removePreview();
    }

    updateTaggifyTagsFromInput() {
        if (this.sourceInput.value) {
            this.sourceInput.value.split(',').forEach((tag) => {
                this.taggify.addTag(tag, tag);
            });
        }
    }

    initTaggify() {
        const taggifyFilterConfig = this;
        class GenerateVariantsTaggify extends ibexa.core.Taggify {
            afterTagsUpdate() {
                const tags = [...this.tags];

                taggifyFilterConfig.sourceInput.value = tags.join();
                taggifyFilterConfig.sourceInput.dispatchEvent(new Event('change'));
            }
        }
        this.taggify = new GenerateVariantsTaggify({
            container: this.ibexaTaggifyNode,
            acceptKeys: [' ', ','],
        });

        this.taggify.init();
        this.updateTaggifyTagsFromInput();
    }

    init() {
        super.init();

        this.initTaggify();
    }
}

ibexa.addConfig('productCatalog.catalogs.filters.taggify', TaggifyFilterConfig);

export default TaggifyFilterConfig;
