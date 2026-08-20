import { AbstractRendererRegistry, RendererRegistryInterface, RendererInterface } from '../Renderer';
import { AttachmentInterface } from '../types';
export type InputPreviewRenderer = {
    fullPreview?: RendererInterface<AttachmentInterface>;
    compactPreview?: RendererInterface<AttachmentInterface>;
};
export type InputPreviewRendererRegistryContextType = RendererRegistryInterface<AttachmentInterface, InputPreviewRenderer>;
export declare class InputPreviewRendererRegistry extends AbstractRendererRegistry<AttachmentInterface, InputPreviewRenderer> {
}
export declare const InputPreviewRendererRegistryContext: import('react').Context<InputPreviewRendererRegistryContextType>;
