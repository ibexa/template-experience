import createAIModule from './core/create.ai.module';

(function (global, doc) {
    const aiComponentBtns = doc.querySelectorAll('.ibexa-ai-component');
    const initAIComponent = (aiComponentBtn) => {
        const AIModule = createAIModule(aiComponentBtn.dataset.type);
        const aiConfig = JSON.parse(aiComponentBtn.dataset.aiConfig);
        const { languageCode } = aiConfig;
        const aiComponent = new AIModule(aiComponentBtn, { languageCode });

        aiComponent.init();
    };

    aiComponentBtns.forEach(initAIComponent);

    doc.body.addEventListener('ibexa-ai-component:initialize', (event) => initAIComponent(event.detail.element));
})(window, window.document);
