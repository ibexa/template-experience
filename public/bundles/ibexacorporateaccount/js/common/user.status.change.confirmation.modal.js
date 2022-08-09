(function (global, doc, bootstrap, Translator) {
    const modal = doc.querySelector('.ibexa-ca-user-status-change-confirmation-modal');

    if (!modal) {
        return;
    }

    const bootstrapModalInstance = bootstrap.Modal.getOrCreateInstance(modal);
    const activateBtn = modal.querySelector('.ibexa-ca-user-status-change-confirmation-modal__activate-btn');
    const deactivateBtn = modal.querySelector('.ibexa-ca-user-status-change-confirmation-modal__deactivate-btn');
    const modalTitleNode = modal.querySelector('.modal-title');
    const questionNode = modal.querySelector('.ibexa-ca-user-status-change-confirmation-modal__question');
    const noteNode = modal.querySelector('.ibexa-ca-user-status-change-confirmation-modal__note');
    const userStatusChangeBtns = doc.querySelectorAll('.ibexa-ca-user-status-change-btn');
    let currentHref = null;
    const toggleUserStatus = () => {
        window.location.href = currentHref;
    };
    const prepareModal = (statusChangeType, username, href) => {
        currentHref = href;

        if (statusChangeType === 'activate') {
            const modalTitle = Translator.trans(
                /*@Desc("Activate user")*/ 'modal.user_status_change.title.activate',
                {},
                'corporate_account',
            );
            const questionText = Translator.trans(
                /*@Desc("Are you sure you want to activate %username%?")*/ 'modal.user_status_change.question.activate',
                { username },
                'corporate_account',
            );
            const noteText = Translator.trans(
                /*@Desc("This user will get access to their account.")*/ 'modal.user_status_change.note.activate',
                { username },
                'corporate_account',
            );

            modalTitleNode.innerText = modalTitle;
            questionNode.innerText = questionText;
            noteNode.innerText = noteText;

            activateBtn.hidden = false;
            deactivateBtn.hidden = true;
        } else {
            const modalTitle = Translator.trans(
                /*@Desc("De-activate user")*/ 'modal.user_status_change.title.deactivate',
                {},
                'corporate_account',
            );
            const questionText = Translator.trans(
                /*@Desc("Are you sure you want to de-activate %username%?")*/ 'modal.user_status_change.question.deactivate',
                { username },
                'corporate_account',
            );
            const noteText = Translator.trans(
                /*@Desc("This user will lose access to their account.")*/ 'modal.user_status_change.note.deactivate',
                { username },
                'corporate_account',
            );

            modalTitleNode.innerText = modalTitle;
            questionNode.innerText = questionText;
            noteNode.innerText = noteText;

            activateBtn.hidden = true;
            deactivateBtn.hidden = false;
        }
    };
    const handleUserStatusChange = (event) => {
        const btn = event.currentTarget;
        const { statusChangeType, username, href } = btn.dataset;

        prepareModal(statusChangeType, username, href);
        bootstrapModalInstance.show();
    };

    userStatusChangeBtns.forEach((btn) => btn.addEventListener('click', handleUserStatusChange, false));

    activateBtn.addEventListener('click', toggleUserStatus, false);
    deactivateBtn.addEventListener('click', toggleUserStatus, false);
})(window, window.document, window.bootstrap, window.Translator);
