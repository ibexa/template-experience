import { ReactNode } from 'react';
interface IntlContextProviderProps {
    children: ReactNode;
    locale?: string;
    messages?: Record<string, string>;
}
export declare const IntlContextProvider: ({ locale, messages, children }: IntlContextProviderProps) => import("react").JSX.Element;
export {};
