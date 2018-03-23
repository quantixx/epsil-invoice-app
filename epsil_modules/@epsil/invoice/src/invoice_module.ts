//

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from './table/table.module';

//

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule, TableModule]
})
export class InvoicesModule {}
