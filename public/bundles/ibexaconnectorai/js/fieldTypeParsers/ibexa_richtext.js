import viewToPlainText from '@ibexa-admin-ui-assets/src/bundle/Resources/public/vendors/@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';

const CKEDITOR_EMPTY_VALUE =
    '<?xml version="1.0" encoding="UTF-8"?>\n<section xmlns="http://ibexa.co/namespaces/ezpublish5/xhtml5/edit"/>\n';

export default (node) => {
    const ckeditorWrapper = node.closest('.ibexa-data-source')?.querySelector('.ck-editor__editable');

    if (!ckeditorWrapper || !ckeditorWrapper.ckeditorInstance) {
        if (node.value === CKEDITOR_EMPTY_VALUE) {
            return '';
        }

        return node.value;
    }

    const {
        editing: { view },
        data,
    } = ckeditorWrapper.ckeditorInstance;
    const plainData = view.change(() => {
        const root = view.document.getRoot();
        const text = viewToPlainText(data.htmlProcessor.domConverter, root);

        return text;
    });

    return plainData;
};
