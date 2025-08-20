(function (global, doc, ibexa, Translator, bootstrap) {
    const COPY_TOOLTIP_TIMEOUT = 3000;
    const table = doc.querySelector('.ibexa-ca-invitation-table');

    if (!table) {
        return;
    }

    const resendForm = doc.querySelector('form[name="ibexa_user_invitation_resend-form"]');
    const resendHashInput = resendForm.querySelector('#ibexa_user_invitation_resend-form');
    const reinviteForm = doc.querySelector('form[name="ibexa_user_invitation_reinvite-form"]');
    const reinviteHashInput = reinviteForm.querySelector('#ibexa_user_invitation_reinvite-form');
    const copyLinkBtns = table.querySelectorAll('.ibexa-ca-invitation-table__copy-link-btn');
    const reinviteBtns = table.querySelectorAll('.ibexa-ca-invitation-table__reinvite-btn');
    const resendBtns = table.querySelectorAll('.ibexa-ca-invitation-table__resend-btn');
    const handleCopyLink = (event) => {
        const btn = event.currentTarget;
        const btnTooltip = bootstrap.Tooltip.getOrCreateInstance(btn);
        const { link } = btn.dataset;

        if (!global.navigator.clipboard) {
            ibexa.helpers.notification.showErrorNotification(
                Translator.trans(
                    /*@Desc("Cannot copy invitation link due to browser limitations.")*/ 'table.invitations.actions.copy_link.copy_clipboard_error',
                    {},
                    'ibexa_corporate_account',
                ),
            );

            return;
        }

        const copiedTooltipTitle = Translator.trans(
            /*@Desc("Copied!")*/ 'table.invitations.actions.copy_link.copied_tooltip.title',
            {},
            'ibexa_corporate_account',
        );
        const originalTooltipTitle = btn.dataset.bsOriginalTitle;

        global.navigator.clipboard.writeText(link);

        btn.dataset.bsOriginalTitle = copiedTooltipTitle;
        btnTooltip.show();
        setTimeout(() => {
            btnTooltip.hide();
            btn.dataset.bsOriginalTitle = originalTooltipTitle;
        }, COPY_TOOLTIP_TIMEOUT);
    };
    const handleReinvite = (event) => {
        const btn = event.currentTarget;
        const { inviteHash } = btn.dataset;

        reinviteHashInput.value = inviteHash;
        reinviteForm.submit();
    };
    const handleResend = (event) => {
        const btn = event.currentTarget;
        const { inviteHash } = btn.dataset;

        resendHashInput.value = inviteHash;
        resendForm.submit();
    };

    copyLinkBtns.forEach((btn) => btn.addEventListener('click', handleCopyLink, false));
    reinviteBtns.forEach((btn) => btn.addEventListener('click', handleReinvite, false));
    resendBtns.forEach((btn) => btn.addEventListener('click', handleResend, false));
})(window, window.document, window.ibexa, window.Translator, window.bootstrap);
