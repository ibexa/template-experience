(function (global, doc, Routing) {
    const activityBlock = doc.querySelector('.ibexa-al-block');
    const MAX_LETTERS_LENGTH = 100;
    const allActivityBtn = activityBlock?.querySelector('.ibexa-al-block__all-activity-btn');
    const contentNames = activityBlock?.querySelectorAll('.ibexa-al-block__content-name') ?? [];
    const goToActivityLog = () => {
        window.location.href = Routing.generate('ibexa.activity_log.list');
    };

    allActivityBtn?.addEventListener('click', goToActivityLog, false);
    contentNames.forEach((contentName) => {
        const text = contentName.textContent;

        if (text.length > MAX_LETTERS_LENGTH) {
            const truncatedText = `${text.substring(0, MAX_LETTERS_LENGTH).trim()}...`;

            contentName.textContent = truncatedText;
        }
    });
})(window, window.document, window.Routing);
