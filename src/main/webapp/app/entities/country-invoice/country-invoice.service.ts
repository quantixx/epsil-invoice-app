import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CountryInvoice } from './country-invoice.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CountryInvoiceService {

    private resourceUrl =  SERVER_API_URL + 'api/countries';

    constructor(private http: Http) { }

    create(country: CountryInvoice): Observable<CountryInvoice> {
        const copy = this.convert(country);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(country: CountryInvoice): Observable<CountryInvoice> {
        const copy = this.convert(country);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CountryInvoice> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to CountryInvoice.
     */
    private convertItemFromServer(json: any): CountryInvoice {
        const entity: CountryInvoice = Object.assign(new CountryInvoice(), json);
        return entity;
    }

    /**
     * Convert a CountryInvoice to a JSON which can be sent to the server.
     */
    private convert(country: CountryInvoice): CountryInvoice {
        const copy: CountryInvoice = Object.assign({}, country);
        return copy;
    }
}
