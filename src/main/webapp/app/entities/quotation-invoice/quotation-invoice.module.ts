import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    QuotationInvoiceService,
    QuotationInvoicePopupService,
    QuotationInvoiceComponent,
    QuotationInvoiceDetailComponent,
    QuotationInvoiceDialogComponent,
    QuotationInvoicePopupComponent,
    QuotationInvoiceDeletePopupComponent,
    QuotationInvoiceDeleteDialogComponent,
    quotationRoute,
    quotationPopupRoute,
    QuotationInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...quotationRoute,
    ...quotationPopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        QuotationInvoiceComponent,
        QuotationInvoiceDetailComponent,
        QuotationInvoiceDialogComponent,
        QuotationInvoiceDeleteDialogComponent,
        QuotationInvoicePopupComponent,
        QuotationInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        QuotationInvoiceComponent,
        QuotationInvoiceDialogComponent,
        QuotationInvoicePopupComponent,
        QuotationInvoiceDeleteDialogComponent,
        QuotationInvoiceDeletePopupComponent,
    ],
    providers: [
        QuotationInvoiceService,
        QuotationInvoicePopupService,
        QuotationInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappQuotationInvoiceModule {}
