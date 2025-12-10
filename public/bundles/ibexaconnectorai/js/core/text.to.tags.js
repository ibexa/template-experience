import BaseAIAssistantComponent from '@ibexa-connector-ai/src/bundle/Resources/public/js/core/base.ai.assistant.component';
import Tags from '@ibexa-connector-ai-modules/ai-assistant/fields/tags/tags';

export default class SuggestTaxonomy extends BaseAIAssistantComponent {
    constructor(mainElement, extraConfig) {
        super(mainElement, extraConfig);

        this.replacedField = Tags;
        this.handleSaveValue = extraConfig.handleSaveValue?.bind(this);

        const sourceFields = JSON.parse(mainElement.dataset.sourceFields || '[]');

        this.aiConfig.actionConfigurations = sourceFields.map((sourceFieldsConfig) => {
            const actionConfigurations = this.aiConfig.actionConfigurations.find(
                ({ identifier }) => identifier === sourceFieldsConfig.identifier,
            );

            return {
                ...sourceFieldsConfig,
                ...actionConfigurations,
            };
        });
    }

    getActionConfigurationById(actionId) {
        return this.aiConfig.actionConfigurations.find(({ identifier }) => identifier === actionId);
    }

    getSourceFieldValue(config) {
        return window.document.querySelector(config.domID)?.value || '';
    }

    getInputValue() {
        const actionConfig = this.getActionConfigurationById(this.activeActionId);

        const inputValue = actionConfig.sourceFields.map((sourceField) => {
            return this.getSourceFieldValue(sourceField);
        });

        return inputValue.filter(Boolean).join(' ');
    }

    // eslint-disable-next-line no-unused-vars
    getResponseValue(response) {}

    getRequestBody() {}

    handleAIDialogConfirm(responseText) {
        if (this.handleSaveValue) {
            this.handleSaveValue(responseText);
        } else {
            this.outputElement.value = responseText;
            this.outputElement.dispatchEvent(new Event('input'));
        }

        super.handleAIDialogClose(responseText);
    }
}
