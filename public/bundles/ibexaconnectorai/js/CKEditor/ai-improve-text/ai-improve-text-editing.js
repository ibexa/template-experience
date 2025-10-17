import { Plugin } from 'ckeditor5';

import IbexaInsertTextCommand from './insert-text-command';
import IbexaReplaceTextCommand from './replace-text-command';

class IbexaAIImproveTextEditing extends Plugin {
    static get requires() {
        return [];
    }

    init() {
        this.editor.commands.add('ibexaInsertRefinedText', new IbexaInsertTextCommand(this.editor));
        this.editor.commands.add('ibexaReplaceWithRefinedText', new IbexaReplaceTextCommand(this.editor));
    }
}

export default IbexaAIImproveTextEditing;
