export default (node, callback) => {
    const fieldContainer = node.closest('.ibexa-data-source').querySelector('.ibexa-data-source__richtext');

    fieldContainer.addEventListener('ibexa-ckeditor:instance-ready', (event) => {
        const { editor } = event.detail;

        editor.model.document.on('change:data', () => {
            editor.editing.view.once('render', () => {
                callback();
            });
        });
    });
};
