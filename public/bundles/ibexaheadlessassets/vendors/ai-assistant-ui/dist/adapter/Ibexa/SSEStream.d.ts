import { Stream, TextMessageChunk } from '../Message';
import { SSEEvent, SSEToolCallEvent, SSEToolResultEvent } from './Client';
export type StreamEndData = {
    messageId: string;
    conversationId: number;
};
export type StreamEndCallback = (data: Partial<StreamEndData>) => void;
export type ToolEventCallback = (event: SSEToolCallEvent | SSEToolResultEvent) => void;
/**
 * Implements the Stream interface for Ibexa Orchestration Engine SSE responses.
 *
 * Consumption starts eagerly in the constructor so that tool_call events are
 * processed (and their messages emitted) before the streaming response bubble
 * appears in the UI. The optional `onReady` callback fires right before the
 * first token chunk is delivered — use it to emit the assistant response
 * message to ensure it appears *after* any tool messages.
 */
export declare class SSEStream implements Stream<TextMessageChunk> {
    private readonly generator;
    private endCallback;
    private readonly toolCallback;
    private readonly onReadyCallback;
    private endCallbackFired;
    private readyFired;
    private streamDone;
    private endData;
    private tokenBuffer;
    private consumerCallback;
    constructor(generator: AsyncGenerator<SSEEvent>, onEndCallback?: StreamEndCallback, onToolEvent?: ToolEventCallback, onReady?: () => void);
    consume(callback: (data: TextMessageChunk) => void): void;
    onEnd(callback: () => void): void;
    private fireReady;
    private fetchNext;
}
