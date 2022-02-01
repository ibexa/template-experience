(function(global, doc, bootstrap) {
    const termsContentContainer = doc.querySelector('.ibexa-modal__content-terms');
    const termsListContainer = doc.querySelector('.ibexa-modal__table-of-contents-list');
    const openModalBtn = doc.querySelector('.ibexa-perso-welcome__show-modal-button');
    const acceptTermsBtn = doc.querySelector('.ibexa-modal__accept-terms-and-conditions-button');
    const tableOfContentsItems = [...doc.querySelectorAll('.ibexa-modal__table-of-contents-list-link')];
    const paragraphsIds = tableOfContentsItems.map((item) => item.dataset.scrollTo);
    const handleContentScroll = () => {
        const parentRect = termsContentContainer.getBoundingClientRect();
        const parentHeight = termsContentContainer.offsetHeight;
        const paragraphs = paragraphsIds.map((paragraphId) => termsContentContainer.querySelector(`#${paragraphId}`));

        const currentParagraph = paragraphs.reverse().find((paragraph) => {
            const paragraphRect = paragraph.getBoundingClientRect();
            const relativeTop = paragraphRect.top - parentRect.top;
            const isAboveThreshold = relativeTop < parentHeight / 2;

            return isAboveThreshold;
        });

        const activeParagraph = currentParagraph ?? paragraphs[paragraphs.length - 1];
        const respectiveTableOfContentsLink = termsListContainer.querySelector(`[data-scroll-to="${activeParagraph.id}"]`);
        const respectiveTableOfContentsListItem = respectiveTableOfContentsLink.closest('.ibexa-modal__table-of-contents-list-item');
        const lastActiveTableOfContentsListItem = termsListContainer.querySelector('.ibexa-modal__table-of-contents-list-item--active');

        if (respectiveTableOfContentsListItem !== lastActiveTableOfContentsListItem) {
            lastActiveTableOfContentsListItem?.classList.remove('ibexa-modal__table-of-contents-list-item--active');
            respectiveTableOfContentsListItem.classList.add('ibexa-modal__table-of-contents-list-item--active');
        }
    };
    const scrollTerms = (event) => {
        event.preventDefault();

        const listLink = event.currentTarget;
        const { scrollTo } = listLink.dataset;

        if (scrollTo) {
            termsContentContainer.querySelector(`#${scrollTo}`).scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (openModalBtn) {
        openModalBtn.addEventListener(
            'click',
            (event) => {
                event.preventDefault();

                bootstrap.Modal.getOrCreateInstance(doc.querySelector('#terms-and-conditions-modal')).show();
            },
            false,
        );
    }

    if (acceptTermsBtn) {
        acceptTermsBtn.addEventListener(
            'click',
            () => {
                doc.querySelector('.ibexa-perso-welcome__accept-terms-checkbox').checked = true;
            },
            false,
        );
    }

    tableOfContentsItems.forEach((listLink) => {
        listLink.addEventListener('click', scrollTerms, false);
    });

    termsContentContainer.addEventListener('scroll', handleContentScroll, false);
})(window, window.document, window.bootstrap);
