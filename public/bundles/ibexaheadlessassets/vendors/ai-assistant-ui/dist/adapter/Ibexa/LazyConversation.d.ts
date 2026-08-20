import { ConversationEmitter } from '../ConversationEmitter.ts';
import { Client } from './Client.ts';
import { ConversationInterface, GetHistoryResult, OnSendReturnInterface } from '../ConversationInterface.ts';
import { OnMessageCallback } from '../MessageEmitterInterface.ts';
/**
 * Lazy conversation implementation that defers the creation of the conversation until the first message is sent.
 *
 * This allows for a more seamless user experience when starting a new conversation without need to explicitly
 * create it first, avoiding spamming conversation history.
 */
declare class LazyConversation extends ConversationEmitter implements ConversationInterface {
    private readonly client;
    private readonly agentId;
    private context?;
    private readonly temporaryId;
    private subject;
    private createdAt;
    private updatedAt;
    private conversation;
    private messageEmitter;
    constructor(client: Client, agentId: number | null, subject?: string, context?: object);
    getId(): string;
    getSubject(): string;
    setSubject(subject: string): void;
    setContext(context: object): Promise<void>;
    getCreatedAt(): Date;
    getUpdatedAt(): Date;
    send(id: string, message: string, attachments?: File[], content?: string): Promise<OnSendReturnInterface>;
    private sendWithNewConversation;
    onMessage(callback: OnMessageCallback): () => void;
    getHistory(cursor?: string, limit?: number): Promise<GetHistoryResult>;
}
export default LazyConversation;
