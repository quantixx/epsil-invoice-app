import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    InvoiceDefinitionInvoiceService,
    InvoiceDefinitionInvoicePopupService,
    InvoiceDefinitionInvoiceComponent,
    InvoiceDefinitionInvoiceDetailComponent,
    InvoiceDefinitionInvoiceDialogComponent,
    InvoiceDefinitionInvoicePopupComponent,
    InvoiceDefinitionInvoiceDeletePopupComponent,
    InvoiceDefinitionInvoiceDeleteDialogComponent,
    invoiceDefinitionRoute,
    invoiceDefinitionPopupRoute,
    InvoiceDefinitionInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...invoiceDefinitionRoute,
    ...invoiceDefinitionPopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InvoiceDefinitionInvoiceComponent,
        InvoiceDefinitionInvoiceDetailComponent,
        InvoiceDefinitionInvoiceDialogComponent,
        InvoiceDefinitionInvoiceDeleteDialogComponent,
        InvoiceDefinitionInvoicePopupComponent,
        InvoiceDefinitionInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        InvoiceDefinitionInvoiceComponent,
        InvoiceDefinitionInvoiceDialogComponent,
        InvoiceDefinitionInvoicePopupComponent,
        InvoiceDefinitionInvoiceDeleteDialogComponent,
        InvoiceDefinitionInvoiceDeletePopupComponent,
    ],
    providers: [
        InvoiceDefinitionInvoiceService,
        InvoiceDefinitionInvoicePopupService,
        InvoiceDefinitionInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappInvoiceDefinitionInvoiceModule {}
