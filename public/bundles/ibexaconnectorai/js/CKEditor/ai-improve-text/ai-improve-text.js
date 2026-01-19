import { Plugin } from 'ckeditor5';

import IbexaAIImproveTextUI from './ai-improve-text-ui';
import IbexaAIImproveTextEditing from './ai-improve-text-editing';

class IbexaAIImproveText extends Plugin {
    static get requires() {
        return [IbexaAIImproveTextUI, IbexaAIImproveTextEditing];
    }
}

export default IbexaAIImproveText;
