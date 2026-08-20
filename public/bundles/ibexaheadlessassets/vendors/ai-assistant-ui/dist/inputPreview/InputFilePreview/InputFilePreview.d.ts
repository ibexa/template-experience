import { default as React } from 'react';
import { AttachmentInterface } from '../../types';
interface fileTypeConfigInterface {
    icon: React.ReactNode;
    label: string;
}
export interface InputFilePreviewWrapperProps {
    attachment: AttachmentInterface;
    fileTypeMap?: Record<string, fileTypeConfigInterface>;
}
declare const InputFilePreviewWrapper: ({ attachment, fileTypeMap }: InputFilePreviewWrapperProps) => React.JSX.Element;
export default InputFilePreviewWrapper;
