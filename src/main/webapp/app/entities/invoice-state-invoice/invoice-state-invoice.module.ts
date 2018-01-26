import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    InvoiceStateInvoiceService,
    InvoiceStateInvoicePopupService,
    InvoiceStateInvoiceComponent,
    InvoiceStateInvoiceDetailComponent,
    InvoiceStateInvoiceDialogComponent,
    InvoiceStateInvoicePopupComponent,
    InvoiceStateInvoiceDeletePopupComponent,
    InvoiceStateInvoiceDeleteDialogComponent,
    invoiceStateRoute,
    invoiceStatePopupRoute,
    InvoiceStateInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...invoiceStateRoute,
    ...invoiceStatePopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InvoiceStateInvoiceComponent,
        InvoiceStateInvoiceDetailComponent,
        InvoiceStateInvoiceDialogComponent,
        InvoiceStateInvoiceDeleteDialogComponent,
        InvoiceStateInvoicePopupComponent,
        InvoiceStateInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        InvoiceStateInvoiceComponent,
        InvoiceStateInvoiceDialogComponent,
        InvoiceStateInvoicePopupComponent,
        InvoiceStateInvoiceDeleteDialogComponent,
        InvoiceStateInvoiceDeletePopupComponent,
    ],
    providers: [
        InvoiceStateInvoiceService,
        InvoiceStateInvoicePopupService,
        InvoiceStateInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappInvoiceStateInvoiceModule {}
