import { Plugin, toWidget, Widget } from 'ckeditor5';

import IbexaEmbedProductInlineCommand from './embed-inline-command';
import { findProduct } from '../../services/product-service';

const { escapeHTML } = window.ibexa.helpers.text;
const { dangerouslySetInnerHTML } = window.ibexa.helpers.dom;
const { getIconPath } = window.ibexa.helpers.icon;

const renderPreview = (title, code, itemActionsContainer) => {
    const itemActionsHTML = itemActionsContainer?.outerHTML ?? '';
    const titleHtmlEscaped = escapeHTML(title);

    return `<svg class="ibexa-icon ibexa-icon--medium ibexa-icon--secondary">
                <use xlink:href="${getIconPath('product-embed-inline')}"></use>
            </svg>
            <span
                class="ibexa-embed-content__title"
            >
                ${titleHtmlEscaped}
            </span>
            <span>
                <button 
                    type="button"
                    class="btn ibexa-btn ibexa-btn--small ibexa-btn--ghost ibexa-btn--no-text ibexa-embedded-item-actions__menu-trigger-btn"
                >
                    <svg class="ibexa-icon ibexa-icon--small-medium ibexa-icon--secondary">
                        <use xlink:href="${getIconPath('options')}"></use>
                    </svg>
                </button>
            </span>
            ${itemActionsHTML}`;
};

class IbexaEmbedProductInlineEditing extends Plugin {
    static get requires() {
        return [Widget];
    }

    defineSchema() {
        const { schema } = this.editor.model;

        schema.register('embedProductInline', {
            isObject: true,
            isInline: true,
            allowWhere: '$text',
            allowAttributes: ['code', 'contentName'],
        });
    }

    defineConverters() {
        const { conversion } = this.editor;

        conversion
            .for('editingDowncast')
            .elementToElement({
                model: 'embedProductInline',
                view: (modelElement, { writer: downcastWriter }) => {
                    const { editor } = this;
                    const container = downcastWriter.createContainerElement('span', {
                        'data-href': `product://${modelElement.getAttribute('code')}`,
                        'data-ezelement': 'ibexaembedproductinline',
                        'data-ezview': 'embedproductinline',
                        class: 'ibexa-embed',
                    });
                    const preview = downcastWriter.createUIElement('p', { class: 'ibexa-embed-content' }, function (domDocument) {
                        const code = modelElement.getAttribute('code');
                        const contentName = modelElement.getAttribute('contentName');
                        const domElement = this.toDomElement(domDocument);
                        const itemActionsContainer = editor.sourceElement.parentNode.querySelector('.ibexa-embedded-item-actions');
                        const previewRendered = renderPreview(contentName, code, itemActionsContainer);

                        dangerouslySetInnerHTML(domElement, previewRendered);

                        return domElement;
                    });

                    downcastWriter.insert(downcastWriter.createPositionAt(container, 0), preview);

                    return toWidget(container, downcastWriter);
                },
            })
            .add((dispatcher) =>
                dispatcher.on('attribute:contentName:embedProductInline', (event, data, conversionApi) => {
                    const { editor } = this;
                    const downcastWriter = conversionApi.writer;
                    const modelElement = data.item;
                    const viewElement = conversionApi.mapper.toViewElement(modelElement);
                    const preview = downcastWriter.createUIElement('p', { class: 'ibexa-embed-content' }, function (domDocument) {
                        const code = modelElement.getAttribute('code');
                        const contentName = modelElement.getAttribute('contentName');
                        const domElement = this.toDomElement(domDocument);
                        const itemActionsContainer = editor.sourceElement.parentNode.querySelector('.ibexa-embedded-item-actions');

                        domElement.innerHTML = renderPreview(contentName, code, itemActionsContainer);

                        const itemActionsTriggerElement = domElement.querySelector('.ibexa-embedded-item-actions__menu-trigger-btn');
                        const itemActionsMenuContainer = domElement.querySelector(
                            '.ibexa-embedded-item-actions .ibexa-multilevel-popup-menu',
                        );

                        domDocument.body.dispatchEvent(
                            new CustomEvent('ibexa-embedded-item:create-dynamic-menu', {
                                detail: {
                                    productCode: code,
                                    menuTriggerElement: itemActionsTriggerElement,
                                    menuContainer: itemActionsMenuContainer,
                                },
                            }),
                        );

                        return domElement;
                    });

                    downcastWriter.remove(downcastWriter.createRangeIn(viewElement));
                    downcastWriter.insert(downcastWriter.createPositionAt(viewElement, 0), preview);
                }),
            );

        conversion.for('dataDowncast').elementToElement({
            model: 'embedProductInline',
            view: (modelElement, { writer: downcastWriter }) => {
                const container = downcastWriter.createContainerElement('span', {
                    'data-href': `product://${modelElement.getAttribute('code')}`,
                    'data-ezelement': 'ibexaembedproductinline',
                    'data-ezview': 'embedproductinline',
                });

                return container;
            },
        });

        conversion.for('upcast').elementToElement({
            view: {
                name: 'span',
                attributes: {
                    'data-ezelement': 'ibexaembedproductinline',
                },
            },
            model: (viewElement, { writer: upcastWriter }) => {
                const href = viewElement.getAttribute('data-href');
                const code = href.replace('product://', '');
                const modelElement = upcastWriter.createElement('embedProductInline', { code });

                findProduct(code, (product) => {
                    const contentName = product.name;

                    this.editor.model.change((writer) => {
                        writer.setAttribute('contentName', contentName, modelElement);
                        writer.setAttribute('shouldFireInputEvent', false, modelElement);
                    });
                });

                return modelElement;
            },
        });
    }

    init() {
        this.defineSchema();
        this.defineConverters();

        this.editor.commands.add('insertIbexaEmbedProductInline', new IbexaEmbedProductInlineCommand(this.editor));
    }
}

export default IbexaEmbedProductInlineEditing;
