//

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditorLayoutComponent } from './components/editor-layout/editor-layout.component';
import { EditorViewComponent } from './containers/editor-view/editor-view.component';

//

@NgModule({
  declarations: [EditorViewComponent, EditorLayoutComponent],
  imports: [CommonModule]
})
export class EditorModule {}
