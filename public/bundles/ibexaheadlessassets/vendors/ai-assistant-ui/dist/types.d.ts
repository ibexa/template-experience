import { ReactNode } from 'react';
import { MessageInterface } from './adapter/Message';
export type Layout = 'floating' | 'sidebar' | 'embedded' | 'fullscreen';
export declare const DEFAULT_LAYOUT: Layout;
interface Avatar {
    name: string;
    imageUrl?: string | null;
}
interface CurrentUser {
    id: string;
    name: string;
    imageUrl?: string | null;
}
interface AttachmentInterface {
    file: File;
    id: string;
}
export type InputMode = 'text' | 'voice' | 'file';
export declare const DEFAULT_INPUT_MODES: InputMode[];
export type TextareaGrowth = 'fixed' | 'growth';
interface InputAction {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    shortcut?: string;
    priority?: number;
}
interface MessageAction {
    label: string;
    icon?: ReactNode;
    onClick: (message: MessageInterface) => void;
}
export interface Agent {
    id: string;
    label: string;
    link: string;
}
export type { Avatar, CurrentUser, AttachmentInterface, InputAction, MessageAction };
