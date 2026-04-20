import { Command } from 'ckeditor5';

class IbexaEmbedProductCommand extends Command {
    execute(contentData) {
        this.editor.model.change((writer) => {
            writer.setSelection(this.editor.model.document.selection.getFirstPosition().parent, 'end');

            this.editor.model.insertContent(this.createEmbed(writer, contentData));
        });
    }

    createEmbed(writer, { code, contentName }) {
        return writer.createElement('embedProduct', { code, contentName });
    }
}

export default IbexaEmbedProductCommand;
