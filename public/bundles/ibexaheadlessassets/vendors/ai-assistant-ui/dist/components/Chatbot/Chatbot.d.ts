import { InputPreviewRenderer } from '../../context/InputPreviewRendererRegistryContext';
import { MessageRenderer } from '../../context/MessageRendererRegistryContext';
import { InputConfigCustom } from '../../providers/InputConfigProvider';
import { ConfirmationMessageHandler } from '../../context/ConfirmationMessageHandlerContext';
import { AssistantErrorInterface } from '../../utils/Error';
import { SuggestionInterface } from '../../adapter/Message';
import { AdapterInterface } from '../../adapter';
import { Avatar, CurrentUser, Layout, InputAction, MessageAction } from '../../types';
interface AssistantProps {
    adapter: AdapterInterface;
    locale?: string;
    title?: string;
    allowConversationManagement?: boolean;
    allowFullscreen?: boolean;
    avatar?: Avatar;
    /**
     * Displays a dimmed backdrop behind the assistant window.
     *
     * When enabled, clicking the backdrop closes the assistant (unless it is non-closeable),
     * which in turn fires `onOpenChange`. Has no effect for the `embedded` layout.
     *
     * @default false
     *
     * @example
     * <Assistant backdrop onOpenChange={(isOpen) => console.log(isOpen)} />
     */
    backdrop?: boolean;
    closeable?: boolean;
    currentUser?: CurrentUser;
    height?: number | string;
    initialConversationId?: string;
    inputConfig?: InputConfigCustom;
    isOpen?: boolean;
    layout?: Layout;
    messageComponents?: Record<string, MessageRenderer>;
    inputPreviewComponents?: Record<string, InputPreviewRenderer>;
    translations?: Record<string, string>;
    onConfirmation?: ConfirmationMessageHandler;
    onError?: (error: AssistantErrorInterface) => void;
    /**
     * Called whenever the active conversation changes.
     *
     * Use this to persist the conversation state in the host application (e.g. user settings),
     * so the same conversation can be restored on the next page load via `initialConversationId`.
     *
     * @param conversationId - The server-side ID of the newly active conversation,
     *   or `null` when a new (not yet persisted) draft conversation is started.
     *
     * @example
     * <Assistant
     *   onConversationChange={(id) => saveToUserSettings('conversationId', id)}
     * />
     */
    onConversationChange?: (conversationId: string | null) => void;
    /**
     * Called whenever the assistant open/closed state changes.
     *
     * Use this to persist the state in the host application (e.g. user settings),
     * or to keep external UI in sync with the assistant visibility.
     *
     * @param isOpen - `true` when the assistant window has just opened, `false` when it closed.
     *
     * @example
     * // Persist open state across page reloads
     * <Assistant
     *   onOpenChange={(isOpen) => saveToUserSettings('chatbotOpen', isOpen)}
     * />
     */
    onOpenChange?: (isOpen: boolean) => void;
    /**
     * Called when the assistant transitions from open to closed.
     *
     * Note: the assistant cannot be closed in always-open layouts (e.g. `embedded`, `fullscreen`),
     * and close interactions are disabled when `closeable` is `false`, so this callback will not
     * fire in those cases.
     *
     * @example
     * <Assistant onClose={() => trackEvent('assistant_closed')} />
     */
    onClose?: () => void;
    /**
     * Additional actions listed in the chat input actions menu.
     *
     * The actions are collected in a dropdown menu opened from the "+" button next
     * to the chat input, alongside the built-in file attachment action. Use this to
     * add custom actions such as "Select content", "Select product", or "Select asset".
     *
     * @example
     * <Assistant
     *   inputActions={[
     *     {
     *       label: 'Select content',
     *       onClick: () => openContentPicker(),
     *     },
     *   ]}
     * />
     */
    inputActions?: InputAction[];
    /**
     * Action buttons rendered below each message balloon on hover.
     *
     * Each action receives the message as context in its `onClick` handler,
     * allowing actions like Copy, Fork Conversation, or Give Feedback
     * to operate on the specific message.
     *
     * @example
     * <Assistant
     *   messageActions={[
     *     {
     *       label: 'Copy',
     *       icon: <CopyIcon />,
     *       onClick: (message) => copyToClipboard(message),
     *     },
     *   ]}
     * />
     */
    messageActions?: MessageAction[];
    position?: {
        x?: number | string;
        y?: number | string;
    };
    welcomeMessage?: string;
    welcomeMessageSuggestions?: SuggestionInterface[];
    width?: number | string;
    hotkeys?: Record<string, string>;
}
declare const Assistant: import('react').ForwardRefExoticComponent<AssistantProps & import('react').RefAttributes<unknown>>;
export default Assistant;
