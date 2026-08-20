import { default as NativeSpeechRecognition } from '../SpeechRecognition/NativeSpeechRecognition';
import { SpeechRecognitionClassInterface } from '../SpeechRecognition/SpeechRecognitionInterface';
import { InputMode, TextareaGrowth } from '../types';
export declare const DEFAULT_INPUT_CONFIG: {
    modes: InputMode[];
    SpeechRecognitionClass: typeof NativeSpeechRecognition;
    text: {
        maxLength: number;
        growth: TextareaGrowth;
    };
    file: {
        maxSize: number;
        allowedTypes: string[];
    };
    voice: {
        lang: string;
    };
};
export declare const DEFAULT_INPUT_CONFIG_CONTEXT: {
    inputRef: {
        set: () => void;
        get: () => null;
    };
    modes: InputMode[];
    SpeechRecognitionClass: typeof NativeSpeechRecognition;
    text: {
        maxLength: number;
        growth: TextareaGrowth;
    };
    file: {
        maxSize: number;
        allowedTypes: string[];
    };
    voice: {
        lang: string;
    };
};
export interface InputConfigContextInterface {
    modes: InputMode[];
    SpeechRecognitionClass: SpeechRecognitionClassInterface;
    text: {
        maxLength: number;
        growth: TextareaGrowth;
    };
    file: {
        maxSize: number;
        allowedTypes: string[];
    };
    voice: {
        lang: string;
    };
    inputRef: {
        set: (ref: HTMLElement | null) => void;
        get: () => HTMLElement | null;
    };
}
export declare const InputConfigContext: import('react').Context<InputConfigContextInterface>;
