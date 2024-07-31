/// <reference types="vite/client" />
import { CSSProperties, FC, ReactNode } from 'react';
import { PartnersConfig } from '../config';
import type { PartialDeep } from 'type-fest';
type QntmAppSwitcherProps = {
    /**
     * Defines the UI of the app switcher hide/show button.
     *
     * _Defaults to a ["Dashboard" icon](https://www.radix-ui.com/icons) taking the currentColor._
     */
    buttonUI?: ReactNode;
    hideCloseButton?: boolean;
    hideFooter?: boolean;
    overlayColor?: CSSProperties['color'];
    partnersConfig?: PartialDeep<PartnersConfig>;
    customStyles?: CSSModuleClasses;
};
type getClassNamesFunction = (className: string) => string;
export declare const ThemeContext: import("react").Context<getClassNamesFunction>;
/**
 * The App Switcher is a button triggering a popover containing links to
 * different partners of the qntm group.
 */
export declare const QntmAppSwitcher: FC<QntmAppSwitcherProps>;
export {};
