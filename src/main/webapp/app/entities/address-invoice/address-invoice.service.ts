import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AddressInvoice } from './address-invoice.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AddressInvoiceService {

    private resourceUrl =  SERVER_API_URL + 'api/addresses';

    constructor(private http: Http) { }

    create(address: AddressInvoice): Observable<AddressInvoice> {
        const copy = this.convert(address);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(address: AddressInvoice): Observable<AddressInvoice> {
        const copy = this.convert(address);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<AddressInvoice> {
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
     * Convert a returned JSON object to AddressInvoice.
     */
    private convertItemFromServer(json: any): AddressInvoice {
        const entity: AddressInvoice = Object.assign(new AddressInvoice(), json);
        return entity;
    }

    /**
     * Convert a AddressInvoice to a JSON which can be sent to the server.
     */
    private convert(address: AddressInvoice): AddressInvoice {
        const copy: AddressInvoice = Object.assign({}, address);
        return copy;
    }
}
