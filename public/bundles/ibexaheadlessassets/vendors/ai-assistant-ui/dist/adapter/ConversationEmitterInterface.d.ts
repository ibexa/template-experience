export type OnConversationChangeCallback = () => void;
/**
 * Interface representing an emitter for conversation change events
 */
export interface ConversationEmitterInterface {
    /**
     * Registers a callback to be invoked when the conversation changes
     *
     * @returns A function to unregister the callback
     */
    onChange(callback: OnConversationChangeCallback): () => void;
    /**
     * Removes a previously registered change callback
     *
     * @param callback The callback to remove
     */
    removeOnChange(callback: OnConversationChangeCallback): void;
    /**
     * Clears all registered change callbacks
     */
    clearOnChangeCallbacks(): void;
    /**
     * Emits a change event to all registered callbacks
     */
    emitChange(): void;
}
