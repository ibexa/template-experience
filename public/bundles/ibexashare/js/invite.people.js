import {
    getRequestHeaders,
    getRequestMode,
    getStatusFromResponse,
    getJsonFromResponse,
} from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/request.helper';
import {
    showErrorNotification,
    showSuccessNotification,
} from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/notification.helper';
import {
    parse as parseTooltips,
    TOOLTIPS_DEFAULTS_PARAMS,
} from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/tooltips.helper';
import { getRestInfo, getRouting, getTranslator } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/context.helper';
import { getId } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/user.helper';
import { escapeHTML } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/text.helper';
import { dangerouslyInsertAdjacentHTML } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/dom.helper';
import { setInstance, getInstance } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/object.instances';
import { showModalLoader, hideModalLoader } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/modal.helper';
import { checkIsClipboardWriteSupported } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/helpers/browser.helper';

const ACCESS_POPUP_TRIGGER_OFFSET_Y = 32;
const ACCESS_POPUP_TRIGGER_OFFSET_X = 16;
const COPY_TOOLTIP_TIMEOUT = 2000;
const AUTOSAVE_SUBMIT_BUTTON_NAME = 'ezplatform_content_forms_content_edit[autosave]';
const VIEW_ACTION_NAME = 'view';
const EDIT_ACTION_NAME = 'edit';
const REMOVE_ACTION_NAME = 'remove';

