import { ReactNode } from 'react';
import { ErrorContextInterface } from '../context/ErrorContext';
import { InputPreviewRenderer } from '../context/InputPreviewRendererRegistryContext';
import { MessageRenderer } from '../context/MessageRendererRegistryContext';
import { ConfirmationMessageHandler } from '../context/ConfirmationMessageHandlerContext';
import { InputConfigCustom } from './InputConfigProvider';
import { AdapterInterface } from '../adapter';
import { Avatar, CurrentUser } from '../types';
interface ChatbotProvidersProps {
    errorFallbackHandler: (error: unknown) => void;
    locale?: string;
    translations?: Record<string, string>;
    errorMemo: ErrorContextInterface;
    onConfirmation: ConfirmationMessageHandler;
    avatarMemo: Avatar;
    currentUser: CurrentUser;
    hotkeys: Record<string, string>;
    messageComponents: Record<string, MessageRenderer>;
    inputPreviewComponents: Record<string, InputPreviewRenderer>;
    adapterKey: string;
    adapter: AdapterInterface;
    initialConversationId?: string;
    inputConfig?: InputConfigCustom;
    onConversationChange?: (conversationId: string | null) => void;
    children: ReactNode;
}
declare const ChatbotProviders: ({ errorFallbackHandler, locale, translations, errorMemo, onConfirmation, avatarMemo, currentUser, hotkeys, messageComponents, inputPreviewComponents, adapterKey, adapter, initialConversationId, inputConfig, onConversationChange, children, }: ChatbotProvidersProps) => import("react").JSX.Element;
export default ChatbotProviders;
