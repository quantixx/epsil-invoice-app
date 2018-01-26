import { BaseEntity } from './../../shared';

export const enum DocumentType {
    'TENANT_LOGO',
    'INVOICE',
    'QUOTATION'
}

export class InvoiceDefinitionInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public docType?: DocumentType,
        public vatRate?: number,
        public terms?: string,
        public penalties?: string,
        public familyId?: number,
        public languageId?: number,
        public tenantId?: number,
    ) {
    }
}
