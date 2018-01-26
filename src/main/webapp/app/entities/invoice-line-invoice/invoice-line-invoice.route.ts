import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { InvoiceLineInvoiceComponent } from './invoice-line-invoice.component';
import { InvoiceLineInvoiceDetailComponent } from './invoice-line-invoice-detail.component';
import { InvoiceLineInvoicePopupComponent } from './invoice-line-invoice-dialog.component';
import { InvoiceLineInvoiceDeletePopupComponent } from './invoice-line-invoice-delete-dialog.component';

@Injectable()
export class InvoiceLineInvoiceResolvePagingParams implements Resolve<any> {

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

export const invoiceLineRoute: Routes = [
    {
        path: 'invoice-line-invoice',
        component: InvoiceLineInvoiceComponent,
        resolve: {
            'pagingParams': InvoiceLineInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'invoice-line-invoice/:id',
        component: InvoiceLineInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoiceLinePopupRoute: Routes = [
    {
        path: 'invoice-line-invoice-new',
        component: InvoiceLineInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceLine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-line-invoice/:id/edit',
        component: InvoiceLineInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceLine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-line-invoice/:id/delete',
        component: InvoiceLineInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceLine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
