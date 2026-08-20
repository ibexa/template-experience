import { DependencyList, RefCallback } from 'react';
export default function useNamedHotkey<T extends HTMLElement>(name: string, callback: (keyboardEvent: KeyboardEvent) => void, options?: Record<string, unknown> | DependencyList, dependencies?: Record<string, unknown> | DependencyList): RefCallback<T | null>;
