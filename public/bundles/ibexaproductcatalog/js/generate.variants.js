(function (global, doc, ibexa) {
    const taggifyWidgets = doc.querySelectorAll('.ibexa-pc-taggify');
    class GenerateVariantsTaggify extends ibexa.core.Taggify {
        constructor(config, field) {
            super(config);

            this.field = field;
        }

        afterTagsUpdate() {
            const sourceInput = this.field.querySelector('.ibexa-pc-taggify__source-input');
            const tags = [...this.tags];

            sourceInput.value = tags.join();
            sourceInput.dispatchEvent(new Event('change'));
        }
    }
    const initTaggify = (field) => {
        const ibexaTaggifyNode = field.querySelector('.ibexa-taggify');
        const taggify = new GenerateVariantsTaggify(
            {
                container: ibexaTaggifyNode,
                acceptKeys: [' ', ','],
            },
            field,
        );

        taggify.init();
    };

    taggifyWidgets.forEach(initTaggify);
})(window, window.document, window.ibexa);
