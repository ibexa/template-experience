import { MessageProps } from '../MessageProps.ts';
import { StreamedTextMessageInterface } from '../adapter/Message';
declare const StreamedTextMessage: ({ message }: MessageProps<StreamedTextMessageInterface>) => import("react").JSX.Element;
export default StreamedTextMessage;
