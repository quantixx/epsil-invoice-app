import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { QuotationStateInvoice } from './quotation-state-invoice.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class QuotationStateInvoiceService {

    private resourceUrl =  SERVER_API_URL + 'api/quotation-states';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(quotationState: QuotationStateInvoice): Observable<QuotationStateInvoice> {
        const copy = this.convert(quotationState);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(quotationState: QuotationStateInvoice): Observable<QuotationStateInvoice> {
        const copy = this.convert(quotationState);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<QuotationStateInvoice> {
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
     * Convert a returned JSON object to QuotationStateInvoice.
     */
    private convertItemFromServer(json: any): QuotationStateInvoice {
        const entity: QuotationStateInvoice = Object.assign(new QuotationStateInvoice(), json);
        entity.statusDate = this.dateUtils
            .convertDateTimeFromServer(json.statusDate);
        return entity;
    }

    /**
     * Convert a QuotationStateInvoice to a JSON which can be sent to the server.
     */
    private convert(quotationState: QuotationStateInvoice): QuotationStateInvoice {
        const copy: QuotationStateInvoice = Object.assign({}, quotationState);

        copy.statusDate = this.dateUtils.toDate(quotationState.statusDate);
        return copy;
    }
}
