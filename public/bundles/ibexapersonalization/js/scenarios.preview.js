import { CategoryPathSelect } from './core/category.path.select';
import { JsonPrettier } from './json.prettier';
import { SearchInput } from './core/search.input';

(function (doc, ibexa, Routing, Translator) {
    const COPY_TOOLTIP_TIMEOUT = 3000;
    const SELECTOR_CONTENT_FIELD = '.form-group';
    const SELECTOR_TAGS_CONTAINER = '.ibexa-perso-scenario-preview__tags';
    const SELECTOR_TAG = '.ibexa-perso-scenario-preview__tag';
    const SELECTOR_ADD_TAG_INPUT = '.ibexa-perso-scenario-preview__input--add-tag';
    const SELECTOR_ADD_TAG_BUTTON = '.ibexa-perso-scenario-preview__add-tag-btn';
    const SELECTOR_TAG_INPUT = '.ibexa-perso-scenario-preview__tag-input';
    const SELECTOR_REMOVE_TAG_BUTTON = '.ibexa-tag__remove-btn';
    const prettier = new JsonPrettier();
    const { getJsonFromResponse } = ibexa.helpers.request;
    const preview = doc.querySelector('.ibexa-perso-scenario-preview');
    const jsonResponseToggleBtn = doc.querySelector('.ibexa-perso-scenario-preview-response-code__toggler');
    const jsonResponsePreviewCard = doc.querySelector('.ibexa-perso-scenario-preview-response-code__card');
    const jsonResponsePreviewCode = doc.querySelector('.ibexa-perso-scenario-preview-response-code__code');
    const jsonResponsePreviewCodeCopyBtn = doc.querySelector('.ibexa-perso-scenario-preview-response-code__copy-btn');
    const generatedUrlNode = doc.querySelector('.ibexa-perso-scenario-preview__generated-url');
    const sendRequestButton = doc.querySelector('.ibexa-perso-scenario-preview__submit-btn');
    const outputTypeSelect = doc.querySelector('select[name="recommendation_call[output_type]"]');
    const categoryPathSelectContainer = doc.querySelector('.ibexa-perso-category-path-select');
    const categoryPathInput = doc.querySelector('.ibexa-input--category-path');
    const contextItemsSearchInput = doc.querySelector('.ibexa-perso-scenario-preview__context-items-input');
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

            fetch(request).then(getJsonFromResponse).then(updateResponseContent).catch(ibexa.helpers.notification.showErrorNotification);
        }
    };
    const fetchAttributes = (event) => {
        const { value } = event.currentTarget;
        const request = new Request(Routing.generate('ibexa.personalization.output_type.attributes', { customerId, itemTypeId: value }), {
            method: 'GET',
        });

        fetch(request).then(getJsonFromResponse).then(setAttributes).catch(ibexa.helpers.notification.showErrorNotification);
    };
    const setAttributes = (data) => {
        const container = doc.querySelector('.ibexa-perso-scenario-preview__attributes');
        const tagsContainer = container.querySelector(SELECTOR_TAGS_CONTAINER);

        tagsContainer.innerHTML = '';

        if (data instanceof Array) {
            data.forEach((name) => {
                addTag({
                    label: name,
                    value: name,
                    container,
                });
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

        if (inputId) {
            const input = tagsContainer.querySelector(`#${inputId}`);
            const inputWrapper = input.closest('.ibexa-input-text-wrapper');

            inputWrapper.remove();
        }

        tag.remove();
    };
    const addTag = ({ label, value, container }) => {
        let tagIndex = 0;
        let renderedTemplate;
        const { inputTemplate, tagTemplate } = container.dataset;
        const tagsContainer = container.querySelector(SELECTOR_TAGS_CONTAINER);
        const lastTagInputWrapper = tagsContainer.querySelector(':scope > :nth-last-child(1)');
        const lastTagInput = lastTagInputWrapper?.querySelector('.ibexa-input');

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
    const addRecommendationCallAttribute = (event) => {
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
            ibexa.helpers.notification.showErrorNotification(
                Translator.trans(/*@Desc("Fill attribute value")*/ 'scenarios.preview.add_attribute_error', {}, 'ibexa_personalization'),
            );
        }

        input.value = '';
    };
    const onConfirmContextItems = (item) => {
        const { value, id } = item;
        const container = contextItemsSearchInput.closest('.ibexa-perso-scenario-preview__context-items');
        const valueEscaped = ibexa.helpers.text.escapeHTML(value.replace(/\$/g, '$$$$'));
        const isAlreadySelectedItem = container.querySelector(`${SELECTOR_TAG_INPUT}[value="${id.replace(/["\\]/g, '\\$&')}"]`);

        if (isAlreadySelectedItem) {
            return;
        }

        addTag({
            label: valueEscaped,
            value: id,
            container,
        });
    };
    const copyResponseCodeToClipboard = () => {
        const range = doc.createRange();

        range.selectNode(jsonResponsePreviewCode);
        global.getSelection().removeAllRanges();
        global.getSelection().addRange(range);

        const responseCode = global.getSelection().toString();

        global.getSelection().removeAllRanges();
        global.navigator.clipboard.writeText(responseCode);
        global.bootstrap.Tooltip.getOrCreateInstance(jsonResponsePreviewCodeCopyBtn).show();
        setTimeout(() => global.bootstrap.Tooltip.getOrCreateInstance(jsonResponsePreviewCodeCopyBtn).hide(), COPY_TOOLTIP_TIMEOUT);
    };

    if (sendRequestButton) {
        sendRequestButton.addEventListener('click', fetchData, false);
    }

    if (outputTypeSelect) {
        outputTypeSelect.addEventListener('change', fetchAttributes, false);
    }

    const categoryPathSelect = new CategoryPathSelect({
        container: categoryPathSelectContainer,
        onAdd: (value) => {
            categoryPathInput.value = value;
        },
        onRemove: () => {
            categoryPathInput.value = '';
        },
    });

    categoryPathSelect.init();

    if (contextItemsSearchInput) {
        const searchInput = new SearchInput({
            container: contextItemsSearchInput,
            customerId,
            onItemAdd: onConfirmContextItems,
        });

        searchInput.init();
    }

    doc.querySelectorAll(SELECTOR_ADD_TAG_BUTTON).forEach((button) => {
        button.addEventListener('click', addRecommendationCallAttribute, false);
    });

    doc.querySelectorAll(SELECTOR_REMOVE_TAG_BUTTON).forEach((button) => {
        button.addEventListener('click', removeTag, false);
    });

    jsonResponseToggleBtn.addEventListener('click', toggleJsonResponse, false);
    jsonResponsePreviewCodeCopyBtn.addEventListener('click', copyResponseCodeToClipboard, false);

    showDefaultJsonResponse();
})(window.document, window.ibexa, window.Routing, window.Translator);
