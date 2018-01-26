import { BaseEntity } from './../../shared';

export const enum InvoiceStatus {
    'CREATED',
    'COMMITTED',
    'CANCELLED',
    'PAID'
}

export class InvoiceStateInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public status?: InvoiceStatus,
        public statusDate?: any,
        public invoiceId?: number,
    ) {
    }
}
