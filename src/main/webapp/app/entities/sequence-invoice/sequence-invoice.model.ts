import { BaseEntity } from './../../shared';

export const enum DocumentType {
    'TENANT_LOGO',
    'INVOICE',
    'QUOTATION'
}

export class SequenceInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public docType?: DocumentType,
        public next?: number,
        public tenantId?: number,
        public familyId?: number,
    ) {
    }
}
