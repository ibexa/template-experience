import { getRouting } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/context.helper';

(function (global, doc) {
    const Routing = getRouting();
    const shareWidgetBtn = doc.querySelector('.ibexa-shr-share-widget__btn');

    if (!shareWidgetBtn) {
        return;
    }

    const { sessionToken } = shareWidgetBtn.dataset;
    const leaveBtn = doc.querySelector('.ibexa-btn--leave-collaboration');

    if (leaveBtn) {
        leaveBtn.addEventListener('click', () => {
            window.location.href = Routing.generate('ibexa.collaboration.session.leave', {
                sessionToken: sessionToken,
            });
        });
    }
})(window, window.document);
