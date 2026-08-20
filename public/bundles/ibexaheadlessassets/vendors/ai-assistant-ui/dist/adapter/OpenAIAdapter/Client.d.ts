export type CreateConversationResponseBody = {
    id: string;
    created_at: number;
};
export type CreateResponsesRequestBody = {
    model: string;
    input: {
        role: string;
        content: string;
    }[] | string;
    conversation?: string;
    stream?: boolean;
    instructions?: string;
};
export type MessageDelta = {
    id: string;
    type: string;
    content?: string;
};
export type CreateResponsesResponseBody = {
    conversation: {
        id: string;
    };
    stream: AsyncGenerator<MessageDelta>;
};
export type ConversationResponseBody = {
    id: string;
    created_at: number;
    metadata: object;
    object: 'conversation';
};
export type ListConversationsResponseBody = {
    data: Array<{
        id: string;
        type: string;
        content?: Array<{
            text: string;
        }>;
        role: string;
    }>;
    has_more?: boolean;
    last_cursor?: string | null;
};
export interface SimplifiedConversationItem {
    role: string;
    content: string;
}
export declare class Client {
    private readonly apiKey;
    private readonly model;
    constructor(apiKey: string, model?: string);
    createConversation(): Promise<CreateConversationResponseBody>;
    deleteConversation(id: string): Promise<void>;
    getConversation(conversationId: string): Promise<ConversationResponseBody>;
    getConversationItems(conversationId: string, cursor: string, limit: number): Promise<ListConversationsResponseBody>;
    createConversationItem(conversationId: string, message: string, instructions?: string): Promise<CreateResponsesResponseBody>;
    private processEvents;
    generateSubject(conversationHistory: SimplifiedConversationItem[]): Promise<string>;
    private buildConversationListEndpoint;
}
