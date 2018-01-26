import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TenantInvoiceComponent } from './tenant-invoice.component';
import { TenantInvoiceDetailComponent } from './tenant-invoice-detail.component';
import { TenantInvoicePopupComponent } from './tenant-invoice-dialog.component';
import { TenantInvoiceDeletePopupComponent } from './tenant-invoice-delete-dialog.component';

@Injectable()
export class TenantInvoiceResolvePagingParams implements Resolve<any> {

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

export const tenantRoute: Routes = [
    {
        path: 'tenant-invoice',
        component: TenantInvoiceComponent,
        resolve: {
            'pagingParams': TenantInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.tenant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tenant-invoice/:id',
        component: TenantInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.tenant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tenantPopupRoute: Routes = [
    {
        path: 'tenant-invoice-new',
        component: TenantInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.tenant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tenant-invoice/:id/edit',
        component: TenantInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.tenant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tenant-invoice/:id/delete',
        component: TenantInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'invoiceappApp.tenant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
