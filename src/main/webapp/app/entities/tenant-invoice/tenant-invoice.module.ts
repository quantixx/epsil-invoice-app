import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    TenantInvoiceService,
    TenantInvoicePopupService,
    TenantInvoiceComponent,
    TenantInvoiceDetailComponent,
    TenantInvoiceDialogComponent,
    TenantInvoicePopupComponent,
    TenantInvoiceDeletePopupComponent,
    TenantInvoiceDeleteDialogComponent,
    tenantRoute,
    tenantPopupRoute,
    TenantInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...tenantRoute,
    ...tenantPopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TenantInvoiceComponent,
        TenantInvoiceDetailComponent,
        TenantInvoiceDialogComponent,
        TenantInvoiceDeleteDialogComponent,
        TenantInvoicePopupComponent,
        TenantInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        TenantInvoiceComponent,
        TenantInvoiceDialogComponent,
        TenantInvoicePopupComponent,
        TenantInvoiceDeleteDialogComponent,
        TenantInvoiceDeletePopupComponent,
    ],
    providers: [
        TenantInvoiceService,
        TenantInvoicePopupService,
        TenantInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappTenantInvoiceModule {}
