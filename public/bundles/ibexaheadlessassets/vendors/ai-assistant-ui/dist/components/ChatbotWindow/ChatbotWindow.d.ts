import { SuggestionInterface } from '../../adapter/Message';
import { Agent, InputAction, Layout, MessageAction } from '../../types';
interface ChatWindowProps {
    layout: Layout;
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    allowConversationManagement?: boolean;
    allowFullscreen?: boolean;
    backdrop?: boolean;
    closeable?: boolean;
    height?: string | number;
    fetchAgents?: (query: string) => Agent[] | Promise<Agent[]>;
    inputActions?: InputAction[];
    messageActions?: MessageAction[];
    position?: {
        x?: string | number;
        y?: string | number;
    };
    welcomeMessage?: string;
    welcomeMessageSuggestions?: SuggestionInterface[];
    width?: string | number;
}
declare const ChatbotWindow: ({ allowConversationManagement, allowFullscreen, backdrop, closeable, fetchAgents, height, inputActions, messageActions, layout, open, position, setOpen, title, welcomeMessage, welcomeMessageSuggestions, width, }: ChatWindowProps) => import("react").JSX.Element | null;
export default ChatbotWindow;
