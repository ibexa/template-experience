import { ErrorMessageInterface } from '../../adapter/Message/ErrorMessage';
import { MessageProps } from '../../MessageProps';
declare const ErrorMessage: ({ message }: MessageProps<ErrorMessageInterface>) => import("react").JSX.Element;
export default ErrorMessage;
