import { getId as getLoggedUserId } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/user.helper';
import { getRestInfo, getRouting } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/context.helper';
import { getRequestHeaders, getRequestMode } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/request.helper';
import { showErrorNotification } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/notification.helper';

(function (global, doc) {
    const Routing = getRouting();
    const { token, siteaccess, accessToken, instanceUrl } = getRestInfo();
    const shareWidgetBtn = doc.querySelector('.ibexa-shr-share-widget__btn');
    if (!shareWidgetBtn) {
        return;
    }

    const endCollaborationBtn = doc.querySelector('.ibexa-btn--end-collaboration');
    const saveDraftBtn = doc.querySelector('[data-click="#ezplatform_content_forms_content_edit_saveDraft"]');
    const { sessionOwnerId, sessionToken } = shareWidgetBtn.dataset;
    let currentScope = null;

    const initEventSource = (url) => {
        const eventSource = new EventSource(url);
        const sessionLeaveUrl = Routing.generate('ibexa.collaboration.session.leave', {
            sessionToken: sessionToken,
        });
        eventSource.addEventListener('message', (event) => {
            const parsedData = JSON.parse(event.data);
            const { isSessionActive, scope } = parsedData;

            if (!currentScope) {
                currentScope = scope;
            }

            if (currentScope !== scope) {
                window.location.href = Routing.generate('ibexa.collaboration.session.leave', {
                    sessionToken,
                    scope,
                });
            }

            if (!isSessionActive && sessionOwnerId !== getLoggedUserId()) {
                window.location.href = sessionLeaveUrl;
            }
        });

        eventSource.addEventListener('forbidden', () => {
            window.location.href = sessionLeaveUrl;
        });

        return eventSource;
    };

    const endCollaborationSession = async () => {
        const body = {
            ContentSessionUpdate: {
                isActive: false,
            },
        };
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
            body: JSON.stringify(body),
            mode: getRequestMode({ instanceUrl }),
            credentials: 'same-origin',
        });

        try {
            await fetch(request);

            saveDraftBtn.click();
        } catch (error) {
            showErrorNotification(error);
            return;
        }
    };

    if (sessionToken) {
        const url = Routing.generate('ibexa.collaboration.session.is_active', { sessionToken });
        let eventSource = initEventSource(url);

        doc.addEventListener('visibilitychange', () => {
            if (doc.hidden) {
                eventSource.close();
            } else {
                eventSource = initEventSource(url);
            }
        });

        global.addEventListener('blur', () => eventSource.close());
        global.addEventListener('focus', () => (eventSource = initEventSource(url)));
    }

    if (endCollaborationBtn) {
        endCollaborationBtn.addEventListener('click', endCollaborationSession, false);
    }
})(window, window.document);
