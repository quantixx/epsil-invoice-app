//

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PlaygroundAppRootComponent } from './playground-app-root/playground-app-root.component';

//

@NgModule({
  declarations: [
    PlaygroundAppRootComponent,
    PlaygroundAppRootComponent,
    NavbarComponent
  ],
  exports: [PlaygroundAppRootComponent],
  imports: [CommonModule, RouterModule]
})
export class CoreModule {}

export { PlaygroundAppRootComponent };
