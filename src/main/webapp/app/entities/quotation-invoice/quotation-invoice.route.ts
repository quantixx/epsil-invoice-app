import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { QuotationInvoiceComponent } from './quotation-invoice.component';
import { QuotationInvoiceDetailComponent } from './quotation-invoice-detail.component';
import { QuotationInvoicePopupComponent } from './quotation-invoice-dialog.component';
import { QuotationInvoiceDeletePopupComponent } from './quotation-invoice-delete-dialog.component';

@Injectable()
export class QuotationInvoiceResolvePagingParams implements Resolve<any> {

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

export const quotationRoute: Routes = [
    {
        path: 'quotation-invoice',
        component: QuotationInvoiceComponent,
        resolve: {
            'pagingParams': QuotationInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'quotation-invoice/:id',
        component: QuotationInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quotationPopupRoute: Routes = [
    {
        path: 'quotation-invoice-new',
        component: QuotationInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quotation-invoice/:id/edit',
        component: QuotationInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quotation-invoice/:id/delete',
        component: QuotationInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
