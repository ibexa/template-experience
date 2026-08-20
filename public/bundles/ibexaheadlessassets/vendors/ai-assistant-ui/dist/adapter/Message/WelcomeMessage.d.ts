import { MessageInterface } from './MessageInterface';
export interface SuggestionInterface {
    id: string;
    title: string;
    prompt: string;
}
export interface WelcomeMessageInterface extends MessageInterface {
    type: 'welcome';
    role: 'assistant';
    text: string;
    suggestions?: SuggestionInterface[];
}
export type WelcomeMessagePropsInterface = Pick<WelcomeMessageInterface, 'text' | 'suggestions'>;
