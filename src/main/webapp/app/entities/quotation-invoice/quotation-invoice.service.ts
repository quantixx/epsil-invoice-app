import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { QuotationInvoice } from './quotation-invoice.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class QuotationInvoiceService {

    private resourceUrl =  SERVER_API_URL + '/invoiceapi/api/quotations';

    constructor(private http: Http) { }

    create(quotation: QuotationInvoice): Observable<QuotationInvoice> {
        const copy = this.convert(quotation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(quotation: QuotationInvoice): Observable<QuotationInvoice> {
        const copy = this.convert(quotation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<QuotationInvoice> {
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
     * Convert a returned JSON object to QuotationInvoice.
     */
    private convertItemFromServer(json: any): QuotationInvoice {
        const entity: QuotationInvoice = Object.assign(new QuotationInvoice(), json);
        return entity;
    }

    /**
     * Convert a QuotationInvoice to a JSON which can be sent to the server.
     */
    private convert(quotation: QuotationInvoice): QuotationInvoice {
        const copy: QuotationInvoice = Object.assign({}, quotation);
        return copy;
    }
}
