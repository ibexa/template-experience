interface SidebarToggleProps {
    onClick: () => void;
    toggled?: boolean;
}
declare const SidebarToggle: ({ toggled, onClick }: SidebarToggleProps) => import("react").JSX.Element;
export default SidebarToggle;
