export declare const endsWithWhitespace: (str: string) => boolean;
/**
 * Derives up to two uppercase initials from a name.
 * For example, 'Ada Lovelace' => 'AL', 'Alan' => 'A'.
 *
 * @param name - The name to derive initials from.
 *
 * @returns The uppercase initials, or an empty string if the name is blank.
 */
export declare const getInitials: (name: string) => string;
/**
 * Converts snake_case tokens within a string to title case words.
 * Non-snake_case parts of the string are left unchanged.
 * For example, 'Using tool language_tool' => 'Using tool Language Tool'.
 *
 * @param str - The string containing snake_case tokens to convert.
 *
 * @returns The string with snake_case tokens replaced by title case words.
 */
export declare const getMessageWithToolFriendlyName: (str: string) => string;
/**
 * Humanizes a hotkey string by splitting it into individual hotkeys, humanizing each one,
 * and then joining them back together. For example, 'ctrl+shift+n' => 'Ctrl + Shift + N'.
 *
 * @param hotkey - The hotkey string to humanize, which may contain multiple keys separated by '+'.
 *
 * @returns The humanized hotkey string.
 */
export declare const humanizeHotkey: (hotkey: string) => string;
/**
 * Humanizes a hotkey string by splitting it into individual hotkeys, humanizing each one,
 * and then joining them back together. For example, 'enter, ctrl+enter' => 'Enter, Ctrl + Enter'.
 *
 * @param hotkeys - The hotkey string to humanize, which may contain multiple hotkeys separated by commas.
 *
 * @returns The humanized hotkey string.
 */
export declare const humanizeHotkeys: (hotkeys: string) => string;
/**
 * Formats a tooltip by appending the hotkey in parentheses if it exists.
 * Hotkey is humanized, e.g., 'ctrl+shift+n' => 'Ctrl + Shift + N'.
 * Supports multiple combos separated by commas: 'enter, ctrl+enter' => 'Enter, Ctrl + Enter'.
 *
 * @param tooltip - The original tooltip text.
 * @param hotkey - The hotkey to append to the tooltip.
 *
 * @returns The formatted tooltip with the hotkey appended if it exists.
 */
export declare const formatTooltipWithHotkey: (tooltip: string, hotkey: string) => string;
