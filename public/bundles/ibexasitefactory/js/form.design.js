(function (global, doc) {
    const designItems = doc.querySelectorAll('.ibexa-sf-design-layouts__item');
    const siteSkeletonWrapper = doc.querySelector('.ibexa-site-factory-form-site-skeleton');
    const siteSkeleton = doc.querySelector('.ibexa-site-factory-form-site-skeleton__widget');
    const setSelectedTheme = (event) => {
        const siteSkeletonVisibleMethod = event.currentTarget.dataset.siteSkeleton ? 'remove' : 'add';
        const siteSkeletonValueMethod = event.currentTarget.dataset.siteSkeleton ? 'setAttribute' : 'removeAttribute';

        designItems.forEach((design) => design.classList.remove('ibexa-sf-design-layouts__item--selected'));
        event.currentTarget.classList.add('ibexa-sf-design-layouts__item--selected');
        event.currentTarget.closest('.ibexa-sf-design-layouts').querySelector('select').value = event.currentTarget.dataset.id;

        if (siteSkeletonWrapper) {
            siteSkeletonWrapper.classList[siteSkeletonVisibleMethod]('ibexa-site-factory-form-site-skeleton--is-hidden');
        }

        if (siteSkeleton) {
            siteSkeleton.querySelector(`input.form-check-input`)[siteSkeletonValueMethod]('checked', 'checked');
        }
    };

    designItems.forEach((design) => design.addEventListener('click', setSelectedTheme));
})(window, window.document);
