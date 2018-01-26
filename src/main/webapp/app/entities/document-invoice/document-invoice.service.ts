import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DocumentInvoice } from './document-invoice.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DocumentInvoiceService {

    private resourceUrl =  SERVER_API_URL + 'api/documents';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(document: DocumentInvoice): Observable<DocumentInvoice> {
        const copy = this.convert(document);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(document: DocumentInvoice): Observable<DocumentInvoice> {
        const copy = this.convert(document);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DocumentInvoice> {
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
     * Convert a returned JSON object to DocumentInvoice.
     */
    private convertItemFromServer(json: any): DocumentInvoice {
        const entity: DocumentInvoice = Object.assign(new DocumentInvoice(), json);
        entity.createdOn = this.dateUtils
            .convertDateTimeFromServer(json.createdOn);
        return entity;
    }

    /**
     * Convert a DocumentInvoice to a JSON which can be sent to the server.
     */
    private convert(document: DocumentInvoice): DocumentInvoice {
        const copy: DocumentInvoice = Object.assign({}, document);

        copy.createdOn = this.dateUtils.toDate(document.createdOn);
        return copy;
    }
}
