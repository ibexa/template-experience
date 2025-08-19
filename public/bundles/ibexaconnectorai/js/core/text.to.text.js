import BaseAIAssistantComponent from './base.ai.assistant.component';
import Textbox from '../../../../ui-dev/src/modules/ai-assistant/fields/textbox/textbox';
import Textarea from '../../../../ui-dev/src/modules/ai-assistant/fields/textarea/textarea';

export default class TextToText extends BaseAIAssistantComponent {
    constructor(mainElement, extraConfig) {
        super(mainElement, extraConfig);

        this.originalField = Textbox;
        this.replacedField = Textarea;
    }

    getInputValue() {
        return this.inputElement.value;
    }

    // eslint-disable-next-line no-unused-vars
    getResponseValue(response) {}

    getRequestBody() {}

    handleAIDialogConfirm(responseText) {
        this.inputElement.value = responseText;
        this.inputElement.dispatchEvent(new Event('input'));

        super.handleAIDialogClose(responseText);
    }
}
