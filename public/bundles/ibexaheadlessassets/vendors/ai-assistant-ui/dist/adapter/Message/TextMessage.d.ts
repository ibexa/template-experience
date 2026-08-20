import { MessageInterface } from './MessageInterface';
export interface TextMessageInterface extends MessageInterface {
    type: 'text';
    text: string;
}
