import { AttachmentInterface } from '../../types';
export interface InputFilesListProps {
    files: AttachmentInterface[];
}
declare const InputFilesList: ({ files }: InputFilesListProps) => import("react").JSX.Element;
export default InputFilesList;
