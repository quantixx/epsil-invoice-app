import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    BankInvoiceService,
    BankInvoicePopupService,
    BankInvoiceComponent,
    BankInvoiceDetailComponent,
    BankInvoiceDialogComponent,
    BankInvoicePopupComponent,
    BankInvoiceDeletePopupComponent,
    BankInvoiceDeleteDialogComponent,
    bankRoute,
    bankPopupRoute,
    BankInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...bankRoute,
    ...bankPopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BankInvoiceComponent,
        BankInvoiceDetailComponent,
        BankInvoiceDialogComponent,
        BankInvoiceDeleteDialogComponent,
        BankInvoicePopupComponent,
        BankInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        BankInvoiceComponent,
        BankInvoiceDialogComponent,
        BankInvoicePopupComponent,
        BankInvoiceDeleteDialogComponent,
        BankInvoiceDeletePopupComponent,
    ],
    providers: [
        BankInvoiceService,
        BankInvoicePopupService,
        BankInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappBankInvoiceModule {}
