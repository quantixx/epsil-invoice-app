import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { InvoiceStateInvoiceComponent } from './invoice-state-invoice.component';
import { InvoiceStateInvoiceDetailComponent } from './invoice-state-invoice-detail.component';
import { InvoiceStateInvoicePopupComponent } from './invoice-state-invoice-dialog.component';
import { InvoiceStateInvoiceDeletePopupComponent } from './invoice-state-invoice-delete-dialog.component';

@Injectable()
export class InvoiceStateInvoiceResolvePagingParams implements Resolve<any> {

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

export const invoiceStateRoute: Routes = [
    {
        path: 'invoice-state-invoice',
        component: InvoiceStateInvoiceComponent,
        resolve: {
            'pagingParams': InvoiceStateInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceState.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'invoice-state-invoice/:id',
        component: InvoiceStateInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceState.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoiceStatePopupRoute: Routes = [
    {
        path: 'invoice-state-invoice-new',
        component: InvoiceStateInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-state-invoice/:id/edit',
        component: InvoiceStateInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-state-invoice/:id/delete',
        component: InvoiceStateInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.invoiceState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
