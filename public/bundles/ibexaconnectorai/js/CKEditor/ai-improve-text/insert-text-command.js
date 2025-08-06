import Command from '@ckeditor/ckeditor5-core/src/command';

class IbexaInsertTextCommand extends Command {
    execute({ refinedText }) {
        const { model } = this.editor;

        model.change((writer) => {
            const paragraphEndPosition = model.document.selection.getLastPosition();

            writer.setSelection(paragraphEndPosition);
            this.editor.execute('enter');

            const newParagraphStartPosition = model.document.selection.getLastPosition();

            const { end: newParagraphEndPosition } = model.insertContent(refinedText, newParagraphStartPosition);

            this.editor.execute('enter');
            writer.setSelection(newParagraphEndPosition);
        });
    }
}

export default IbexaInsertTextCommand;
