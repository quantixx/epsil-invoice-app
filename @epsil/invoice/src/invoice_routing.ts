//

import { Routes } from '@angular/router';
import { TableViewComponent } from './table/containers/table-view/table-view.component';

//

export const INVOICES_ROUTES: Routes = [
  { path: 'table', component: TableViewComponent },
  { path: '', pathMatch: 'full', redirectTo: 'table' }
];
