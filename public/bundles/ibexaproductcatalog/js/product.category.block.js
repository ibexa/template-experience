import ProductCategoryChart from './product.category.chart';

(function (global, doc, ibexa, Translator) {
    const previewMode = doc.querySelector('.ibexa-db-main-container.ibexa-db-preview');
    const renderProductCategoryCharts = () => {
        const chartsContainer = doc.querySelectorAll('.ibexa-chart.ibexa-chart--product-category');

        if (!chartsContainer.length) {
            return;
        }

        chartsContainer.forEach((chartContainer) => {
            renderProductCategoryChart(chartContainer);
        });
    };
    const renderProductCategoryChart = (chartContainer) => {
        const graphColors = ibexa.adminUiConfig.chartColorPalette;
        const { chartData: chartDataRaw } = chartContainer.dataset;
        const chartData = JSON.parse(chartDataRaw);
        const labels = Object.values(chartData).map(({ label }) => label);
        const datasetLabel = Translator.trans(
            /*@Desc("Products")*/ 'dashboard.products_by_categories.dataset_label',
            {},
            'ibexa_dashboard',
        );
        const data = {
            ref: chartContainer,
            chartName: 'product-category',
            datasets: [
                {
                    legend: labels,
                    label: ` ${datasetLabel}`,
                    data: Object.values(chartData).map(({ value }) => value),
                    backgroundColor: graphColors,
                },
            ],
            labels,
        };
        const options = { cutout: 180 };
        const chart = new ProductCategoryChart(data, options);

        chart.render();
    };

    if (!previewMode) {
        return renderProductCategoryCharts();
    }

    doc.body.addEventListener('ibexa-post-update-blocks-preview', ({ detail }) => {
        const { blockIds } = detail;

        blockIds.forEach((blockId) => {
            const block = doc.querySelector(`[data-ez-block-id="${blockId}"`);
            const chartContainer = block.querySelector('.ibexa-chart.ibexa-chart--product-category');

            if (!chartContainer) {
                return;
            }

            renderProductCategoryChart(chartContainer);
        });
    });

    window.parent.document.body.addEventListener('ibexa-pb-app-iframe-loaded', () => {
        setTimeout(() => {
            renderProductCategoryCharts();
        }, 0);
    });
})(window, window.document, window.ibexa, window.Translator);
