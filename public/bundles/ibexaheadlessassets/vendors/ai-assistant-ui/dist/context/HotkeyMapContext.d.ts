/**
 * HotkeysMap represents a simple mapping between action identifiers and one or more
 * hotkey definitions (e.g., 'ctrl+k, enter').
 *
 * This context is intentionally lightweight and does not register or manage listeners.
 * Components can read the mapping to display shortcuts, tooltips, or pass it to
 * dedicated hotkey managers.
 *
 * For a syntax reference, see: https://react-hotkeys-hook.vercel.app/docs/documentation/useHotkeys/basic-usage
 */
export type HotkeyMap = Record<string, string>;
export declare const HotkeyMapContext: import('react').Context<HotkeyMap>;
