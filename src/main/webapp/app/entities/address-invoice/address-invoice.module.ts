import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    AddressInvoiceService,
    AddressInvoicePopupService,
    AddressInvoiceComponent,
    AddressInvoiceDetailComponent,
    AddressInvoiceDialogComponent,
    AddressInvoicePopupComponent,
    AddressInvoiceDeletePopupComponent,
    AddressInvoiceDeleteDialogComponent,
    addressRoute,
    addressPopupRoute,
    AddressInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...addressRoute,
    ...addressPopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AddressInvoiceComponent,
        AddressInvoiceDetailComponent,
        AddressInvoiceDialogComponent,
        AddressInvoiceDeleteDialogComponent,
        AddressInvoicePopupComponent,
        AddressInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        AddressInvoiceComponent,
        AddressInvoiceDialogComponent,
        AddressInvoicePopupComponent,
        AddressInvoiceDeleteDialogComponent,
        AddressInvoiceDeletePopupComponent,
    ],
    providers: [
        AddressInvoiceService,
        AddressInvoicePopupService,
        AddressInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappAddressInvoiceModule {}
