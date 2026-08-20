import { MessageInterface } from './Message';
import { ConversationInterface, GetHistoryResult, OnSendReturnInterface } from './ConversationInterface';
import { ConversationEmitterInterface, OnConversationChangeCallback } from './ConversationEmitterInterface.ts';
import { MessageEmitterInterface, OnMessageCallback } from './MessageEmitterInterface.ts';
export declare abstract class AbstractConversation implements ConversationInterface {
    protected static readonly DEFAULT_LOAD_LIMIT: number;
    protected readonly id: string;
    protected readonly createdAt: Date;
    protected updatedAt: Date | null;
    protected subject: string;
    protected conversationEmitter: ConversationEmitterInterface;
    protected messageEmitter: MessageEmitterInterface;
    constructor({ id, subject, createdAt, updatedAt, }: {
        id: string;
        subject?: string;
        createdAt?: Date;
        updatedAt?: Date | null;
    });
    getId(): string;
    getSubject(): string;
    setSubject(subject: string): void;
    getCreatedAt(): Date;
    getUpdatedAt(): Date;
    onChange(callback: OnConversationChangeCallback): () => void;
    onMessage(callback: OnMessageCallback): () => void;
    protected transformFile(file: File): Promise<string>;
    protected createPendingMessage(messages: MessageInterface[]): MessageInterface;
    protected getRandomUniqueId(): string;
    abstract getHistory(cursor?: string, limit?: number): Promise<GetHistoryResult>;
    abstract send(id: string, message: string, attachments?: File[], content?: string): Promise<OnSendReturnInterface>;
}
