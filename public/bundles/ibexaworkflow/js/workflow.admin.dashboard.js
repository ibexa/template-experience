(function (global, doc, ibexa, bootstrap) {
    const containers = doc.querySelectorAll('.ibexa-workflow-dashboard-table');
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

    containers.forEach((container) => {
        container.querySelectorAll('.ibexa-btn--workflow-chart').forEach((btn) => {
            btn.addEventListener('click', showPopup, false);
        });
    });
})(window, window.document, window.ibexa, window.bootstrap);
