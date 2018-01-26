import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    CurrencyInvoiceService,
    CurrencyInvoicePopupService,
    CurrencyInvoiceComponent,
    CurrencyInvoiceDetailComponent,
    CurrencyInvoiceDialogComponent,
    CurrencyInvoicePopupComponent,
    CurrencyInvoiceDeletePopupComponent,
    CurrencyInvoiceDeleteDialogComponent,
    currencyRoute,
    currencyPopupRoute,
    CurrencyInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...currencyRoute,
    ...currencyPopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CurrencyInvoiceComponent,
        CurrencyInvoiceDetailComponent,
        CurrencyInvoiceDialogComponent,
        CurrencyInvoiceDeleteDialogComponent,
        CurrencyInvoicePopupComponent,
        CurrencyInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        CurrencyInvoiceComponent,
        CurrencyInvoiceDialogComponent,
        CurrencyInvoicePopupComponent,
        CurrencyInvoiceDeleteDialogComponent,
        CurrencyInvoiceDeletePopupComponent,
    ],
    providers: [
        CurrencyInvoiceService,
        CurrencyInvoicePopupService,
        CurrencyInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappCurrencyInvoiceModule {}
