import { OnMessageCallback } from './MessageEmitterInterface';
import { MessageInterface } from './Message';
import { OnConversationChangeCallback } from './ConversationEmitterInterface.ts';
export interface OnSendReturnInterface {
    result: boolean;
}
export interface GetHistoryResult {
    messages: MessageInterface[];
    nextCursor: string | null;
    hasMore: boolean;
}
export interface ConversationInterface {
    /**
     * Gets the unique identifier of the conversation
     *
     * @returns The conversation ID
     */
    getId(): string;
    /**
     * Gets the subject of the conversation
     *
     * @returns The conversation subject
     */
    getSubject(): string;
    /**
     * Sets the subject of the conversation
     *
     * @param subject The new subject
     */
    setSubject(subject: string): void;
    /**
     * Gets the creation date of the conversation
     *
     * @returns The creation date
     */
    getCreatedAt(): Date;
    /**
     * Gets the last updated date of the conversation
     *
     * @returns The last updated date
     */
    getUpdatedAt(): Date;
    /**
     * Registers a callback to be invoked when the conversation changes
     *
     * @param callback The callback to register
     * @returns A function to unregister the callback
     */
    onChange(callback: OnConversationChangeCallback): () => void;
    /**
     * Registers a callback to be invoked when a new message is received
     *
     * @param callback The callback to register
     * @returns A function to unregister the callback
     */
    onMessage(callback: OnMessageCallback): () => void;
    /**
     * Gets the message history from the agent
     *
     * @param cursor Optional cursor for pagination
     * @param limit Optional limit for number of messages to retrieve
     *
     * @returns Messages along with pagination info (nextCursor + hasMore)
     */
    getHistory(cursor?: string, limit?: number): Promise<GetHistoryResult>;
    /**
     * Sends a message to the agent and returns the agent's response
     *
     * @param id The id of the message to send to the agent
     * @param message The message to send to the agent
     * @param attachments Optional array of files to attach to the message
     */
    send(id: string, message: string, attachments?: File[], content?: string): Promise<OnSendReturnInterface>;
    /**
     * Replaces the conversation's context server-side, when supported
     *
     * @param context Key value pairs representing the context
     */
    setContext?(context: object): void | Promise<void>;
    /**
     * Uploads a file and attaches it to the conversation
     *
     * @param file The file to upload
     * @returns The server-assigned file UUID
     */
    uploadFile?(file: File): Promise<string>;
    /**
     * Deletes an uploaded file from the conversation
     *
     * @param fileId The server-assigned UUID of the file to delete
     */
    deleteFile?(fileId: string): Promise<void>;
}
