(function(doc) {
    doc.querySelector('.ibexa-personalization-title__select').addEventListener(
        'change',
        () => {
            window.location.href = event.target.value;
        },
        false,
    );
})(window.document);
