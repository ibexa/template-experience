import { InputConfigContextInterface } from '../context/InputConfigContext';
import { ReactNode } from 'react';
export interface InputConfigCustom {
    modes?: InputConfigContextInterface['modes'];
    text?: Partial<InputConfigContextInterface['text']>;
    file?: Partial<InputConfigContextInterface['file']>;
    voice?: Partial<InputConfigContextInterface['voice']>;
}
interface InputConfigProviderProps {
    config?: InputConfigCustom;
    children: ReactNode;
}
export declare const InputConfigProvider: ({ config, children }: InputConfigProviderProps) => import("react").JSX.Element;
export {};
