declare const useError: (errorCallback?: () => void) => {
    onCreateConversationError: (error: Error, message?: string) => void;
    onDeleteConversationError: (error: Error, message?: string) => void;
    onInitializeError: (error: Error, message?: string) => void;
    onLoadMessagesError: (error: Error, message?: string) => void;
    onSendMessageError: (error: Error, message?: string) => void;
    onUploadFileError: (error: Error, message?: string) => void;
    onError: (error: Error, message: string, type: string) => void;
};
export default useError;
