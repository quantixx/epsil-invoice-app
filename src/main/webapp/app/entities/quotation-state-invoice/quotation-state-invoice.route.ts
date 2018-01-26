import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { QuotationStateInvoiceComponent } from './quotation-state-invoice.component';
import { QuotationStateInvoiceDetailComponent } from './quotation-state-invoice-detail.component';
import { QuotationStateInvoicePopupComponent } from './quotation-state-invoice-dialog.component';
import { QuotationStateInvoiceDeletePopupComponent } from './quotation-state-invoice-delete-dialog.component';

@Injectable()
export class QuotationStateInvoiceResolvePagingParams implements Resolve<any> {

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

export const quotationStateRoute: Routes = [
    {
        path: 'quotation-state-invoice',
        component: QuotationStateInvoiceComponent,
        resolve: {
            'pagingParams': QuotationStateInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationState.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'quotation-state-invoice/:id',
        component: QuotationStateInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationState.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quotationStatePopupRoute: Routes = [
    {
        path: 'quotation-state-invoice-new',
        component: QuotationStateInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quotation-state-invoice/:id/edit',
        component: QuotationStateInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quotation-state-invoice/:id/delete',
        component: QuotationStateInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.quotationState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
