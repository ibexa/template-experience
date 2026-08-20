export interface InputImagePreviewProps {
    imageUrl: string;
    onDelete?: () => void;
}
declare const InputImagePreview: ({ imageUrl, onDelete }: InputImagePreviewProps) => import("react").JSX.Element;
export default InputImagePreview;
