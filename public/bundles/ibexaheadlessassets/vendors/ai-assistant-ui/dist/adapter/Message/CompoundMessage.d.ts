import { MessageInterface } from './MessageInterface';
export interface CompoundMessageInterface extends MessageInterface {
    type: 'compound';
    messages: MessageInterface[];
}
