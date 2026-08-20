import { MessageInterface } from './adapter/Message';
/**
 * Properties passes to message components.
 */
export interface MessageProps<T extends MessageInterface> {
    message: T;
}
