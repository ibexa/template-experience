import { ConversationInterface } from '../../context/ConversationContext';
interface ConversationHistoryItemProps {
    active: boolean;
    conversation: ConversationInterface;
}
declare const ConversationHistoryItem: ({ active, conversation }: ConversationHistoryItemProps) => import("react").JSX.Element;
export default ConversationHistoryItem;
