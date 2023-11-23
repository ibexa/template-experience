const doc = window.document;
const { DoughnutChart } = window.ibexa.core.chart;
const IBEXA_WHITE = '#fff';
const IBEXA_COLOR_BASE_DARK = '#878b90';

class ProductCategoryChart extends DoughnutChart {
    constructor(data, options) {
        super(data, options);

        this.chartNode = doc.querySelector(`.ibexa-chart--${data.chartName}`);
        this.canvas = this.chartNode.querySelector('.ibexa-chart__canvas');
        this.legendNode = this.chartNode.querySelector('.ibexa-chart-legend');
    }

    setPlugins() {
        this.plugins = [
            {
                beforeInit: (chart) => {
                    const { itemTemplate } = this.legendNode.dataset;
                    const fragment = doc.createDocumentFragment();
                    const data = chart.data.datasets[0];

                    data.legend.forEach((legendItem, index) => {
                        const container = doc.createElement('div');
                        const renderedItemTemplate = itemTemplate
                            .replace('{{ checked_color }}', data.backgroundColor[index])
                            .replace('{{ dataset_index }}', index)
                            .replace('{{ label }}', legendItem);

                        container.insertAdjacentHTML('beforeend', renderedItemTemplate);

                        const checkboxNode = container.querySelector('.ibexa-chart-legend__item-wrapper');

                        checkboxNode.querySelector('input').checked = true;
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

                this.setLegendCheckboxBackground(event.currentTarget);

                const chartMethod = event.currentTarget.checked ? 'show' : 'hide';

                this.chart[chartMethod](0, datasetIndex);
            });
        });
    }

    callbackAfterRender() {
        this.setLegendCheckboxes();
    }
}

module.exports = ProductCategoryChart;
