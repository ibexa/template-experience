import { Plugin } from 'ckeditor5';

import IbexaEmbedProductEditing from './product/embed-editing';
import IbexaEmbedProductInlineEditing from './product-inline/embed-inline-editing';
import IbexaEmbedProductUI from './product/embed-ui';
import IbexaEmbedProductInlineUI from './product-inline/embed-inline-ui';

class IbexaProductEmbed extends Plugin {
    static get requires() {
        return [IbexaEmbedProductEditing, IbexaEmbedProductInlineEditing, IbexaEmbedProductUI, IbexaEmbedProductInlineUI];
    }
}

export default IbexaProductEmbed;
