(function (global, doc) {
    const generateVariantsForm = doc.querySelector('.ibexa-generate-variants__form');
    const toggleFormSpinner = () => {
        generateVariantsForm.classList.toggle('ibexa-generate-variants__form--sent');
    };

    if (!generateVariantsForm) {
        return;
    }

    generateVariantsForm.addEventListener('submit', toggleFormSpinner, false);
})(window, window.document);
