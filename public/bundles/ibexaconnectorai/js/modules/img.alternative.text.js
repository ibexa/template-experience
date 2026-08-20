import ImgToText from '../core/img.to.text';

export default class ImgAlternativeText extends ImgToText {
    constructor(mainElement, extraConfig) {
        super(mainElement, extraConfig);

        this.requestHeaders = {
            Accept: 'application/vnd.ibexa.api.ai.AltText+json',
            'Content-Type': 'application/vnd.ibexa.api.ai.GenerateAltText+json',
        };

        this.getRequestBody = this.getRequestBody.bind(this);
        this.getResponseValue = this.getResponseValue.bind(this);
    }

    getRequestBody() {
        const inputValue = this.getInputValue();
        const body = {
            GenerateAltText: {
                Image: {
                    base64: inputValue,
                },
                RuntimeContext: {},
            },
        };

        if (this.aiConfig.languageCode) {
            body.GenerateAltText.RuntimeContext.languageCode = this.aiConfig.languageCode;
        }

        return JSON.stringify(body);
    }

    getResponseValue(response) {
        return response.AltText.Text.text[0];
    }
}
