import { Command } from 'ckeditor5';

class IbexaReplaceTextCommand extends Command {
    execute({ refinedText }) {
        const { model } = this.editor;
        const { selection } = model.document;

        model.change((writer) => {
            const position = selection.getFirstPosition();

            model.deleteContent(selection);

            const { end: positionAfter } = model.insertContent(refinedText, position);

            writer.setSelection(positionAfter);
        });
    }
}

export default IbexaReplaceTextCommand;
