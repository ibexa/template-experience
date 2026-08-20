import { MouseEventHandler } from 'react';
import { IconName } from '../../icons/iconsMap';
interface SuggestionProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    title: string;
    icon?: IconName;
}
declare const Suggestion: ({ icon, onClick, title }: SuggestionProps) => import("react").JSX.Element;
export default Suggestion;
