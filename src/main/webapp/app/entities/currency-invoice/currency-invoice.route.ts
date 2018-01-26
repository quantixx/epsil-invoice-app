import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CurrencyInvoiceComponent } from './currency-invoice.component';
import { CurrencyInvoiceDetailComponent } from './currency-invoice-detail.component';
import { CurrencyInvoicePopupComponent } from './currency-invoice-dialog.component';
import { CurrencyInvoiceDeletePopupComponent } from './currency-invoice-delete-dialog.component';

@Injectable()
export class CurrencyInvoiceResolvePagingParams implements Resolve<any> {

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

export const currencyRoute: Routes = [
    {
        path: 'currency-invoice',
        component: CurrencyInvoiceComponent,
        resolve: {
            'pagingParams': CurrencyInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'currency-invoice/:id',
        component: CurrencyInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const currencyPopupRoute: Routes = [
    {
        path: 'currency-invoice-new',
        component: CurrencyInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'currency-invoice/:id/edit',
        component: CurrencyInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'currency-invoice/:id/delete',
        component: CurrencyInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
