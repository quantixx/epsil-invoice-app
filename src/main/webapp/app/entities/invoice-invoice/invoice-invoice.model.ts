import { BaseEntity } from './../../shared';

export const enum DocumentType {
    'TENANT_LOGO',
    'INVOICE',
    'QUOTATION'
}

export const enum InvoiceType {
    'INVOICE',
    'CREDIT_INVOICE'
}

export class InvoiceInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public docType?: DocumentType,
        public vatRate?: number,
        public terms?: string,
        public penalties?: string,
        public number?: string,
        public invoiceType?: InvoiceType,
        public poNumber?: string,
        public subTotalBeforeDiscount?: number,
        public discountRate?: number,
        public discountAmount?: number,
        public subTotal?: number,
        public vatAmount?: number,
        public total?: number,
        public additionalInformation?: string,
        public linkedId?: number,
        public organisationId?: number,
        public quotationId?: number,
        public documentId?: number,
        public states?: BaseEntity[],
        public lines?: BaseEntity[],
        public languageId?: number,
        public currencyId?: number,
        public familyId?: number,
        public tenantId?: number,
    ) {
    }
}
