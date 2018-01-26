import { Route } from '@angular/router';

import { InvGatewayComponent } from './gateway.component';

export const gatewayRoute: Route = {
    path: 'gateway',
    component: InvGatewayComponent,
    data: {
        pageTitle: 'gateway.title'
    }
};
