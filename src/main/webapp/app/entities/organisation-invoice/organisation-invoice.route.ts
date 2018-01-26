import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OrganisationInvoiceComponent } from './organisation-invoice.component';
import { OrganisationInvoiceDetailComponent } from './organisation-invoice-detail.component';
import { OrganisationInvoicePopupComponent } from './organisation-invoice-dialog.component';
import { OrganisationInvoiceDeletePopupComponent } from './organisation-invoice-delete-dialog.component';

@Injectable()
export class OrganisationInvoiceResolvePagingParams implements Resolve<any> {

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

export const organisationRoute: Routes = [
    {
        path: 'organisation-invoice',
        component: OrganisationInvoiceComponent,
        resolve: {
            'pagingParams': OrganisationInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.organisation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'organisation-invoice/:id',
        component: OrganisationInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.organisation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const organisationPopupRoute: Routes = [
    {
        path: 'organisation-invoice-new',
        component: OrganisationInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.organisation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organisation-invoice/:id/edit',
        component: OrganisationInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.organisation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organisation-invoice/:id/delete',
        component: OrganisationInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.organisation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
