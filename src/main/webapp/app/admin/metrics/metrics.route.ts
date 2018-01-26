import { Route } from '@angular/router';

import { InvMetricsMonitoringComponent } from './metrics.component';

export const metricsRoute: Route = {
    path: 'inv-metrics',
    component: InvMetricsMonitoringComponent,
    data: {
        pageTitle: 'metrics.title'
    }
};
