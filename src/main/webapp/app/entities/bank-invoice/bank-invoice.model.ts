import { BaseEntity } from './../../shared';

export class BankInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public bankName?: string,
        public agencyName?: string,
        public bankAccount?: string,
        public iban?: string,
        public bic?: string,
        public phoneArea?: string,
        public phoneNumber?: string,
        public addressId?: number,
    ) {
    }
}
