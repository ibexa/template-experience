(function (global, doc) {
    const getContainer = (node) => {
        return node.closest('.ibexa-collapse--field-definition') || node.closest('.ibexa-pc-edit__form');
    };
    const updateBaseUnit = ({ currentTarget }) => {
        const container = getContainer(currentTarget);
        const unitList = container.querySelector(
            `.ibexa-measurement-unit__original-dropdown .ibexa-input--select [label="${currentTarget.value}"]`,
        );
        const sourceDropdownSelect = container.querySelector('.ibexa-measurement-unit__dropdown-wrapper .ibexa-input--select');

        sourceDropdownSelect.innerHTML = '';

        unitList.querySelectorAll('option').forEach((option) => {
            const renderedOption = `<option value="${option.value}">${option.innerHTML}</option>`;

            sourceDropdownSelect.insertAdjacentHTML('beforeend', renderedOption);
        });
    };
    const showInputType = ({ currentTarget }) => {
        const container = getContainer(currentTarget);
        const simpleInputSelected = currentTarget.value === '0';

        container.querySelector('.ibexa-measurement-sign').classList.toggle('ibexa-measurement-sign--hidden', !simpleInputSelected);
        container
            .querySelector('.ibexa-measurement-default-value--simple')
            .classList.toggle('ibexa-measurement-default-value--hidden', !simpleInputSelected);
        container
            .querySelector('.ibexa-measurement-default-value--range')
            .classList.toggle('ibexa-measurement-default-value--hidden', simpleInputSelected);
    };
    const updateUnitLabels = (unitSelect) => {
        const container = getContainer(unitSelect);
        const unit = unitSelect.querySelector(`[value="${unitSelect.value}"]`).innerHTML;

        [
            container.querySelector('.ibexa-measurement-form-number--minimum'),
            container.querySelector('.ibexa-measurement-form-number--maximum'),
            ...container.querySelectorAll('.ibexa-measurement-form-number--default-value'),
        ].forEach((numberWrapper) => {
            if (!numberWrapper) {
                return;
            }

            numberWrapper.querySelector('.ibexa-measurement-form-number__unit-wrapper').innerHTML = unit;
        });
    };
    const setUnit = ({ currentTarget }) => {
        const container = getContainer(currentTarget);
        const unitList = container.querySelector('.ibexa-measurement-unit__original-dropdown .ibexa-input--select');
        const unit = currentTarget.value;

        unitList.value = unit;
    };
    const addEventsListeners = (container) => {
        const typeSelect = container.querySelector('.ibexa-measurement-type .ibexa-input--select');
        const inputTypeSelect = container.querySelector('.ibexa-measurement-input-type .ibexa-input--select');
        const unitSelect = container.querySelector('.ibexa-measurement-unit__dropdown-wrapper .ibexa-input--select');
        const minValueInput = container.querySelector('.ibexa-measurement-form-number--minimum .ibexa-input');
        const maxValueInput = container.querySelector('.ibexa-measurement-form-number--maximum .ibexa-input');
        const defaultRangeMinValueInput = container.querySelector(
            '.ibexa-measurement-default-value--range .ibexa-measurement-form-number__input-wrapper--min .ibexa-input',
        );
        const defaultRangeMaxValueInput = container.querySelector(
            '.ibexa-measurement-default-value--range .ibexa-measurement-form-number__input-wrapper--max .ibexa-input',
        );

        typeSelect.addEventListener('change', updateBaseUnit, false);
        inputTypeSelect?.addEventListener('change', showInputType, false);
        unitSelect.addEventListener('change', ({ currentTarget }) => updateUnitLabels(currentTarget), false);
        unitSelect.addEventListener('change', setUnit, false);
        minValueInput?.addEventListener(
            'change',
            () => {
                defaultRangeMinValueInput.min = minValueInput.value;
                defaultRangeMaxValueInput.min = minValueInput.value;
            },
            false,
        );
        maxValueInput?.addEventListener(
            'change',
            () => {
                defaultRangeMinValueInput.max = maxValueInput.value;
                defaultRangeMaxValueInput.max = maxValueInput.value;
            },
            false,
        );

        updateUnitLabels(unitSelect);
    };

    doc.querySelectorAll('.ibexa-measurement-type').forEach((typeNode) => {
        addEventsListeners(getContainer(typeNode));
    });

    doc.body.addEventListener(
        'ibexa-drop-field-definition',
        (event) => {
            const { nodes } = event.detail;

            nodes.forEach((container) => {
                if (!container.querySelector('.ibexa-measurement-type')) {
                    return;
                }

                addEventsListeners(container);
            });
        },
        false,
    );
})(window, document);
