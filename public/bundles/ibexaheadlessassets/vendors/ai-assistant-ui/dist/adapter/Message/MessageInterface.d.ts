export type Sender = 'assistant' | 'user' | 'tool';
export type MessageStatus = 'pending' | 'done' | 'failed';
/**
 * Interface representing a message in the agent's conversation
 */
export interface MessageInterface {
    id: string;
    serverId: string | null;
    type: string;
    role: Sender;
    status: MessageStatus;
}
