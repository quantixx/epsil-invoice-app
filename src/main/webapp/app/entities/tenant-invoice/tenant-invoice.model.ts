import { BaseEntity } from './../../shared';

export class TenantInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public slug?: string,
        public name?: string,
        public companyName?: string,
        public description?: string,
        public vatIdentification?: string,
        public businessIdentification?: string,
        public businessRegistry?: string,
        public businessCode?: string,
        public financialYearFrom?: string,
        public financialYearTo?: string,
        public invoiceAddressId?: number,
        public bankId?: number,
        public logoId?: number,
        public contactId?: number,
        public events?: BaseEntity[],
        public invoices?: BaseEntity[],
        public invoiceDefinitions?: BaseEntity[],
        public quotations?: BaseEntity[],
        public quotationDefinitions?: BaseEntity[],
        public families?: BaseEntity[],
    ) {
    }
}
