import { BaseEntity } from './../../shared';

export class EventInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public slug?: string,
        public name?: string,
        public virtual?: boolean,
        public startsOn?: any,
        public endsOn?: any,
        public tenantId?: number,
    ) {
        this.virtual = false;
    }
}
