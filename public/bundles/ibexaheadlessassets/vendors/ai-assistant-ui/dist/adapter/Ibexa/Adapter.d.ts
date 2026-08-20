import { AbstractAdapter } from '../AbstractAdapter';
import { ConversationInterface } from '../ConversationInterface';
import { Client } from './Client';
import { Agent } from '../../types';
export type AdapterConfig = {
    apiUrl: string;
    accessToken: string;
    refreshToken: string;
    /**
     * The ID of the agent to use for conversations. If null, conversations will
     * be with the default assistant agent for the current organization.
     */
    agentId?: number | null;
    /**
     * Optional free-form context the assistant works within, forwarded to the
     * conversation-create endpoint (e.g. `{ report_id: 67 }`).
     */
    context?: object;
};
export declare class Adapter extends AbstractAdapter {
    private readonly client;
    private readonly agentId;
    private agentsPromise?;
    constructor(client: Client, agentId: number | null, context?: object);
    supports(capability: number): boolean;
    fetchAgents(query: string): Promise<Agent[]>;
    private getAgents;
    getConversations(offset?: number, limit?: number, query?: string): Promise<ConversationInterface[]>;
    getConversation(conversationId: string): Promise<ConversationInterface>;
    createConversation(subject?: string): Promise<ConversationInterface>;
    deleteConversation(conversation: ConversationInterface): Promise<void>;
    static fromConfig(config: AdapterConfig): Adapter;
}
