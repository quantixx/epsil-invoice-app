import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    EventInvoiceService,
    EventInvoicePopupService,
    EventInvoiceComponent,
    EventInvoiceDetailComponent,
    EventInvoiceDialogComponent,
    EventInvoicePopupComponent,
    EventInvoiceDeletePopupComponent,
    EventInvoiceDeleteDialogComponent,
    eventRoute,
    eventPopupRoute,
    EventInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...eventRoute,
    ...eventPopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EventInvoiceComponent,
        EventInvoiceDetailComponent,
        EventInvoiceDialogComponent,
        EventInvoiceDeleteDialogComponent,
        EventInvoicePopupComponent,
        EventInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        EventInvoiceComponent,
        EventInvoiceDialogComponent,
        EventInvoicePopupComponent,
        EventInvoiceDeleteDialogComponent,
        EventInvoiceDeletePopupComponent,
    ],
    providers: [
        EventInvoiceService,
        EventInvoicePopupService,
        EventInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappEventInvoiceModule {}
