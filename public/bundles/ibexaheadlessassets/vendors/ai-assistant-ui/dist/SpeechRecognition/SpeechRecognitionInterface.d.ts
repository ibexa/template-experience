export interface SpeechRecognitionClassInterface {
    new (options?: {
        lang?: string;
    }): SpeechRecognitionInterface;
    isSupported(): boolean;
}
export interface SpeechRecognitionInterface {
    /**
     * Starts the speech recognition service, listening to incoming audio and processing it.
     */
    start(): void;
    /**
     * Stops the speech recognition service from listening to incoming audio and processing it.
     */
    stop(): void;
    /**
     * Registers a callback function to be called when the speech recognition service has ended.
     *
     * @param callback The function to call when the service ends
     *
     * @return A function to unregister the callback
     */
    onEnd(callback: () => void): () => void;
    /**
     * Registers a callback function to be called when an error occurs in the speech recognition service.
     *
     * @param callback The function to call with the error object
     *
     * @return A function to unregister the callback
     */
    onError(callback: (error: Error) => void): () => void;
    /**
     * Registers a callback function to be called when a new transcript is available.
     *
     * @param callback The function to call with the new transcript text
     *
     * @return A function to unregister the callback
     */
    onTranscript(callback: (transcript: string) => void): () => void;
}
