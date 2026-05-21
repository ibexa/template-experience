((global, doc) => {
    const HIDDEN_CLASS = 'ibexa-shr-collapsible-list__item--hidden';
    const DEFAULT_VISIBLE_COUNT = 3;
    const collapsibleLists = doc.querySelectorAll('.ibexa-shr-collapsible-list');

    if (!collapsibleLists.length) {
        return;
    }

    collapsibleLists.forEach((list) => {
        const toggleBtn = list.querySelector('.ibexa-shr-collapsible-list__toggle-btn');
        const items = list.querySelectorAll('.ibexa-shr-collapsible-list__item');
        const visibleCount = parseInt(list.dataset.visibleCount || DEFAULT_VISIBLE_COUNT, 10);
        let isExpanded = false;

        if (!toggleBtn || !items.length) {
            return;
        }

        const { showMore, showLess } = toggleBtn.dataset;
        const toggleText = toggleBtn.querySelector('.ibexa-shr-collapsible-list__toggle-text');
        const toggleIcon = toggleBtn.querySelector('.ibexa-shr-collapsible-list__toggle-icon');

        const updateButtonLabel = () => {
            toggleText.textContent = isExpanded ? showLess : showMore;

            if (toggleIcon) {
                toggleIcon.classList.toggle('ibexa-details__show-more-btn-icon--opened', isExpanded);
            }
        };

        const toggleItems = () => {
            isExpanded = !isExpanded;

            items.forEach((item, index) => {
                if (index >= visibleCount) {
                    item.classList.toggle(HIDDEN_CLASS, !isExpanded);
                }
            });

            updateButtonLabel();
        };

        updateButtonLabel();
        toggleBtn.addEventListener('click', toggleItems, false);
    });
})(window, document);
