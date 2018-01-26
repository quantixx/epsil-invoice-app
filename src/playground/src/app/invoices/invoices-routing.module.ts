//

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { INVOICES_ROUTES, InvoicesModule } from '@epsil/invoice';

//

const routes: Routes = [{ path: '', children: INVOICES_ROUTES }];

@NgModule({
    exports: [RouterModule],
    imports: [InvoicesModule, RouterModule.forChild(routes)]
})
export class InvoicesRoutingModule {}
