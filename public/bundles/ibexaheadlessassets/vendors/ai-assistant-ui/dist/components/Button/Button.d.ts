import { AriaAttributes, MouseEventHandler, ReactNode } from 'react';
interface ButtonProps {
    children: ReactNode;
    title: string;
    className?: string;
    disabled?: boolean;
    labelled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    size?: 'medium' | 'large';
    'data-testid'?: string;
    'aria-haspopup'?: AriaAttributes['aria-haspopup'];
    'aria-expanded'?: AriaAttributes['aria-expanded'];
}
declare const Button: ({ children, labelled, onClick, title, size, className, disabled, "data-testid": testId, "aria-haspopup": ariaHasPopup, "aria-expanded": ariaExpanded, }: ButtonProps) => import("react").JSX.Element;
export default Button;
