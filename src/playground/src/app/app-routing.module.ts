//

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  {
    loadChildren: './invoices/invoices.module#InvoicesModule',
    path: 'invoices'
  },
  { path: '', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
