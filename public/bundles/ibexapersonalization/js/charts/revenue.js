import { PersonalizationChart } from './base';

export class RevenueChart extends PersonalizationChart {
    constructor(data) {
        super({
            ...data,
            ...{ chartName: 'revenue' },
        });
    }
}
