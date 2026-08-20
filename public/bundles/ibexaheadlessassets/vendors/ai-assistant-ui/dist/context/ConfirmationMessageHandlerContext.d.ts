export type ConfirmationMessageHandler = (message: string, { onConfirm }: {
    onConfirm: () => void;
}) => void;
export declare const defaultConfirmationHandler: ConfirmationMessageHandler;
export declare const ConfirmationMessageHandlerContext: import('react').Context<ConfirmationMessageHandler>;
