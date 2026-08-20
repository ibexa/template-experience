interface AvatarProps {
    imageUrl: string;
    name: string;
}
declare const Avatar: ({ imageUrl, name }: AvatarProps) => import("react").JSX.Element | null;
export default Avatar;
