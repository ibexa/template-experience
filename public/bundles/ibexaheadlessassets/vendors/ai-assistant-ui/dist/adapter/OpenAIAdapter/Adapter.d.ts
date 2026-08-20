import { AbstractAdapter } from '../AbstractAdapter';
import { ConversationInterface } from '../ConversationInterface';
import { Client } from './Client';
import { Conversation } from './Conversation';
export type OpenAIAdapterConfig = {
    apiKey: string;
    model?: string;
    instructions?: string;
};
export declare class OpenAIAdapter extends AbstractAdapter {
    private readonly client;
    private readonly instructions;
    private conversations;
    constructor(client: Client, instructions?: string);
    getConversations(offset?: number, limit?: number): Promise<ConversationInterface[]>;
    getConversation(conversationId: string): Promise<ConversationInterface>;
    createConversation(subject?: string): Promise<Conversation>;
    deleteConversation(conversation: ConversationInterface): Promise<void>;
    getInstructions(): string | undefined;
    static fromConfig(config: OpenAIAdapterConfig): OpenAIAdapter;
}
