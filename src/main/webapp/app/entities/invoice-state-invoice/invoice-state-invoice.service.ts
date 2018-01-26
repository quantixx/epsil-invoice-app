import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { InvoiceStateInvoice } from './invoice-state-invoice.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class InvoiceStateInvoiceService {

    private resourceUrl =  SERVER_API_URL + '/invoiceapi/api/invoice-states';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(invoiceState: InvoiceStateInvoice): Observable<InvoiceStateInvoice> {
        const copy = this.convert(invoiceState);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(invoiceState: InvoiceStateInvoice): Observable<InvoiceStateInvoice> {
        const copy = this.convert(invoiceState);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<InvoiceStateInvoice> {
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
     * Convert a returned JSON object to InvoiceStateInvoice.
     */
    private convertItemFromServer(json: any): InvoiceStateInvoice {
        const entity: InvoiceStateInvoice = Object.assign(new InvoiceStateInvoice(), json);
        entity.statusDate = this.dateUtils
            .convertDateTimeFromServer(json.statusDate);
        return entity;
    }

    /**
     * Convert a InvoiceStateInvoice to a JSON which can be sent to the server.
     */
    private convert(invoiceState: InvoiceStateInvoice): InvoiceStateInvoice {
        const copy: InvoiceStateInvoice = Object.assign({}, invoiceState);

        copy.statusDate = this.dateUtils.toDate(invoiceState.statusDate);
        return copy;
    }
}
