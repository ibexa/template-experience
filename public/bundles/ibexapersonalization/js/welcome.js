(function (global, doc, bootstrap) {
    const termsContentContainer = doc.querySelector('.ibexa-modal__content-terms');
    const termsListContainer = doc.querySelector('.ibexa-modal__table-of-contents-list');
    const openModalBtn = doc.querySelector('.ibexa-perso-welcome__show-modal-button');
    const acceptTermsBtn = doc.querySelector('.ibexa-modal__accept-terms-and-conditions-button');
    const tableOfContentsItems = [...doc.querySelectorAll('.ibexa-modal__table-of-contents-list-link')];
    const carouselBtns = [...doc.querySelectorAll('[data-carousel-btn]')];
    const carouselItems = [...doc.querySelectorAll('[data-carousel-item]')];
    const paragraphsIds = tableOfContentsItems.map((item) => item.dataset.scrollTo);
    const WELCOME_ANIMATION_TIME_RESET = 1000;
    const WELCOME_ANIMATION_TIME_CHANGE = 10000;
    let carouselInterval;
    let isCarouselBtnLocked = false;

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
    const startCarouselAnimation = () => {
        carouselInterval = setInterval(() => {
            const activeBtnIndex = carouselBtns.findIndex((btn) => btn.classList.contains('ibexa-perso-carousel__btn--active'));
            const nextBtn = carouselBtns[activeBtnIndex + 1] ?? carouselBtns[0];

            changeCarouselItem(nextBtn);
        }, WELCOME_ANIMATION_TIME_CHANGE);
    };
    const stopCarouselAnimation = () => {
        clearInterval(carouselInterval);
    };
    const restartCarouselAnimation = () => {
        stopCarouselAnimation();
        startCarouselAnimation();
    };
    const changeCarouselItem = (carouselBtn) => {
        if (carouselBtn.classList.contains('ibexa-perso-carousel__btn--active') || isCarouselBtnLocked) {
            return;
        }

        const activeBtn = doc.querySelector('.ibexa-perso-carousel__btn--active');
        const activeCarouselItem = carouselItems.find((item) => item.dataset.carouselItem === activeBtn.dataset.carouselBtn);
        const toBeActiveCarouselItem = carouselItems.find((item) => item.dataset.carouselItem === carouselBtn.dataset.carouselBtn);

        activeBtn.classList.remove('ibexa-perso-carousel__btn--active');
        carouselBtn.classList.add('ibexa-perso-carousel__btn--active');
        activeCarouselItem.classList.remove('ibexa-perso-carousel__item--active');
        activeCarouselItem.classList.add('ibexa-perso-carousel__item--hiding');
        toBeActiveCarouselItem.classList.add('ibexa-perso-carousel__item--active');

        toBeActiveCarouselItem.addEventListener('mouseenter', stopCarouselAnimation, false);
        toBeActiveCarouselItem.addEventListener('mouseleave', restartCarouselAnimation, false);
        activeCarouselItem.removeEventListener('mouseenter', stopCarouselAnimation, false);
        activeCarouselItem.removeEventListener('mouseleave', restartCarouselAnimation, false);

        isCarouselBtnLocked = true;
    };
    const handleCarouselChangeOnClick = ({ target }) => {
        restartCarouselAnimation();
        changeCarouselItem(target);
    };
    const handleCarouselChangeOnKeyDown = (event) => {
        if (event.key !== 'Enter' || event.key !== ' ') {
            return;
        }

        restartCarouselAnimation();
        changeCarouselItem(event.target);
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

    carouselItems.forEach((item) => {
        item.addEventListener('transitionend', ({ propertyName, target }) => {
            if (propertyName !== 'left' || !target.classList.contains('ibexa-perso-carousel__item--hiding')) {
                return;
            }

            target.classList.remove('ibexa-perso-carousel__item--hiding');
            setTimeout(() => {
                isCarouselBtnLocked = false;
            }, WELCOME_ANIMATION_TIME_RESET);
        });
    });
    carouselItems[0].addEventListener('mouseenter', stopCarouselAnimation, false);
    carouselItems[0].addEventListener('mouseleave', restartCarouselAnimation, false);

    carouselBtns.forEach((btn) => {
        btn.addEventListener('click', handleCarouselChangeOnClick, false);
        btn.addEventListener('keydown', handleCarouselChangeOnKeyDown, false);
    });

    startCarouselAnimation();
})(window, window.document, window.bootstrap);
