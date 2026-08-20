interface FullScreenButtonProps {
    onClick: () => void;
    fullScreen?: boolean;
}
declare const FullscreenToggle: ({ fullScreen, onClick }: FullScreenButtonProps) => import("react").JSX.Element;
export default FullscreenToggle;
