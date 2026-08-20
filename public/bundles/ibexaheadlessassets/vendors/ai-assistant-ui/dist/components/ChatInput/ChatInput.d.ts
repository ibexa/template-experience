import { InputAction, Agent } from '../../types';
interface ChatInputProps {
    onSend: () => void;
    disabled?: boolean;
    onUploadFile?: (file: File) => Promise<string | undefined>;
    onDeleteFile?: (id: string) => Promise<void>;
    inputActions?: InputAction[];
    fetchAgents?: (query: string) => Agent[] | Promise<Agent[]>;
}
declare const ChatInput: ({ onSend, disabled, inputActions, onUploadFile, onDeleteFile, fetchAgents }: ChatInputProps) => import("react").JSX.Element;
export default ChatInput;
