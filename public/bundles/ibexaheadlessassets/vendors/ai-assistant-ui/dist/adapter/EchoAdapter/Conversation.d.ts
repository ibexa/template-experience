import { AbstractConversation } from '../AbstractConversation';
import { GetHistoryResult, OnSendReturnInterface } from '../ConversationInterface';
import { MessageInterface } from '../Message';
export declare class Conversation extends AbstractConversation {
    private messages;
    constructor({ id, subject, messages }: {
        id: string;
        subject?: string;
        messages?: MessageInterface[];
    });
    getSubject(): string;
    private simulateRequestDelay;
    private createAttachmentMessage;
    getHistory(cursor?: string, limit?: number): Promise<GetHistoryResult>;
    send(id: string, message: string, attachments?: File[]): Promise<OnSendReturnInterface>;
}
