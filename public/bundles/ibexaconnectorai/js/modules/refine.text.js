import TextToText from '../core/text.to.text';

export default class RefineText extends TextToText {
    constructor(mainElement, extraConfig) {
        super(mainElement, extraConfig);

        this.requestHeaders = {
            Accept: 'application/vnd.ibexa.api.ai.RefineText+json',
            'Content-Type': 'application/vnd.ibexa.api.ai.RefineText+json',
        };

        this.getRequestBody = this.getRequestBody.bind(this);
        this.getResponseValue = this.getResponseValue.bind(this);
    }

    getRequestBody() {
        const inputValue = this.getInputValue();
        const body = {
            RefineText: {
                Text: {
                    text: inputValue,
                },
                RuntimeContext: {},
            },
        };

        if (this.aiConfig.languageCode) {
            body.RefineText.RuntimeContext.languageCode = this.aiConfig.languageCode;
        }

        return JSON.stringify(body);
    }

    getResponseValue(response) {
        return response.RefineText.Text.text[0];
    }
}
