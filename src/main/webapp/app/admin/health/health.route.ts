import { Route } from '@angular/router';

import { InvHealthCheckComponent } from './health.component';

export const healthRoute: Route = {
    path: 'inv-health',
    component: InvHealthCheckComponent,
    data: {
        pageTitle: 'health.title'
    }
};
