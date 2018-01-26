import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceappSharedModule } from '../../shared';
import {
    LanguageInvoiceService,
    LanguageInvoicePopupService,
    LanguageInvoiceComponent,
    LanguageInvoiceDetailComponent,
    LanguageInvoiceDialogComponent,
    LanguageInvoicePopupComponent,
    LanguageInvoiceDeletePopupComponent,
    LanguageInvoiceDeleteDialogComponent,
    languageRoute,
    languagePopupRoute,
    LanguageInvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...languageRoute,
    ...languagePopupRoute,
];

@NgModule({
    imports: [
        InvoiceappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LanguageInvoiceComponent,
        LanguageInvoiceDetailComponent,
        LanguageInvoiceDialogComponent,
        LanguageInvoiceDeleteDialogComponent,
        LanguageInvoicePopupComponent,
        LanguageInvoiceDeletePopupComponent,
    ],
    entryComponents: [
        LanguageInvoiceComponent,
        LanguageInvoiceDialogComponent,
        LanguageInvoicePopupComponent,
        LanguageInvoiceDeleteDialogComponent,
        LanguageInvoiceDeletePopupComponent,
    ],
    providers: [
        LanguageInvoiceService,
        LanguageInvoicePopupService,
        LanguageInvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappLanguageInvoiceModule {}
