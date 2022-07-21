import BaseFilterConfig from './base.filter.config';

class TaggifyFilterConfig extends BaseFilterConfig {
    constructor(config) {
        super(config);

        this.taggifyTags = [];
        this.taggifyWrapper = this.configPanelNode.querySelector('.ibexa-pc-taggify__widget');
        this.sourceInput = this.configPanelNode.querySelector('.ibexa-pc-taggify__source-input');
        this.initTaggify = this.initTaggify.bind(this);
        this.updateTaggifyTagsFromInput = this.updateTaggifyTagsFromInput.bind(this);
        this.getTags = this.getTags.bind(this);
        this.getItems = this.getItems.bind(this);
        this.discardChanges = this.discardChanges.bind(this);
        this.updateSourceValue = this.updateSourceValue.bind(this);
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

    removeFilterTag(tag) {
        const tags = this.sourceInput.value.split(',');
        const filteredTags = tags.filter((tagItem) => tagItem !== tag.dataset.value);

        this.sourceInput.value = filteredTags.join(',');
        this.sourceInput.dispatchEvent(new Event('change'));
        this.initTaggify();

        super.removeFilterTag(tag);
    }

    discardChanges() {
        const tags = this.storedItems.map(({ value }) => value).join(',');
        const haveTagsChanged = tags !== this.sourceInput.value;

        this.sourceInput.value = tags;
        this.initTaggify();

        if (haveTagsChanged) {
            this.sourceInput.dispatchEvent(new Event('change'));
        }

        this.storedItems = [];
    }

    removePreview() {
        this.sourceInput.value = '';
        this.initTaggify();
        this.sourceInput.dispatchEvent(new Event('change'));

        super.removePreview();
    }

    updatePreviewValue() {
        const filterPreviewValue = `(${this.getTags().length})`;

        this.filterPreviewValue.innerHTML = filterPreviewValue;
    }

    updateSourceValue(event) {
        this.sourceInput.value = event.detail.tags.map((tag) => tag.label).join();
        this.sourceInput.dispatchEvent(new Event('change'));
    }

    updateTaggifyTagsFromInput() {
        if (this.sourceInput.value) {
            this.taggify.updateTags(
                this.sourceInput.value.split(',').map((item) => ({
                    id: item.replace(/[^a-zA-Z0-9]/g, '_'),
                    label: item,
                })),
            );
        }
    }

    initTaggify() {
        this.taggify = new window.Taggify({
            containerNode: this.taggifyWrapper,
            displayLabel: false,
            displayInputValues: false,
        });
        const taggifyInput = this.taggifyWrapper.querySelector('.taggify__input');

        this.updateTaggifyTagsFromInput();

        taggifyInput.addEventListener(
            'keydown',
            (event) => {
                if (event.keyCode == 13) {
                    event.preventDefault();

                    return false;
                }
            },
            false,
        );
        this.taggifyWrapper.addEventListener('tagsCreated', this.updateSourceValue, false);
        this.taggifyWrapper.addEventListener('tagRemoved', this.updateSourceValue, false);
    }

    init() {
        super.init();

        this.initTaggify();
    }
}

export default TaggifyFilterConfig;
