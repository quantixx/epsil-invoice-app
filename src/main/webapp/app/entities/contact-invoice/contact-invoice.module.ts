import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    ContactInvoiceService,
    ContactInvoicePopupService,
    ContactInvoiceComponent,
    ContactInvoiceDetailComponent,
    ContactInvoiceDialogComponent,
    ContactInvoicePopupComponent,
    ContactInvoiceDeletePopupComponent,
    ContactInvoiceDeleteDialogComponent,
    contactRoute,
    contactPopupRoute,
    ContactInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...contactRoute,
    ...contactPopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ContactInvoiceComponent,
        ContactInvoiceDetailComponent,
        ContactInvoiceDialogComponent,
        ContactInvoiceDeleteDialogComponent,
        ContactInvoicePopupComponent,
        ContactInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        ContactInvoiceComponent,
        ContactInvoiceDialogComponent,
        ContactInvoicePopupComponent,
        ContactInvoiceDeleteDialogComponent,
        ContactInvoiceDeletePopupComponent,
    ],
    providers: [
        ContactInvoiceService,
        ContactInvoicePopupService,
        ContactInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappContactInvoiceModule {}
