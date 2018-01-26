//

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditorModule } from './editor';
import { TableModule } from './table/table.module';

//

@NgModule({
  exports: [RouterModule],
  imports: [EditorModule, RouterModule, TableModule]
})
export class InvoicesModule {}
