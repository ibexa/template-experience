import { MessageInterface } from './MessageInterface';
export interface ImageMessageInterface extends MessageInterface {
    type: 'image';
    url: string;
}
