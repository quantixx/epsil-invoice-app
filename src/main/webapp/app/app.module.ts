import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { InvoiceappSharedModule, UserRouteAccessService } from './shared';
import { InvoiceappAppRoutingModule} from './app-routing.module';
import { InvoiceappHomeModule } from './home/home.module';
import { InvoiceappAdminModule } from './admin/admin.module';
import { InvoiceappAccountModule } from './account/account.module';
import { InvoiceappEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    InvMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        InvoiceappAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        InvoiceappSharedModule,
        InvoiceappHomeModule,
        InvoiceappAdminModule,
        InvoiceappAccountModule,
        InvoiceappEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        InvMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ InvMainComponent ]
})
export class InvoiceappAppModule {}
