(function (global, doc, bootstrap) {
    const triggerTabsOpenBtns = doc.querySelectorAll('.ibexa-pc-completeness-task .ibexa-btn--trigger-tab-open');
    const openTab = ({ currentTarget }) => {
        const { tabId } = currentTarget.dataset;
        const tabLink = doc.getElementById(tabId);
        const tabInstance = bootstrap.Tab.getOrCreateInstance(tabLink);

        tabInstance.show();
    };

    triggerTabsOpenBtns.forEach((openTabBtn) => {
        openTabBtn.addEventListener('click', openTab, false);
    });
})(window, window.document, window.bootstrap);
