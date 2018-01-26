import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    SequenceInvoiceService,
    SequenceInvoicePopupService,
    SequenceInvoiceComponent,
    SequenceInvoiceDetailComponent,
    SequenceInvoiceDialogComponent,
    SequenceInvoicePopupComponent,
    SequenceInvoiceDeletePopupComponent,
    SequenceInvoiceDeleteDialogComponent,
    sequenceRoute,
    sequencePopupRoute,
    SequenceInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sequenceRoute,
    ...sequencePopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SequenceInvoiceComponent,
        SequenceInvoiceDetailComponent,
        SequenceInvoiceDialogComponent,
        SequenceInvoiceDeleteDialogComponent,
        SequenceInvoicePopupComponent,
        SequenceInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        SequenceInvoiceComponent,
        SequenceInvoiceDialogComponent,
        SequenceInvoicePopupComponent,
        SequenceInvoiceDeleteDialogComponent,
        SequenceInvoiceDeletePopupComponent,
    ],
    providers: [
        SequenceInvoiceService,
        SequenceInvoicePopupService,
        SequenceInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappSequenceInvoiceModule {}
