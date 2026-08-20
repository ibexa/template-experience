import { AnyExtension } from '@tiptap/core';
import { MentionListHandle } from '../components/MentionList';
import { Agent } from '../types';
export interface MentionPopup {
    items: Agent[];
    loading: boolean;
    command: (item: Agent) => void;
    rect: DOMRect | null;
}
export declare function useMention(fetchAgents?: (query: string) => Agent[] | Promise<Agent[]>): {
    mentionExtensionRef: import('react').RefObject<AnyExtension | null>;
    mentionListRef: import('react').RefObject<MentionListHandle | null>;
    mentionPopup: MentionPopup | null;
    mentionActiveRef: import('react').RefObject<boolean>;
};
