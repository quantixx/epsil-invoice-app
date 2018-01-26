import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    QuotationDefinitionInvoiceService,
    QuotationDefinitionInvoicePopupService,
    QuotationDefinitionInvoiceComponent,
    QuotationDefinitionInvoiceDetailComponent,
    QuotationDefinitionInvoiceDialogComponent,
    QuotationDefinitionInvoicePopupComponent,
    QuotationDefinitionInvoiceDeletePopupComponent,
    QuotationDefinitionInvoiceDeleteDialogComponent,
    quotationDefinitionRoute,
    quotationDefinitionPopupRoute,
    QuotationDefinitionInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...quotationDefinitionRoute,
    ...quotationDefinitionPopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        QuotationDefinitionInvoiceComponent,
        QuotationDefinitionInvoiceDetailComponent,
        QuotationDefinitionInvoiceDialogComponent,
        QuotationDefinitionInvoiceDeleteDialogComponent,
        QuotationDefinitionInvoicePopupComponent,
        QuotationDefinitionInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        QuotationDefinitionInvoiceComponent,
        QuotationDefinitionInvoiceDialogComponent,
        QuotationDefinitionInvoicePopupComponent,
        QuotationDefinitionInvoiceDeleteDialogComponent,
        QuotationDefinitionInvoiceDeletePopupComponent,
    ],
    providers: [
        QuotationDefinitionInvoiceService,
        QuotationDefinitionInvoicePopupService,
        QuotationDefinitionInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappQuotationDefinitionInvoiceModule {}
