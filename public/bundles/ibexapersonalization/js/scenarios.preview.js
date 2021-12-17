import { JsonPrettier } from './json.prettier';

(function(doc, eZ, Routing, Translator, React, ReactDOM) {
    const SELECTOR_CONTENT_FIELD = '.form-group';
    const SELECTOR_TAGS_CONTAINER = '.ibexa-perso-scenario-preview__tags';
    const SELECTOR_TAG = '.ibexa-perso-scenario-preview__tag';
    const SELECTOR_ADD_TAG_INPUT = '.ibexa-perso-scenario-preview__input--add-tag';
    const SELECTOR_ADD_TAG_BUTTON = '.ibexa-perso-scenario-preview__add-tag-btn';
    const SELECTOR_TAG_INPUT = '.ibexa-perso-scenario-preview__tag-input';
    const SELECTOR_REMOVE_TAG_BUTTON = '.ibexa-tag__remove-btn';
    const SELECTOR_CATEGORY_PATH_INPUT = '.ibexa-input--category-path';
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const prettier = new JsonPrettier();
    const { getJsonFromResponse } = eZ.helpers.request;
    const preview = doc.querySelector('.ibexa-perso-scenario-preview');
    const jsonResponseToggleBtn = doc.querySelector('.ibexa-perso-scenario-preview-response-code__toggler');
    const jsonResponsePreviewCard = doc.querySelector('.ibexa-perso-scenario-preview-response-code__card');
    const jsonResponsePreviewCode = doc.querySelector('.ibexa-perso-scenario-preview-response-code__code');
    const generatedUrlNode = doc.querySelector('.ibexa-perso-scenario-preview__generated-url');
    const sendRequestButton = doc.querySelector('.ibexa-perso-scenario-preview__submit-btn');
    const outputTypeSelect = doc.querySelector('select[name="recommendation_call[output_type]"]');
    const udwContainer = doc.getElementById('react-udw');
    const addCategoryPathButton = doc.querySelector('.ibexa-btn--add-path-udw');
    const addContextItemsButton = doc.querySelector('.ibexa-btn--add-context-items-udw');
    const gallery = doc.querySelector('.ibexa-perso-scenario-preview__gallery');
    const noRecommendations = doc.querySelector('.ibexa-perso-scenario-preview__no-recommendations');
    const { scenarioName, customerId } = preview.dataset;
    const fetchData = () => {
        const form = doc.querySelector('.ibexa-perso-scenario-preview__form');
        const isFormValid = form.reportValidity();

        if (isFormValid) {
            const formData = new FormData(form);
            const request = new Request(
                Routing.generate('ibexa.personalization.recommendation.preview', { customerId: customerId, name: scenarioName }),
                {
                    method: 'POST',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        Accept: 'application/json',
                    },
                    body: formData,
                },
            );

            fetch(request).then(getJsonFromResponse).then(updateResponseContent).catch(eZ.helpers.notification.showErrorNotification);
        }
    };
    const fetchAttributtes = (event) => {
        const { value } = event.currentTarget;
        const request = new Request(Routing.generate('ibexa.personalization.output_type.attributes', { itemTypeId: value }), {
            method: 'GET',
        });

        fetch(request)
            .then(getJsonFromResponse)
            .then(setAttributes)
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const setAttributes = (data) => {
        const container = doc.querySelector('.ibexa-perso-scenario-preview__attributes');
        const tagsContainer = container.querySelector(SELECTOR_TAGS_CONTAINER);
        const { template } = container.dataset;

        tagsContainer.innerHTML = '';

        if (data.length) {
            data.forEach((name) => {
                const renderedTemplate = template.replace('__name__', name);

                tagsContainer.insertAdjacentHTML('beforeend', renderedTemplate);

                const lastTag = container.querySelector(`${SELECTOR_TAG}:last-child`);

                lastTag.querySelector(SELECTOR_REMOVE_TAG_BUTTON).addEventListener('click', removeTag, false);
                lastTag.querySelector('input').setAttribute('value', name);
            });
        }
    };
    const updateResponseContent = (data) => {
        updateGallery(data.previewRecommendationItemList);
        updateRequestUrl(data.requestUrl);
        updateJsonResponsePreview(data.response);
        updateResponseErrorMessage(data.errorMessage);
        toggleNoRecommendations(!data.previewRecommendationItemList);

        const contentContainer = doc.querySelector('.ibexa-edit-content');

        contentContainer.scrollTo({ top: 0 });
    };
    const updateRequestUrl = (requestUrl) => {
        generatedUrlNode.innerHTML = requestUrl;
    };
    const updateGallery = (items) => {
        const galleryItemTemplate = gallery.dataset.itemTemplate;

        gallery.innerHTML = '';

        if (!items) {
            return;
        }

        items.forEach(({ title, description, image }) => {
            const renderedGalleryItem = galleryItemTemplate
                .replace('{{ image }}', image ?? '')
                .replace('{{ title }}', title ?? '')
                .replace('{{ description }}', description ?? '');

            gallery.insertAdjacentHTML('beforeend', renderedGalleryItem);
        });
    };
    const updateResponseErrorMessage = (errorMessage) => {
        const alert = doc.querySelector('.ibexa-perso-scenario-preview__response-error');
        const alertTitle = alert.querySelector('.ibexa-alert__title');

        alert.classList.toggle('ibexa-perso-scenario-preview__response-error--hidden', !errorMessage);
        alertTitle.textContent = errorMessage;
    };
    const updateJsonResponsePreview = (content = null) => {
        prettier.jsonContent = content;
        jsonResponsePreviewCode.innerHTML = prettier.getFormattedJson();
    };
    const toggleJsonResponse = () => {
        const isJsonResponseHidden = jsonResponseToggleBtn.classList.contains(
            'ibexa-perso-scenario-preview-response-code__toggler--rolled-up',
        );

        jsonResponseToggleBtn.classList.toggle('ibexa-perso-scenario-preview-response-code__toggler--rolled-up', !isJsonResponseHidden);
        jsonResponsePreviewCard.classList.toggle('ibexa-perso-scenario-preview-response-code__card--hidden', !isJsonResponseHidden);
    };
    const toggleNoRecommendations = (noRecommenations) => {
        gallery.classList.toggle('ibexa-perso-scenario-preview__gallery--hidden', noRecommenations);
        noRecommendations.classList.toggle('ibexa-perso-scenario-preview__no-recommendations--hidden', !noRecommenations);
    };
    const showDefaultJsonResponse = () => {
        const { defaultJsonResponse } = jsonResponsePreviewCode.dataset;

        updateJsonResponsePreview(defaultJsonResponse);
    };
    const removeTag = (event) => {
        const container = event.currentTarget.closest(SELECTOR_CONTENT_FIELD);
        const tagsContainer = container.querySelector(SELECTOR_TAGS_CONTAINER);
        const tag = event.currentTarget.closest(SELECTOR_TAG);
        const { inputId } = tag.dataset;
        const categoryPathInput = container.querySelector(SELECTOR_CATEGORY_PATH_INPUT);

        if (inputId) {
            const input = tagsContainer.querySelector(`#${inputId}`);
            const inputWrapper = input.closest('.ibexa-input-text-wrapper');

            inputWrapper.remove();
        }

        tag.remove();

        if (categoryPathInput) {
            categoryPathInput.setAttribute('value', '');
        }
    };
    const addTag = ({ label, value, container }) => {
        let tagIndex = 0;
        let renderedTemplate;
        const { inputTemplate, tagTemplate } = container.dataset;
        const tagsContainer = container.querySelector(SELECTOR_TAGS_CONTAINER);
        const lastTagInput = tagsContainer.querySelector(`${SELECTOR_TAG_INPUT}:last-of-type`);

        if (tagTemplate) {
            renderedTemplate = tagTemplate.replace('{{ content }}', label);
        } else if (inputTemplate) {
            if (lastTagInput) {
                tagIndex = parseInt(lastTagInput.name.replace(/[^0-9]/g, ''), 10) + 1;
            }

            renderedTemplate = inputTemplate.replace('__name__', tagIndex).replace('__name__', label).replaceAll('__name__', tagIndex);
        }

        tagsContainer.insertAdjacentHTML('beforeend', renderedTemplate);

        const tags = [...tagsContainer.querySelectorAll(SELECTOR_TAG)];
        const lastTagAfterInsert = tags[tags.length - 1];
        const tagsInputs = [...tagsContainer.querySelectorAll(SELECTOR_TAG_INPUT)];
        const lastTagInputAfterInsert = tagsInputs[tagsInputs.length - 1];

        lastTagAfterInsert.querySelector(SELECTOR_REMOVE_TAG_BUTTON).addEventListener('click', removeTag, false);

        if (lastTagInputAfterInsert) {
            lastTagAfterInsert.dataset.inputId = lastTagInputAfterInsert.id;
            lastTagInputAfterInsert.setAttribute('value', value);
        }
    };
    const addRecomendationCallAttribute = (event) => {
        const button = event.currentTarget;
        const container = button.closest(SELECTOR_CONTENT_FIELD);
        const input = container.querySelector(SELECTOR_ADD_TAG_INPUT);

        if (input.value) {
            addTag({
                label: input.value,
                value: input.value,
                container,
            });
        } else {
            eZ.helpers.notification.showErrorNotification(
                Translator.trans(/*@Desc("Fill attribute value")*/ 'scenarios.preview.add_attribute_error', {}, 'ibexa_personalization'),
            );
        }

        input.value = '';
    };
    const onConfirmContexItems = (button, items) => {
        const container = button.closest('.ibexa-perso-scenario-preview__context-items');

        closeUDW();
        items.forEach((item) => {
            const contentName = eZ.helpers.text.escapeHTML(item.ContentInfo.Content.Name);
            const contentId = item.ContentInfo.Content._id;
            const alreadySelectedItem = container.querySelector(`${SELECTOR_TAG_INPUT}[value="${contentId}"]`);

            if (!alreadySelectedItem) {
                addTag({
                    label: contentName,
                    value: contentId,
                    container,
                });
            }
        });
    };
    const onConfirmCategoryPath = (button, items) => {
        const container = button.closest('.ibexa-perso-scenario-preview__category-path');
        const [{ pathString }] = items;

        closeUDW();
        container.querySelector(SELECTOR_CATEGORY_PATH_INPUT).setAttribute('value', pathString);
        findLocationsByIdList(removeRootFromPathString(pathString), (data) => {
            const existingTag = container.querySelector(SELECTOR_TAG);

            if (existingTag) {
                existingTag.remove();
            }

            addTag({
                label: buildCategoryPathTagLabel(data),
                container,
            });
        });
    };
    const onCancel = () => closeUDW();
    const closeUDW = () => ReactDOM.unmountComponentAtNode(udwContainer);
    const openUDW = (event, confirmCallback) => {
        event.preventDefault();

        const config = JSON.parse(event.currentTarget.dataset.udwConfig);
        const { udwTitle } = event.currentTarget.dataset;

        ReactDOM.render(
            React.createElement(eZ.modules.UniversalDiscovery, {
                title: udwTitle,
                onConfirm: confirmCallback.bind(null, event.currentTarget),
                onCancel,
                ...config,
            }),
            udwContainer,
        );
    };
    const removeRootFromPathString = (pathString) => {
        const pathArray = pathString.split('/').filter((val) => val);

        return pathArray.splice(1, pathArray.length - 1);
    };
    const buildCategoryPathTagLabel = (viewData) => {
        const searchHitList = viewData.View.Result.searchHits.searchHit;

        return searchHitList
            .map((searchHit) => eZ.helpers.text.escapeHTML(searchHit.value.Location.ContentInfo.Content.TranslatedName))
            .join(' / ');
    };
    const findLocationsByIdList = (idList, callback) => {
        const body = JSON.stringify({
            ViewInput: {
                identifier: `udw-locations-by-path-string-${idList.join('-')}`,
                public: false,
                LocationQuery: {
                    FacetBuilders: {},
                    SortClauses: { SectionIdentifier: 'ascending' },
                    Filter: { LocationIdCriterion: idList.join(',') },
                    limit: 50,
                    offset: 0,
                },
            },
        });
        const request = new Request('/api/ezp/v2/views', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.ez.api.View+json; version=1.1',
                'Content-Type': 'application/vnd.ez.api.ViewInput+json; version=1.1',
                'X-Requested-With': 'XMLHttpRequest',
                'X-Siteaccess': siteaccess,
                'X-CSRF-Token': token,
            },
            body,
            mode: 'same-origin',
            credentials: 'same-origin',
        });
        const errorMessage = Translator.trans(
            /*@Desc("Cannot find children Locations with ID %idList%")*/ 'select_location.error',
            { idList: idList.join(',') },
            'universal_discovery_widget',
        );

        fetch(request)
            .then(eZ.helpers.request.getJsonFromResponse)
            .then(callback)
            .catch(() => eZ.helpers.notification.showErrorNotification(errorMessage));
    };

    if (sendRequestButton) {
        sendRequestButton.addEventListener('click', fetchData, false);
    }

    if (outputTypeSelect) {
        outputTypeSelect.addEventListener('change', fetchAttributtes, false);
    }

    if (addCategoryPathButton) {
        addCategoryPathButton.addEventListener('click', (event) => openUDW(event, onConfirmCategoryPath), false);
    }

    if (addContextItemsButton) {
        addContextItemsButton.addEventListener('click', (event) => openUDW(event, onConfirmContexItems), false);
    }

    doc.querySelectorAll(SELECTOR_ADD_TAG_BUTTON).forEach((button) => {
        button.addEventListener('click', addRecomendationCallAttribute, false);
    });

    doc.querySelectorAll(SELECTOR_REMOVE_TAG_BUTTON).forEach((button) => {
        button.addEventListener('click', removeTag, false);
    });

    jsonResponseToggleBtn.addEventListener('click', toggleJsonResponse, false);

    showDefaultJsonResponse();
})(window.document, window.eZ, window.Routing, window.Translator, window.React, window.ReactDOM);
