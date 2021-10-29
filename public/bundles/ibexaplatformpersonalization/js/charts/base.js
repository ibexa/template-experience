const doc = window.document;
const { LineChart } = window.eZ.core.chart;
const MAX_NUMBER_ONE_COLUMN_DATASETS = 4;
const IBEXA_WHITE = '#fff';
const IBEXA_COLOR_BASE_DARK = '#878b90';
export class PersonalizationChart extends LineChart {
    constructor(data) {
        super(data);

        this.chartNode = doc.querySelector(`.ibexa-chart--${data.chartName}`);
        this.canvas = this.chartNode.querySelector('.ibexa-chart__canvas');
        this.templatesContainer = this.chartNode.querySelector('.ibexa-chart__templates');
        this.summaryItemsContainer = this.chartNode.querySelector('.ibexa-chart__summary-items');
        this.summaryTotalContainer = this.chartNode.querySelector('.ibexa-chart__summary-total');
    }

    setData(data) {
        super.setData(data);

        if (data.summary) {
            this.summary = data.summary;
        }
    }

    setOptions(options) {
        super.setOptions(options);

        this.options = {
            ...this.options,
            legendCallback: this.renderLegendItems.bind(this),
        };
    }

    setCheckboxBackground(checkbox) {
        const { checkedColor } = checkbox.dataset;
        const { checked } = checkbox;

        if (checked) {
            checkbox.style.backgroundColor = checkedColor;
            checkbox.style.borderColor = checkedColor;
        } else {
            checkbox.style.backgroundColor = IBEXA_WHITE;
            checkbox.style.borderColor = IBEXA_COLOR_BASE_DARK;
        }
    }

    setSummaryCheckboxes() {
        if (!this.summaryItemsContainer) {
            return;
        }

        this.summaryItemsContainer.innerHTML = '';
        this.summaryItemsContainer.appendChild(this.chart.generateLegend());

        this.summaryItemsContainer.querySelectorAll('.ez-input--summary-item-checkbox').forEach((checkbox) => {
            this.setCheckboxBackground(checkbox);

            checkbox.addEventListener('change', (event) => {
                const { datasetIndex } = event.currentTarget.dataset;
                const dataset = this.chart.data.datasets[datasetIndex];
                const productsPurchased = doc.querySelector('.ibexa-products-purchased');

                dataset.hidden = !dataset.hidden;
                this.setCheckboxBackground(event.currentTarget);
                this.chart.update();

                if (productsPurchased) {
                    productsPurchased.dataset.scrollTo = '';
                }
            });
        });
    }

    callbackAfterRender() {
        this.updateSummary();
    }

    renderLegendItems(chart) {
        const { itemTemplate } = this.templatesContainer.dataset;
        const fragment = doc.createDocumentFragment();

        this.summaryItemsContainer.classList.toggle(
            'ibexa-chart__summary-items--more-columns',
            chart.data.datasets.length > MAX_NUMBER_ONE_COLUMN_DATASETS,
        );

        chart.data.datasets.forEach((dataset, index) => {
            const container = doc.createElement('div');
            const renderedItemTemplate = itemTemplate
                .replace('{{ checked_color }}', dataset.backgroundColor)
                .replace('{{ dataset_index }}', index)
                .replace('{{ label }}', dataset.legendItem.name ?? '')
                .replace('{{ label_value }}', dataset.legendItem.summary ?? '');

            container.insertAdjacentHTML('beforeend', renderedItemTemplate);

            const checkboxNode = container.querySelector('.ibexa-chart__summary-item');

            checkboxNode.querySelector('input').checked = !dataset.hidden;
            fragment.append(checkboxNode);
        });

        return fragment;
    }

    updateSummary() {
        const { totalItemTemplate } = this.templatesContainer.dataset;

        if (this.summaryTotalContainer) {
            this.summaryTotalContainer.innerHTML = '';
            this.summary.forEach((summaryItem) => {
                const renderedTotalItemTemplate = totalItemTemplate
                    .replace('{{ value }}', summaryItem.value)
                    .replace('{{ label }}', summaryItem.label);

                this.summaryTotalContainer.insertAdjacentHTML('beforeend', renderedTotalItemTemplate);
            });
        }

        this.setSummaryCheckboxes();
    }
}
