import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SequenceInvoice } from './sequence-invoice.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SequenceInvoiceService {

    private resourceUrl =  SERVER_API_URL + 'api/sequences';

    constructor(private http: Http) { }

    create(sequence: SequenceInvoice): Observable<SequenceInvoice> {
        const copy = this.convert(sequence);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(sequence: SequenceInvoice): Observable<SequenceInvoice> {
        const copy = this.convert(sequence);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SequenceInvoice> {
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
     * Convert a returned JSON object to SequenceInvoice.
     */
    private convertItemFromServer(json: any): SequenceInvoice {
        const entity: SequenceInvoice = Object.assign(new SequenceInvoice(), json);
        return entity;
    }

    /**
     * Convert a SequenceInvoice to a JSON which can be sent to the server.
     */
    private convert(sequence: SequenceInvoice): SequenceInvoice {
        const copy: SequenceInvoice = Object.assign({}, sequence);
        return copy;
    }
}
