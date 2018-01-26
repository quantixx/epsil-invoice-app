import { BaseEntity } from './../../shared';

export const enum Continent {
    'AF',
    'AN',
    'AS',
    'EU',
    'NA',
    'OC',
    'SA'
}

export class CountryInvoice implements BaseEntity {
    constructor(
        public id?: number,
        public iso2?: string,
        public iso3?: string,
        public m49?: number,
        public name?: string,
        public officialNameEn?: string,
        public officialNameFr?: string,
        public dial?: string,
        public continent?: Continent,
        public tld?: string,
        public flag32?: string,
        public flag128?: string,
        public latitude?: string,
        public longitude?: string,
        public zoom?: number,
    ) {
    }
}
