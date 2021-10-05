(function(global, doc) {
    const designItems = doc.querySelectorAll('.ez-site-factory-form-design__item');
    const siteSkeletonWrapper = doc.querySelector('.ez-site-factory-form-site-skeleton');
    const siteSkeleton = doc.querySelector('.ez-site-factory-form-site-skeleton__widget');
    const setSelectedTheme = (event) => {
        const siteSkeletonVisibleMethod = event.currentTarget.dataset.siteSkeleton ? 'remove' : 'add';
        const siteSkeletonValueMethod = event.currentTarget.dataset.siteSkeleton ? 'setAttribute' : 'removeAttribute';

        designItems.forEach((design) => design.classList.remove('ez-site-factory-form-design__item--selected'));
        event.currentTarget.classList.add('ez-site-factory-form-design__item--selected');
        event.currentTarget.closest('.ez-site-factory-form-design').querySelector('select').value = event.currentTarget.dataset.id;

        if (siteSkeletonWrapper) {
            siteSkeletonWrapper.classList[siteSkeletonVisibleMethod]('ez-site-factory-form-site-skeleton--is-hidden');
        }

        if (siteSkeleton) {
            siteSkeleton.querySelector(`input.form-check-input`)[siteSkeletonValueMethod]('checked', 'checked');
        }
    };

    designItems.forEach((design) => design.addEventListener('click', setSelectedTheme));
})(window, window.document);
