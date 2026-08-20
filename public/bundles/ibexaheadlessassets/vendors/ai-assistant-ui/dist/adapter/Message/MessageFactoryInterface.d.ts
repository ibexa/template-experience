import { Sender, MessageStatus, MessageInterface } from './MessageInterface.ts';
import { TextMessageInterface } from './TextMessage.ts';
import { VideoMessageInterface } from './VideoMessage.ts';
import { SuggestionInterface, WelcomeMessageInterface } from './WelcomeMessage.ts';
import { StreamedTextMessageInterface, Stream, TextMessageChunk } from './StreamedTextMessage.ts';
import { ImageMessageInterface } from './ImageMessage.ts';
import { CompoundMessageInterface } from './CompoundMessage.ts';
import { ErrorMessageInterface } from './ErrorMessage.ts';
import { ToolMessageInterface } from './ToolMessage.ts';
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
/**
 * Interface for a factory that creates MessageInterface instances based on a type and data.
 */
export interface MessageFactoryInterface {
    /**
     * Finalizes a message by setting its server ID and status to 'done'.
     *
     * @param message The message to finalize
     * @param serverId The server ID to assign to the message
     * @param overrides Optional partial message properties to override in the finalized message
     * @return The finalized message
     */
    finalizeMessage<T extends MessageInterface>(message: MessageInterface, serverId: string, overrides?: Partial<T>): T;
    /**
     * Creates a Loading Message instance.
     *
     * @param id The unique identifier for the message
     * @param role The sender role (e.g., 'user' or 'assistant')
     * @return A Loading Message instance
     */
    createLoadingMessage(id: string, role: Sender): MessageInterface;
    /**
     * Creates a No Handler Message instance.
     *
     * @param id The unique identifier for the message
     * @param role The sender role (e.g., 'user' or 'assistant')
     * @param text The text content of the message
     * @return A No Handler Message instance
     */
    createErrorMessage(id: string, role: Sender, text: string): ErrorMessageInterface;
    /**
     * Creates a Text Message instance.
     *
     * @param id The unique identifier for the message
     * @param role The sender role (e.g., 'user' or 'assistant')
     * @param text The text content of the message
     * @return A Text Message instance
     */
    createTextMessage(id: string, role: Sender, text: string, status?: MessageStatus): TextMessageInterface;
    /**
     * Creates a Streamed Text Message instance.
     *
     * @param id The unique identifier for the message
     * @param role The sender role (e.g., 'user' or 'assistant')
     * @param stream A stream of TextMessageChunk objects representing the streamed text content
     *
     * @return A Streamed Text Message instance
     */
    createStreamedTextMessage(id: string, role: Sender, stream: Stream<TextMessageChunk>, status?: MessageStatus): StreamedTextMessageInterface;
    /**
     * Creates a Video Message instance.
     *
     * @param id The unique identifier for the message
     * @param role The sender role (e.g., 'user' or 'assistant')
     * @param url The URL of the video content
     * @param fileType Optional type of the video URL (e.g., 'video/mp4', 'video/ogg')
     * @return A Video Message instance
     */
    createVideoMessage(id: string, role: Sender, url: string, status?: MessageStatus, fileType?: string): VideoMessageInterface;
    /**
     * Creates a Welcome Message instance.
     *
     * @param text The text content of the welcome message
     * @param suggestions Optional array of suggestions to include with the welcome message
     * @return A Welcome Message instance
     */
    createWelcomeMessage(text: string, suggestions?: SuggestionInterface[]): WelcomeMessageInterface;
    /**
     * Creates an Image Message instance.
     *
     * @param id The unique identifier for the message
     * @param role The sender role (e.g., 'user' or 'assistant')
     * @param url The URL of the image content
     * @return An Image Message instance
     */
    createImageMessage(id: string, role: Sender, url: string, status?: MessageStatus): ImageMessageInterface;
    /**
     * Creates a Compound Message instance that contains multiple messages.
     *
     * @param id The unique identifier for the compound message
     * @param role The sender role (e.g., 'user' or 'assistant')
     * @param messages An array of MessageInterface instances to include in the compound message
     * @return A Compound Message instance
     */
    createCompoundMessage(id: string, role: Sender, messages: MessageInterface[], status?: MessageStatus): CompoundMessageInterface;
    /**
     * Creates a Tool Message instance.
     *
     * @param id The unique identifier for the message
     * @param text The text content describing the tool call
     * @return A Tool Message instance
     */
    createToolMessage(id: string, text: string, status?: MessageStatus): ToolMessageInterface;
}
