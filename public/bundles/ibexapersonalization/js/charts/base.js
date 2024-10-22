const doc = window.document;
const { LineChart } = window.ibexa.core.chart;
const IBEXA_WHITE = '#fff';
const IBEXA_COLOR_BASE_DARK = '#878b90';

export class PersonalizationChart extends LineChart {
    constructor(data) {
        super(data);

        this.chartNode = doc.querySelector(`.ibexa-chart--${data.chartName}`);
        this.canvas = this.chartNode.querySelector('.ibexa-chart__canvas');
        this.legendNode = this.chartNode.querySelector('.ibexa-perso-dashboard-chart-legend');
        this.summaryNode = this.chartNode.querySelector('.ibexa-perso-dashboard-chart-summary');
    }

    setData(data) {
        super.setData(data);

        if (data.summary) {
            this.summary = data.summary;
        }
    }

    setPlugins() {
        this.plugins = [
            {
                beforeInit: (chart) => {
                    const { itemTemplate } = this.legendNode.dataset;
                    const fragment = doc.createDocumentFragment();

                    chart.data.datasets.forEach((dataset, index) => {
                        const container = doc.createElement('div');
                        const renderedItemTemplate = itemTemplate
                            .replace('{{ checked_color }}', dataset.backgroundColor)
                            .replace('{{ dataset_index }}', index)
                            .replace('{{ label }}', dataset.legendItem.name ?? '')
                            .replace('{{ label_value }}', dataset.legendItem.summary ?? '');

                        container.insertAdjacentHTML('beforeend', renderedItemTemplate);

                        const checkboxNode = container.querySelector('.ibexa-perso-dashboard-chart-legend__item-wrapper');

                        checkboxNode.querySelector('input').checked = !dataset.hidden;
                        fragment.append(checkboxNode);
                    });

                    this.legendNode.appendChild(fragment);

                    return fragment;
                },
            },
        ];
    }

    setLegendCheckboxBackground(checkbox) {
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

    setLegendCheckboxes() {
        if (!this.legendNode) {
            return;
        }

        this.legendNode.querySelectorAll('.ibexa-input--legend-item-checkbox').forEach((checkbox) => {
            this.setLegendCheckboxBackground(checkbox);

            checkbox.addEventListener('change', (event) => {
                const { datasetIndex } = event.currentTarget.dataset;
                const dataset = this.chart.data.datasets[datasetIndex];
                const productsPurchased = doc.querySelector('.ibexa-products-purchased');

                dataset.hidden = !dataset.hidden;
                this.setLegendCheckboxBackground(event.currentTarget);
                this.chart.update();

                if (productsPurchased) {
                    productsPurchased.dataset.scrollTo = '';
                }
            });
        });
    }

    callbackAfterRender() {
        this.updateSummary();
        this.setLegendCheckboxes();
    }

    updateSummary() {
        const { itemTemplate } = this.summaryNode.dataset;

        if (this.summaryNode) {
            this.summaryNode.innerHTML = '';
            this.summary.forEach((summaryItem) => {
                const renderedTotalItemTemplate = itemTemplate
                    .replace('{{ value }}', summaryItem.value)
                    .replace('{{ label }}', summaryItem.label);

                this.summaryNode.insertAdjacentHTML('beforeend', renderedTotalItemTemplate);
            });
        }
    }
}
