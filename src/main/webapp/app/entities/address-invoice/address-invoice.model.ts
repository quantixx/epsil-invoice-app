import { BaseEntity } from './../../shared';

export class AddressInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public street?: string,
        public street2?: string,
        public city?: string,
        public state?: string,
        public zipCode?: string,
        public additionalInformation?: string,
        public countryId?: number,
    ) {
    }
}
