(function (global, doc) {
    const copyBtns = doc.querySelectorAll('.ibexa-ai-actions-list__copy-btn');
    const copyAction = ({ currentTarget }) => {
        const { copySourceId, targetInputSelector, submitSelector } = currentTarget.dataset;
        const targetInput = doc.querySelector(targetInputSelector);

        targetInput.value = copySourceId;

        doc.getElementById(submitSelector).click();
    };

    copyBtns.forEach((copyBtn) => {
        copyBtn.addEventListener('click', copyAction, false);
    });
})(window, window.document);
