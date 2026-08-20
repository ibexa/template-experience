import { ReactNode } from 'react';
import { InputPreviewRenderer } from '../context/InputPreviewRendererRegistryContext';
interface InputPreviewRendererRegistryProviderProps {
    renderers: Record<string, InputPreviewRenderer>;
    children: ReactNode;
}
export declare function InputPreviewRendererRegistryProvider({ renderers, children }: InputPreviewRendererRegistryProviderProps): import("react").JSX.Element;
export {};
