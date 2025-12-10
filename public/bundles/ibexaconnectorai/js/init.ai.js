import createAIModule from './core/create.ai.module';
import ezrichtextParser from './fieldTypeParsers/ezrichtext';

(function (global, doc, ibexa) {
    const aiComponentBtns = doc.querySelectorAll('.ibexa-ai-component:not([data-ai-custom-init="true"])');
    const initAIComponent = (aiComponentBtn) => {
        const AIModule = createAIModule(aiComponentBtn.dataset.type);
        const aiConfig = JSON.parse(aiComponentBtn.dataset.aiConfig);
        const { languageCode } = aiConfig;
        const aiComponent = new AIModule(aiComponentBtn, { languageCode });

        aiComponent.init();
    };

    ibexa.addConfig('aiAssistant.modules.SuggestTaxonomy.fieldTypeParsers.ezrichtext', ezrichtextParser);

    aiComponentBtns.forEach(initAIComponent);

    doc.body.addEventListener('ibexa-ai-component:initialize', (event) => initAIComponent(event.detail.element));
})(window, window.document, window.ibexa);
