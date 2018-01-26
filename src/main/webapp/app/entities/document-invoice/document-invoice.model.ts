import { BaseEntity } from './../../shared';

export const enum DocumentType {
    'TENANT_LOGO',
    'INVOICE',
    'QUOTATION'
}

export class DocumentInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public documentType?: DocumentType,
        public documentSize?: number,
        public docusignEnvelopeId?: string,
        public url?: string,
        public contentType?: string,
        public createdOn?: any,
        public languageId?: number,
    ) {
    }
}
