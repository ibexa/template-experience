import { SpeechRecognitionInterface } from './SpeechRecognitionInterface';
declare class NativeSpeechRecognition implements SpeechRecognitionInterface {
    private recognition;
    constructor(options?: {
        lang?: string;
    });
    static isSupported(): boolean;
    start(): void;
    stop(): void;
    onEnd(callback: () => void): () => void;
    onError(callback: (error: Error) => void): () => void;
    onTranscript(callback: (transcript: string) => void): () => void;
}
export default NativeSpeechRecognition;
