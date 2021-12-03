(function(global, doc) {
    const togglers = [...doc.querySelectorAll('.ibexa-card__body-display-toggler')];
    const toggleFieldTypeView = (event) => {
        event.preventDefault();

        const group = event.currentTarget.closest('.ibexa-card--commerce-configuration-group');

        if (group.classList.contains('ibexa-card--collapsed')) {
            const activePanel = group.closest('.tab-pane');
            const notCollapsedGroup = activePanel.querySelector('.ibexa-card--commerce-configuration-group:not(.ibexa-card--collapsed)');

            if (notCollapsedGroup) {
                notCollapsedGroup.classList.add('ibexa-card--collapsed');
            }
        }

        group.classList.toggle('ibexa-card--collapsed');
    };

    togglers.forEach((button) => button.addEventListener('click', toggleFieldTypeView, false));
})(window, window.document);
