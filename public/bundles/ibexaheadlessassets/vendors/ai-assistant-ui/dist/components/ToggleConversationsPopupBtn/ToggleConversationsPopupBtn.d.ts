import { MouseEventHandler } from 'react';
interface ToggleConversationsPopupBtnProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    expanded?: boolean;
}
declare const ToggleConversationsPopupBtn: ({ disabled, expanded, onClick }: ToggleConversationsPopupBtnProps) => import("react").JSX.Element;
export default ToggleConversationsPopupBtn;
