import { MessageInterface } from './MessageInterface.ts';
/**
 * Interface representing a stream of data, allowing for consumption of data as it becomes available.
 */
export interface Stream<T> {
    consume(callback: (data: T) => void): void;
    onEnd(callback: () => void): void;
}
export interface TextMessageChunk {
    id: string;
    type: string;
    text: string;
}
export interface StreamedTextMessageInterface extends MessageInterface {
    type: 'streamed_text';
    stream: Stream<TextMessageChunk>;
}
