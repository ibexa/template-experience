import { TextMessageInterface } from '../../adapter/Message/TextMessage';
import { MessageProps } from '../../MessageProps';
declare const TextMessage: ({ message }: MessageProps<TextMessageInterface>) => import("react").JSX.Element;
export default TextMessage;
