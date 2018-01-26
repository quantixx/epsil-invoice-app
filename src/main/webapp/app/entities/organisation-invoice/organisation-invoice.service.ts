import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OrganisationInvoice } from './organisation-invoice.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OrganisationInvoiceService {

    private resourceUrl =  SERVER_API_URL + '/invoiceapi/api/organisations';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(organisation: OrganisationInvoice): Observable<OrganisationInvoice> {
        const copy = this.convert(organisation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(organisation: OrganisationInvoice): Observable<OrganisationInvoice> {
        const copy = this.convert(organisation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<OrganisationInvoice> {
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
     * Convert a returned JSON object to OrganisationInvoice.
     */
    private convertItemFromServer(json: any): OrganisationInvoice {
        const entity: OrganisationInvoice = Object.assign(new OrganisationInvoice(), json);
        entity.createdOn = this.dateUtils
            .convertDateTimeFromServer(json.createdOn);
        return entity;
    }

    /**
     * Convert a OrganisationInvoice to a JSON which can be sent to the server.
     */
    private convert(organisation: OrganisationInvoice): OrganisationInvoice {
        const copy: OrganisationInvoice = Object.assign({}, organisation);

        copy.createdOn = this.dateUtils.toDate(organisation.createdOn);
        return copy;
    }
}
