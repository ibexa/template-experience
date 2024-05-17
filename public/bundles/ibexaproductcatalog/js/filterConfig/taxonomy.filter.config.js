import SelectIbexaTag from '@ibexa-taxonomy/src/bundle/ui-dev/src/modules/select-ibexa-tag/select.ibexa.tag.module';

import BaseFilterConfig from './base.filter.config';

const { ReactDOM, React, document, ibexa } = window;
const MODULE_ID = 'ibexa-pc-catalog-select-category';

class TaxonomyFilterConfig extends BaseFilterConfig {
    constructor(config) {
        super(config);

        this.selectedItems = [];
        this.sourceInput = this.configPanelNode.querySelector('.ibexa-pc-taxonomy__source-input');
        this.taxonomyRoot = this.configPanelNode.querySelector('#ibexa-pc-edit-config-taxonomy-root');
        this.token = document.querySelector('meta[name="CSRF-Token"]').content;
        this.siteaccess = document.querySelector('meta[name="SiteAccess"]').content;
        this.userId = ibexa.helpers.user.getId();

        this.initTree = this.initTree.bind(this);
        this.updateSelectedTaxonomyEntries = this.updateSelectedTaxonomyEntries.bind(this);
        this.discardChanges = this.discardChanges.bind(this);
        this.getItems = this.getItems.bind(this);
        this.removeFilterTag = this.removeFilterTag.bind(this);
        this.removePreview = this.removePreview.bind(this);
    }

    getItems() {
        return this.sourceInput.value
            .split(',')
            .filter((id) => id)
            .map((id) => {
                const taxonomyEntry = this.selectedItems.find((selectedItem) => selectedItem.id === parseInt(id, 10));

                return {
                    label: taxonomyEntry?.internalItem?.name ?? this.getCategoryLabel(id),
                    value: id,
                };
            });
    }

    getCategoryLabel(id) {
        const { categoryName } = document.querySelector(`.ibexa-pc-edit-catalog-list-filter-tag[data-value="${id}"]`).dataset;

        return categoryName ?? id;
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
        const tags = this.sourceInput.value.split(',');
        const filteredTags = tags.filter((tagItem) => tagItem !== tag.dataset.value);

        this.sourceInput.value = filteredTags.join(',');
        this.sourceInput.dispatchEvent(new Event('change'));
        this.reinitTree();

        super.removeFilterTag(tag);
    }

    discardChanges() {
        const tags = this.storedItems.map(({ value }) => value).join(',');
        const areTagsChanged = tags !== this.sourceInput.value;

        if (areTagsChanged) {
            this.sourceInput.value = tags;
            this.sourceInput.dispatchEvent(new Event('change'));
        }

        this.reinitTree();

        this.storedItems = [];
    }

    removePreview() {
        this.sourceInput.value = '';
        this.sourceInput.dispatchEvent(new Event('change'));
        this.reinitTree();

        super.removePreview();
    }

    updateSelectedTaxonomyEntries(event) {
        const { items } = event.detail;
        const tags = items.map(({ id }) => id);

        this.selectedItems = items;
        this.sourceInput.value = tags.join(',');
        this.sourceInput.dispatchEvent(new Event('change'));
    }

    reinitTree() {
        this.treeRoot.unmount();
        this.initTree();
    }

    initTree() {
        const selectedItems = this.getItems().map(({ value }) => ({
            id: parseInt(value, 10),
        }));

        this.treeRoot = ReactDOM.createRoot(this.taxonomyRoot);
        this.treeRoot.render(
            React.createElement(SelectIbexaTag, {
                userId: this.userId,
                moduleId: MODULE_ID,
                restInfo: { token: this.token, siteaccess: this.siteaccess },
                taxonomyName: this.sourceInput.dataset.productTaxonomyName,
                isMultiChoice: true,
                isSearchVisible: false,
                selectedItems,
                rootSelectionDisabled: true,
            }),
        );

        document.body.addEventListener('ibexa-tb-update-selected', this.updateSelectedTaxonomyEntries, false);
    }

    init() {
        super.init();

        this.initTree();
    }
}

ibexa.addConfig('productCatalog.catalogs.filters.taxonomy', TaxonomyFilterConfig);

export default TaxonomyFilterConfig;
