import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    QuotationLineInvoiceService,
    QuotationLineInvoicePopupService,
    QuotationLineInvoiceComponent,
    QuotationLineInvoiceDetailComponent,
    QuotationLineInvoiceDialogComponent,
    QuotationLineInvoicePopupComponent,
    QuotationLineInvoiceDeletePopupComponent,
    QuotationLineInvoiceDeleteDialogComponent,
    quotationLineRoute,
    quotationLinePopupRoute,
    QuotationLineInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...quotationLineRoute,
    ...quotationLinePopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        QuotationLineInvoiceComponent,
        QuotationLineInvoiceDetailComponent,
        QuotationLineInvoiceDialogComponent,
        QuotationLineInvoiceDeleteDialogComponent,
        QuotationLineInvoicePopupComponent,
        QuotationLineInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        QuotationLineInvoiceComponent,
        QuotationLineInvoiceDialogComponent,
        QuotationLineInvoicePopupComponent,
        QuotationLineInvoiceDeleteDialogComponent,
        QuotationLineInvoiceDeletePopupComponent,
    ],
    providers: [
        QuotationLineInvoiceService,
        QuotationLineInvoicePopupService,
        QuotationLineInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappQuotationLineInvoiceModule {}
