import { AbstractAdapter } from '../AbstractAdapter';
import { ConversationInterface } from '../ConversationInterface';
import { MessageInterface } from '../Message';
import { Agent } from '../../types';
export interface ConversationData {
    id: string;
    subject?: string;
    messages: MessageInterface[];
}
export interface EchoAdapterConfig {
    context?: object;
    data?: ConversationData[];
}
export declare class EchoAdapter extends AbstractAdapter {
    private conversations;
    constructor(context?: object);
    supports(capability: number): boolean;
    getConversations(offset?: number, limit?: number, query?: string): Promise<ConversationInterface[]>;
    getConversation(id: string): Promise<ConversationInterface>;
    createConversation(subject?: string): Promise<ConversationInterface>;
    deleteConversation(conversation: ConversationInterface): Promise<void>;
    private static readonly DEMO_MENTIONS;
    fetchAgents(query: string): Agent[];
    /**
     * Creates an EchoAdapter from a configuration object
     *
     * @param config
     */
    static fromConfig(config: EchoAdapterConfig): EchoAdapter;
}
