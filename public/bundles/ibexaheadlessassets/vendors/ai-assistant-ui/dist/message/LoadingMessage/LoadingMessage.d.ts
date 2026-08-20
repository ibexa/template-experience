import { MessageInterface } from '../../adapter/Message/MessageInterface';
import { MessageProps } from '../../MessageProps';
declare const LoadingMessage: ({ message }: MessageProps<MessageInterface>) => import("react").JSX.Element;
export default LoadingMessage;
