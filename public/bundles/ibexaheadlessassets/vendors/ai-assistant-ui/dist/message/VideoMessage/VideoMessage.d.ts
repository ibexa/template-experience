import { VideoMessageInterface } from '../../adapter/Message/VideoMessage';
import { MessageProps } from '../../MessageProps';
declare const VideoMessage: ({ message }: MessageProps<VideoMessageInterface>) => import("react").JSX.Element;
export default VideoMessage;
