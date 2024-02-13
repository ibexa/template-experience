(function (global, doc, ibexa, Routing, Translator) {
    const CLASS_LIST_WRAPPER_HIDDEN = 'ibexa-workflow-apply-transition__user-list-wrapper--hidden';
    const CLASS_LIST_ITEM_DISABLED = 'ibexa-workflow-apply-transition__user-list-item--disabled';
    const SELECTOR_APPLY_TRANSITION = '.ibexa-workflow-apply-transition';
    const SELECTOR_USER_INPUT = '.ibexa-workflow-apply-transition__user-input';
    const SELECTOR_LIST_WRAPPER = '.ibexa-workflow-apply-transition__user-list-wrapper';
    const SELECTOR_MESSAGE_WRAPPER = '.ibexa-workflow-apply-transition__message-wrapper';
    const SELECTOR_USER_NAME = '.ibexa-workflow-apply-transition__user-name';
    const applyTransitionButtons = doc.querySelectorAll('.ibexa-btn--workflow-apply');
    const userInputs = doc.querySelectorAll(SELECTOR_USER_INPUT);
    const usersLists = doc.querySelectorAll(`.ibexa-workflow-apply-transition__user-list`);
    const removeReviewerButtons = doc.querySelectorAll('.ibexa-tag__remove-btn--remove-reviewer');
    let getReviewersTimeout;
    const handleRequestResponse = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    };
    const applyTransition = (event) => {
        const transitionContainer = event.currentTarget.closest(SELECTOR_APPLY_TRANSITION);
        const message = transitionContainer.querySelector(`${SELECTOR_MESSAGE_WRAPPER} textarea`).value;
        const reviewer = transitionContainer.querySelector(SELECTOR_USER_NAME);
        const reviewerId = reviewer ? reviewer.dataset.id : '';
        const menuWorkflowButton = doc.querySelector(`button[data-actions="${transitionContainer.dataset.actions}"]`);

        if (menuWorkflowButton.dataset.validate && menuWorkflowButton.dataset.isFormValid !== '1') {
            return;
        }

        doc.querySelector('[name="ezplatform_content_forms_content_edit[workflow][name]"]').value =
            transitionContainer.dataset.workflowName;
        doc.querySelector('[name="ezplatform_content_forms_content_edit[workflow][transition]"]').value =
            transitionContainer.dataset.transitionName;
        doc.querySelector('[name="ezplatform_content_forms_content_edit[workflow][comment]"]').value = message;
        doc.querySelector('[name="ezplatform_content_forms_content_edit[workflow][reviewer]"]').value = reviewerId;

        doc.querySelector('[name="ezplatform_content_forms_content_edit[workflow][apply]"]').click();
    };
    const generateReviewersListRoute = (transitionNode, query) => {
        const {
            contextAction,
            workflowName,
            transitionName,
            contentTypeIdentifier,
            languageCode,
            parentLocationId,
            contentId,
            versionNo,
            locationId,
        } = transitionNode.dataset;
        let route;

        if (contextAction === 'create') {
            route = Routing.generate('ibexa.workflow.content_create.reviewer_suggest', {
                workflowName,
                transitionName,
                contentTypeIdentifier,
                languageCode,
                locationId: parentLocationId,
            });
        } else {
            route = Routing.generate('ibexa.workflow.content_edit.reviewer_suggest', {
                workflowName,
                transitionName,
                contentId,
                versionNo,
                locationId,
            });
        }

        return `${route}?query=${query}`;
    };
    const getReviewerList = (transitionContainer, route) => {
        const request = new Request(route);
        const { showErrorNotification } = ibexa.helpers.notification;
        const errorMessage = Translator.trans(/*@Desc("Can't load reviewer list")*/ 'load.reviewers.error', {}, 'ibexa_workflow');

        fetch(request)
            .then(handleRequestResponse)
            .then(showReviewersList.bind(this, transitionContainer))
            .catch(() => showErrorNotification(errorMessage));
    };
    const createReviewersListItem = (reviewer) =>
        `<li data-id="${reviewer.id}" class="ibexa-workflow-apply-transition__user-list-item${
            !reviewer.canReview ? ` ${CLASS_LIST_ITEM_DISABLED}` : ''
        }">${reviewer.name}</li>`;
    const showReviewersList = (transitionContainer, reviewersList) => {
        const listWrapper = transitionContainer.querySelector(SELECTOR_LIST_WRAPPER);
        const listContainer = transitionContainer.querySelector('.ibexa-workflow-apply-transition__user-list');
        const renderedReviewers = reviewersList.reduce((total, reviewer) => total + createReviewersListItem(reviewer), '');
        const listInfoMethodName = reviewersList.some((reviewer) => !reviewer.canReview) ? 'removeAttribute' : 'setAttribute';

        listContainer.innerHTML = renderedReviewers;
        listWrapper.classList.remove(CLASS_LIST_WRAPPER_HIDDEN);
        transitionContainer.querySelector('.ibexa-workflow-apply-transition__user-list-info')[listInfoMethodName]('hidden', 'hidden');
    };
    const selectReviewer = (event) => {
        const transitionContainer = event.target.closest(SELECTOR_APPLY_TRANSITION);
        const reviewer = transitionContainer.querySelector(SELECTOR_USER_NAME);

        if (event.target.classList.contains(CLASS_LIST_ITEM_DISABLED)) {
            return;
        }

        reviewer.dataset.id = event.target.dataset.id;
        reviewer.innerHTML = event.target.innerHTML;

        transitionContainer.querySelector(SELECTOR_LIST_WRAPPER).classList.add(CLASS_LIST_WRAPPER_HIDDEN);

        changeStep(transitionContainer, false);
    };
    const changeStep = (transitionContainer, firstStep) => {
        const { reviewerRequired } = transitionContainer.dataset;
        const userMethodName = firstStep ? 'setAttribute' : 'removeAttribute';
        const messageMethodName = firstStep && reviewerRequired ? 'setAttribute' : 'removeAttribute';
        const inputMethodName = firstStep ? 'removeAttribute' : 'setAttribute';
        const input = transitionContainer.querySelector(SELECTOR_USER_INPUT);

        transitionContainer.querySelector('.ibexa-workflow-apply-transition__user')[userMethodName]('hidden', 'hidden');
        transitionContainer.querySelector(SELECTOR_MESSAGE_WRAPPER)[messageMethodName]('hidden', 'hidden');
        transitionContainer.querySelector('.ibexa-workflow-apply-transition__actions')[messageMethodName]('hidden', 'hidden');

        input[inputMethodName]('hidden', 'hidden');
        input.value = '';
    };
    const removeReviewer = (event) => {
        const transitionContainer = event.target.closest(SELECTOR_APPLY_TRANSITION);

        changeStep(transitionContainer, true);
    };
    const handleTyping = (event) => {
        const query = event.target.value.trim();

        window.clearTimeout(getReviewersTimeout);

        if (query.length > 2) {
            const transitionContainer = event.target.closest(SELECTOR_APPLY_TRANSITION);
            const reviewersListRoute = generateReviewersListRoute(transitionContainer, query);

            getReviewersTimeout = window.setTimeout(getReviewerList.bind(null, transitionContainer, reviewersListRoute), 200);
        }
    };

    if (!!applyTransitionButtons.length) {
        applyTransitionButtons.forEach((btn) => btn.addEventListener('click', applyTransition, false));
    }

    if (!!userInputs.length && !!usersLists.length && !!removeReviewerButtons.length) {
        userInputs.forEach((btn) => btn.addEventListener('keyup', handleTyping, false));
        usersLists.forEach((usersList) => usersList.addEventListener('click', selectReviewer, false));
        removeReviewerButtons.forEach((usersList) => usersList.addEventListener('click', removeReviewer, false));
    }
})(window, document, window.ibexa, window.Routing, window.Translator);
