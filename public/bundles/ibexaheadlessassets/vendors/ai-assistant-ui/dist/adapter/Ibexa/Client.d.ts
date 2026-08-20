export type GetConversationsResponseSchema = {
    conversations: GetConversationsItemResponseSchema[];
    total_count: number;
};
export type GetConversationsItemResponseSchema = {
    id: number;
    subject: string;
    agent_id: number;
    created_by: string;
    created_at: string;
    updated_at: string;
};
export type CreateConversationPayloadSchema = {
    agent_id?: number;
    subject?: string;
    context?: object;
};
export type CreateConversationResponseSchema = {
    id: number;
    subject: string;
    agent_id: number;
    created_by: string;
    created_at: string;
    updated_at: string;
};
export type UpdateConversationPayloadSchema = {
    subject?: string | null;
    context?: object | null;
};
export type ConversationResponseSchema = {
    id: number;
    agent_id: number;
    created_by: string;
    subject?: string | null;
    context?: object | null;
    created_at?: string | null;
    updated_at?: string | null;
    feedback_rate?: number | null;
};
export type GetConversationResponseSchema = {
    id: number;
    subject: string;
    agent_id: number;
    created_by: string;
    created_at: string;
    updated_at: string;
};
export type MessageResponseSchema = {
    id: string;
    role: string;
    content: string;
    created_at: string;
};
export type GetMessagesResponseSchema = {
    messages: MessageResponseSchema[];
    next_cursor: string | null;
    has_more: boolean;
};
export type SendMessagePayloadSchema = {
    content: string;
    file_ids?: string[];
};
export type SendMessageResponseSchema = {
    id: number;
    agent_id: number;
    created_by: string;
    subject?: string;
    created_at?: string;
    updated_at?: string;
};
export type UploadFileResponseSchema = {
    uuid: string;
    organisation_id: number;
    conversation_id: number;
    original_filename: string;
    content_type: string;
    file_size: number;
    created_by: string;
    message_id: number;
    created_at: string;
};
export type SubAgentLinkResponseSchema = {
    sub_agent_id: number;
    name: string;
    identifier: string;
};
export type SubAgentLinksResponseSchema = {
    sub_agent_links: SubAgentLinkResponseSchema[];
};
export type RefreshTokenResponseSchema = {
    access_token: string;
    refresh_token: string;
    token_type: string;
};
export type SSETokenEvent = {
    type: 'token';
    delta: string;
};
export type SSEMessageEvent = {
    type: 'message';
    role: string;
    content: string;
    messageId: string;
};
export type SSEToolCallEvent = {
    type: 'tool_call_start';
    toolName: string;
    args: Record<string, unknown>;
    runId: string;
};
export type SSEToolResultEvent = {
    type: 'tool_call_end';
    toolName: string;
    runId: string;
    resultPreview: string;
};
export type SSEDoneEvent = {
    type: 'done';
    conversationId: number;
};
export type SSEEvent = SSETokenEvent | SSEMessageEvent | SSEToolCallEvent | SSEToolResultEvent | SSEDoneEvent;
export declare class Client {
    private readonly apiUrl;
    private accessToken?;
    private refreshToken?;
    constructor(apiUrl: string, accessToken?: string, refreshToken?: string);
    refresh(): Promise<void>;
    createConversation(agentId: number | null, subject?: string, context?: object): Promise<CreateConversationResponseSchema>;
    updateConversation(conversationId: number, payload: UpdateConversationPayloadSchema): Promise<ConversationResponseSchema>;
    deleteConversation(conversationId: number): Promise<void>;
    getConversations(offset?: number, limit?: number, query?: string, agent?: number): Promise<GetConversationsResponseSchema>;
    getConversation(conversationId: number): Promise<GetConversationResponseSchema>;
    getMessages(conversationId: number, cursor?: string, limit?: number): Promise<GetMessagesResponseSchema>;
    uploadFile(conversationId: number, file: File): Promise<UploadFileResponseSchema>;
    getSubAgents(agentId: number): Promise<SubAgentLinksResponseSchema>;
    deleteFile(conversationId: number, fileId: string): Promise<void>;
    sendMessage(conversationId: number, content: string, fileIds?: string[]): Promise<SendMessageResponseSchema>;
    sendMessageStream(conversationId: number, content: string, fileIds?: string[]): AsyncGenerator<SSEEvent>;
    private buildRequestUrl;
    private buildRequestOptions;
    private doFetch;
    private doFetchStream;
    private parseSSEEvent;
}
