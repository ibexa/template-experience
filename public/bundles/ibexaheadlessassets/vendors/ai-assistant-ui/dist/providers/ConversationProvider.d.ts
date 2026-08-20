import { ReactNode } from 'react';
import { AdapterInterface } from '../adapter';
interface ConversationProviderProps {
    id?: string;
    adapter: AdapterInterface;
    onConversationChange?: (conversationId: string | null) => void;
    children: ReactNode;
}
export declare const ConversationProvider: ({ id, adapter, onConversationChange, children }: ConversationProviderProps) => import("react").JSX.Element;
export {};
