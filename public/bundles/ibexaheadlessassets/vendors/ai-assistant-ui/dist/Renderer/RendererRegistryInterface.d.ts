import { RendererInterface } from './RendererInterface.ts';
export interface RendererRegistryInterface<T extends object, R = RendererInterface<T>> {
    /**
     * Registers a renderer with a given name.
     *
     * @param name Name of the renderer
     * @param renderer The renderer to register
     */
    register(name: string, renderer: R): void;
    /**
     * Checks if a renderer with the given name is registered.
     *
     * @param name Name of the renderer
     * @returns True if the renderer is registered, false otherwise
     */
    has(name: string): boolean;
    /**
     * Retrieves a registered renderer by its name.
     *
     * @param name Name of the renderer
     * @returns The renderer associated with the name
     *
     * @throws Error if the renderer is not found
     */
    get(name: string): R;
}
