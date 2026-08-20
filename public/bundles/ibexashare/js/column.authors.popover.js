(function (global, doc, ibexa, bootstrap) {
    const authorIcons = doc.querySelectorAll('.ibexa-shr-authors-column__info-icon');

    authorIcons.forEach((icon) => {
        const popoverElement = icon.closest('.ibexa-shr-authors-column__info');
        const popoverContent = popoverElement.querySelector('.ibexa-shr-authors-column__popover-inner');

        new bootstrap.Popover(
            popoverElement,
            {
                content: popoverContent,
                html: true,
                placement: 'bottom',
                trigger: 'hover',
            },
            { dropdown: icon },
        );
    });
})(window, window.document, window.ibexa, window.bootstrap);
