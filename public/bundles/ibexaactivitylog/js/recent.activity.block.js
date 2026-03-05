(function (global, doc, Routing) {
    const CONTENT_ITEM_NAME_CLASS = '.ibexa-al-block__content-name';
    const CONTENT_PARENT_NAME_CLASS = '.ibexa-al-block__content-info-id';
    const TILE_ITEM_CLASS = '.ibexa-al-block__tile';
    const activityBlock = doc.querySelector('.ibexa-al-block');
    const MAX_LETTERS_LENGTH = 100;
    const TILE_PADDING = 24;
    const allActivityBtn = activityBlock?.querySelector('.ibexa-al-block__all-activity-btn');
    const contentNames = activityBlock?.querySelectorAll(`${CONTENT_ITEM_NAME_CLASS}, ${CONTENT_PARENT_NAME_CLASS}`) ?? [];
    const showMoreBtns = activityBlock?.querySelectorAll('.ibexa-al-block__show-more-btn') ?? [];
    const goToActivityLog = () => {
        window.location.href = Routing.generate('ibexa.activity_log.list');
    };
    const resizeContentName = (items) => {
        items.forEach((contentName) => {
            const tile = contentName.closest(TILE_ITEM_CLASS);

            if (tile.clientWidth - TILE_PADDING < contentName.offsetWidth) {
                contentName.classList.add('ibexa-al-block__content-name--overflowed');
            }
        });
    };
    const initRecentActivityBlock = () => {
        resizeContentName(contentNames);
    };

    contentNames.forEach((contentName) => {
        const text = contentName.textContent;

        if (text.length > MAX_LETTERS_LENGTH) {
            const truncatedText = `${text.substring(0, MAX_LETTERS_LENGTH).trim()}...`;

            contentName.textContent = truncatedText;
        }
    });

    allActivityBtn?.addEventListener('click', goToActivityLog, false);
    global.addEventListener('resize', () => resizeContentName(contentNames), false);
    showMoreBtns.forEach((showMoreBtn) => {
        showMoreBtn.addEventListener(
            'click',
            () => {
                const tile = showMoreBtn.closest(TILE_ITEM_CLASS);
                const collapsibleList = tile.querySelector('.ibexa-al-block__collapsible-list');
                const collapsibleItems = collapsibleList.querySelectorAll(`${CONTENT_ITEM_NAME_CLASS}, ${CONTENT_PARENT_NAME_CLASS}`);

                resizeContentName(collapsibleItems);
            },
            false,
        );
    }, false);
    initRecentActivityBlock();
})(window, window.document, window.Routing);
