import ProductCategoryChart from './product.category.chart';

(function (global, doc, ibexa, Translator) {
    const chartContainer = doc.querySelector('.ibexa-chart.ibexa-chart--product-category');

    if (!chartContainer) {
        return;
    }
    const graphColors = ibexa.adminUiConfig.chartColorPalette;
    const { chartData: chartDataRaw } = chartContainer.dataset;
    const chartData = JSON.parse(chartDataRaw);
    const labels = Object.values(chartData).map(({ label }) => label);
    const datasetLabel = Translator.trans(/*@Desc("Products")*/ 'dashboard.products_by_categories.dataset_label', {}, 'ibexa_dashboard');
    const data = {
        chartName: 'product-category',
        datasets: [
            {
                legend: labels,
                label: datasetLabel,
                data: Object.values(chartData).map(({ value }) => value),
                backgroundColor: graphColors,
            },
        ],
        labels,
    };
    const options = { cutout: 180 };
    const chart = new ProductCategoryChart(data, options);

    chart.render();
})(window, window.document, window.ibexa, window.Translator);
