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
    const userStatusChangeBtns = doc.querySelectorAll('.ibexa-ca-user-status-change-btn');
    let currentUserId = null;
    const activateUser = () => {
        // TODO:
        // global.history.href = Route.generate
        console.log(currentUserId, 'activated'); // eslint-disable-line no-console
    };
    const deactivateUser = () => {
        // TODO:
        // global.history.href = Route.generate
        console.log(currentUserId, 'deactivated'); // eslint-disable-line no-console
    };
    const prepareModal = (statusChangeType, username, userId) => {
        currentUserId = userId;

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

            modalTitleNode.innerText = modalTitle;
            questionNode.innerText = questionText;

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

            modalTitleNode.innerText = modalTitle;
            questionNode.innerText = questionText;

            activateBtn.hidden = true;
            deactivateBtn.hidden = false;
        }

        bootstrapModalInstance.show();
    };
    const handleUserStatusChange = (event) => {
        const btn = event.currentTarget;
        const { statusChangeType, username, userId } = btn.dataset;

        prepareModal(statusChangeType, username, userId);
    };

    userStatusChangeBtns.forEach((btn) => btn.addEventListener('click', handleUserStatusChange, false));

    activateBtn.addEventListener('click', activateUser, false);
    deactivateBtn.addEventListener('click', deactivateUser, false);
})(window, window.document, window.bootstrap, window.Translator);
