import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DocumentInvoiceComponent } from './document-invoice.component';
import { DocumentInvoiceDetailComponent } from './document-invoice-detail.component';
import { DocumentInvoicePopupComponent } from './document-invoice-dialog.component';
import { DocumentInvoiceDeletePopupComponent } from './document-invoice-delete-dialog.component';

@Injectable()
export class DocumentInvoiceResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const documentRoute: Routes = [
    {
        path: 'document-invoice',
        component: DocumentInvoiceComponent,
        resolve: {
            'pagingParams': DocumentInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.document.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'document-invoice/:id',
        component: DocumentInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.document.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentPopupRoute: Routes = [
    {
        path: 'document-invoice-new',
        component: DocumentInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.document.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-invoice/:id/edit',
        component: DocumentInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.document.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-invoice/:id/delete',
        component: DocumentInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.document.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
