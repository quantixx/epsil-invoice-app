import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { InvoiceappTenantInvoiceModule } from './tenant-invoice/tenant-invoice.module';
import { InvoiceappEventInvoiceModule } from './event-invoice/event-invoice.module';
import { InvoiceappDocumentInvoiceModule } from './document-invoice/document-invoice.module';
import { InvoiceappBankInvoiceModule } from './bank-invoice/bank-invoice.module';
import { InvoiceappAddressInvoiceModule } from './address-invoice/address-invoice.module';
import { InvoiceappOrganisationInvoiceModule } from './organisation-invoice/organisation-invoice.module';
import { InvoiceappContactInvoiceModule } from './contact-invoice/contact-invoice.module';
import { InvoiceappCountryInvoiceModule } from './country-invoice/country-invoice.module';
import { InvoiceappLanguageInvoiceModule } from './language-invoice/language-invoice.module';
import { InvoiceappCurrencyInvoiceModule } from './currency-invoice/currency-invoice.module';
import { InvoiceappSequenceInvoiceModule } from './sequence-invoice/sequence-invoice.module';
import { InvoiceappFamilyInvoiceModule } from './family-invoice/family-invoice.module';
import { InvoiceappInvoiceDefinitionInvoiceModule } from './invoice-definition-invoice/invoice-definition-invoice.module';
import { InvoiceappInvoiceInvoiceModule } from './invoice-invoice/invoice-invoice.module';
import { InvoiceappInvoiceLineInvoiceModule } from './invoice-line-invoice/invoice-line-invoice.module';
import { InvoiceappInvoiceStateInvoiceModule } from './invoice-state-invoice/invoice-state-invoice.module';
import { InvoiceappQuotationDefinitionInvoiceModule } from './quotation-definition-invoice/quotation-definition-invoice.module';
import { InvoiceappQuotationInvoiceModule } from './quotation-invoice/quotation-invoice.module';
import { InvoiceappQuotationLineInvoiceModule } from './quotation-line-invoice/quotation-line-invoice.module';
import { InvoiceappQuotationStateInvoiceModule } from './quotation-state-invoice/quotation-state-invoice.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        InvoiceappTenantInvoiceModule,
        InvoiceappEventInvoiceModule,
        InvoiceappDocumentInvoiceModule,
        InvoiceappBankInvoiceModule,
        InvoiceappAddressInvoiceModule,
        InvoiceappOrganisationInvoiceModule,
        InvoiceappContactInvoiceModule,
        InvoiceappCountryInvoiceModule,
        InvoiceappLanguageInvoiceModule,
        InvoiceappCurrencyInvoiceModule,
        InvoiceappSequenceInvoiceModule,
        InvoiceappFamilyInvoiceModule,
        InvoiceappInvoiceDefinitionInvoiceModule,
        InvoiceappInvoiceInvoiceModule,
        InvoiceappInvoiceLineInvoiceModule,
        InvoiceappInvoiceStateInvoiceModule,
        InvoiceappQuotationDefinitionInvoiceModule,
        InvoiceappQuotationInvoiceModule,
        InvoiceappQuotationLineInvoiceModule,
        InvoiceappQuotationStateInvoiceModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceappEntityModule {}
