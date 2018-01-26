import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    FamilyInvoiceService,
    FamilyInvoicePopupService,
    FamilyInvoiceComponent,
    FamilyInvoiceDetailComponent,
    FamilyInvoiceDialogComponent,
    FamilyInvoicePopupComponent,
    FamilyInvoiceDeletePopupComponent,
    FamilyInvoiceDeleteDialogComponent,
    familyRoute,
    familyPopupRoute,
    FamilyInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...familyRoute,
    ...familyPopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FamilyInvoiceComponent,
        FamilyInvoiceDetailComponent,
        FamilyInvoiceDialogComponent,
        FamilyInvoiceDeleteDialogComponent,
        FamilyInvoicePopupComponent,
        FamilyInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        FamilyInvoiceComponent,
        FamilyInvoiceDialogComponent,
        FamilyInvoicePopupComponent,
        FamilyInvoiceDeleteDialogComponent,
        FamilyInvoiceDeletePopupComponent,
    ],
    providers: [
        FamilyInvoiceService,
        FamilyInvoicePopupService,
        FamilyInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappFamilyInvoiceModule {}
