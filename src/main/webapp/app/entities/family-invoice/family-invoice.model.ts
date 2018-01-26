import { BaseEntity } from './../../shared';

export class FamilyInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public slug?: string,
        public name?: string,
        public description?: string,
        public tenantId?: number,
    ) {
    }
}
