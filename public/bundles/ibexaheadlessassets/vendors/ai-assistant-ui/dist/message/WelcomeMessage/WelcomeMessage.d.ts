import { WelcomeMessageInterface } from '../../adapter/Message';
import { MessageProps } from '../../MessageProps';
declare const WelcomeMessage: ({ message }: MessageProps<WelcomeMessageInterface>) => import("react").JSX.Element;
export default WelcomeMessage;
