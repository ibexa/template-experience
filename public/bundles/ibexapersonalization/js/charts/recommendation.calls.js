import { PersonalizationChart } from './base';

export class RecommendationCallsChart extends PersonalizationChart {
    constructor(data) {
        super({
            ...data,
            ...{ chartName: 'recommendation-calls' },
        });
    }
}
