import { ConversationEmitterInterface, OnConversationChangeCallback } from './ConversationEmitterInterface.ts';
export declare class ConversationEmitter implements ConversationEmitterInterface {
    private onChangeCallbacks;
    onChange(callback: OnConversationChangeCallback): () => void;
    removeOnChange(callback: OnConversationChangeCallback): void;
    clearOnChangeCallbacks(): void;
    emitChange(): void;
}
