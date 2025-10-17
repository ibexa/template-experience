(function (global, doc, bootstrap) {
    const OPEN_COLLABORATION_ONBOARDING_MODAL_PARAM = 'open_collaboration_onboarding_modal';
    const modalNode = doc.querySelector('#ibexa-collaboration-onboarding-modal');

    if (!modalNode) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const shouldOpenOnboardingModal = params.get(OPEN_COLLABORATION_ONBOARDING_MODAL_PARAM);
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalNode);
    const removeQueryParam = (paramName) => {
        const url = new URL(window.location);

        url.searchParams.delete(paramName);
        window.history.replaceState({}, document.title, url);
    };

    if (shouldOpenOnboardingModal) {
        removeQueryParam(OPEN_COLLABORATION_ONBOARDING_MODAL_PARAM);
        modalInstance.show();
    }
})(window, window.document, window.bootstrap);
