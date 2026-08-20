import { MessageInterface } from './MessageInterface';
export interface VideoMessageInterface extends MessageInterface {
    type: 'video';
    url: string;
    fileType?: string;
}
