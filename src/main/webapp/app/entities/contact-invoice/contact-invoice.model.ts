import { BaseEntity } from './../../shared';

export class ContactInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public activated?: boolean,
        public email?: string,
        public phoneArea?: string,
        public phoneNumber?: string,
    ) {
        this.activated = false;
    }
}
