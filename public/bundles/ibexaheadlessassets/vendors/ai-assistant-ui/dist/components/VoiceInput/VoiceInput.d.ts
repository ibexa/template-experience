interface VoiceInputProps {
    disabled?: boolean;
    onListeningChange?: (isListening: boolean) => void;
    onConfirm?: () => void;
    onDiscard?: () => void;
}
declare const VoiceInput: ({ disabled, onListeningChange, onConfirm, onDiscard }: VoiceInputProps) => import("react").JSX.Element;
export default VoiceInput;
