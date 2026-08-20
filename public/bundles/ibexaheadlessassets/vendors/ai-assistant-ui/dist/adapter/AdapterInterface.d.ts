import { ConversationInterface } from './ConversationInterface';
import { Agent } from '../types';
/**
 * Interface representing the adapter for communicating with an agent.
 */
export interface AdapterInterface {
    /**
     * Gets a list of conversations with the agent
     *
     * @param offset Optional offset for pagination
     * @param limit Optional limit for number of conversations to retrieve
     * @param query Optional search query to filter conversations
     *
     * @returns An array of conversations
     */
    getConversations(offset?: number, limit?: number, query?: string): Promise<ConversationInterface[]>;
    /**
     * Gets a specific conversation by its ID
     *
     * @param conversationId The ID of the conversation to retrieve
     *
     * @returns The conversation object
     */
    getConversation(conversationId: string): Promise<ConversationInterface>;
    /**
     * Creates a new conversation with the agent
     *
     * @returns The newly created conversation object
     */
    createConversation(subject?: string): Promise<ConversationInterface>;
    /**
     * Deletes a conversation
     */
    deleteConversation(conversation: ConversationInterface): Promise<void>;
    /**
     * Gets the current context for the agent
     *
     * @returns Key value pairs representing the context
     */
    getContext(): object;
    /**
     * Sets the current context for the agent
     *
     * @param context Key value pairs representing the context
     */
    setContext(context: object): void | Promise<void>;
    /**
     * Marks the conversation the context updates should be applied to
     *
     * @param conversation The active conversation, or null when none is open
     */
    setActiveConversation?(conversation: ConversationInterface | null): void;
    /**
     * Checks if the adapter supports a specific capability
     *
     * @param capability The capability to check for support
     * @returns True if the capability is supported, false otherwise
     */
    supports(capability: number): boolean;
    /**
     * Fetches agent suggestions matching the given query.
     * Implement this method and declare support via CAPABILITY_FETCH_AGENTS.
     *
     * @param query The search string typed after @
     * @returns Matching agents
     */
    fetchAgents?(query: string): Agent[] | Promise<Agent[]>;
}
