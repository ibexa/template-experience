import { HotkeyMap } from '../context/HotkeyMapContext.ts';
import { ReactNode } from 'react';
interface HotkeyMapProviderProps {
    hotkeys?: HotkeyMap;
    children: ReactNode;
}
export declare const HotkeyMapProvider: ({ hotkeys, children }: HotkeyMapProviderProps) => import("react").JSX.Element;
export {};
