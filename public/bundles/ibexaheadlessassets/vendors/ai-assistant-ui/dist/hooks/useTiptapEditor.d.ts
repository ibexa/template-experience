import { AnyExtension } from '@tiptap/core';
interface UseTiptapEditorOptions {
    inputText: string;
    setInputText: React.Dispatch<React.SetStateAction<string>>;
    onSend?: () => void;
    disabled?: boolean;
    maxLength?: number;
    extraExtensionsRef?: React.RefObject<AnyExtension | null>;
    inputRef: {
        set: (el: HTMLElement | null) => void;
    };
    isSuggestionActiveRef?: React.RefObject<boolean>;
}
export declare function useTiptapEditor({ inputText, setInputText, onSend, disabled, maxLength, extraExtensionsRef, inputRef, isSuggestionActiveRef, }: UseTiptapEditorOptions): {
    containerRef: import('react').RefObject<HTMLDivElement | null>;
};
export {};
