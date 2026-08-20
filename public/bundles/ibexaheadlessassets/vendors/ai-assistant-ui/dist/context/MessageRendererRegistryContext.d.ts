import { AbstractRendererRegistry, RendererRegistryInterface, RendererInterface } from '../Renderer';
import { MessageInterface } from '../adapter/Message';
export type MessageRendererRegistryContextType = RendererRegistryInterface<MessageInterface>;
export type MessageRenderer = RendererInterface<MessageInterface>;
export declare class MessageRendererRegistry extends AbstractRendererRegistry<MessageInterface> {
}
export declare const MessageRendererRegistryContext: import('react').Context<MessageRendererRegistryContextType>;
