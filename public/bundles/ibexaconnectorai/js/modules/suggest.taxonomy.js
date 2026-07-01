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

    static getConfig(configName, fieldId) {
        return window?.ibexa?.aiAssistant?.modules?.SuggestTaxonomy?.[configName]?.[fieldId];
    }

    getFieldTypeChangeListener(fieldTypeId) {
        const fieldChangeListener = SuggestTaxonomy.getConfig('fieldTypeChangeListeners', fieldTypeId);

        return (
            fieldChangeListener ??
            ((node, callback) => {
                node.addEventListener('input', callback);
            })
        );
    }

    getFieldTypeParser(fieldTypeId) {
        const fieldParser = SuggestTaxonomy.getConfig('fieldTypeParsers', fieldTypeId);

        return fieldParser ?? (({ value }) => value);
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

    getActions() {
        const items = super.getActions();
        const newItems = items.map((group) => {
            return {
                ...group,
                items: group.items.map((item) => {
                    const value = this.getInputValue(item.id);

                    return {
                        ...item,
                        disabled: value === '',
                    };
                }),
            };
        });

        return newItems;
    }

    initMenuItemsStateListener() {
        if (this.getActionsCount() !== 1) {
            return;
        }

        const items = this.getActions();
        const actionId = items[0].items[0].id;
        const actionConfig = this.getActionConfigurationById(actionId);

        this.mainElement.disabled = this.getInputValue(actionId) === '';

        actionConfig.sourceFields.forEach(({ domID, fieldTypeIdentifier }) => {
            const changeListener = this.getFieldTypeChangeListener(fieldTypeIdentifier);
            const node = window.document.querySelector(domID);

            changeListener(node, () => {
                this.mainElement.disabled = this.getInputValue(actionId) === '';
            });
        });
    }

    init() {
        super.init();

        this.initMenuItemsStateListener();
    }
}
