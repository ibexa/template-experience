(function (global, doc) {
    const SCROLL_POSITION_TO_FIT = 25;
    const MIN_HEIGHT_DIFF_FOR_FITTING_HEADER = 50;
    const CONFIG_PANEL_FOOTER_WITH_SCROLL = 'ibexa-fb-form-field-config__footer--slim';
    const CONFIG_PANEL_HEADER_WITH_SCROLL = 'ibexa-fb-form-field-config__header--slim';
    const ACTIVE_TAB_CLASS = 'ibexa-tabs__tab--active';
    const configPanelForm = doc.querySelector('.ibexa-fb-form-field-config');
    const tabChangeObserverConfig = {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ['class'],
    };

    if (!configPanelForm) {
        return;
    }

    const configPanelBody = configPanelForm.querySelector('.ibexa-fb-form-field-config__content');
    const configPanelFooter = configPanelForm.querySelector('.ibexa-fb-form-field-config__actions');
    const configPanelHeader = configPanelForm.querySelector('.ibexa-fb-form-field-config__header');
    const tabs = [...configPanelHeader.querySelectorAll('.ibexa-tabs__tab:not(.ibexa-tabs__tab--more)')];
    const fitFooter = () => {
        const hasVerticalScrollbar = configPanelBody.scrollHeight > configPanelBody.clientHeight;

        toggleFooterScrollClass(hasVerticalScrollbar);
    };
    const fitHeader = ({ currentTarget }) => {
        const configBodyHeightDiff = configPanelBody.scrollHeight - configPanelBody.clientHeight;
        const isScrollTop = currentTarget.scrollTop === 0;

        if (isScrollTop) {
            toggleHeaderScrollClass(!isScrollTop);
        }

        if (configBodyHeightDiff < MIN_HEIGHT_DIFF_FOR_FITTING_HEADER) {
            return;
        }

        const isScrolledDeep = currentTarget.scrollTop > SCROLL_POSITION_TO_FIT;

        toggleHeaderScrollClass(isScrolledDeep);
    };
    const toggleFooterScrollClass = (isScroll) => {
        configPanelFooter.classList.toggle(CONFIG_PANEL_FOOTER_WITH_SCROLL, isScroll);
    };

    const toggleHeaderScrollClass = (isScrolled) => {
        configPanelHeader.classList.toggle(CONFIG_PANEL_HEADER_WITH_SCROLL, isScrolled);
    };
    const tabChange = (mutationsList) => {
        mutationsList.forEach((mutation) => {
            const isActive = mutation.target.classList.contains(ACTIVE_TAB_CLASS);
            const prevIsNotActive = !mutation.oldValue?.includes(ACTIVE_TAB_CLASS);

            if (isActive && prevIsNotActive) {
                const hasVerticalScrollbar = configPanelBody.scrollHeight > configPanelBody.clientHeight;

                if (hasVerticalScrollbar) {
                    configPanelBody.scrollTo(0, 0);
                }

                toggleFooterScrollClass(hasVerticalScrollbar);
            }
        });
    };
    const tabChangeObserver = new MutationObserver(tabChange);

    global.addEventListener('load', fitFooter, false);
    global.addEventListener('resize', fitFooter, false);
    configPanelBody?.addEventListener('scroll', fitHeader, false);

    tabs.forEach((tab) => {
        tabChangeObserver.observe(tab, tabChangeObserverConfig);
    });
})(window, document);
