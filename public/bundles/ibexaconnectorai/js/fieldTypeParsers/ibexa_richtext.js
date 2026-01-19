export default (node) => {
    const ckeditorWrapper = node.closest('.ibexa-data-source')?.querySelector('.ck-editor__editable');

    if (!ckeditorWrapper || !ckeditorWrapper.ckeditorInstance) {
        return node.value;
    }

    ckeditorWrapper.ckeditorInstance.model.change((writer) => {
        writer.setSelection(ckeditorWrapper.ckeditorInstance.model.document.selection.getFirstPosition().root, 'in');
    });

    const ckeditorRange = ckeditorWrapper.ckeditorInstance.model.document.selection.getFirstRange();
    let requestText = '';

    for (const item of ckeditorRange.getItems()) {
        if (item.data) {
            requestText += `${item.data ?? ''} `;
        }
    }

    return requestText.trim();
};
