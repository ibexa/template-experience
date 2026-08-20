import { AbstractConversation } from '../AbstractConversation';
import { GetHistoryResult, OnSendReturnInterface } from '../ConversationInterface';
import { Client } from './Client';
export declare class Conversation extends AbstractConversation {
    private readonly client;
    private readonly agentId?;
    private subAgentsMap;
    constructor({ client, id, subject, agentId, createdAt, updatedAt, }: {
        client: Client;
        id: number;
        subject?: string;
        agentId?: number | null;
        createdAt?: Date;
        updatedAt?: Date;
    });
    get numericId(): number;
    uploadFile(file: File): Promise<string>;
    deleteFile(fileId: string): Promise<void>;
    setContext(context: object): Promise<void>;
    private fetchSubAgentsMap;
    private resolveMessageContent;
    getHistory(cursor?: string, limit?: number): Promise<GetHistoryResult>;
    send(id: string, message: string, attachments?: File[], content?: string): Promise<OnSendReturnInterface>;
}
