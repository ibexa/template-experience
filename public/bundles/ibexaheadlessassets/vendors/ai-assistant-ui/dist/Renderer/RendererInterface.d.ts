import { ReactNode } from 'react';
/**
 * Function type for creating a ReactNode based on the provided properties.
 *
 * Used to render messages or attachments based on their type.
 */
export type RendererInterface<T extends object> = (properties: T) => ReactNode;
