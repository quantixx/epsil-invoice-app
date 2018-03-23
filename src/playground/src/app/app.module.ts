//

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule, PlaygroundAppRootComponent } from './core/core.module';

//

@NgModule({
  bootstrap: [PlaygroundAppRootComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule]
})
export class AppModule {}
