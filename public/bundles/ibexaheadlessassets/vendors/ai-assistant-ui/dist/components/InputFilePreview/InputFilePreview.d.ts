export interface InputFilePreviewProps {
    icon: React.ReactNode;
    name: string;
    type: string;
    onDelete?: () => void;
}
declare const InputFilePreview: ({ icon, name, type, onDelete }: InputFilePreviewProps) => import("react").JSX.Element;
export default InputFilePreview;
