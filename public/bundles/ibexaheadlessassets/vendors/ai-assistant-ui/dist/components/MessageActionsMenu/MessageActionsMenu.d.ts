import { MessageAction } from '../../types';
import { MessageInterface } from '../../adapter/Message';
interface MessageActionsMenuProps {
    actions: MessageAction[];
    message: MessageInterface;
}
declare const MessageActionsMenu: ({ actions, message }: MessageActionsMenuProps) => import("react").JSX.Element;
export default MessageActionsMenu;
