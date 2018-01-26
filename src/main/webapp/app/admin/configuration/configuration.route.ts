import { Route } from '@angular/router';

import { InvConfigurationComponent } from './configuration.component';

export const configurationRoute: Route = {
    path: 'inv-configuration',
    component: InvConfigurationComponent,
    data: {
        pageTitle: 'configuration.title'
    }
};
