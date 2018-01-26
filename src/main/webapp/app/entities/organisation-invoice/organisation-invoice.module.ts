import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    OrganisationInvoiceService,
    OrganisationInvoicePopupService,
    OrganisationInvoiceComponent,
    OrganisationInvoiceDetailComponent,
    OrganisationInvoiceDialogComponent,
    OrganisationInvoicePopupComponent,
    OrganisationInvoiceDeletePopupComponent,
    OrganisationInvoiceDeleteDialogComponent,
    organisationRoute,
    organisationPopupRoute,
    OrganisationInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...organisationRoute,
    ...organisationPopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrganisationInvoiceComponent,
        OrganisationInvoiceDetailComponent,
        OrganisationInvoiceDialogComponent,
        OrganisationInvoiceDeleteDialogComponent,
        OrganisationInvoicePopupComponent,
        OrganisationInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        OrganisationInvoiceComponent,
        OrganisationInvoiceDialogComponent,
        OrganisationInvoicePopupComponent,
        OrganisationInvoiceDeleteDialogComponent,
        OrganisationInvoiceDeletePopupComponent,
    ],
    providers: [
        OrganisationInvoiceService,
        OrganisationInvoicePopupService,
        OrganisationInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappOrganisationInvoiceModule {}
