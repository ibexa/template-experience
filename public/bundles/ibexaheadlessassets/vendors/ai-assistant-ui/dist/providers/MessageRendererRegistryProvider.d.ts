import { ReactNode } from 'react';
import { MessageRenderer } from '../context/MessageRendererRegistryContext';
interface MessageRendererRegistryProviderProps {
    renderers: Record<string, MessageRenderer>;
    children: ReactNode;
}
export declare function MessageRendererRegistryProvider({ renderers, children }: MessageRendererRegistryProviderProps): import("react").JSX.Element;
export {};
