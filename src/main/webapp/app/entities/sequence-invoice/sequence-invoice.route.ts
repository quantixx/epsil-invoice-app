import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SequenceInvoiceComponent } from './sequence-invoice.component';
import { SequenceInvoiceDetailComponent } from './sequence-invoice-detail.component';
import { SequenceInvoicePopupComponent } from './sequence-invoice-dialog.component';
import { SequenceInvoiceDeletePopupComponent } from './sequence-invoice-delete-dialog.component';

@Injectable()
export class SequenceInvoiceResolvePagingParams implements Resolve<any> {

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

export const sequenceRoute: Routes = [
    {
        path: 'sequence-invoice',
        component: SequenceInvoiceComponent,
        resolve: {
            'pagingParams': SequenceInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.sequence.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sequence-invoice/:id',
        component: SequenceInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.sequence.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sequencePopupRoute: Routes = [
    {
        path: 'sequence-invoice-new',
        component: SequenceInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.sequence.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sequence-invoice/:id/edit',
        component: SequenceInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.sequence.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sequence-invoice/:id/delete',
        component: SequenceInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.sequence.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
