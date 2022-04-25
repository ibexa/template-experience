export class CategoryPathSelect {
    constructor(options = {}) {
        if (!options.container) {
            console.error('Missing some CategoryPathSelect options.');

            return;
        }

        this.onAdd = options.onAdd ?? (() => {});
        this.onRemove = options.onRemove ?? (() => {});

        this.container = options.container;
        this.isSingleSelect = this.container.classList.contains('ibexa-perso-category-path-select--single-select');
        this.udwBtn = this.container.querySelector('.ibexa-perso-category-path-select__add-path-udw-btn');
        this.customPathInput = this.container.querySelector('.ibexa-perso-category-path-select__custom-path-input');
        this.customPathAddBtn = this.container.querySelector('.ibexa-perso-category-path-select__add-custom-path-btn');
        this.tagsContainer = this.container.querySelector('.ibexa-perso-scenario-preview__tags');

        this.udwContainer = document.getElementById('react-udw');
        this.udwConfig = JSON.parse(this.udwBtn.dataset.udwConfig);
        this.udwTitle = this.udwBtn.dataset.udwTitle;

        this.tagTemplate = this.container.dataset.tagTemplate;

        this.handleUdwConfirm = this.handleUdwConfirm.bind(this);
        this.handleUdwCancel = this.handleUdwCancel.bind(this);
    }

    init() {
        const tags = this.tagsContainer.querySelectorAll('.ibexa-tag');

        tags.forEach((tag) => this.attachTagEvents(tag));
        this.udwBtn.addEventListener('click', () => this.openUDW(), false);
        this.customPathAddBtn.addEventListener('click', () => this.handleCustomPathAdd(), false);
        this.customPathInput.addEventListener(
            'input',
            () => {
                this.customPathAddBtn.disabled = this.customPathInput.value === '';
            },
            false,
        );
    }

    openUDW() {
        window.ReactDOM.render(
            window.React.createElement(window.ibexa.modules.UniversalDiscovery, {
                title: this.udwTitle,
                onConfirm: this.handleUdwConfirm,
                onCancel: this.handleUdwCancel,
                ...this.udwConfig,
            }),
            this.udwContainer,
        );
    }

    closeUDW() {
        window.ReactDOM.unmountComponentAtNode(this.udwContainer);
    }

    handleUdwCancel() {
        this.closeUDW();
    }

    handleUdwConfirm(selectedLocation) {
        const { removeRootFromPathString, findLocationsByIds, buildLocationsBreadcrumbs } = window.ibexa.helpers.location;
        const [{ pathString }] = selectedLocation;

        this.closeUDW();

        findLocationsByIds(removeRootFromPathString(pathString), (locations) =>
            this.addTag(buildLocationsBreadcrumbs(locations), pathString),
        );
    }

    handleCustomPathAdd() {
        const { value } = this.customPathInput;

        this.addTag(value, value);
        this.customPathInput.value = '';
        this.customPathAddBtn.disabled = true;
    }

    addTag(label, value) {
        if (this.isSingleSelect) {
            const existingTag = this.tagsContainer.querySelector('.ibexa-tag');

            if (existingTag) {
                this.removeTag(existingTag);
            }
        }

        const renderedTemplate = this.tagTemplate.replace('{{ label }}', label);

        this.tagsContainer.insertAdjacentHTML('beforeend', renderedTemplate);

        const insertedTag = this.tagsContainer.querySelector('.ibexa-tag:last-of-type');

        insertedTag.dataset.value = value;
        this.attachTagEvents(insertedTag);
        this.onAdd(value);
    }

    attachTagEvents(tag) {
        const tagRemoveBtn = tag.querySelector('.ibexa-tag__remove-btn');

        tagRemoveBtn.addEventListener('click', () => this.removeTag(tag), false);
    }

    removeTag(tag) {
        const tagValue = tag.dataset.value;

        tag.remove();
        this.onRemove(tagValue);
    }

    toggleDisabled(isDisabled) {
        this.container.classList.toggle('ibexa-perso-category-path-select--disabled', isDisabled);
        this.udwBtn.disabled = isDisabled;
        this.customPathInput.disabled = isDisabled;
        this.customPathAddBtn.disabled = isDisabled || this.customPathInput.value === '';

        const tag = this.tagsContainer.querySelector('.ibexa-tag');

        if (tag) {
            const tagRemoveBtn = tag.querySelector('.ibexa-tag__remove-btn');

            tagRemoveBtn.disabled = isDisabled;
        }
    }
}
