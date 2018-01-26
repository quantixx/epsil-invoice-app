import { BaseEntity } from './../../shared';

export const enum DocumentType {
    'TENANT_LOGO',
    'INVOICE',
    'QUOTATION'
}

export class QuotationDefinitionInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public docType?: DocumentType,
        public type?: string,
        public vatRate?: number,
        public validityTerms?: string,
        public acceptation?: string,
        public familyId?: number,
        public languageId?: number,
        public tenantId?: number,
    ) {
    }
}
