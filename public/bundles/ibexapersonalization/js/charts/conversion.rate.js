import { PersonalizationChart } from './base';

export class ConversionRateChart extends PersonalizationChart {
    constructor(data) {
        super({
            ...data,
            ...{ chartName: 'conversion-rate' },
        });
    }
}
