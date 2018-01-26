import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { QuotationLineInvoiceComponent } from './quotation-line-invoice.component';
import { QuotationLineInvoiceDetailComponent } from './quotation-line-invoice-detail.component';
import { QuotationLineInvoicePopupComponent } from './quotation-line-invoice-dialog.component';
import { QuotationLineInvoiceDeletePopupComponent } from './quotation-line-invoice-delete-dialog.component';

@Injectable()
export class QuotationLineInvoiceResolvePagingParams implements Resolve<any> {

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

export const quotationLineRoute: Routes = [
    {
        path: 'quotation-line-invoice',
        component: QuotationLineInvoiceComponent,
        resolve: {
            'pagingParams': QuotationLineInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'quotation-line-invoice/:id',
        component: QuotationLineInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quotationLinePopupRoute: Routes = [
    {
        path: 'quotation-line-invoice-new',
        component: QuotationLineInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationLine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quotation-line-invoice/:id/edit',
        component: QuotationLineInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationLine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quotation-line-invoice/:id/delete',
        component: QuotationLineInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationLine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
