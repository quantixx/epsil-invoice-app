import { BaseEntity } from './../../shared';

export const enum DocumentType {
    'TENANT_LOGO',
    'INVOICE',
    'QUOTATION'
}

export class QuotationInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public docType?: DocumentType,
        public type?: string,
        public vatRate?: number,
        public validityTerms?: string,
        public acceptionation?: string,
        public title?: string,
        public number?: string,
        public subTotalBeforeDiscount?: number,
        public discountRate?: number,
        public discountAmount?: number,
        public subTotal?: number,
        public vatAmount?: number,
        public total?: number,
        public additionalInformation?: string,
        public familyId?: number,
        public invoiceId?: number,
        public tenantId?: number,
    ) {
    }
}
