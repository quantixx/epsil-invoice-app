import { Route } from '@angular/router';

import { InvDocsComponent } from './docs.component';

export const docsRoute: Route = {
    path: 'docs',
    component: InvDocsComponent,
    data: {
        pageTitle: 'global.menu.admin.apidocs'
    }
};
