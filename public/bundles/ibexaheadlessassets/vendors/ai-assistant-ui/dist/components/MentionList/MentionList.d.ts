import { Agent } from '../../types';
export interface MentionListHandle {
    handleKeyDown(event: KeyboardEvent): boolean;
}
interface MentionListProps {
    items: Agent[];
    loading: boolean;
    command: (item: Agent) => void;
    rect: DOMRect | null;
}
declare const MentionList: import('react').ForwardRefExoticComponent<MentionListProps & import('react').RefAttributes<MentionListHandle>>;
export default MentionList;
