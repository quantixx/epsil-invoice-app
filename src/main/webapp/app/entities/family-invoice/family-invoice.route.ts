import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FamilyInvoiceComponent } from './family-invoice.component';
import { FamilyInvoiceDetailComponent } from './family-invoice-detail.component';
import { FamilyInvoicePopupComponent } from './family-invoice-dialog.component';
import { FamilyInvoiceDeletePopupComponent } from './family-invoice-delete-dialog.component';

@Injectable()
export class FamilyInvoiceResolvePagingParams implements Resolve<any> {

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

export const familyRoute: Routes = [
    {
        path: 'family-invoice',
        component: FamilyInvoiceComponent,
        resolve: {
            'pagingParams': FamilyInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.family.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'family-invoice/:id',
        component: FamilyInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.family.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const familyPopupRoute: Routes = [
    {
        path: 'family-invoice-new',
        component: FamilyInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.family.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'family-invoice/:id/edit',
        component: FamilyInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.family.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'family-invoice/:id/delete',
        component: FamilyInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.family.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
