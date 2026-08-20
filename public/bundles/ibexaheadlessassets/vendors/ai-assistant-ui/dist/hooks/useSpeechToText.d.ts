interface UseSpeechToTextOptions {
    lang?: string;
}
interface UseSpeechToTextResult {
    isListening: boolean;
    startListening: () => void;
    stopListening: () => void;
    transcript: string;
}
declare const useSpeechToText: (options?: UseSpeechToTextOptions) => UseSpeechToTextResult;
export type { UseSpeechToTextOptions, UseSpeechToTextResult };
export default useSpeechToText;
