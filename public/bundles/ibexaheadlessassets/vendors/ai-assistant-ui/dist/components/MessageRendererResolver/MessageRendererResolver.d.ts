import { MessageInterface } from '../../adapter/Message';
interface MessageRendererResolverProps {
    message: MessageInterface;
    type: string;
}
declare const MessageRendererResolver: ({ message, type }: MessageRendererResolverProps) => import('react').ReactNode;
export default MessageRendererResolver;
