export interface AssistantErrorInterface {
    getType(): string;
    getMessage(): string;
    getOriginalError(): Error | undefined;
}
export declare class AssistantError implements AssistantErrorInterface {
    private type;
    private message;
    private originalError?;
    constructor(type: string, message: string, originalError?: Error);
    getType(): string;
    getMessage(): string;
    getOriginalError(): Error | undefined;
}
