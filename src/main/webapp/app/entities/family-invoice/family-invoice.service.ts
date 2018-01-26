import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FamilyInvoice } from './family-invoice.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FamilyInvoiceService {

    private resourceUrl =  SERVER_API_URL + 'api/families';

    constructor(private http: Http) { }

    create(family: FamilyInvoice): Observable<FamilyInvoice> {
        const copy = this.convert(family);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(family: FamilyInvoice): Observable<FamilyInvoice> {
        const copy = this.convert(family);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FamilyInvoice> {
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
     * Convert a returned JSON object to FamilyInvoice.
     */
    private convertItemFromServer(json: any): FamilyInvoice {
        const entity: FamilyInvoice = Object.assign(new FamilyInvoice(), json);
        return entity;
    }

    /**
     * Convert a FamilyInvoice to a JSON which can be sent to the server.
     */
    private convert(family: FamilyInvoice): FamilyInvoice {
        const copy: FamilyInvoice = Object.assign({}, family);
        return copy;
    }
}
