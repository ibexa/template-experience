import { setDashboardHidden } from './services/dashboard.js';

(function (global, doc, ibexa, Translator) {
    const dashboardBanner = doc.querySelector('.ibexa-db-banner');
    const bannerCloseBtn = doc.querySelector('.ibexa-db-banner__close-btn');
    const customizeDashboardDropdownBtn = doc.querySelector('.ibexa-db-header__customize-dashboard');
    const customizeDashboardInitialBtn = doc.querySelector('#customize-dashboard_customize');
    const popupBtns = [...doc.querySelectorAll('.ibexa-multilevel-popup-menu__item-content')];
    const editDashboardDropdownBtn = doc.querySelector('.ibexa-db-header__edit-dashboard');
    const setActiveDashboardDropdownBtn = doc.querySelector('.ibexa-db-header__set-active-dashboard');
    const editDashboardInitialBtn = doc.querySelector('#content_edit_create');
    const changeActiveDashboardForm = doc.querySelector('form[name="dashboard_change_active"]');
    const dashboardSelect = doc.querySelector('#dashboard_change_active_location');
    const actionBtn = doc.querySelector('.ibexa-db-header__more');
    const customDashboardName = dashboardSelect.options[0]?.text;
    const handleCustomizeDashboard = () => {
        customizeDashboardInitialBtn?.click();
    };
    const handleEditDashboard = () => {
        editDashboardInitialBtn?.click();
    };
    const handleSetActiveDashboard = () => {
        changeActiveDashboardForm?.submit();
    };
    const initTooltipIfOverflow = (popup) => {
        const label = popup.querySelector('.ibexa-btn__label');
        const popupContainer = popup.closest('.ibexa-popup-menu');

        if (label.scrollWidth < popupContainer.offsetWidth) {
            return;
        }

        popup.title = label.textContent;
        ibexa.helpers.tooltips.parse(popup);
    };
    const handleActionBtnClick = () => {
        popupBtns.forEach((popupBtn) => initTooltipIfOverflow(popupBtn));
        actionBtn.removeEventListener('click', handleActionBtnClick);
    };
    const handleCloseBanner = () => {
        dashboardBanner.classList.add('ibexa-db-banner--hidden');
        setDashboardHidden();
    };

    if (editDashboardInitialBtn && !editDashboardDropdownBtn) {
        const switchToCustomLabel = Translator.trans(
            /*@Desc("Switch to %name%")*/ 'dashboard.switch_to_custom',
            { name: customDashboardName },
            'ibexa_dashboard',
        );
        const label = setActiveDashboardDropdownBtn.querySelector('.ibexa-btn__label');

        label.textContent = switchToCustomLabel;
    }

    bannerCloseBtn?.addEventListener('click', handleCloseBanner, false);
    customizeDashboardDropdownBtn?.addEventListener('click', handleCustomizeDashboard, false);
    editDashboardDropdownBtn?.addEventListener('click', handleEditDashboard, false);
    setActiveDashboardDropdownBtn?.addEventListener('click', handleSetActiveDashboard, false);
    actionBtn?.addEventListener('click', handleActionBtnClick);
})(window, window.document, window.ibexa, window.Translator);
