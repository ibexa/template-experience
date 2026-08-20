import { ConversationInterface } from './ConversationInterface';
import { AdapterInterface } from './AdapterInterface';
export declare abstract class AbstractAdapter implements AdapterInterface {
    static CAPABILITY_SEARCH_CONVERSATIONS: number;
    static CAPABILITY_FETCH_AGENTS: number;
    private context;
    private activeConversation;
    getContext(): object;
    setContext(context: object): void | Promise<void>;
    setActiveConversation(conversation: ConversationInterface | null): void;
    supports(_capability: number): boolean;
    abstract getConversations(offset?: number, limit?: number, query?: string): Promise<ConversationInterface[]>;
    abstract getConversation(conversationId: string): Promise<ConversationInterface>;
    abstract createConversation(subject?: string): Promise<ConversationInterface>;
    abstract deleteConversation(conversation: ConversationInterface): Promise<void>;
}
