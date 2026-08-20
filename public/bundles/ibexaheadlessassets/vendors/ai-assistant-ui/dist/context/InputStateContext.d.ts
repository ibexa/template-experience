import { Dispatch, SetStateAction } from 'react';
import { AttachmentInterface } from '../types';
export declare const LOCKS: {
    readonly SEND_MESSAGE: "send-message";
    readonly VOICE_INPUT: "voice-input";
    readonly INPUT: "input";
};
export interface InputStateSendContextInterface {
    addLock: (id: string) => void;
    removeLock: (id: string) => void;
    toggleLock: (id: string, forceDisabled?: boolean) => void;
    hasLock: (id: string) => boolean;
    isLocked: () => boolean;
}
export type InputStateTextContextInterface = [string, Dispatch<SetStateAction<string>>];
export type InputStateFileContextInterface = [AttachmentInterface[], Dispatch<SetStateAction<AttachmentInterface[]>>];
export declare const InputStateSendContext: import('react').Context<InputStateSendContextInterface>;
export declare const InputStateTextContext: import('react').Context<InputStateTextContextInterface>;
export declare const InputStateFileContext: import('react').Context<InputStateFileContextInterface>;
