import { Command } from 'ckeditor5';

class IbexaEmbedProductInlineCommand extends Command {
    execute(contentData) {
        this.editor.model.change((writer) => {
            writer.setSelection(this.editor.model.document.selection.getFirstPosition().parent, 'end');

            this.editor.model.insertContent(this.createEmbed(writer, contentData));
        });
    }

    createEmbed(writer, { code, contentName }) {
        return writer.createElement('embedProductInline', { code, contentName });
    }
}

export default IbexaEmbedProductInlineCommand;
