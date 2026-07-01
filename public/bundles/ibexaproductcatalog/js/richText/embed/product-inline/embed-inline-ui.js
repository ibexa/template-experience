import IbexaEmbedBaseUI from '@fieldtype-richtext/src/bundle/Resources/public/js/CKEditor/embed/embed-base-ui';

const { Translator } = window;

class IbexaEmbedProductInlineUI extends IbexaEmbedBaseUI {
    constructor(props) {
        super(props);

        this.configName = 'products_discovery_widget';
        this.commandName = 'insertIbexaEmbedProductInline';
        this.buttonLabel = Translator.trans(/*@Desc("Embed Product Inline")*/ 'embed_product_inline_btn.label', {}, 'ck_editor');
        this.componentName = 'ibexaEmbedProductInline';
        this.icon = window.ibexa.helpers.icon.getIconPath('product-embed-inline');
    }

    chooseContent() {
        const config = JSON.parse(document.querySelector(`[data-udw-config-name="${this.configName}"]`).dataset.udwConfig);
        const { selectContent } = window.ibexa.richText.alloyEditor.callbacks;
        const mergedConfig = {
            onConfirm: this.confirmHandler,
            onItemsConfirm: this.confirmHandler,
            onCancel: this.cancelHandler,
            ...config,
            multiple: false,
        };

        if (typeof selectContent === 'function') {
            selectContent(mergedConfig);
        }
    }

    getCommandOptions(items) {
        const code = items[0].id;
        const contentName = items[0].data.baseProduct.name;

        return { code, contentName };
    }
}

export default IbexaEmbedProductInlineUI;
