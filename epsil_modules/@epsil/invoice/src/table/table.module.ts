//

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { TableViewComponent } from './containers/table-view/table-view.component';

//

@NgModule({
  declarations: [TableComponent, TableViewComponent],
  imports: [CommonModule, HttpClientModule]
})
export class TableModule {}
