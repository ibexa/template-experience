import { MessageInterface } from './MessageInterface';
export interface ErrorMessageInterface extends MessageInterface {
    type: 'error';
    text: string;
}
