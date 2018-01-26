import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    DocumentInvoiceService,
    DocumentInvoicePopupService,
    DocumentInvoiceComponent,
    DocumentInvoiceDetailComponent,
    DocumentInvoiceDialogComponent,
    DocumentInvoicePopupComponent,
    DocumentInvoiceDeletePopupComponent,
    DocumentInvoiceDeleteDialogComponent,
    documentRoute,
    documentPopupRoute,
    DocumentInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...documentRoute,
    ...documentPopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DocumentInvoiceComponent,
        DocumentInvoiceDetailComponent,
        DocumentInvoiceDialogComponent,
        DocumentInvoiceDeleteDialogComponent,
        DocumentInvoicePopupComponent,
        DocumentInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        DocumentInvoiceComponent,
        DocumentInvoiceDialogComponent,
        DocumentInvoicePopupComponent,
        DocumentInvoiceDeleteDialogComponent,
        DocumentInvoiceDeletePopupComponent,
    ],
    providers: [
        DocumentInvoiceService,
        DocumentInvoicePopupService,
        DocumentInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappDocumentInvoiceModule {}
