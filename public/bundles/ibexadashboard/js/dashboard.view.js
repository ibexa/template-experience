(function (global, doc) {
    const IS_DASHBOARD_BANNER_HIDDEN_KEY = 'ibexa-dashboard-banner-hidden';
    const closeBtn = doc.querySelector('.ibexa-db-banner__close-btn');
    const dashboardBanner = doc.querySelector('.ibexa-db-banner');
    const customizeDashboardDropdownBtn = doc.querySelector('.ibexa-db-header__customize-dashboard');
    const customizeDashboardInitialBtn = doc.querySelector('#customize-dashboard_customize');
    const editDashboardDropdownBtn = doc.querySelector('.ibexa-db-header__edit-dashboard');
    const editDashboardInitialBtn = doc.querySelector('#content_edit_create');
    const isDashboardBannerHidden = localStorage.getItem(IS_DASHBOARD_BANNER_HIDDEN_KEY);
    const handleClose = () => {
        if (!closeBtn) {
            return;
        }

        localStorage.setItem(IS_DASHBOARD_BANNER_HIDDEN_KEY, true);
        dashboardBanner.classList.add('ibexa-db-banner--hidden');
    };
    const handleCustomizeDashboard = () => {
        if (!customizeDashboardInitialBtn) {
            return;
        }

        customizeDashboardInitialBtn.click();
    };
    const handleEditDashboard = () => {
        if (!editDashboardInitialBtn) {
            return;
        }

        editDashboardInitialBtn.click();
    };

    if (!isDashboardBannerHidden && dashboardBanner) {
        dashboardBanner.classList.remove('ibexa-db-banner--hidden');
    }

    closeBtn?.addEventListener('click', handleClose, false);
    customizeDashboardDropdownBtn?.addEventListener('click', handleCustomizeDashboard, false);
    editDashboardDropdownBtn?.addEventListener('click', handleEditDashboard, false);
})(window, window.document);
