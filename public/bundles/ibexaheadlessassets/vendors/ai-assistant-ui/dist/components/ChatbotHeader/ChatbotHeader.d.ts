import { MouseEventHandler } from 'react';
interface ChatbotHeaderProps {
    onClose: MouseEventHandler<HTMLButtonElement>;
    onFullscreenChange: () => void;
    onNewConversation: () => void;
    title: string;
    newConversationVisible?: boolean;
    fullscreenVisible?: boolean;
    closeVisible?: boolean;
    fullscreen: boolean;
}
declare const ChatbotHeader: ({ newConversationVisible, fullscreenVisible, closeVisible, fullscreen, onClose, onFullscreenChange, onNewConversation, title, }: ChatbotHeaderProps) => import("react").JSX.Element;
export default ChatbotHeader;
