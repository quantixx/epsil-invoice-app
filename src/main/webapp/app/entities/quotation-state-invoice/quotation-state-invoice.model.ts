import { BaseEntity } from './../../shared';

export const enum QuotationStatus {
    'CREATED',
    'COMMITTED',
    'CANCELLED'
}

export class QuotationStateInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public status?: QuotationStatus,
        public statusDate?: any,
    ) {
    }
}
