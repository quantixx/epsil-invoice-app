import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TenantInvoice } from './tenant-invoice.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TenantInvoiceService {

    private resourceUrl =  SERVER_API_URL + '/invoiceapi/api/tenants';

    constructor(private http: Http) { }

    create(tenant: TenantInvoice): Observable<TenantInvoice> {
        const copy = this.convert(tenant);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tenant: TenantInvoice): Observable<TenantInvoice> {
        const copy = this.convert(tenant);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TenantInvoice> {
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
     * Convert a returned JSON object to TenantInvoice.
     */
    private convertItemFromServer(json: any): TenantInvoice {
        const entity: TenantInvoice = Object.assign(new TenantInvoice(), json);
        return entity;
    }

    /**
     * Convert a TenantInvoice to a JSON which can be sent to the server.
     */
    private convert(tenant: TenantInvoice): TenantInvoice {
        const copy: TenantInvoice = Object.assign({}, tenant);
        return copy;
    }
}
