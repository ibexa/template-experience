export type getClassNamesFunction = (className: string) => string;
export declare const ThemeContext: import('react').Context<getClassNamesFunction>;
export declare const useThemeContext: () => getClassNamesFunction;
