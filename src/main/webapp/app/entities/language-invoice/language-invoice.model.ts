import { BaseEntity } from './../../shared';

export class LanguageInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public alpha3b?: string,
        public alpha2?: string,
        public name?: string,
        public flag32?: string,
        public flag128?: string,
        public activated?: boolean,
    ) {
        this.activated = false;
    }
}
