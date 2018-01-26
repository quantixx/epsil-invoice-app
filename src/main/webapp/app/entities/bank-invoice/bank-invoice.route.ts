import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BankInvoiceComponent } from './bank-invoice.component';
import { BankInvoiceDetailComponent } from './bank-invoice-detail.component';
import { BankInvoicePopupComponent } from './bank-invoice-dialog.component';
import { BankInvoiceDeletePopupComponent } from './bank-invoice-delete-dialog.component';

@Injectable()
export class BankInvoiceResolvePagingParams implements Resolve<any> {

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

export const bankRoute: Routes = [
    {
        path: 'bank-invoice',
        component: BankInvoiceComponent,
        resolve: {
            'pagingParams': BankInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bank-invoice/:id',
        component: BankInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankPopupRoute: Routes = [
    {
        path: 'bank-invoice-new',
        component: BankInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-invoice/:id/edit',
        component: BankInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-invoice/:id/delete',
        component: BankInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
