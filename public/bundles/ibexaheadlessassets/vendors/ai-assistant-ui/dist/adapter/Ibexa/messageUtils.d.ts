export declare function extractLastExchange<T extends {
    role: string;
}>(messages: T[]): {
    userMessage: T | undefined;
    toolMessages: T[];
    replies: T[];
};
