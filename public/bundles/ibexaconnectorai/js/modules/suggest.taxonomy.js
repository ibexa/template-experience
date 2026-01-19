import TextToTags from '../core/text.to.tags';

export default class SuggestTaxonomy extends TextToTags {
    constructor(mainElement, extraConfig) {
        super(mainElement, extraConfig);

        this.taxonomyIdentifier = mainElement.dataset.taxonomyIdentifier;

        this.requestHeaders = {
            Accept: 'application/vnd.ibexa.api.ai.SuggestTaxonomy+json',
            'Content-Type': 'application/vnd.ibexa.api.ai.SuggestTaxonomy+json',
        };

        this.getRequestBody = this.getRequestBody.bind(this);
        this.getResponseValue = this.getResponseValue.bind(this);
    }

    getFieldTypeParser(fieldTypeId) {
        const fieldParser = window?.ibexa?.aiAssistant?.modules?.SuggestTaxonomy?.fieldTypeParsers?.[fieldTypeId];

        return fieldParser || (({ value }) => value);
    }

    getSourceFieldValue(config) {
        const node = window.document.querySelector(config.domID);
        const parser = this.getFieldTypeParser(config.fieldTypeIdentifier);

        return parser(node);
    }

    getRequestBody() {
        const inputValue = this.getInputValue();
        const body = {
            SuggestTaxonomy: {
                TextToTaxonomy: {
                    text: inputValue,
                    taxonomy_identifier: this.taxonomyIdentifier,
                },
                RuntimeContext: {},
            },
        };

        if (this.aiConfig.languageCode) {
            body.SuggestTaxonomy.RuntimeContext.languageCode = this.aiConfig.languageCode;
        }

        return JSON.stringify(body);
    }

    getResponseValue(response) {
        return response.SuggestTaxonomy.suggestions.map(({ id, name }) => ({ id, name }));
    }
}
