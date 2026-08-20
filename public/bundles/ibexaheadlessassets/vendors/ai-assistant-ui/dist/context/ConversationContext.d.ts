import { ConversationInterface as ConversationServiceInterface } from '../adapter';
export interface ConversationInterface {
    id: string;
    serverId?: string;
    subject: string;
    service: ConversationServiceInterface;
    draft: false;
}
export interface DraftConversationInterface {
    id: string;
    subject: string;
    draft: true;
}
export type CurrentConversationInterface = ConversationInterface | DraftConversationInterface;
export interface ConversationContextInterface {
    currentConversation: CurrentConversationInterface;
    setCurrentConversation: (conversation: CurrentConversationInterface | null) => void;
    newConversation: (id?: string, input?: string, files?: File[], content?: string) => Promise<ConversationInterface>;
    conversations: ConversationInterface[];
    conversationsContextId: string;
    isLoadingConversations: boolean;
    deleteConversation: (conversation: ConversationInterface) => Promise<void>;
    loadMoreConversations: (limit?: number) => Promise<ConversationInterface[] | void>;
    searchConversations: (params: {
        query?: string;
    }) => void;
    onResetSearch: (callback?: () => void) => void;
    resetSearch: () => void;
    searchConversationsEnabled: boolean;
}
export declare const ConversationContext: import('react').Context<ConversationContextInterface>;
