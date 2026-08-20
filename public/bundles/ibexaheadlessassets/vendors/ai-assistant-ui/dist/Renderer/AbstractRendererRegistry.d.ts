import { RendererRegistryInterface } from './RendererRegistryInterface.ts';
import { RendererInterface } from './RendererInterface.ts';
/**
 * Base class for renderer registries
 */
export declare abstract class AbstractRendererRegistry<T extends object, R = RendererInterface<T>> implements RendererRegistryInterface<T, R> {
    private renderers;
    constructor();
    register(name: string, renderer: R): void;
    has(name: string): boolean;
    get(name: string): R;
}
