import { MessageInterface } from '../../adapter/Message';
type LoaderPlacement = 'content' | 'wrapper';
interface LoaderProps {
    isVisible: (message: MessageInterface) => boolean;
    render: (message: MessageInterface) => React.ReactNode;
}
interface MessageContainerProps {
    children: React.ReactNode;
    message: MessageInterface;
    className?: string;
    noPadding?: boolean;
    loaders?: {
        [key in LoaderPlacement]?: LoaderProps;
    };
}
declare const MessageContainer: ({ children, message, className, noPadding, loaders }: MessageContainerProps) => string | number | bigint | true | Iterable<import('react').ReactNode> | Promise<string | number | bigint | boolean | import('react').ReactPortal | import('react').ReactElement<unknown, string | import('react').JSXElementConstructor<any>> | Iterable<import('react').ReactNode> | null | undefined> | import("react").JSX.Element;
export default MessageContainer;
