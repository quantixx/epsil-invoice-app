import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    InvoiceLineInvoiceService,
    InvoiceLineInvoicePopupService,
    InvoiceLineInvoiceComponent,
    InvoiceLineInvoiceDetailComponent,
    InvoiceLineInvoiceDialogComponent,
    InvoiceLineInvoicePopupComponent,
    InvoiceLineInvoiceDeletePopupComponent,
    InvoiceLineInvoiceDeleteDialogComponent,
    invoiceLineRoute,
    invoiceLinePopupRoute,
    InvoiceLineInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...invoiceLineRoute,
    ...invoiceLinePopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InvoiceLineInvoiceComponent,
        InvoiceLineInvoiceDetailComponent,
        InvoiceLineInvoiceDialogComponent,
        InvoiceLineInvoiceDeleteDialogComponent,
        InvoiceLineInvoicePopupComponent,
        InvoiceLineInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        InvoiceLineInvoiceComponent,
        InvoiceLineInvoiceDialogComponent,
        InvoiceLineInvoicePopupComponent,
        InvoiceLineInvoiceDeleteDialogComponent,
        InvoiceLineInvoiceDeletePopupComponent,
    ],
    providers: [
        InvoiceLineInvoiceService,
        InvoiceLineInvoicePopupService,
        InvoiceLineInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappInvoiceLineInvoiceModule {}
