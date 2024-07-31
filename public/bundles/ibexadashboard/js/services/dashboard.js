export const setDashboardHidden = () => {
    const url = window.Routing.generate('ibexa.dashboard.hide_banner');
    const request = new Request(url, {
        method: 'POST',
        mode: 'same-origin',
        credentials: 'same-origin',
    });

    return fetch(request).catch((error) => {
        console.error(error);
    });
};
