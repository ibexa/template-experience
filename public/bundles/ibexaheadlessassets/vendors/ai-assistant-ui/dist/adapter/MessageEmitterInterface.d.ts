import { MessageInterface } from './Message';
export type OnMessageCallback = (message: MessageInterface, done?: boolean) => void;
/**
 * Interface representing an emitter for new messages
 */
export interface MessageEmitterInterface {
    /**
     * Enables message emitting, allowing registered callbacks to be invoked when new messages are emitted
     */
    enableMessageEmitting(): void;
    /**
     * Registers a callback to be invoked when a new message is emitted
     *
     * @returns A function to unregister the callback
     */
    onMessage(callback: OnMessageCallback): () => void;
    /**
     * Removes a previously registered callback
     *
     * @param callback The callback to remove
     */
    removeOnMessage(callback: OnMessageCallback): void;
    /**
     * Clears all registered message callbacks
     */
    clearOnMessageCallbacks(): void;
    /**
     * Emits a message event to all registered callbacks
     */
    emitMessage(message: MessageInterface): void;
}
