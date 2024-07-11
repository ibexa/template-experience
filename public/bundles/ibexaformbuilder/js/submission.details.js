(function (global, doc) {
    const modal = doc.querySelector('#submission-details-modal');
    const showModalOnLoad = (event) => {
        const values = event.relatedTarget.dataset.submissionValues;
        const tbody = modal.querySelector('tbody');

        tbody.innerHTML = '';
        tbody.insertAdjacentHTML('afterbegin', values);
    };

    if (modal) {
        modal.addEventListener('show.bs.modal', showModalOnLoad);
    }
})(window, window.document);
