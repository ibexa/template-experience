import { MessageInterface } from '../../adapter/Message';
interface ChatMessagesProps {
    conversationId: string;
    messages: MessageInterface[];
    draft?: boolean;
    loading?: boolean;
    endOfResults?: boolean;
    onNextPage: () => Promise<{
        done: boolean;
    }>;
}
declare const ChatMessages: ({ conversationId, draft, loading, messages, onNextPage, endOfResults, }: ChatMessagesProps) => import("react").JSX.Element;
export default ChatMessages;
