import { BaseEntity } from './../../shared';

export class CurrencyInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public entity?: string,
        public currency?: string,
        public alphabeticCode?: string,
        public numericCode?: number,
        public minorUnit?: number,
        public symbol?: string,
        public activated?: boolean,
    ) {
        this.activated = false;
    }
}
