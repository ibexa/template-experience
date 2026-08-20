import { MessageInterface } from './MessageInterface';
export interface ToolMessageInterface extends MessageInterface {
    type: 'tool';
    role: 'tool';
    text: string;
}
