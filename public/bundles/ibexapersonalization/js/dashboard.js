import { EventsChart } from './charts/events';
import { RevenueChart } from './charts/revenue';
import { ConversionRateChart } from './charts/conversion.rate';
import { RecommendationCallsChart } from './charts/recommendation.calls';

(function(doc, eZ, Routing) {
    const SELECTOR_INTERVAL_INPUT = '.ibexa-time-range__date-interval';
    const SELECTOR_END_DATE_INPUT = '.ibexa-time-range__end-date';
    const CLASS_FETCHING_DATA = 'ez-container--fetching-data';
    const dashboardForm = doc.querySelector('form[name="dashboard"]');
    const chartsInputsContainer = doc.querySelector('.ibexa-perso-charts__inputs-container');
    const productsPurchasedInputsContainer = doc.querySelector('.ibexa-products-purchased__inputs-container');
    const popularityDurationSelect = doc.querySelector('#dashboard_popularity_duration');
    const { chartsData } = doc.querySelector('.ibexa-perso-charts').dataset;
    const chartsInitData = chartsData ? JSON.parse(chartsData) : {};
    const productsPurchasedSection = doc.querySelector('.ibexa-products-purchased');
    const charts = {};
    const { getJsonFromResponse } = eZ.helpers.request;
    const chartsMap = {
        revenue: RevenueChart,
        recommendation_calls: RecommendationCallsChart,
        conversion_rate: ConversionRateChart,
        collected_events: EventsChart,
    };
    const { customerId } = doc.querySelector('.ibexa-perso-charts').dataset;
    const handleChartsIntervalChange = (event) => {
        const container = event.currentTarget.closest('.ibexa-time-range');
        const dateIntervalNameInput = container.querySelector('select');
        const endDateInput = container.querySelector(SELECTOR_END_DATE_INPUT);
        const reportParamsInterval = container.querySelector('.ibexa-time-range__date-interval').value;
        const reportParamsEndDate = endDateInput.value || Math.floor(new Date().getTime() / 1000);
        let intervalLabel = '';

        if (dateIntervalNameInput.value === 'custom_range' && endDateInput.value === '') {
            return;
        }

        if (dateIntervalNameInput.value === 'custom_range') {
            intervalLabel = container.querySelector('.ibexa-time-range__period-select').value;
        } else {
            intervalLabel = dateIntervalNameInput.querySelector(`option[value="${dateIntervalNameInput.value}"]`).innerHTML;
        }

        doc.querySelectorAll('.ibexa-chart__time-range').forEach((node) => {
            node.innerHTML = intervalLabel;
        });

        doc.querySelector('.ibexa-perso-charts__download-full-report').href = Routing.generate(
            'ibexa.personalization.report.recommendation_detailed',
            {
                date_interval: reportParamsInterval,
                end_date: reportParamsEndDate,
                customerId: customerId,
            },
        );

        if (productsPurchasedSection) {
            productsPurchasedSection.dataset.scrollTo = '';
        }

        fetchChartsData();
    };
    const fetchChartsData = () => {
        const formData = new FormData(dashboardForm);
        const queryParams = new URLSearchParams(formData).toString();
        const request = new Request(`${Routing.generate('ibexa.personalization.chart.data', { customerId: customerId })}?${queryParams}`, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
            },
        });

        doc.querySelector('.ibexa-perso-charts').classList.toggle(CLASS_FETCHING_DATA);
        fetch(request)
            .then(getJsonFromResponse)
            .then((response) => {
                Object.entries(response.charts).forEach(([chartKey, data]) => {
                    if (Object.prototype.hasOwnProperty.call(charts, chartKey)) {
                        charts[chartKey].setData(data);
                        charts[chartKey].updateChart();
                    }
                });
                doc.querySelector('.ibexa-perso-charts').classList.toggle(CLASS_FETCHING_DATA);
            })
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const handleProductsPurchasedIntervalChange = (event) => {
        const container = event.target.closest('.ibexa-time-range');
        const dateIntervalNameInput = container.querySelector('select');
        const endDateInput = container.querySelector(SELECTOR_END_DATE_INPUT);

        if (dateIntervalNameInput.value === 'custom_range' && endDateInput.value === '') {
            return;
        }

        dashboardForm.submit();
    };

    Object.entries(chartsMap).forEach(([chartKey, ChartClass]) => {
        if (Object.prototype.hasOwnProperty.call(chartsInitData, chartKey)) {
            charts[chartKey] = new ChartClass(chartsInitData[chartKey]);

            charts[chartKey].render();
        }
    });

    chartsInputsContainer.querySelector(SELECTOR_INTERVAL_INPUT).addEventListener('change', handleChartsIntervalChange, false);
    chartsInputsContainer.querySelector(SELECTOR_END_DATE_INPUT).addEventListener('change', handleChartsIntervalChange, false);

    if (productsPurchasedInputsContainer) {
        productsPurchasedInputsContainer
            .querySelector(SELECTOR_INTERVAL_INPUT)
            .addEventListener('change', handleProductsPurchasedIntervalChange, false);
        productsPurchasedInputsContainer
            .querySelector(SELECTOR_END_DATE_INPUT)
            .addEventListener('change', handleProductsPurchasedIntervalChange, false);
    }

    if (productsPurchasedSection) {
        const { scrollTo } = productsPurchasedSection.dataset;
        const scrollTarget = scrollTo ? doc.querySelector(scrollTo) : null;

        if (scrollTarget) {
            scrollTarget.scrollIntoView();
        }
    }

    if (popularityDurationSelect) {
        popularityDurationSelect.addEventListener('change', () => dashboardForm.submit(), false);
    }
})(window.document, window.eZ, window.Routing);
