(function (global, doc, ibexa, bootstrap) {
    const showHistoryBtns = doc.querySelectorAll('.ibexa-btn--workflow-chart');
    const showPopup = ({ currentTarget: btn }) => {
        const selector = '[data-workflow-popup="ibexa-workflow-popup"]';

        fetch(btn.dataset.src)
            .then((response) => response.text())
            .then((text) => {
                const modal = doc.querySelector(selector);

                modal.querySelector('.modal-body').innerHTML = text;
                bootstrap.Modal.getOrCreateInstance(modal).show();
            });
    };

    showHistoryBtns.forEach((btn) => {
        btn.addEventListener('click', showPopup, false);
    });
})(window, window.document, window.ibexa, window.bootstrap);
