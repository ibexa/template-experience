(function (global, doc, Translator, bootstrap, ibexa, Routing) {
    const DOTS = '...';
    const PAGE_LIMIT = 20;

    class EzDamExtension {
        constructor(props) {
            this.container = props.container;
            this.activePage = 1;
            this.totalCount = 0;
        }

        getFormData(form) {
            const formData = new FormData(form);
            const newFormData = {};

            formData.forEach((value, key) => {
                const [, newKey] = key.match(/\[(.*?)\]/);

                newFormData[newKey] = value;
            });

            return newFormData;
        }

        queryForResults() {
            const form = this.container.querySelector('.ibexa-dam-search-form');
            const route = form.action;
            const { source } = form.dataset;
            const formData = this.getFormData(form);
            const queryString = new URLSearchParams(formData).toString();
            const variation = 'large';

            const request = new Request(
                `${route}?${queryString}&source=${source}&variation=${variation}&limit=${PAGE_LIMIT}&offset=${
                    (this.activePage - 1) * PAGE_LIMIT
                }`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                    credentials: 'same-origin',
                    mode: 'cors',
                },
            );

            return fetch(request).then(ibexa.helpers.request.getJsonFromResponse);
        }

        setTotalCount(results) {
            if (results.totalCount !== undefined) {
                this.totalCount = results.totalCount;
            }

            return results;
        }

        changePage(page, { event }) {
            this.activePage = page;

            this.fetchSearchResults(event);
        }

        refreshPagination(results) {
            const paginationElement = this.container.querySelector('.ibexa-pagination');
            const { template } = paginationElement.querySelector('.ibexa-pagination__navigation').dataset;
            const pagesCount = Math.ceil(this.totalCount / PAGE_LIMIT);
            const pages = ibexa.helpers.pagination.computePages({ activePage: this.activePage, pagesCount, separator: DOTS });
            const fragment = doc.createDocumentFragment();

            paginationElement.querySelectorAll('.page-item:not(.ibexa-pagination__button)').forEach((element) => element.remove());

            pages.forEach((page) => {
                const container = doc.createElement('ul');
                const renderedItem = template.replace(/{{ page }}/gi, page);

                container.insertAdjacentHTML('beforeend', renderedItem);

                const elementNode = container.querySelector('li');

                if (page === DOTS) {
                    elementNode.classList.add('disabled');
                } else if (page === this.activePage) {
                    elementNode.classList.add('active');
                } else {
                    elementNode.addEventListener('click', (event) => this.changePage(parseInt(event.target.dataset.page, 10), { event }));
                }

                fragment.append(elementNode);
            });

            const backElement = paginationElement.querySelector('.ibexa-pagination__button--back');
            const nextElement = paginationElement.querySelector('.ibexa-pagination__button--next');

            backElement.classList.toggle('disabled', pagesCount === 0 || this.activePage === 1);
            nextElement.classList.toggle('disabled', pagesCount === 0 || this.activePage === pagesCount);
            paginationElement.classList.remove('ibexa-pagination--hidden');
            paginationElement
                .querySelector('.ibexa-pagination__navigation')
                .insertBefore(fragment, paginationElement.querySelector('.ibexa-pagination__button--next'));

            return results;
        }

        showError() {
            const resultsContainer = this.container.querySelector('.ibexa-dam-search-results');
            const contentContainer = resultsContainer.querySelector('.ibexa-dam-search-results__content');

            contentContainer.innerHTML = Translator.trans(
                /*@Desc("Something went wrong.")*/ 'dam.error.message',
                {},
                'ibexa_connector_dam_ui',
            );

            resultsContainer.classList.add('ibexa-dam-search-results--error');
        }

        selectAsset(event) {
            const modal = doc.querySelector('#select-from-dam-modal');
            const { name } = modal.dataset;
            const asset = event.target;

            doc.querySelector(`[name="${name}[destinationContentId]"]`).value = asset.dataset.id;
            doc.querySelector(`[name="${name}[source]"]`).value = asset.dataset.source;

            doc.querySelector(`[name="${name}[destinationContentId]"]`)
                .closest('.ibexa-field-edit--ezimageasset')
                .dispatchEvent(new CustomEvent('ibexa-image-asset:show-preview'));

            const preview = doc
                .querySelector(`[name="${name}[destinationContentId]"]`)
                .closest('.ibexa-field-edit--ezimageasset')
                .querySelector('.ibexa-field-edit__preview');

            const previewImg = preview.querySelector('.ibexa-field-edit-preview__media');
            const previewActionPreview = preview.querySelector('.ibexa-field-edit-preview__action--preview');
            const assetNameContainer = preview.querySelector('.ibexa-field-edit-preview__file-name');
            const destinationLocationUrl = Routing.generate('ibexa.connector.dam.asset_view', {
                destinationContentId: asset.dataset.id,
                assetSource: asset.dataset.source,
            });

            previewImg.setAttribute('src', asset ? asset.src : '//:0');
            previewImg.classList.toggle('d-none', asset === null);
            previewActionPreview.setAttribute('href', destinationLocationUrl);
            assetNameContainer.setAttribute('href', destinationLocationUrl);

            bootstrap.Modal.getOrCreateInstance(doc.querySelector('#select-from-dam-modal')).hide();
        }

        showResults(results) {
            const form = this.container.querySelector('.ibexa-dam-search-form');
            const tabLink = this.container.closest('#select-from-dam-modal').querySelector(`[href="#${this.container.id}"]`);
            const resultsContainer = this.container.querySelector('.ibexa-dam-search-results');
            const contentContainer = resultsContainer.querySelector('.ibexa-dam-search-results__content');
            const fragment = doc.createDocumentFragment();
            let additionalLabelNode = tabLink.querySelector('.ibexa-tabs__additional-label');

            results.results.forEach((asset) => {
                const container = doc.createElement('div');
                const renderedItem = form.dataset.resultTemplate
                    .replace('{{ assetPath }}', asset.assetUri.path)
                    .replace('{{ sourceId }}', asset.source.sourceIdentifier)
                    .replace('{{ assetId }}', asset.identifier.id)
                    .replace('{{ alternativeText }}', asset.assetMetadata['alternativeText'] || '');

                container.insertAdjacentHTML('beforeend', renderedItem);

                const elementNode = container.firstChild;

                elementNode.addEventListener('click', this.selectAsset.bind(this));

                fragment.append(elementNode);
            });

            if (!additionalLabelNode) {
                const span = document.createElement('span');

                span.classList.add('ibexa-tabs__additional-label');

                additionalLabelNode = span;

                tabLink.append(span);
            }

            resultsContainer.classList.remove('ibexa-dam-search-results--error');
            contentContainer.innerHTML = '';
            additionalLabelNode.innerHTML = `(${results.totalCount})`;
            contentContainer.append(fragment);
        }

        fetchSearchResults(event) {
            event.preventDefault();

            this.queryForResults()
                .then(this.setTotalCount.bind(this))
                .then(this.refreshPagination.bind(this))
                .then((results) => {
                    if (results.status !== undefined && results.status !== 200) {
                        this.showError();
                    } else {
                        this.showResults(results);
                    }

                    return results;
                })
                .catch((error) => {
                    this.showError();

                    return error;
                });
        }

        init() {
            const modal = doc.querySelector('#select-from-dam-modal');
            const searchBtn = modal.querySelector('.ibexa-dam-query-form .ibexa-btn--search');

            searchBtn.addEventListener(
                'click',
                (event) => {
                    const query = event.currentTarget.closest('.ibexa-dam-query-form').querySelector('.ibexa-dam-query-form__input').value;
                    const searchTargetNode = this.container.querySelector('[data-main-dam-search-target]');

                    searchTargetNode.value = query;

                    this.changePage(1, { event });
                },
                false,
            );

            this.container.querySelector('.ibexa-dam-search-form').addEventListener('submit', (event) => {
                this.changePage(1, { event });
            });

            this.container.querySelector('.ibexa-pagination__button--back .page-link').addEventListener('click', (event) => {
                this.changePage(this.activePage - 1, { event });
            });

            this.container.querySelector('.ibexa-pagination__button--next .page-link').addEventListener('click', (event) => {
                this.changePage(this.activePage + 1, { event });
            });

            if (modal) {
                modal.addEventListener('show.bs.modal', function (event) {
                    modal.dataset.name = event.relatedTarget.dataset.name;
                });

                modal.addEventListener('hidden.bs.modal', () => {
                    this.activePage = 1;
                    this.totalCount = 0;

                    this.container.querySelector('.ibexa-dam-search-form').reset();
                    this.container.querySelector('.ibexa-dam-search-results__content').innerHTML = '';
                    this.container.querySelector('.ibexa-pagination').classList.add('ibexa-pagination--hidden');
                });
            }
        }
    }

    doc.querySelectorAll('.ibexa-dam-wrapper.tab-pane').forEach((damWrapper) => {
        const damExtension = new EzDamExtension({ container: damWrapper });

        damExtension.init();
    });

    doc.querySelectorAll('.ibexa-field-edit--ezimageasset .ibexa-field-edit-preview__action--remove').forEach((node) => {
        const previewContainer = node.closest('.ibexa-field-edit--ezimageasset');

        node.addEventListener('click', () => {
            previewContainer.querySelector('.ibexa-data-source__destination-source-id').value = '';
        });
    });
})(window, window.document, window.Translator, window.bootstrap, window.ibexa, window.Routing);
