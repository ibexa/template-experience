import { MouseEventHandler } from 'react';
interface CloseButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    withBackground?: boolean;
}
declare const CloseButton: ({ onClick, withBackground }: CloseButtonProps) => import("react").JSX.Element;
export default CloseButton;
