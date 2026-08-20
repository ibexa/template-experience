import { IconName } from '../../icons/iconsMap';
interface IconProps {
    name: IconName;
    size?: 'tiny' | 'small' | 'medium' | 'large';
    type?: 'primary';
}
declare const Icon: ({ name, size, type }: IconProps) => import("react").JSX.Element | null;
export default Icon;
