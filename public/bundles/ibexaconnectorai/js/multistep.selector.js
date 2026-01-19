(function (global, doc, ibexa, Translator) {
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const currentLanguageCode = ibexa.adminUiConfig.languages.priority[0];
    const multistepSelectorNodes = doc.querySelectorAll('.ibexa-cai-multistep-selector');
    const PRODUCTS_GROUP_ID = 'product';
    const SOURCE = 'source';
    const TARGET = 'target';
    const ANY_ITEM = {
        id: '*',
        name: Translator.trans(/*@Desc("Any")*/ 'ibexa.fields_selector.any_item', {}, 'forms'),
    };
    const productContentTypes = ibexa.adminUiConfig.contentTypes?.[PRODUCTS_GROUP_ID] || [];
    const getNameForContentType = (names) => {
        const currentLanguageNames = names.value.find(({ _languageCode }) => _languageCode === currentLanguageCode);

        return currentLanguageNames ? currentLanguageNames['#text'] : '';
    };
    const loadContentTypeGroups = () => {
        const request = new Request('/api/ibexa/v2/content/typegroups', {
            method: 'GET',
            mode: 'same-origin',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
            },
        });

        return fetch(request)
            .then(ibexa.helpers.request.getJsonFromResponse)
            .then((response) => {
                const contentTypeGroups = response.ContentTypeGroupList.ContentTypeGroup.map(({ identifier }) => ({
                    id: identifier,
                    name: identifier,
                }));

                if (productContentTypes.length > 0) {
                    contentTypeGroups.push({
                        id: PRODUCTS_GROUP_ID,
                        name: Translator.trans(
                            /*@Desc("Products")*/ 'ibexa.fields_selector.content_type_group.products.label',
                            {},
                            'forms',
                        ),
                    });
                }

                return contentTypeGroups;
            });
    };
    const loadContentTypesByGroup = (params) => {
        if (params.selectedValues.length === 0) {
            return Promise.resolve([]);
        }

        const groupId = params.selectedValues[0];

        if (groupId === PRODUCTS_GROUP_ID) {
            return loadProductTypes();
        }

        return loadContentTypes(groupId);
    };
    const loadProductTypes = () => {
        const requestBodyOperations = productContentTypes.reduce((total, { href }) => {
            total[href] = {
                uri: href,
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.ibexa.api.ContentType+json',
                },
                mode: 'same-origin',
                credentials: 'same-origin',
            };

            return total;
        }, {});
        const request = new Request('/api/ibexa/v2/bulk', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.ibexa.api.BulkOperationResponse+json',
                'Content-Type': 'application/vnd.ibexa.api.BulkOperation+json',
                'X-Siteaccess': siteaccess,
                'X-CSRF-Token': token,
            },
            body: JSON.stringify({
                bulkOperations: {
                    operations: requestBodyOperations,
                },
            }),
            mode: 'same-origin',
            credentials: 'same-origin',
        });

        return fetch(request)
            .then(ibexa.helpers.request.getJsonFromResponse)
            .then((response) => {
                const parsedProductTypesData = Object.entries(response.BulkOperationResponse.operations).reduce(
                    (total, [href, { content }]) => {
                        total[href] = JSON.parse(content);

                        return total;
                    },
                    {},
                );
                const productsTypes = Object.values(parsedProductTypesData).map(({ ContentType }) => ({
                    id: ContentType.identifier,
                    name: getNameForContentType(ContentType.names),
                }));

                productsTypes.unshift(ANY_ITEM);

                return productsTypes;
            });
    };
    const loadContentTypes = (contentTypeGroup) => {
        const bodyRequest = {
            ViewInput: {
                identifier: 'ContentTypeView',
                ContentTypeQuery: {
                    Query: {},
                },
            },
        };

        if (contentTypeGroup !== '*') {
            bodyRequest.ViewInput.ContentTypeQuery.Query.ContentTypeGroupNameCriterion = contentTypeGroup;
        }

        const request = new Request('/api/ibexa/v2/content/types/view', {
            method: 'POST',
            mode: 'same-origin',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/vnd.ibexa.api.ContentTypeView+json',
                'Content-Type': 'application/vnd.ibexa.api.ContentTypeViewInput+json',
                'X-Siteaccess': siteaccess,
                'X-CSRF-Token': token,
            },
            body: JSON.stringify(bodyRequest),
        });

        return fetch(request)
            .then(ibexa.helpers.request.getJsonFromResponse)
            .then((response) => {
                const contentTypes = response.ContentTypeList.ContentType.map(({ identifier, names }) => ({
                    id: identifier,
                    name: getNameForContentType(names),
                }));

                contentTypes.unshift(ANY_ITEM);

                return contentTypes;
            });
    };
    const parseToPartialExpression = (values) => {
        if (values.length === 1 || values[0] === ANY_ITEM.id) {
            return values[0];
        }

        return `{${values.join(',')}}`;
    };
    const parsePartialExpression = (partialExpression) => {
        return partialExpression.replace(/\{|\}/g, '').split(',');
    };
    const parseExpression = (expression) => {
        return expression.split('/').map(parsePartialExpression);
    };
    const loadContentFields = (params, ctGroups, configuration) => {
        const numberOfChosenContentTypes = params.selectedValues.length;

        if (numberOfChosenContentTypes === 0) {
            return Promise.resolve([]);
        }

        const ctGroupsExpression = parseToPartialExpression(ctGroups);
        const contentTypesExpression = parseToPartialExpression(params.selectedValues);
        const bodyRequest = {
            FieldDefinitionExpression: {
                expression: `${ctGroupsExpression}/${contentTypesExpression}/*`,
                configuration,
            },
        };

        const request = new Request('/api/ibexa/v2/content-type/load-field-definitions-from-expression', {
            method: 'POST',
            mode: 'same-origin',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/vnd.ibexa.api.FieldDefinitionExpression+json',
                'Content-Type': 'application/vnd.ibexa.api.FieldDefinitionExpression+json',
                'X-Siteaccess': siteaccess,
                'X-CSRF-Token': token,
            },
            body: JSON.stringify(bodyRequest),
        });

        return fetch(request)
            .then(ibexa.helpers.request.getJsonFromResponse)
            .then((response) => {
                const groupedFields = Object.groupBy(response.FieldDefinitions.FieldDefinitionInfo, ({ identifier }) => identifier);
                const fieldsOutput = Object.entries(groupedFields)
                    .filter(([, fields]) => {
                        return fields.length === numberOfChosenContentTypes;
                    })
                    .map(([identifier]) => ({
                        id: identifier,
                        name: identifier,
                    }));

                return fieldsOutput;
            });
    };

    class DropdownWithAllItem extends ibexa.core.Dropdown {
        getAllItems() {
            return [...this.itemsListContainer.querySelectorAll('.ibexa-dropdown__item')].slice(1);
        }

        hasAnyItem() {
            const anyItemElement = this.itemsListContainer.querySelector(`.ibexa-dropdown__item[data-value="${ANY_ITEM.id}"]`);

            return !!anyItemElement;
        }

        isAnyItem(element) {
            const value = this.getValueFromElement(element, false);

            return value === ANY_ITEM.id;
        }

        onSelectSetCurrentSelectedValueState() {}

        getNumberOfSelectedItems() {
            let numberOfSelectedItems = this.getSelectedItems().length;

            if (this.getSelectedItems()[0]?.value === ANY_ITEM.id) {
                numberOfSelectedItems -= 1;
            }

            return numberOfSelectedItems;
        }

        toggleAnyItem(selected) {
            const anyItemElement = this.itemsListContainer.querySelector(`.ibexa-dropdown__item[data-value="${ANY_ITEM.id}"]`);

            this.onSelectSetSourceInputState(anyItemElement, selected);
            this.onSelectSetItemsListState(anyItemElement, selected);
        }

        deselectOption(...args) {
            super.deselectOption(...args);

            if (!this.canSelectOnlyOne && this.hasAnyItem()) {
                this.toggleAnyItem(false);
            }
        }

        toggleAllItems(selected) {
            const allItems = this.getAllItems();

            allItems.forEach((item) => {
                const itemValue = this.getValueFromElement(item);
                const sourceOption = this.sourceInput.querySelector(`[value=${itemValue}]`);

                if (sourceOption.selected !== selected) {
                    this.onSelectSetSourceInputState(item, selected);
                    this.onSelectSetItemsListState(item, selected);
                    this.onSelectSetSelectionInfoState(item, selected);
                }
            });
        }

        onSelect(element, selected, ...restArgs) {
            if (this.isAnyItem(element)) {
                if (selected) {
                    this.toggleAllItems(selected);
                }

                this.toggleAnyItem(selected);
            } else {
                super.onSelect(element, selected, ...restArgs);

                if (!this.canSelectOnlyOne && this.hasAnyItem()) {
                    this.toggleAnyItem(false);
                }
            }

            this.fireValueChangedEvent();
        }
    }

    class StepDropdownWidget {
        constructor(container) {
            this.container = container;
            this.dropdownInitialContainer = this.container.querySelector('.ibexa-cai-multistep-selector__dropdown-initial');
            this.dropdownContainer = this.container.querySelector('.ibexa-cai-multistep-selector__dropdown');
            this.dropdownTemplate = this.container.querySelector('template');
            this.filledTemplate = null;
            this.value = [];

            this.createDropdown = this.createDropdown.bind(this);
            this.loadData = this.loadData.bind(this);
        }

        fillSourceOptions(options) {
            const { escapeHTML } = ibexa.helpers.text;
            const sourceInput = this.filledTemplate.querySelector('.ibexa-dropdown__source .ibexa-input');

            options.forEach(({ id, name }) => {
                const nameHtmlEscaped = escapeHTML(name);
                const idHtmlEscaped = escapeHTML(id);
                const optionNode = doc.createElement('option');

                optionNode.value = idHtmlEscaped;
                optionNode.textContent = nameHtmlEscaped;

                sourceInput.appendChild(optionNode);
            });
        }

        fillListOptions(options) {
            const { escapeHTML } = ibexa.helpers.text;
            const { dangerouslyInsertAdjacentHTML } = ibexa.helpers.dom;
            const itemsList = this.filledTemplate.querySelector('.ibexa-dropdown__items-list');
            const itemsListFragment = doc.createDocumentFragment();
            const { template: itemTemplate } = itemsList.dataset;

            options.forEach(({ id, name }) => {
                const nameHtmlEscaped = escapeHTML(name);
                const idHtmlEscaped = escapeHTML(id);
                const itemsContainer = doc.createElement('ul');
                const itemRendered = itemTemplate.replace('{{ value }}', idHtmlEscaped).replaceAll('{{ label }}', nameHtmlEscaped);

                dangerouslyInsertAdjacentHTML(itemsContainer, 'beforeend', itemRendered);
                itemsListFragment.append(itemsContainer.querySelector('li'));
            });

            itemsList.append(itemsListFragment);
        }

        createDropdown(options = [], values = []) {
            this.filledTemplate = this.dropdownTemplate.content.cloneNode(true);

            this.fillSourceOptions(options);
            this.fillListOptions(options);
            this.toggleDropdown(true);

            this.dropdownContainer.innerHTML = '';
            this.dropdownContainer.appendChild(this.filledTemplate);
            this.filledTemplate = null;
            this.dropdownInstance = new DropdownWithAllItem({
                container: this.dropdownContainer.querySelector('.ibexa-dropdown'),
            });

            this.dropdownInstance.init();

            this.value = values;
            values.forEach((value) => {
                const element = this.dropdownInstance.itemsContainer.querySelector(`.ibexa-dropdown__item[data-value="${value}"]`);

                if (!element) {
                    return;
                }

                this.dropdownInstance.onSelect(element, true);
            });

            this.bindOnChangeListener();
        }

        toggleDropdown(showFinal) {
            const initialDropdown = this.container.querySelector('.ibexa-cai-multistep-selector__dropdown-initial');
            const finalDropdown = this.container.querySelector('.ibexa-cai-multistep-selector__dropdown');

            if (showFinal) {
                initialDropdown.setAttribute('hidden', true);
                finalDropdown.removeAttribute('hidden');
            } else {
                finalDropdown.setAttribute('hidden', true);
                initialDropdown.removeAttribute('hidden');
            }
        }

        toggleLoader(showLoader) {
            const placeholder = this.dropdownInitialContainer.querySelector('.ibexa-dropdown__selected-placeholder');
            const loader = this.dropdownInitialContainer.querySelector('.ibexa-dropdown__loader-wrapper');

            if (showLoader) {
                placeholder.setAttribute('hidden', true);
                loader.removeAttribute('hidden');
            } else {
                loader.setAttribute('hidden', true);
                placeholder.removeAttribute('hidden');
            }
        }

        loadData(requestPromise, values = []) {
            this.reset();
            this.toggleDropdown(false);
            this.toggleLoader(true);

            requestPromise().then((response) => {
                this.toggleLoader(false);

                if (response.length === 0) {
                    return;
                }

                this.createDropdown(response, values);
            });
        }

        addOnChangeListener(callback) {
            this.bindOnChangeListener = () => {
                this.dropdownInstance.sourceInput.addEventListener('change', (event) => {
                    const selectedValues = [...event.target.selectedOptions].map((option) => option.value);

                    this.value = selectedValues;
                    callback({ selectedValues });
                });
            };
        }

        reset() {
            this.value = [];
            this.toggleDropdown(false);
            this.toggleLoader(false);
        }

        init() {}
    }

    const initMultistepSelector = async (node) => {
        const sourceFieldsInput = node.querySelector('.ibexa-cai-multistep-selector__source .ibexa-cai-multistep-selector__source-fields');
        const targetFieldsInput = node.querySelector('.ibexa-cai-multistep-selector__source .ibexa-cai-multistep-selector__target-fields');
        const ctGroupStepDropdownWidgetContainer = node.querySelector('.ibexa-cai-multistep-selector__step--ct-group');
        const ctStepContainerDropdownWidgetContainer = node.querySelector('.ibexa-cai-multistep-selector__step--ct');
        const sourceFieldsStepContainerDropdownWidgetContainer = node.querySelector(
            '.ibexa-cai-multistep-selector__step-dropdown-widget--source',
        );
        const targetFieldsStepContainerDropdownWidgetContainer = node.querySelector(
            '.ibexa-cai-multistep-selector__step-dropdown-widget--target',
        );

        const ctGroupDropdownWidgetInstance = new StepDropdownWidget(ctGroupStepDropdownWidgetContainer);
        const ctDropdownWidgetInstance = new StepDropdownWidget(ctStepContainerDropdownWidgetContainer);
        const sourceFieldsDropdownWidgetInstance = new StepDropdownWidget(sourceFieldsStepContainerDropdownWidgetContainer);
        const targetFieldsDropdownWidgetInstance = new StepDropdownWidget(targetFieldsStepContainerDropdownWidgetContainer);

        const [initialCtGroups, initialContentTypes, initialSourceFields] = parseExpression(sourceFieldsInput.value);
        const [, , initialTargetFields] = parseExpression(targetFieldsInput.value);

        const saveValueToSourceInput = (type) => {
            if (!type || type === SOURCE) {
                if (sourceFieldsDropdownWidgetInstance.value.length === 0) {
                    sourceFieldsInput.value = '';
                    sourceFieldsInput.dispatchEvent(new Event('change'));

                    return;
                }

                const ctGroups = parseToPartialExpression(ctGroupDropdownWidgetInstance.value);
                const contentTypes = parseToPartialExpression(ctDropdownWidgetInstance.value);
                const sourceFields = parseToPartialExpression(sourceFieldsDropdownWidgetInstance.value);

                sourceFieldsInput.value = `${ctGroups}/${contentTypes}/${sourceFields}`;
                sourceFieldsInput.dispatchEvent(new Event('change'));
            }
            if (!type || type === TARGET) {
                if (targetFieldsDropdownWidgetInstance.value.length === 0) {
                    targetFieldsInput.value = '';
                    targetFieldsInput.dispatchEvent(new Event('change'));

                    return;
                }

                const ctGroups = parseToPartialExpression(ctGroupDropdownWidgetInstance.value);
                const contentTypes = parseToPartialExpression(ctDropdownWidgetInstance.value);
                const targetFields = parseToPartialExpression(targetFieldsDropdownWidgetInstance.value);

                targetFieldsInput.value = `${ctGroups}/${contentTypes}/${targetFields}`;
                targetFieldsInput.dispatchEvent(new Event('change'));
            }
        };

        ctGroupDropdownWidgetInstance.init();
        ctGroupDropdownWidgetInstance.addOnChangeListener((params) => {
            ctDropdownWidgetInstance.loadData(() => loadContentTypesByGroup(params), []);
            sourceFieldsDropdownWidgetInstance.reset();
            targetFieldsDropdownWidgetInstance.reset();
            saveValueToSourceInput();
        });

        ctDropdownWidgetInstance.init();
        ctDropdownWidgetInstance.addOnChangeListener((params) => {
            sourceFieldsDropdownWidgetInstance.loadData(
                () => loadContentFields(params, ctGroupDropdownWidgetInstance.value, 'vectorizable_fields'),
                [],
            );
            targetFieldsDropdownWidgetInstance.loadData(
                () => loadContentFields(params, ctGroupDropdownWidgetInstance.value, 'target_taxonomy_assignment_fields'),
                [],
            );
            saveValueToSourceInput();
        });
        sourceFieldsDropdownWidgetInstance.addOnChangeListener(() => {
            saveValueToSourceInput(SOURCE);
        });
        targetFieldsDropdownWidgetInstance.addOnChangeListener(() => {
            saveValueToSourceInput();
        });

        const contentTypeGroups = await loadContentTypeGroups();

        if (initialCtGroups.length === 0 || initialCtGroups[0] === '') {
            initialCtGroups[0] = contentTypeGroups[0].id;
        }

        ctGroupDropdownWidgetInstance.loadData(() => Promise.resolve(contentTypeGroups), initialCtGroups);

        if (initialCtGroups?.length > 0) {
            ctDropdownWidgetInstance.loadData(() => loadContentTypesByGroup({ selectedValues: initialCtGroups }), initialContentTypes);
        }

        if (initialContentTypes?.length > 0) {
            sourceFieldsDropdownWidgetInstance.loadData(
                () => loadContentFields({ selectedValues: initialContentTypes }, initialCtGroups, 'vectorizable_fields'),
                initialSourceFields,
            );
            targetFieldsDropdownWidgetInstance.loadData(
                () => loadContentFields({ selectedValues: initialContentTypes }, initialCtGroups, 'target_taxonomy_assignment_fields'),
                initialTargetFields,
            );
        }
    };

    multistepSelectorNodes.forEach(async (node) => {
        await initMultistepSelector(node);
    });
})(window, window.document, window.ibexa, window.Translator);
