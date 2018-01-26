import { BaseEntity } from './../../shared';

export class OrganisationInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public slug?: string,
        public name?: string,
        public businessIdentification?: string,
        public corporateName?: string,
        public vatIdentification?: string,
        public activated?: boolean,
        public createdOn?: any,
        public addressId?: number,
        public contactId?: number,
        public tenantId?: number,
    ) {
        this.activated = false;
    }
}
