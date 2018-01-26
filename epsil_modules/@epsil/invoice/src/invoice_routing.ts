//

import { Routes } from '@angular/router';
import { EditorViewComponent } from './editor';
import { TableViewComponent } from './table/containers/table-view/table-view.component';

//

export const INVOICES_ROUTES: Routes = [
  { path: 'table', component: TableViewComponent },
  { path: 'edit', component: EditorViewComponent },
  { path: '', pathMatch: 'full', redirectTo: 'edit' }
];
