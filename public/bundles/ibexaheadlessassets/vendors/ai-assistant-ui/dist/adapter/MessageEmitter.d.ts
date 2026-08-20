import { MessageInterface } from './Message';
import { MessageEmitterInterface, OnMessageCallback } from './MessageEmitterInterface.ts';
export declare class MessageEmitter implements MessageEmitterInterface {
    private onMessageCallbacks;
    private messageQueue;
    private isEmitting;
    enableMessageEmitting(): void;
    onMessage(callback: OnMessageCallback): () => void;
    removeOnMessage(callback: OnMessageCallback): void;
    clearOnMessageCallbacks(): void;
    emitMessage(message: MessageInterface): void;
    private flushMessageQueue;
}
