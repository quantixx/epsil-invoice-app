import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { InvoiceDefinitionInvoice } from './invoice-definition-invoice.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class InvoiceDefinitionInvoiceService {

    private resourceUrl =  SERVER_API_URL + '/invoiceapi/api/invoice-definitions';

    constructor(private http: Http) { }

    create(invoiceDefinition: InvoiceDefinitionInvoice): Observable<InvoiceDefinitionInvoice> {
        const copy = this.convert(invoiceDefinition);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(invoiceDefinition: InvoiceDefinitionInvoice): Observable<InvoiceDefinitionInvoice> {
        const copy = this.convert(invoiceDefinition);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<InvoiceDefinitionInvoice> {
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
     * Convert a returned JSON object to InvoiceDefinitionInvoice.
     */
    private convertItemFromServer(json: any): InvoiceDefinitionInvoice {
        const entity: InvoiceDefinitionInvoice = Object.assign(new InvoiceDefinitionInvoice(), json);
        return entity;
    }

    /**
     * Convert a InvoiceDefinitionInvoice to a JSON which can be sent to the server.
     */
    private convert(invoiceDefinition: InvoiceDefinitionInvoice): InvoiceDefinitionInvoice {
        const copy: InvoiceDefinitionInvoice = Object.assign({}, invoiceDefinition);
        return copy;
    }
}
