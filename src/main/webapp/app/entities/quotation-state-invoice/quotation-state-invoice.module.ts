import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    QuotationStateInvoiceService,
    QuotationStateInvoicePopupService,
    QuotationStateInvoiceComponent,
    QuotationStateInvoiceDetailComponent,
    QuotationStateInvoiceDialogComponent,
    QuotationStateInvoicePopupComponent,
    QuotationStateInvoiceDeletePopupComponent,
    QuotationStateInvoiceDeleteDialogComponent,
    quotationStateRoute,
    quotationStatePopupRoute,
    QuotationStateInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...quotationStateRoute,
    ...quotationStatePopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        QuotationStateInvoiceComponent,
        QuotationStateInvoiceDetailComponent,
        QuotationStateInvoiceDialogComponent,
        QuotationStateInvoiceDeleteDialogComponent,
        QuotationStateInvoicePopupComponent,
        QuotationStateInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        QuotationStateInvoiceComponent,
        QuotationStateInvoiceDialogComponent,
        QuotationStateInvoicePopupComponent,
        QuotationStateInvoiceDeleteDialogComponent,
        QuotationStateInvoiceDeletePopupComponent,
    ],
    providers: [
        QuotationStateInvoiceService,
        QuotationStateInvoicePopupService,
        QuotationStateInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappQuotationStateInvoiceModule {}
