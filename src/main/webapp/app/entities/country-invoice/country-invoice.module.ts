import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    CountryInvoiceService,
    CountryInvoicePopupService,
    CountryInvoiceComponent,
    CountryInvoiceDetailComponent,
    CountryInvoiceDialogComponent,
    CountryInvoicePopupComponent,
    CountryInvoiceDeletePopupComponent,
    CountryInvoiceDeleteDialogComponent,
    countryRoute,
    countryPopupRoute,
    CountryInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...countryRoute,
    ...countryPopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CountryInvoiceComponent,
        CountryInvoiceDetailComponent,
        CountryInvoiceDialogComponent,
        CountryInvoiceDeleteDialogComponent,
        CountryInvoicePopupComponent,
        CountryInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        CountryInvoiceComponent,
        CountryInvoiceDialogComponent,
        CountryInvoicePopupComponent,
        CountryInvoiceDeleteDialogComponent,
        CountryInvoiceDeletePopupComponent,
    ],
    providers: [
        CountryInvoiceService,
        CountryInvoicePopupService,
        CountryInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappCountryInvoiceModule {}
