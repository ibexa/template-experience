import { IconName } from '../../icons/iconsMap';
interface SuggestionListProps {
    onClick: (id: string, event: React.MouseEvent<HTMLButtonElement>) => void;
    items: {
        id: string;
        title: string;
        icon?: IconName;
    }[];
}
declare const SuggestionList: ({ items, onClick }: SuggestionListProps) => import("react").JSX.Element;
export default SuggestionList;
