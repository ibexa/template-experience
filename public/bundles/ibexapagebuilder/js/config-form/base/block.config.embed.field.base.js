(function (global, doc, ibexa, Translator) {
    const SELECTOR_FIELD_WRAPPER = '.ibexa-pb-block-embed-field';
    ibexa.BlockConfigEmbedFieldBase = class BlockConfigEmbedFieldBase {
        constructor(config = {}) {
            this.selectorPreview = config.selectorPreview || '.ibexa-pb-embed-meta__preview';
            this.selectorIcon = config.selectorIcon || '.ibexa-pb-embed-meta__preview-icon';
            this.selectorTitle = config.selectorTitle || '.ibexa-pb-embed-meta__title';
            this.selectorContentType = config.selectorContentType || '.ibexa-pb-embed-meta__content-type';
            this.selectorEmbedMeta = config.selectorEmbedMeta || '.ibexa-pb-embed-meta';
            this.previewFieldTypeIdentifier = config.previewFieldTypeIdentifier || 'ezimage';
            this.openUDWSelector = config.openUDWSelector || '[data-open-udw-embed]';

            this.openUDW = this.openUDW.bind(this);
        }

        /**
         * Gets placeholders nodes
         *
         * @method getPlaceholderNodes
         * @param {HTMLElement} container
         * @returns {Object}
         */
        getPlaceholderNodes(container) {
            return {
                preview: container.querySelector(this.selectorPreview),
                previewIcon: container.querySelector(this.selectorIcon),
                title: container.querySelector(this.selectorTitle),
                contentType: container.querySelector(this.selectorContentType),
            };
        }

        /**
         * Clears the meta information
         *
         * @method clearMeta
         * @param {HTMLElement} btn
         * @param {HTMLElement} container
         */
        clearMeta(btn, container) {
            doc.querySelector(btn.dataset.target).value = '';

            container.setAttribute('hidden', true);
            btn.removeAttribute('hidden');
        }

        /**
         * Gets the preview src
         *
         * @method getPreviewSrc
         * @param {Array} data list of Content objects
         * @returns {String}
         */
        getPreviewSrc(data) {
            const versionData = Array.isArray(data) ? data[0] || {} : {};
            const currentVersion = versionData.ContentInfo?.Content?.CurrentVersion;

            if (!currentVersion) {
                return '';
            }

            const version = currentVersion.Version;
            const imageField = version.Fields.field.find((field) => field.fieldTypeIdentifier === this.previewFieldTypeIdentifier);

            return imageField && imageField.fieldValue ? imageField.fieldValue.uri : '';
        }

        /**
         * Gets the input value
         *
         * @method getInputValue
         * @param {Array} data list of Content objects
         * @returns {Number}
         */
        getInputValue(data) {
            return data[0].ContentInfo.Content._id;
        }

        /**
         * Gets the content info
         *
         * @method getContentInfo
         * @param {Array} data list of Content objects
         * @returns {Object}
         */
        getContentInfo(data) {
            return data[0].ContentInfo.Content;
        }

        /**
         * Updates the field value
         *
         * @method updateFieldValue
         * @param {HTMLElement} btn
         * @param {Array} items list of Content objects
         */
        updateFieldValue(btn, items) {
            const metaContainer = btn.closest(SELECTOR_FIELD_WRAPPER).querySelector(this.selectorEmbedMeta);
            const contentInfo = this.getContentInfo(items);
            const previewSrc = this.getPreviewSrc(items);
            const inputValue = this.getInputValue(items);
            const { preview, previewIcon, title, contentType } = this.getPlaceholderNodes(metaContainer);
            const contentTypeName = ibexa.helpers.contentType.getContentTypeName(contentInfo.ContentTypeInfo.identifier);
            const contentTypeIcon = ibexa.helpers.contentType.getContentTypeIconUrl(contentInfo.ContentTypeInfo.identifier);
            const contentName = ibexa.helpers.text.escapeHTML(contentInfo.TranslatedName);
            const ellipsisContent = contentType.querySelector('.ibexa-middle-ellipsis');

            doc.querySelector(btn.dataset.target).value = inputValue;

            title.innerHTML = contentName;
            ibexa.helpers.ellipsis.middle.update(ellipsisContent, contentTypeName);

            if (previewSrc) {
                preview.src = previewSrc;
                preview.removeAttribute('hidden');
                previewIcon.setAttribute('hidden', true);
            } else {
                preview.setAttribute('hidden', true);
                previewIcon.removeAttribute('hidden');
                previewIcon.querySelector('use').setAttribute('href', contentTypeIcon);
            }

            metaContainer.removeAttribute('hidden');
            btn.setAttribute('hidden', true);
        }

        /**
         * Attaches event listener for remove button
         *
         * @method attachRemoveItemEvent
         * @param {HTMLElement} btn
         */
        attachRemoveItemEvent(btn) {
            const metaContainer = btn.closest(SELECTOR_FIELD_WRAPPER).querySelector(this.selectorEmbedMeta);
            const removeBtn = metaContainer.querySelector('.ibexa-pb-embed-meta__action--remove');

            removeBtn.addEventListener('click', this.clearMeta.bind(this, btn, metaContainer), false);
        }

        attachChangeItemEvent(btn) {
            const metaContainer = btn.closest(SELECTOR_FIELD_WRAPPER).querySelector(this.selectorEmbedMeta);
            const changeBtn = metaContainer.querySelector('.ibexa-pb-embed-meta__action--change');

            changeBtn.addEventListener(
                'click',
                () => {
                    btn.click();
                },
                false,
            );
        }

        /**
         * Opens UDW
         *
         * @method openUDW
         * @param {Event} event
         */
        openUDW(event) {
            event.preventDefault();

            const { currentTarget } = event;
            const config = JSON.parse(currentTarget.dataset.udwConfig);
            const title = Translator.trans(
                /*@Desc("Browse content")*/ 'config_form.block_config.embed_field_base.udw.title',
                {},
                'page_builder',
            );

            const openUdwEvent = new CustomEvent('ibexa-open-udw', {
                detail: {
                    title,
                    multiple: false,
                    onConfirm: this.updateFieldValue.bind(this, currentTarget),
                    ...config,
                },
            });

            doc.body.dispatchEvent(openUdwEvent);
        }

        /**
         * Initializes the embed field event handlers
         *
         * @method init
         */
        init(container = doc) {
            const openUdwBtns = [...container.querySelectorAll(this.openUDWSelector)];

            openUdwBtns.forEach((btn) => {
                this.attachRemoveItemEvent(btn);
                this.attachChangeItemEvent(btn);

                btn.addEventListener('click', this.openUDW, false);
            });
        }
    };
})(window, window.document, window.ibexa, window.Translator);
