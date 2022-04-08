import { PersonalizationChart } from './base';

export class EventsChart extends PersonalizationChart {
    constructor(data) {
        super({
            ...data,
            ...{ chartName: 'collected-events' },
        });
    }
}
