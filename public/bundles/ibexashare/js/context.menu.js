import {
    getRequestHeaders,
    getRequestMode,
    getJsonFromResponse,
} from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/request.helper';
import { getRestInfo } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/context.helper';
import { showErrorNotification } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/notification.helper';

(function (global, doc, bootstrap) {
    const { token, siteaccess, accessToken, instanceUrl } = getRestInfo();
    const shareBtn = doc.querySelector('.ibexa-shr-share-widget .ibexa-shr-share-widget__btn');

    if (!shareBtn) {
        return;
    }

    const { sessionToken } = shareBtn.dataset;
    const endCollaborationBtn = doc.querySelector('.ibexa-btn--end-collaboration');
    const endCollaborationConfirmModalNode = doc.querySelector('#ibexa-shr-end-collaboration-confirm-modal');
    const endCollaborationConfirmModalInstance = bootstrap.Modal.getOrCreateInstance(endCollaborationConfirmModalNode);
    const endCollaborationConfirmBtn = endCollaborationConfirmModalNode.querySelector('.ibexa-btn--confirm');
    const saveDraft = () => {
        const saveDraftBtn = doc.querySelector('[data-click="#ezplatform_content_forms_content_edit_saveDraft"]');

        saveDraftBtn.click();
    };
    const handleEndCollaborationSession = () => {
        endCollaborationConfirmModalInstance.show();
    };
    const endCollaborationSession = () => {
        const request = new Request(`/api/ibexa/v2/collaboration/sessions/${sessionToken}`, {
            method: 'PATCH',
            headers: getRequestHeaders({
                token,
                siteaccess,
                accessToken,
                extraHeaders: {
                    Accept: 'application/vnd.ibexa.api.CollaborationSession+json',
                    'Content-Type': 'application/vnd.ibexa.api.ContentSessionUpdate+json',
                },
            }),
            body: JSON.stringify({
                ContentSessionUpdate: {
                    isActive: false,
                },
            }),
            mode: getRequestMode({ instanceUrl }),
            credentials: 'same-origin',
        });

        fetch(request)
            .then(getJsonFromResponse)
            .then(() => saveDraft())
            .catch(showErrorNotification);
    };

    endCollaborationBtn?.addEventListener('click', handleEndCollaborationSession, false);
    endCollaborationConfirmBtn.addEventListener('click', endCollaborationSession, false);
})(window, window.document, window.bootstrap);
