import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    InvoiceInvoiceService,
    InvoiceInvoicePopupService,
    InvoiceInvoiceComponent,
    InvoiceInvoiceDetailComponent,
    InvoiceInvoiceDialogComponent,
    InvoiceInvoicePopupComponent,
    InvoiceInvoiceDeletePopupComponent,
    InvoiceInvoiceDeleteDialogComponent,
    invoiceRoute,
    invoicePopupRoute,
    InvoiceInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...invoiceRoute,
    ...invoicePopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InvoiceInvoiceComponent,
        InvoiceInvoiceDetailComponent,
        InvoiceInvoiceDialogComponent,
        InvoiceInvoiceDeleteDialogComponent,
        InvoiceInvoicePopupComponent,
        InvoiceInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        InvoiceInvoiceComponent,
        InvoiceInvoiceDialogComponent,
        InvoiceInvoicePopupComponent,
        InvoiceInvoiceDeleteDialogComponent,
        InvoiceInvoiceDeletePopupComponent,
    ],
    providers: [
        InvoiceInvoiceService,
        InvoiceInvoicePopupService,
        InvoiceInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappInvoiceInvoiceModule {}
