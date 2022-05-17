(function(global, doc, ibexa, Translator) {
    const SELECTOR_FIELD = '.ibexa-field-edit--ezprofiledata';
    const SELECTOR_VARIANTS_INPUT = '.ibexa-field-edit__profiledata-input';
    const BUYER = 'buyerParties';
    const DELIVERY = 'deliveryParties';
    const fields = doc.querySelectorAll(SELECTOR_FIELD);
    class ProfileDataRow {
        constructor({ id, name, valueInput, row, field }) {
            this.id = id;
            this.name = name;
            this.field = field;
            this.row = row;
            this.body = row.querySelector('.ibexa-card__body');
            this.valueInput = valueInput;

            const addButton = row.querySelector('.ibexa-btn--add-address');

            if (addButton) {
                addButton.addEventListener('click', this.addRow.bind(this));
            }
        }
        addRow() {
            const inputValue = JSON.parse(this.valueInput.value);

            if (!inputValue[this.name]) {
                inputValue[this.name] = [];
            }

            inputValue[this.name].push(JSON.parse(this.field.dataset.inputRowTemplate));

            this.valueInput.value = JSON.stringify(inputValue);

            this.valueInput.dispatchEvent(new CustomEvent('valueChange'));

            const row = this.addRowHTML();

            row.classList.remove('ibexa-collapse--collapsed');
        }
        addRowHTML() {
            const container = doc.createElement('div');
            const index = this.body.querySelectorAll('.ibexa-collapse').length;
            const template = this.body.dataset.template.replace('{{ INDEX }}', index).replaceAll('{{ ROW_ID }}', `${this.name}${index}`);

            container.insertAdjacentHTML('beforeend', template);

            const row = container.querySelector('.ibexa-collapse');
            const trashButton = row.querySelector('.ibexa-btn--remove-address');

            row.querySelectorAll('input, select').forEach((input) => input.addEventListener('blur', this.updateValue.bind(this), false));

            if (trashButton) {
                trashButton.addEventListener('click', this.deleteRow.bind(this), false);
            }

            this.body.append(row);

            doc.body.dispatchEvent(
                new CustomEvent('ibexa-initialize-card-toggle-group', {
                    detail: { button: row.querySelector('.ibexa-collapse__toggle') },
                })
            );

            validator.reinit();

            return row;
        }
        createAdditionalField(row) {
            const additionalFieldsWrapper = row.querySelector('.ibexa-data-source--additional-fields');
            const template = additionalFieldsWrapper.dataset.template;
            const additionalFields = JSON.parse(additionalFieldsWrapper.dataset.additionalFields);
            const additionalFieldsFragment = doc.createDocumentFragment();

            Object.entries(additionalFields).forEach(([key, field]) => {
                const container = doc.createElement('div');
                const row = template.replace('{{ label }}', field).replace(/{{ name }}/g, `selected${this.id}SesExtension${key}`);

                container.insertAdjacentHTML('beforeend', row);
                additionalFieldsFragment.append(container.querySelector('.ibexa-data-source__field'));
            });

            additionalFieldsWrapper.innerHTML = '';
            additionalFieldsWrapper.append(additionalFieldsFragment);
        }
        deleteRow(event) {
            const row = event.target.closest('.ibexa-collapse');
            const rowIndex = row.dataset.index;
            const inputValue = JSON.parse(this.valueInput.value);

            inputValue[this.name].splice(rowIndex, 1);

            this.valueInput.value = JSON.stringify(inputValue);

            row.remove();
            this.valueInput.dispatchEvent(new CustomEvent('valueChange'));

            validator.reinit();
        }
        getData() {
            return JSON.parse(this.valueInput.value)[this.name];
        }
        getField(object, path) {
            try {
                const currentObject = path.split('.').reduce((nextObject, key) => nextObject[key], object);

                return currentObject.value;
            } catch (exception) {
                return '';
            }
        }
        setField(object, path, value) {
            const currentObject = path.split('.').reduce((nextObject, key) => {
                if (nextObject[key] === undefined) {
                    nextObject[key] = {};
                }

                return nextObject[key];
            }, object);

            currentObject.value = value === '' ? null : value;
        }
        setInitialHTML() {
            const storedData = this.getData();

            if (!storedData) {
                return;
            }

            storedData.forEach((rowData) => {
                const row = this.addRowHTML();

                this.setRowInputs(row, rowData);
                this.setRowLabel(row, rowData);
                this.createAdditionalField(row);
            });
        }
        setRowInputs(row, rowData) {
            row.querySelectorAll('input, select').forEach((input) => {
                input.value = this.getField(rowData, input.dataset.path);
            });
        }
        setRowLabel(row, rowData) {
            const rowLabel = [
                rowData.PartyName[0] ? rowData.PartyName[0].Name.value : null,
                rowData.PostalAddress.StreetName.value,
                rowData.PostalAddress.PostalZone.value,
                rowData.PostalAddress.CityName.value,
            ];

            row.querySelector('.ibexa-collapse__header .ibexa-label').innerHTML = rowLabel.filter((element) => element).join(', ');
        }
        updateValue(event) {
            const row = event.target.closest('.ibexa-collapse');
            const rowIndex = row.dataset.index;
            const inputValue = JSON.parse(this.valueInput.value);
            const rowData = this.getData()[rowIndex];

            row.querySelectorAll('input, select').forEach((input) => this.setField(rowData, input.dataset.path, input.value));

            inputValue[this.name][rowIndex] = rowData;

            this.valueInput.value = JSON.stringify(inputValue);

            this.setRowLabel(row, rowData);
            this.valueInput.dispatchEvent(new CustomEvent('valueChange'));
        }
    }
    class ProfileDataField {
        constructor(field) {
            this.field = field;
            this.valueInput = field.querySelector(SELECTOR_VARIANTS_INPUT);
            this.buyerAddress = new ProfileDataRow({
                id: 'Buyer',
                name: BUYER,
                field,
                valueInput: this.valueInput,
                row: field.querySelector('.ibexa-card[data-group-id="Buyer"]'),
            });
            this.deliveryAddress = new ProfileDataRow({
                id: 'Delivery',
                name: DELIVERY,
                field,
                valueInput: this.valueInput,
                row: field.querySelector('.ibexa-card[data-group-id="Delivery"]'),
            });
        }
        setIds(value) {
            const inputValue = JSON.parse(JSON.stringify(value));
            let id = 1;

            [BUYER, DELIVERY].forEach((group) => {
                if (!inputValue[group]) {
                    return;
                }

                inputValue[group].forEach((row) => {
                    if (row.PartyIdentification.length === 0) {
                        row.PartyIdentification.push({ ID: { value: {} } });
                    }

                    row.PartyIdentification[0].ID.value = id;
                    id++;
                });
            });

            return inputValue;
        }
        setInitialHTML() {
            this.buyerAddress.setInitialHTML();
            this.deliveryAddress.setInitialHTML();
        }
        setInitialValue() {
            const value = JSON.parse(this.field.dataset.value);
            let inputValue;

            if (value) {
                inputValue = this.setIds(value);
            } else {
                const inputTemplate = JSON.parse(this.field.dataset.inputTemplate);
                const inputRowTemplateBuyer = JSON.parse(this.field.dataset.inputRowTemplate);
                const inputRowTemplateDelivery = JSON.parse(this.field.dataset.inputRowTemplate);

                inputTemplate[BUYER].push(inputRowTemplateBuyer);
                inputTemplate[DELIVERY].push(inputRowTemplateDelivery);

                inputValue = this.setIds(inputTemplate);
            }

            this.valueInput.value = JSON.stringify(inputValue);
        }
    }
    class EzProfiledataValidator extends ibexa.BaseFieldValidator {
        validateInput(event) {
            const isError = event.target.value === '';
            const label = event.target.closest(SELECTOR_FIELD).querySelector('.ibexa-field-edit__label').innerHTML;
            const errorMessage = Translator.trans(
                /*@Desc("Some required inputs in %fieldName% are missing")*/ 'profile_data.error',
                { fieldName: label },
                'field_types_ui'
            );

            return {
                isError,
                errorMessage,
            };
        }
    }

    const validator = new EzProfiledataValidator({
        classInvalid: 'is-invalid',
        fieldSelector: SELECTOR_FIELD,
        eventsMap: [
            {
                selector: '.ibexa-profile-address-row .ibexa-data-source__input[required="required"]',
                eventName: 'blur',
                callback: 'validateInput',
                errorNodeSelectors: ['.ibexa-form-error'],
            },
        ],
    });

    fields.forEach((field) => {
        const fieldInstance = new ProfileDataField(field);

        fieldInstance.setInitialValue();
        fieldInstance.setInitialHTML();
    });

    validator.init();
    ibexa.addConfig('fieldTypeValidators', [validator], true);
})(window, window.document, window.ibexa, window.Translator);
