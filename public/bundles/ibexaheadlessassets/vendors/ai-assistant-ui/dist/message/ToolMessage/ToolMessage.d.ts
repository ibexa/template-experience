import { ToolMessageInterface } from '../../adapter/Message/ToolMessage';
import { MessageProps } from '../../MessageProps';
declare const ToolMessage: ({ message }: MessageProps<ToolMessageInterface>) => import("react").JSX.Element;
export default ToolMessage;
