import { AssistantErrorInterface } from '../utils/Error';
export interface ErrorContextInterface {
    onError: (error: AssistantErrorInterface) => void;
}
export declare const ErrorContext: import('react').Context<ErrorContextInterface>;
