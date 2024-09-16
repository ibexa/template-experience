(function (global, doc) {
    const copyButtons = [...doc.querySelectorAll('.ibexa-perso-details__copy-button')];
    const coppiedClass = 'ibexa-perso-details__text--copied';
    const copyInformationTime = 5000;
    const handleCopy = (copyButton) => {
        const copiedText = copyButton.previousElementSibling.textContent;
        const container = copyButton.closest('.ibexa-perso-details__text');

        container.classList.add(coppiedClass);
        global.navigator.clipboard.writeText(copiedText);

        setTimeout(() => {
            container.classList.remove(coppiedClass);
        }, copyInformationTime);
    };
    const handleCopyOnKeyDown = (event) => {
        if (event.key !== 'Enter' || event.key !== ' ') {
            return;
        }

        handleCopy(event.currentTarget);
    };
    const handleCopyOnClick = ({ currentTarget }) => {
        handleCopy(currentTarget);
    };

    copyButtons.forEach((copyButton) => {
        copyButton.addEventListener('click', handleCopyOnClick, false);
        copyButton.addEventListener('keydown', handleCopyOnKeyDown, false);
    });
})(window, window.document);
