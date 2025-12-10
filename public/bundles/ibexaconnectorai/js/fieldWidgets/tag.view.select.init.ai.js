import createAIModule from '../core/create.ai.module';

(function (global, doc, ibexa) {
    const aiComponentBtns = doc.querySelectorAll('.ibexa-tag-view-select .ibexa-ai-component[data-ai-custom-init="true"]');
    const initAIComponent = (aiComponentBtn) => {
        const tagViewSelectWidget = aiComponentBtn.closest('.ibexa-tag-view-select');
        const tagViewSelectInstance = ibexa.helpers.objectInstances.getInstance(tagViewSelectWidget);
        const AIModule = createAIModule(aiComponentBtn.dataset.type);
        const aiConfig = JSON.parse(aiComponentBtn.dataset.aiConfig);
        const { languageCode } = aiConfig;
        const handleSaveValue = (value) => {
            tagViewSelectInstance.addItems(value, true);
        };
        const aiComponent = new AIModule(aiComponentBtn, { languageCode, handleSaveValue });

        aiComponent.init();
    };

    aiComponentBtns.forEach(initAIComponent);

    doc.body.addEventListener('ibexa-ai-component:initialize', (event) => initAIComponent(event.detail.element));
})(window, window.document, window.ibexa);