(function (global, doc, ibexa, bootstrap) {
    const Translator = getTranslator();
    const Routing = getRouting();
    const { token, siteaccess, accessToken, instanceUrl } = getRestInfo();
    const showCopyLinkLabel = Translator.trans(/*@Desc("Show link")*/ 'share.copy_invite_link.show_label', {}, 'ibexa_share');
    const hideCopyLinkLabel = Translator.trans(/*@Desc("Hide link")*/ 'share.copy_invite_link.hide_label', {}, 'ibexa_share');
    const tooltipCopyLink = Translator.trans(/*@Desc("Copy invite link")*/ 'share.copy_invite_link.label', {}, 'ibexa_share');
    const tooltipCopyLinkSuccess = Translator.trans(/*@Desc("Copied!")*/ 'share.copy_link.copied_tooltip.title', {}, 'ibexa_share');
    const taggifyWidgets = doc.querySelectorAll('.ibexa-shr-invite-widget .ibexa-taggify');

    if (!taggifyWidgets.length) {
        return;
    }

    let copiedLinkTimeout = null;
    const params = new URLSearchParams(window.location.search);
    const openShareModalParam = params.get('open_share_modal');
    const shareWidgetBtn = doc.querySelector('.ibexa-shr-share-widget__btn');
    const inviteModalNode = doc.querySelector('.ibexa-shr-share-widget__modal--invite');
    const inviteModalInstance = new bootstrap.Modal(inviteModalNode, {
        returnFocus: false,
    });
    const closeInviteModalBtn = inviteModalNode.querySelector('.close');
    const accessPopups = inviteModalNode.querySelectorAll('.ibexa-shr-invite-widget__users-wrapper .ibexa-shr-access-popup');
    const inviteBtns = inviteModalNode.querySelectorAll('.ibexa-shr-invite-widget__invite-button');
    const footerCopyLinkBtn = inviteModalNode.querySelector('.ibexa-shr-share-widget__copy-link-btn');
    const publicPreviewSettingSwitcher = doc.querySelector('.ibexa-toggle__input--public-preview-setting-switcher');
    const linkSettingsBtn = inviteModalNode.querySelector('.ibexa-shr-share-widget__link-settings-button');
    const participantsCopyLinkBtns = inviteModalNode.querySelectorAll('.ibexa-shr-invite-widget__users-list-item-copy-link');
    let { sessionToken } = shareWidgetBtn.dataset;
    let shouldReloadPage = false;
    const initAccessPopup = (accessPopup) => {
        const popupMenuElement = accessPopup.querySelector('.ibexa-popup-menu');
        const triggerElement = accessPopup.querySelector('.ibexa-shr-access-popup__btn');
        const listItemNode = triggerElement.closest('.ibexa-shr-invite-widget__users-list-item');
        let lastAction = triggerElement.dataset.action;

        doc.body.append(popupMenuElement);

        new ibexa.core.PopupMenu({
            popupMenuElement,
            triggerElement,
            openedMenuClass: 'ibexa-shr-access-popup__btn--menu-opened',
            position: (menu) => {
                const windowWidth = window.innerWidth;
                const triggerElementRect = triggerElement.getBoundingClientRect();

                menu.style.right = `${windowWidth - triggerElementRect.right - ACCESS_POPUP_TRIGGER_OFFSET_X}px`;
                menu.style.top = `${triggerElementRect.y + ACCESS_POPUP_TRIGGER_OFFSET_Y}px`;

                const menuRect = menu.getBoundingClientRect();

                if (menuRect.bottom > window.innerHeight) {
                    menu.style.top = `${triggerElementRect.y - menuRect.height}px`;
                }
            },
            onItemClick: ({ currentTarget }) => {
                const { action } = currentTarget.dataset;
                const { participantId } = triggerElement.dataset;

                if (lastAction === action) {
                    return;
                }

                lastAction = action;

                if (action === REMOVE_ACTION_NAME) {
                    const request = new Request(`/api/ibexa/v2/collaboration/sessions/${sessionToken}/participants/${participantId}`, {
                        method: 'DELETE',
                        headers: getRequestHeaders({
                            token,
                            siteaccess,
                            accessToken,
                            extraHeaders: {
                                Accept: 'application/json',
                            },
                        }),
                        mode: getRequestMode({ instanceUrl }),
                        credentials: 'same-origin',
                    });

                    fetch(request)
                        .then(getStatusFromResponse)
                        .then(() => removeUserCallback(listItemNode))
                        .catch(showErrorNotification);
                } else {
                    const body = {
                        InternalParticipantUpdate: {
                            scope: action,
                        },
                    };
                    const request = new Request(`/api/ibexa/v2/collaboration/sessions/${sessionToken}/participants/${participantId}`, {
                        method: 'PATCH',
                        headers: getRequestHeaders({
                            token,
                            siteaccess,
                            accessToken,
                            extraHeaders: {
                                Accept: 'application/vnd.ibexa.api.InternalParticipant+json',
                                'Content-Type': 'application/vnd.ibexa.api.InternalParticipantUpdate+json',
                            },
                        }),
                        body: JSON.stringify(body),
                        mode: getRequestMode({ instanceUrl }),
                        credentials: 'same-origin',
                    });

                    fetch(request)
                        .then(getJsonFromResponse)
                        .then(() => {
                            triggerElement.querySelector('.ibexa-btn__label').innerText = currentTarget.innerText;
                        })
                        .catch(showErrorNotification);
                }
            },
        });
    };
    const renderInternalUser = (tag, inviteWidget) => {
        const listNode = inviteWidget.querySelector('.ibexa-shr-invite-widget__users--internal .ibexa-shr-invite-widget__users-list');
        const accessPopupButton = inviteWidget.querySelector('.ibexa-shr-access-popup__btn');
        const accessPopupButtonLabel = accessPopupButton.querySelector('.ibexa-btn__label');
        const { template } = listNode.dataset;
        const container = doc.createElement('ul');
        const renderedTemplate = template
            .replaceAll('{{ USER_ID }}', escapeHTML(tag.id))
            .replaceAll('{{ USER_NAME }}', escapeHTML(tag.name))
            .replaceAll('{{ USER_EMAIL }}', escapeHTML(tag.email));

        dangerouslyInsertAdjacentHTML(container, 'beforeend', renderedTemplate);

        const itemNode = container.querySelector('.ibexa-shr-invite-widget__users-list-item');
        const userAccessPopupButton = itemNode.querySelector('.ibexa-shr-access-popup__btn');
        const userAccessPopupButtonLabel = userAccessPopupButton.querySelector('.ibexa-btn__label');
        const thumbnailNodes = container.querySelectorAll('.ibexa-user-thumbnail');

        userAccessPopupButtonLabel.innerText = accessPopupButtonLabel.innerText;
        [...thumbnailNodes].forEach((thumbnailNode) => thumbnailNode.classList.add('ibexa-user-thumbnail--hidden'));

        initAccessPopup(itemNode.querySelector('.ibexa-shr-access-popup'));

        listNode.appendChild(itemNode);

        const copyLinkBtn = itemNode.querySelector('.ibexa-shr-invite-widget__users-list-item-copy-link');

        initializeCopyLinkBtns([copyLinkBtn]);
    };
    const renderExternalUser = (tag, inviteWidget) => {
        const escapedTag = escapeHTML(tag);
        const listNode = inviteWidget.querySelector('.ibexa-shr-invite-widget__users--external .ibexa-shr-invite-widget__users-list');
        const { template } = listNode.dataset;
        const container = doc.createElement('ul');
        const renderedTemplate = template.replaceAll('{{ USER_NAME }}', escapedTag).replaceAll('{{ USER_EMAIL }}', escapedTag);

        dangerouslyInsertAdjacentHTML(container, 'beforeend', renderedTemplate);

        const itemNode = container.querySelector('.ibexa-shr-invite-widget__users-list-item');
        const userAccessPopupButton = itemNode.querySelector('.ibexa-shr-access-popup__btn .ibexa-btn__label');

        itemNode.dataset.participantId = tag?.id || '';
        userAccessPopupButton.dataset.participantId = tag?.id || '';

        initAccessPopup(itemNode.querySelector('.ibexa-shr-access-popup'));

        listNode.appendChild(itemNode);

        const copyLinkBtn = itemNode.querySelector('.ibexa-shr-invite-widget__users-list-item-copy-link');

        initializeCopyLinkBtns([copyLinkBtn]);
        inviteWidget.querySelector('.ibexa-shr-invite-widget__users--external').classList.remove('ibexa-shr-invite-widget__users--hidden');
    };
    const startNewSession = async (participantsList, contentId, versionNo, languageId) => {
        const canManagePublicLink = shareWidgetBtn.dataset.canManagePublicLink === 'true';
        const body = {
            ContentSessionCreate: {
                Owner: {
                    '_media-type': 'application/vnd.ibexa.api.User+json',
                    _href: `/api/ibexa/v2/user/users/${getId()}`,
                },
                ParticipantListCreate: {
                    '_media-type': 'application/vnd.ibexa.api.ParticipantListCreate+json',
                    ParticipantCreate: participantsList,
                },
                contentId: parseInt(contentId, 10),
                versionNo: parseInt(versionNo, 10),
                languageId: parseInt(languageId, 10),
            },
        };
        const request = new Request('/api/ibexa/v2/collaboration/sessions', {
            method: 'POST',
            headers: getRequestHeaders({
                token,
                siteaccess,
                accessToken,
                extraHeaders: {
                    Accept: 'application/vnd.ibexa.api.CollaborationSession+json',
                    'Content-Type': 'application/vnd.ibexa.api.ContentSessionCreate+json',
                },
            }),
            body: JSON.stringify(body),
            mode: getRequestMode({ instanceUrl }),
            credentials: 'same-origin',
        });

        showModalLoader({
            modalNode: inviteModalInstance._element,
            headerText: Translator.trans(/*@Desc("Creating session...")*/ 'share.collaboration_session.loader.header', {}, 'ibexa_share'),
            descriptionText: Translator.trans(
                /*@Desc("Don't close this window until the session is created.")*/ 'share.collaboration_session.loader.description',
                {},
                'ibexa_share',
            ),
        });

        try {
            const response = await fetch(request);
            const parsedResponse = await getJsonFromResponse(response);
            const { CollaborationSession: sessionData } = parsedResponse;
            const createdSessionSuccessMsg = inviteModalInstance._isShown
                ? Translator.trans(/*@Desc("Collaboration session created.")*/ 'share.collaboration_session.created', {}, 'ibexa_share')
                : Translator.trans(
                      /*@Desc("Collaboration session created, refresh the page to continue.")*/ 'share.collaboration_session.created_additional_actions',
                      {},
                      'ibexa_share',
                  );

            sessionToken = sessionData.token;

            updateUsersData(sessionData.ParticipantList.Participants);
            showSuccessNotification(createdSessionSuccessMsg);
        } catch (error) {
            showErrorNotification(error);
            hideModalLoader({ modalNode: inviteModalInstance._element });

            return;
        }

        hideModalLoader({ modalNode: inviteModalInstance._element });

        shouldReloadPage = true;

        footerCopyLinkBtn.disabled = false;
        footerCopyLinkBtn.dataset.sessionToken = sessionToken;
        linkSettingsBtn.disabled = !canManagePublicLink;
    };
    const addPeopleToSession = (participantsList) => {
        const body = {
            ParticipantListCreate: {
                '_media-type': 'application/vnd.ibexa.api.ParticipantListCreate+json',
                ParticipantCreate: participantsList,
            },
        };
        const request = new Request(`/api/ibexa/v2/collaboration/sessions/${sessionToken}/participants`, {
            method: 'POST',
            headers: getRequestHeaders({
                token,
                siteaccess,
                accessToken,
                extraHeaders: {
                    Accept: 'application/vnd.ibexa.api.ParticipantList+json',
                    'Content-Type': 'application/vnd.ibexa.api.ParticipantListCreate+json',
                },
            }),
            body: JSON.stringify(body),
            mode: getRequestMode({ instanceUrl }),
            credentials: 'same-origin',
        });

        return fetch(request)
            .then(getJsonFromResponse)
            .then((response) => {
                const { Participants: participants } = response.ParticipantList;

                updateUsersData(participants);
            })
            .catch(showErrorNotification);
    };
    const invitePeople = (taggifyInstance) => {
        const shareWidgetMainContainer = taggifyInstance.container.closest('.ibexa-shr-invite-widget');
        const shareWidget = taggifyInstance.container.closest('.ibexa-shr-share-widget');
        const inviteAccessPopupBtn = shareWidgetMainContainer.querySelector('.ibexa-shr-access-popup__btn');
        const tags = [...taggifyInstance.tags];
        const { action: scope } = inviteAccessPopupBtn.dataset;
        const { contentId, versionNo, languageId } = shareWidget.querySelector('.ibexa-shr-share-widget__btn').dataset;
        const participantsList = tags.map((tag) => {
            const isExternal = typeof tag === 'string' || tag instanceof String;
            if (isExternal) {
                return {
                    '_media-type': 'application/vnd.ibexa.api.ExternalParticipantCreate+json_',
                    email: tag,
                    scope,
                };
            }

            return {
                '_media-type': 'application/vnd.ibexa.api.InternalParticipantCreate+json_',
                User: {
                    '_media-type': 'application/vnd.ibexa.api.User+json',
                    _href: `/api/ibexa/v2/user/users/${tag.id}`,
                },
                scope,
            };
        });

        if (sessionToken) {
            shareWidgetMainContainer.classList.add('ibexa-shr-invite-widget--processing');
            addPeopleToSession(participantsList).then(() => {
                shareWidgetMainContainer.classList.remove('ibexa-shr-invite-widget--processing');
            });
        } else {
            startNewSession(participantsList, contentId, versionNo, languageId);
        }

        taggifyInstance.clearTags();
        inviteAccessPopupBtn.disabled = false;
        setInviteAccessPopupBtnAction(inviteAccessPopupBtn, scope);
    };
    const removeUserCallback = (listItemNode) => {
        const userListNode = listItemNode.closest('.ibexa-shr-invite-widget__users-list');
        const userListWrapper = listItemNode.closest('.ibexa-shr-invite-widget__users');

        listItemNode.remove();

        const userListItems = userListNode.querySelectorAll('.ibexa-shr-invite-widget__users-list-item');
        const userListItemsCount = userListItems.length;

        userListWrapper.classList.toggle('ibexa-shr-invite-widget__users--hidden', !userListItemsCount);
    };
    const updateUsersData = (participants) => {
        const userNodes = doc.querySelectorAll(
            '.ibexa-shr-invite-widget__users .ibexa-shr-invite-widget__users-list-item:not(.ibexa-shr-invite-widget__users-list-item--owner)',
        );

        if (!userNodes.length) {
            return;
        }

        [...userNodes].forEach((userNode) => {
            const { participantId, participantName, participantUserId } = userNode.dataset;
            const parsedParticipantId = parseInt(participantId, 10);
            const parsedParticipantUserId = parseInt(participantUserId, 10);

            if (isNaN(parsedParticipantId) && (participantName || !isNaN(parsedParticipantUserId))) {
                const missingParticipantData = isNaN(parsedParticipantUserId)
                    ? getExternalUserData(participants, participantName)
                    : getInternalUserData(participants, parsedParticipantUserId);

                if (!missingParticipantData) {
                    return;
                }

                const accessPopupBtn = userNode.querySelector('.ibexa-shr-access-popup__btn');

                userNode.dataset.participantId = missingParticipantData.id;
                accessPopupBtn.dataset.participantId = missingParticipantData.id;
            }
        });
    };
    const getInternalUserData = (participants, participantUserId) =>
        participants.find((participant) => {
            const userId = participant.User ? getUserIdFromHref(participant.User._href) : null;

            return userId === participantUserId;
        });
    const getExternalUserData = (participants, participantEmail) =>
        participants.find((participant) => participant.email === participantEmail);
    const getUserIdFromHref = (href) => {
        const splitedHref = href.split('/');

        return parseInt(splitedHref.at(-1), 10);
    };
    const getSessionLink = async (userEmail) => {
        const baseSessionLinkEndpoint = Routing.generate('ibexa.collaboration.rest.session.link.get', { sessionToken });
        const sessionLinkRequest = new Request(userEmail ? `${baseSessionLinkEndpoint}?email=${userEmail}` : baseSessionLinkEndpoint, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            mode: 'same-origin',
            credentials: 'same-origin',
        });

        try {
            const response = await fetch(sessionLinkRequest);
            const sessionLinkData = await getJsonFromResponse(response);

            return sessionLinkData?.url;
        } catch (error) {
            showErrorNotification(Translator.trans(/*@Desc("Error.")*/ 'share.copy_link.get_link_request.error', {}, 'ibexa_share'));
        }
    };
    const copyToClipboard = async ({ currentTarget }) => {
        const { userEmail } = currentTarget.dataset;

        if (!sessionToken) {
            return;
        }

        const linkToCopy = await getSessionLink(userEmail);

        if (!linkToCopy) {
            return;
        }

        try {
            await window.navigator.clipboard.writeText(linkToCopy);
        } catch (error) {
            showErrorNotification(
                Translator.trans(/*@Desc("Failed to copy link to clipboard.")*/ 'share.copy_link.copy_clipboard_error', {}, 'ibexa_share'),
            );
        }

        const isTriggerWithLabel = currentTarget.classList.contains('ibexa-shr-share-widget__copy-link-btn--with-label');

        if (isTriggerWithLabel) {
            showCopiedTooltipBtnLabel(currentTarget);
        } else {
            showCopiedTooltipBtnWithoutLabel(currentTarget);
        }
    };
    const provideTooltipInstance = (element, title, container) => {
        const { delay, placement, trigger, useHtml, template } = TOOLTIPS_DEFAULTS_PARAMS;

        return bootstrap.Tooltip.getOrCreateInstance(element, {
            title,
            delay,
            placement,
            trigger,
            container,
            html: useHtml,
            template: template(),
        });
    };
    const showCopiedTooltipBtnLabel = (currentTarget) => {
        const container = doc.querySelector('.ibexa-shr-share-widget__modal--invite');
        const tooltipInstance = provideTooltipInstance(currentTarget, tooltipCopyLinkSuccess, container);

        tooltipInstance.show();
        clearTimeout(copiedLinkTimeout);

        copiedLinkTimeout = setTimeout(() => {
            tooltipInstance.hide();
        }, COPY_TOOLTIP_TIMEOUT);
    };
    const showCopiedTooltipBtnWithoutLabel = (currentTarget) => {
        const tooltipInstance = bootstrap.Tooltip.getOrCreateInstance(currentTarget);

        tooltipInstance.setContent({ '.tooltip-inner': tooltipCopyLinkSuccess });
        tooltipInstance.tip?.classList.add('ibexa-tooltip--dark');

        clearTimeout(copiedLinkTimeout);

        copiedLinkTimeout = setTimeout(() => {
            tooltipInstance.hide();
        }, COPY_TOOLTIP_TIMEOUT);
    };
    const handleCopyToClipboard = async (event) => {
        await copyToClipboard(event);
        saveDraft();
    };
    const initializeCopyLinkBtns = async (copyBtns) => {
        const isClipboardWriteSupported = await checkIsClipboardWriteSupported();

        copyBtns.forEach((copyBtn) => {
            const isInsideUsersList = !!copyBtn.closest('.ibexa-shr-invite-widget__users-list-item');

            if (isClipboardWriteSupported) {
                setupClipboardCopyLinkBtn(copyBtn, isInsideUsersList);
            } else {
                setupManualCopyLinkBtn(copyBtn, isInsideUsersList);
            }
        });
    };
    const setupClipboardCopyLinkBtn = (copyBtn, isInsideUsersList) => {
        const container = doc.querySelector('.ibexa-shr-share-widget__modal--invite');

        copyBtn.addEventListener('click', handleCopyToClipboard, false);

        if (isInsideUsersList) {
            copyBtn.classList.add('ibexa-btn--no-text');
            provideTooltipInstance(copyBtn, tooltipCopyLink, container);
        }

        copyBtn.addEventListener('hidden.bs.tooltip', () => {
            const tooltipInstance = bootstrap.Tooltip.getOrCreateInstance(copyBtn);

            if (isInsideUsersList) {
                tooltipInstance.setContent({ '.tooltip-inner': tooltipCopyLink });
            } else {
                tooltipInstance.dispose();
            }

            copyBtn.blur();
        });
    };
    const setupManualCopyLinkBtn = (copyBtn, isInsideUsersList) => {
        const labelNode = copyBtn.querySelector('.ibexa-btn__label');

        labelNode.innerText = showCopyLinkLabel;
        copyBtn.addEventListener('click', () => switchCopyLinkState(copyBtn, isInsideUsersList), false);
    };
    const switchCopyLinkState = async (btn, isInsideUsersList) => {
        const hiddenLinkClassName = isInsideUsersList
            ? 'ibexa-shr-invite-widget__users-list-item-manual-link--hidden'
            : 'ibexa-shr-share-widget__modal-footer-manual-link--hidden';
        const linkNode = isInsideUsersList
            ? btn
                  .closest('.ibexa-shr-invite-widget__users-list-item')
                  .querySelector('.ibexa-shr-invite-widget__users-list-item-manual-link')
            : btn.closest('.modal-footer').querySelector('.ibexa-shr-share-widget__modal-footer-manual-link');
        const labelNode = btn.querySelector('.ibexa-btn__label');
        const isLinkVisible = labelNode.innerText === showCopyLinkLabel;
        const { userEmail } = btn.dataset;
        let existingLink = linkNode.textContent || null;

        if (!existingLink) {
            existingLink = await getSessionLink(userEmail);

            linkNode.textContent = existingLink;
        }

        labelNode.innerText = isLinkVisible ? hideCopyLinkLabel : showCopyLinkLabel;
        linkNode.classList.toggle(hiddenLinkClassName, !isLinkVisible);
    };
    const saveDraft = async () => {
        const form = doc.querySelector('.ibexa-form-validate');
        const saveDraftUrl = form.target || window.location.href;
        const formData = new FormData(form);

        formData.set(AUTOSAVE_SUBMIT_BUTTON_NAME, true);

        try {
            await fetch(saveDraftUrl, {
                method: 'POST',
                body: formData,
            });
        } catch (error) {
            showErrorNotification(error);
        }
    };
    const onInviteModalClose = async ({ currentTarget }) => {
        const taggifyInModal = currentTarget
            .closest('.ibexa-shr-share-widget__modal--invite')
            .querySelector('.ibexa-shr-invite-widget .ibexa-taggify');
        const taggifyInstance = getInstance(taggifyInModal);

        taggifyInstance.reset();

        if (!shouldReloadPage) {
            return;
        }

        await saveDraft();
        window.location.reload();
    };
    const setInviteAccessPopupBtnAction = (btn, action) => {
        const actionPopupMenuItem = btn.parentElement.querySelector(`.ibexa-popup-menu__item-content[data-action="${action}"]`);
        const targetActionLabel = actionPopupMenuItem.innerText;
        const { action: targetAction } = actionPopupMenuItem.dataset;
        const btnLabelNode = btn.querySelector('.ibexa-btn__label');

        btn.dataset.action = targetAction;
        btnLabelNode.innerText = targetActionLabel;
    };

    class UserTaggify extends ibexa.core.SuggestionTaggify {
        constructor(config) {
            super(config);

            this.suggestionsRequestItemsLimit = 50;
            this.suggestionsListMaxHeight = 400;
            this.selectedScope = EDIT_ACTION_NAME;
            this.addedTagNodes = [];
        }

        afterTagsUpdate() {
            const tags = [...this.tags];
            const hasOnlyExternalUser = tags.every((tag) => ibexa.errors.emailRegexp.test(tag));
            const inviteAccessPopupBtn = this.container
                .closest('.ibexa-shr-invite-widget__input-wrapper')
                .querySelector('.ibexa-shr-access-popup__btn');

            this.addedTagNodes = this.listNode.querySelectorAll('.ibexa-taggify__list-tag');
            inviteAccessPopupBtn.disabled = hasOnlyExternalUser && tags.length;

            if (tags.length && hasOnlyExternalUser) {
                setInviteAccessPopupBtnAction(inviteAccessPopupBtn, VIEW_ACTION_NAME);
            }

            this.validateTagsData();

            const areAllTagNodesValid = [...this.addedTagNodes].every(
                (tagNode) => !tagNode.classList.contains('ibexa-taggify__list-tag--danger'),
            );

            this.updateInviteButtonAndMessagesState(areAllTagNodesValid, tags.length);
        }

        createSuggestionsRequestBody(query) {
            return { query };
        }

        createSuggestionsRequest({ query }) {
            return this.createUserWithPermissionRequest({ phrase: query });
        }

        createUserWithPermissionRequest(extraData = {}) {
            const shareWidgetNode = this.container.closest('.ibexa-shr-share-widget');
            const { contentId, locationId } = shareWidgetNode.querySelector('.ibexa-shr-share-widget__btn').dataset;
            const selectedAction = this.getCurrentSelectedAction();

            const route = Routing.generate('ibexa.share.permission.users_with_permission_info', {
                module: 'content',
                function: selectedAction === VIEW_ACTION_NAME ? 'versionread' : 'edit',
                locationId,
                contentId,
                ...extraData,
            });

            return new Request(`${route}&limit=${this.suggestionsRequestItemsLimit}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
                mode: 'same-origin',
                credentials: 'same-origin',
            });
        }

        getItemsFromResponse(response) {
            return response;
        }

        getCurrentSelectedAction() {
            const shareWidgetNode = this.container.closest('.ibexa-shr-share-widget');

            return shareWidgetNode.querySelector('.ibexa-shr-access-popup__btn').dataset.action;
        }

        renderSuggestionsList(items) {
            const accessFragment = doc.createDocumentFragment();
            const noAccessFragment = doc.createDocumentFragment();
            const accessNode = this.suggestionsListNode.querySelector('.ibexa-taggify__suggestions-access');
            const noAccessNode = this.suggestionsListNode.querySelector('.ibexa-taggify__suggestions-no-access');
            const noUsersWithAccess = !items.access.length;
            const noUsersWithoutAccess = !items.noAccess.length;
            const appendToFragment = (fragment, item, addClickListener) => {
                const listItemNode = this.renderSuggestionItem(item);

                if (addClickListener) {
                    listItemNode.addEventListener(
                        'click',
                        (event) => {
                            this.hideSuggestionsList();

                            if (listItemNode.classList.contains('ibexa-taggify__suggestion-item--already-added')) {
                                event.preventDefault();
                                return;
                            }

                            const tagAttrs = {
                                dataset: {
                                    isFromSuggestions: true,
                                    participantUserId: item.id,
                                },
                            };
                            const tagTooltipAttrs = {
                                title: item.email,
                                dataset: {
                                    tooltipContainerSelector: '#ibexa-share-invite-modal',
                                },
                            };

                            this.addTag(item.name, item, tagAttrs, tagTooltipAttrs);
                            this.inputNode.value = '';
                        },
                        false,
                    );
                }

                fragment.append(listItemNode);
            };

            items.access.forEach((item) => appendToFragment(accessFragment, item, true));
            items.noAccess.forEach((item) => appendToFragment(noAccessFragment, item, false));

            accessNode.innerHTML = '';
            accessNode.append(accessFragment);
            accessNode.previousElementSibling.classList.toggle('ibexa-taggify__suggestions-header--hidden', noUsersWithAccess);

            noAccessNode.innerHTML = '';
            noAccessNode.append(noAccessFragment);
            noAccessNode.previousElementSibling.classList.toggle('ibexa-taggify__suggestions-header--hidden', noUsersWithoutAccess);

            this.suggestionsListNode.classList.toggle('ibexa-taggify__suggestions--no-results', noUsersWithAccess && noUsersWithoutAccess);

            this.showSuggestionsList();
            this.updateSuggestionsMaxHeight();
        }

        renderSuggestionItem(item) {
            const itemTemplate = this.suggestionsListNode.dataset.template;
            const renderedTemplate = itemTemplate
                .replace('{{ name }}', escapeHTML(item.name))
                .replace('{{ email }}', escapeHTML(item.email));

            const container = doc.createElement('div');

            container.innerHTML = '';
            container.insertAdjacentHTML('beforeend', renderedTemplate);

            const lastAddedItemNode = container.querySelector('div');

            lastAddedItemNode.classList.toggle(
                'ibexa-taggify__suggestion-item--already-added',
                this.checkIsInternalParticipantAlreadyAdded(item.id),
            );

            return lastAddedItemNode;
        }

        reset() {
            this.inputNode.value = '';
            this.hideSuggestionsList();
            this.clearTags();
        }

        clearTags() {
            [...this.addedTagNodes].forEach((tagNode) => tagNode.querySelector('.ibexa-taggify__btn--remove').click());
        }

        checkIsTagExternal(tag) {
            return typeof tag === 'string' || tag instanceof String;
        }

        checkIsInternalParticipantAlreadyAdded(participantUserId) {
            const isAddedInTaggify = !!this.listNode.querySelector(
                `.ibexa-taggify__list-tag[data-participant-user-id="${participantUserId}"]`,
            );
            const isAddedInList = !!doc.querySelector(
                `.ibexa-shr-invite-widget__users-list-item[data-participant-user-id="${participantUserId}"]`,
            );

            return isAddedInList || isAddedInTaggify;
        }

        checkIsExternalParticipantAlreadyAdded(tag) {
            return !!doc.querySelector(`.ibexa-shr-invite-widget__users-list-item[data-participant-id="${tag}"]`);
        }

        checkIsExternalParticipantTagValid(tag) {
            return ibexa.errors.emailRegexp.test(tag) && !this.checkIsExternalParticipantAlreadyAdded(tag);
        }

        validateTagsData() {
            [...this.addedTagNodes].forEach((tagNode) => {
                const { isFromSuggestions } = tagNode.dataset;
                const tagName = tagNode.querySelector('.ibexa-taggify__list-tag-name').innerText;
                const isParticipantTagValid = isFromSuggestions || this.checkIsExternalParticipantTagValid(tagName);

                tagNode.dataset.isDataValid = isParticipantTagValid;

                if (!isParticipantTagValid) {
                    this.toggleInvalidTagClassName(tagNode, true);
                }
            });
        }

        validateTagsScope() {
            if (!this.addedTagNodes?.length) {
                return;
            }

            const addedInternalsUserIds = [...this.tags]
                .filter((tag) => typeof tag !== 'string' && !(tag instanceof String))
                .map((tag) => tag.id);
            const request = this.createUserWithPermissionRequest({
                userIds: addedInternalsUserIds.join(','),
            });

            fetch(request)
                .then(getJsonFromResponse)
                .then((response) => {
                    [...this.addedTagNodes].forEach((tagNode) => {
                        const { isDataValid, participantUserId } = tagNode.dataset;
                        const isTagDataValid = isDataValid === 'true';
                        const isParticipantTagScopeValid = !!response.access.find((user) => user.id === parseInt(participantUserId, 10));
                        const isTagFullyValid = isTagDataValid && isParticipantTagScopeValid;

                        this.toggleInvalidTagClassName(tagNode, !isTagFullyValid);
                        tagNode.dataset.isScopeValid = isParticipantTagScopeValid;
                    });

                    const areAllTagNodesValid = [...this.addedTagNodes].every(
                        (tagNode) => !tagNode.classList.contains('ibexa-taggify__list-tag--danger'),
                    );
                    this.updateInviteButtonAndMessagesState(areAllTagNodesValid, [...this.addedTagNodes].length);
                })
                .catch(showErrorNotification);
        }

        toggleInvalidTagClassName(tagNode, isInvalid) {
            tagNode.classList.toggle('ibexa-taggify__list-tag--danger', isInvalid);
        }

        updateInviteButtonAndMessagesState(areTagsValid, tagsCount) {
            const inviteBtn = this.container
                .closest('.ibexa-shr-invite-widget__search-wrapper')
                .querySelector('.ibexa-shr-invite-widget__invite-button');
            const searchWrapperNode = this.container.closest('.ibexa-shr-invite-widget__search-wrapper');
            const helpNode = searchWrapperNode.querySelector('.ibexa-form-help');
            const errorNode = searchWrapperNode.querySelector('.ibexa-form-error');

            helpNode.classList.toggle('ibexa-form-help--hidden', !areTagsValid);
            errorNode.classList.toggle('ibexa-form-error--hidden', areTagsValid);
            inviteBtn.disabled = !areTagsValid || !tagsCount;
        }

        handleInputKeyUp(event) {
            if (this.isAcceptKeyPressed(event.key) && !this.inputNode.value.includes('@')) {
                const suggestedItem = this.suggestionsListNode.querySelector(
                    '.ibexa-taggify__suggestion-item:not(.ibexa-taggify__suggestion-item--already-added)',
                );

                if (suggestedItem) {
                    suggestedItem.click();

                    return;
                }
            }

            super.handleInputKeyUp(event);
        }

        init() {
            super.init();

            this.inputNode.addEventListener(
                'blur',
                () => {
                    const suggestionsNoResults = this.suggestionsListNode.classList.contains('ibexa-taggify__suggestions--no-results');

                    if (suggestionsNoResults) {
                        this.hideSuggestionsList();
                        this.handleInputBlur();
                    }
                },
                false,
            );
        }
    }

    taggifyWidgets.forEach((taggifyWidget) => {
        const taggify = new UserTaggify({
            container: taggifyWidget,
            shouldAddTagByInputBlur: false,
            acceptKeys: ['Enter', ' '],
        });
        const accessPopup = taggifyWidget.closest('.ibexa-shr-invite-widget__input-wrapper').querySelector('.ibexa-shr-access-popup');
        const popupMenuElement = accessPopup.querySelector('.ibexa-popup-menu');
        const triggerElement = accessPopup.querySelector('.ibexa-shr-access-popup__btn');

        taggify.init();

        setInstance(taggifyWidget, taggify);

        new ibexa.core.PopupMenu({
            popupMenuElement,
            triggerElement,
            openedMenuClass: 'ibexa-shr-access-popup__btn--menu-opened',
            onItemClick: ({ currentTarget }) => {
                const { action } = currentTarget.dataset;
                const actionLabel = currentTarget.innerText;
                const btnLabelNode = triggerElement.querySelector('.ibexa-btn__label');

                triggerElement.dataset.action = action;
                btnLabelNode.innerText = actionLabel;

                taggify.selectedScope = action;
                taggify.validateTagsScope();
                taggify.triggerSuggestionsRequest();
            },
        });
    });
    inviteBtns.forEach((inviteButton) => {
        inviteButton.addEventListener(
            'click',
            ({ currentTarget }) => {
                const taggifyNode = currentTarget.closest('.ibexa-shr-invite-widget__selector-wrapper').querySelector('.ibexa-taggify');
                const taggifyInstance = ibexa.helpers.objectInstances.getInstance(taggifyNode);
                const tags = [...taggifyInstance.tags];
                const inviteWidget = currentTarget.closest('.ibexa-shr-invite-widget');
                const hasInvalidTags = !!taggifyInstance.listNode.querySelectorAll('.ibexa-taggify__list-tag--danger').length;

                taggifyInstance.checkIsTagExternal;
                if (hasInvalidTags) {
                    return;
                }

                tags.forEach((tag) => {
                    if (taggifyInstance.checkIsTagExternal(tag)) {
                        renderExternalUser(tag, inviteWidget);
                    } else {
                        renderInternalUser(tag, inviteWidget);
                    }
                });

                const userListItemTooltipNodes = doc.querySelectorAll('.ibexa-shr-invite-widget__users [title]');

                [...userListItemTooltipNodes].forEach(parseTooltips);
                invitePeople(taggifyInstance);
            },
            false,
        );
    });

    const updateCollaborationSession = async (body) => {
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
                ContentSessionUpdate: body,
            }),
            mode: getRequestMode({ instanceUrl }),
            credentials: 'same-origin',
        });

        return fetch(request).then(getJsonFromResponse).catch(showErrorNotification);
    };

    if (openShareModalParam) {
        const url = new URL(window.location);
        const editHeader = doc.querySelector('.ibexa-edit-header');

        url.searchParams.delete('open_share_modal');
        window.history.replaceState({}, document.title, url);

        if (editHeader) {
            editHeader.addEventListener('ibexa-control-z-index:events-attached', () => shareWidgetBtn.click(), false);
        }
    }

    publicPreviewSettingSwitcher.addEventListener(
        'change',
        (event) => {
            updateCollaborationSession({
                hasPublicLink: event.target.checked,
            });
        },
        false,
    );

    accessPopups.forEach(initAccessPopup);
    initializeCopyLinkBtns([...participantsCopyLinkBtns, footerCopyLinkBtn]);

    closeInviteModalBtn.addEventListener('click', onInviteModalClose, false);
    shareWidgetBtn.addEventListener('click', () => inviteModalInstance.show(), false);
})(window, window.document, window.ibexa, window.bootstrap);
