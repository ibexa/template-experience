(function (global, doc, ibexa) {
    class SchedulingModal {
        constructor(modal) {
            this.modal = modal;
            this.confirmBtn = this.modal.querySelector('.ibexa-btn--confirm');
            this.discardBtn = this.modal.querySelector('.ibexa-btn--discard');

            this.selectedDate = null;
            this.confirmBtnClickHandler = null;
            this.discardBtnClickHandler = null;

            this.handleConfirmBtnClick = this.handleConfirmBtnClick.bind(this);
            this.handleDiscardBtnClick = this.handleDiscardBtnClick.bind(this);
            this.updatePublicationDateValue = this.updatePublicationDateValue.bind(this);
        }

        init() {
            this.flatpickrInstance = new ibexa.core.DateTimePicker({
                container: this.modal.querySelector('.ibexa-scheduling-modal__publication-date'),
                onChange: this.updatePublicationDateValue,
                flatpickrConfig: {
                    formatDate: (date) => ibexa.helpers.timezone.formatFullDateTime(date, null),
                    minDate: Date.now(),
                    static: true,
                },
            });

            this.flatpickrInstance.init();

            this.modal.addEventListener('hidden.bs.modal', () => {
                this.flatpickrInstance.clear();
            });

            this.confirmBtn.addEventListener('click', this.handleConfirmBtnClick);
            this.discardBtn.addEventListener('click', this.handleDiscardBtnClick);
        }

        handleConfirmBtnClick() {
            if (typeof this.confirmBtnClickHandler === 'function') {
                this.confirmBtnClickHandler();
            }
        }

        handleDiscardBtnClick() {
            if (typeof this.discardBtnClickHandler === 'function') {
                this.discardBtnClickHandler();
            }
        }

        getSelectedDate() {
            return this.selectedDate;
        }

        setConfirmBtnClickHandler(handlerFn) {
            this.confirmBtnClickHandler = handlerFn;
        }

        setDiscardBtnClickHandler(handlerFn) {
            this.discardBtnClickHandler = handlerFn;
        }

        setModalTitle(title) {
            const modalTitleNode = this.modal.querySelector(`.modal-title`);

            modalTitleNode.innerHTML = title;
        }

        setModalTableTitle(title) {
            const modalTableTitleNode = this.modal.querySelector(`.ibexa-table-header__headline`);

            modalTableTitleNode.innerHTML = title;
        }

        togglePublicationDateInput(show) {
            const publicationDateNode = this.modal.querySelector(`.ibexa-scheduling-modal__publication-date`);

            publicationDateNode.hidden = !show;
        }

        toggleConfirmBtn(show) {
            const btn = this.modal.querySelector(`.ibexa-btn--confirm`);

            btn.hidden = !show;
        }

        toggleDiscardBtn(show) {
            const btn = this.modal.querySelector(`.ibexa-btn--discard`);

            btn.hidden = !show;
        }

        setModalTableBody(selectedItemsData) {
            const table = this.modal.querySelector('.ibexa-scheduling-modal__table');
            const tableBody = table.querySelector('.ibexa-scheduling-modal__table-body');
            const { tableRowTemplate } = table.dataset;
            const fragment = doc.createDocumentFragment();

            selectedItemsData.forEach(({ publicationDate, name, version, language, contentTypeName, creationDate, creator }) => {
                const container = doc.createElement('tbody');
                const emDash = '\u2014';
                const renderedItem = tableRowTemplate
                    .replace('{{ date_and_time }}', publicationDate ? publicationDate : `${emDash}${emDash}`)
                    .replace('{{ name }}', ibexa.helpers.text.escapeHTML(name))
                    .replace('{{ version }}', version)
                    .replace('{{ translations }}', language)
                    .replace('{{ content_type }}', contentTypeName)
                    .replace('{{ creation_date }}', creationDate)
                    .replace('{{ creator }}', creator);

                container.insertAdjacentHTML('beforeend', renderedItem);

                const tableRowNode = container.querySelector('tr');

                fragment.append(tableRowNode);
            });

            this.removeNodeChildren(tableBody);
            tableBody.append(fragment);
        }

        removeNodeChildren(node) {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        }

        updatePublicationDateValue([timestamp]) {
            this.confirmBtn.disabled = !timestamp;
            this.selectedDate = timestamp ? timestamp * 1000 : null;
        }

        setLoadingState() {
            const btns = this.modal.querySelectorAll('.ibexa-scheduling-modal__btn');
            const btnsSpinners = this.modal.querySelectorAll('.ibexa-scheduling-modal__btn-spinner');
            const modalCloseBtn = this.modal.querySelector('.close');

            btns.forEach((btn) => {
                btn.disabled = true;
            });
            btnsSpinners.forEach((btnSpinner) => {
                btnSpinner.classList.add('ibexa-scheduling-modal__btn-spinner--visible');
            });
            modalCloseBtn.disabled = true;
            this.flatpickrInstance.inputField.disabled = true;
        }
    }

    ibexa.addConfig('dateBasedPublisher.scheduling.SchedulingModal', SchedulingModal);
})(window, window.document, window.ibexa);
