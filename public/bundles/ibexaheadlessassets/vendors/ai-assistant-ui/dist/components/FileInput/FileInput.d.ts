import { AttachmentInterface } from '../../types';
interface FileInputProps {
    onUpload: (files: AttachmentInterface[]) => void;
    disabled?: boolean;
}
declare const FileInput: ({ onUpload, disabled }: FileInputProps) => import("react").JSX.Element;
export default FileInput;
