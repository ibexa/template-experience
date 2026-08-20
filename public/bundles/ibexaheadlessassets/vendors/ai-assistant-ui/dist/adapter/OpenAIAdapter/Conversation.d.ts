import { AbstractConversation } from '../AbstractConversation';
import { GetHistoryResult, OnSendReturnInterface } from '../ConversationInterface';
import { Client } from './Client';
export declare class Conversation extends AbstractConversation {
    private readonly client;
    private readonly instructions;
    private conversationHistory;
    private isCreatingSubject;
    constructor({ client, id, createdAt, instructions }: {
        client: Client;
        id: string;
        createdAt?: Date;
        instructions?: string;
    });
    getHistory(cursor?: string, limit?: number): Promise<GetHistoryResult>;
    send(id: string, message: string): Promise<OnSendReturnInterface>;
    private generateSubject;
}
